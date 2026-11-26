import "server-only";
import { fetchQuery } from "convex/nextjs";
import { api } from "@/convex/_generated/api";
import { initialStorePackages } from "@/data/store-packages";
import { intervalNames, productNames, type Product, type StorePackage } from "@/lib/admin/models";
import type { FunctionArgs } from "convex/server";
import type { internal } from "@/convex/_generated/api";
import type { Doc } from "@/convex/_generated/dataModel";
import type { PaymentPlan } from "@/lib/payments/catalog";

export function isStoreConfigured() {
  return Boolean(
    process.env.NEXT_PUBLIC_CONVEX_URL &&
    process.env.NEXT_PUBLIC_CONVEX_SITE_URL &&
    process.env.STORE_INGEST_SECRET
  );
}

export async function getStorePackages(product: Product): Promise<StorePackage[]> {
  if (!process.env.NEXT_PUBLIC_CONVEX_URL) {
    if (process.env.NODE_ENV === "production") throw new Error("Store unavailable");
    return initialStorePackages.filter((item) => item.product === product && item.active);
  }
  return fetchQuery(api.packages.listActive, { product });
}

export async function getCheckoutPlan(product: string, slug: string): Promise<PaymentPlan | null> {
  if (product !== "lms" && product !== "estimator") return null;
  const packages = await getStorePackages(product);
  const item = packages.find((p) => p.slug === slug);
  if (!item) return null;
  return {
    product,
    id: item.slug,
    amountMinor: item.amountMinor,
    name: { ar: item.nameAr, en: item.nameEn },
    productName: productNames[product],
    period: intervalNames[item.interval],
  };
}

type Operations = {
  createOrder: { args: FunctionArgs<typeof internal.ingest.createOrder>; result: Doc<"orders"> };
  setOrderState: { args: FunctionArgs<typeof internal.ingest.setOrderState>; result: null };
  getOrder: { args: FunctionArgs<typeof internal.ingest.getOrder>; result: Doc<"orders"> | null };
  createInquiry: {
    args: FunctionArgs<typeof internal.ingest.createInquiry>;
    result: Doc<"inquiries">;
  };
  notification: { args: FunctionArgs<typeof internal.ingest.notification>; result: null };
};

export async function storeRequest<K extends keyof Operations>(
  operation: K,
  data: Operations[K]["args"]
): Promise<Operations[K]["result"]> {
  if (!isStoreConfigured()) throw new Error("Store unavailable");
  const origin = process.env.NEXT_PUBLIC_CONVEX_SITE_URL!;
  const url = new URL("/store/ingest", origin);
  if (url.protocol !== "https:" && !["127.0.0.1", "localhost"].includes(url.hostname))
    throw new Error("Invalid store URL");
  const response = await fetch(url, {
    method: "POST",
    cache: "no-store",
    redirect: "error",
    signal: AbortSignal.timeout(15_000),
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.STORE_INGEST_SECRET}`,
    },
    body: JSON.stringify({ operation, data }),
  });
  if (!response.ok) throw new Error("Store request failed");
  return (await response.json()).result;
}
