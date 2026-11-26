"use client";
import { useState } from "react";
import { ConvexReactClient } from "convex/react";
import { ConvexAuthProvider } from "@convex-dev/auth/react";

export function AdminProvider({ children }: { children: React.ReactNode }) {
  const url = process.env.NEXT_PUBLIC_CONVEX_URL;
  if (!url) return <div className="p-12 text-center">لوحة الإدارة غير متاحة مؤقتًا.</div>;
  return <ConfiguredProvider url={url}>{children}</ConfiguredProvider>;
}

function ConfiguredProvider({ url, children }: { url: string; children: React.ReactNode }) {
  const [client] = useState(() => new ConvexReactClient(url));
  return <ConvexAuthProvider client={client}>{children}</ConvexAuthProvider>;
}
