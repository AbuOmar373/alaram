"use client";

import Link from "next/link";
import { Component, useDeferredValue, useState, type FormEvent, type ReactNode } from "react";
import { useAuthActions, useAuthToken } from "@convex-dev/auth/react";
import { useConvexAuth, useMutation, usePaginatedQuery, useQuery } from "convex/react";
import { ConvexError } from "convex/values";
import {
  ArrowUpLeft,
  CalendarDays,
  Check,
  ChevronLeft,
  CreditCard,
  Eye,
  EyeOff,
  Layers3,
  LayoutDashboard,
  Loader2,
  LogOut,
  Mail,
  Package,
  Pencil,
  Plus,
  RefreshCw,
  Search,
  ShieldCheck,
  ShoppingBag,
} from "lucide-react";
import { api } from "@/convex/_generated/api";
import type { Doc } from "@/convex/_generated/dataModel";
import {
  fulfillmentLabels,
  formatMoney,
  inquiryStatusLabels,
  intervalNames,
  orderStatusLabels,
  packageInputSchema,
  productNames,
  type StorePackage,
} from "@/lib/admin/models";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";

const tabs = [
  { id: "overview", label: "نظرة عامة", icon: LayoutDashboard },
  { id: "packages", label: "إدارة الباقات", icon: Package },
  { id: "purchases", label: "سجل المشتريات", icon: ShoppingBag },
  { id: "messages", label: "الرسائل", icon: Mail },
  { id: "requests", label: "طلبات العروض", icon: CalendarDays },
] as const;
type Tab = (typeof tabs)[number]["id"];
const selectClass =
  "h-10 rounded-xl border border-slate-300 bg-white px-3 text-sm text-slate-800 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100";
const date = (value: number) =>
  new Intl.DateTimeFormat("ar-SA-u-ca-gregory-nu-latn", {
    dateStyle: "medium",
    timeStyle: "short",
    timeZone: "Asia/Riyadh",
  }).format(value);
const friendlyError = (error: unknown) =>
  error instanceof ConvexError && typeof error.data === "string"
    ? error.data
    : "تعذر تنفيذ العملية. حاول مجددًا.";

function Spinner() {
  return (
    <div className="flex min-h-40 items-center justify-center text-slate-500" role="status">
      <Loader2 className="h-6 w-6 animate-spin" />
      <span className="sr-only">جارٍ التحميل</span>
    </div>
  );
}
function Badge({
  children,
  color = "slate",
}: {
  children: ReactNode;
  color?: "slate" | "green" | "amber" | "blue" | "red";
}) {
  const styles = {
    slate: "bg-slate-100 text-slate-700",
    green: "bg-emerald-50 text-emerald-800",
    amber: "bg-amber-50 text-amber-800",
    blue: "bg-blue-50 text-blue-800",
    red: "bg-rose-50 text-rose-800",
  };
  return (
    <span
      className={`inline-flex whitespace-nowrap rounded-full px-2.5 py-1 text-xs font-bold ${styles[color]}`}
    >
      {children}
    </span>
  );
}
function Empty({ text }: { text: string }) {
  return (
    <div className="flex flex-col items-center px-5 py-16 text-center">
      <div className="mb-4 rounded-2xl bg-slate-100 p-4">
        <Layers3 className="h-7 w-7 text-slate-400" />
      </div>
      <p className="font-bold text-slate-700">{text}</p>
      <p className="mt-2 text-sm text-slate-500">ستظهر البيانات هنا عند وصولها.</p>
    </div>
  );
}
function ErrorText({ children }: { children: ReactNode }) {
  return (
    <p role="alert" className="rounded-xl bg-rose-50 p-3 text-sm leading-7 text-rose-800">
      {children}
    </p>
  );
}

export function AdminApp() {
  const { isAuthenticated, isLoading } = useConvexAuth();
  if (isLoading) return <Spinner />;
  if (!isAuthenticated) return <Login />;
  return (
    <AdminErrorBoundary>
      <Dashboard />
    </AdminErrorBoundary>
  );
}

class AdminErrorBoundary extends Component<{ children: ReactNode }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  render() {
    return this.state.failed ? <AccessError /> : this.props.children;
  }
}
function AccessError() {
  const { signOut } = useAuthActions();
  return (
    <div className="mx-auto max-w-lg p-10 text-center">
      <ShieldCheck className="mx-auto mb-5 h-12 w-12 text-blue-700" />
      <h1 className="text-2xl font-bold">تعذر تحميل لوحة الإدارة</h1>
      <p className="my-5 leading-8 text-slate-600">
        تحقق من اتصالك وصلاحية حساب المدير ثم أعد تسجيل الدخول.
      </p>
      <Button onClick={() => void signOut()}>تسجيل الخروج</Button>
    </div>
  );
}

function Login() {
  const { signIn } = useAuthActions();
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [show, setShow] = useState(false);
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setBusy(true);
    setError("");
    const data = new FormData(event.currentTarget);
    try {
      await signIn("password", {
        email: String(data.get("email")).trim().toLowerCase(),
        password: String(data.get("password")),
        flow: "signIn",
      });
    } catch {
      setError("تعذر تسجيل الدخول. راجع البريد وكلمة المرور، أو حاول لاحقًا.");
    } finally {
      setBusy(false);
    }
  }
  return (
    <main className="grid min-h-screen bg-slate-50 lg:grid-cols-2">
      <div className="relative hidden overflow-hidden bg-slate-950 p-14 text-white lg:flex lg:flex-col lg:justify-between">
        <div className="absolute -left-32 top-20 h-96 w-96 rounded-full bg-blue-600/20 blur-3xl" />
        <div className="relative flex items-center gap-3">
          <div className="rounded-2xl bg-blue-600 p-3">
            <Layers3 className="h-7 w-7" />
          </div>
          <div>
            <p className="text-2xl font-black">الأرام</p>
            <p className="text-xs text-slate-400">إدارة الأعمال الرقمية</p>
          </div>
        </div>
        <div className="relative max-w-lg">
          <p className="mb-5 text-sm font-bold text-blue-300">مساحة الإدارة</p>
          <h1 className="text-5xl font-black leading-[1.5]">
            كل تفاصيل متجرك،
            <br />
            في مكان واحد.
          </h1>
          <p className="mt-6 text-lg leading-9 text-slate-300">
            أدر باقاتك، وتابع مشتريات العملاء، ونظّم الرسائل وطلبات العروض من لوحة واحدة.
          </p>
          <div className="mt-10 flex flex-wrap gap-3">
            {["الباقات", "المشتريات", "الرسائل والطلبات"].map((t) => (
              <span key={t} className="rounded-full border border-slate-700 px-4 py-2 text-sm">
                {t}
              </span>
            ))}
          </div>
        </div>
        <p className="relative text-sm text-slate-400">لوحة خاصة بالمسؤولين المصرّح لهم</p>
      </div>
      <div className="flex items-center justify-center px-6 py-14">
        <div className="w-full max-w-md">
          <div className="mb-7 inline-flex rounded-2xl bg-blue-100 p-4 text-blue-700">
            <ShieldCheck className="h-7 w-7" />
          </div>
          <h2 className="text-3xl font-black text-slate-950">مرحبًا بعودتك</h2>
          <p className="mb-9 mt-3 text-slate-600">سجّل الدخول إلى لوحة إدارة الأرام.</p>
          <form onSubmit={submit} className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="admin-email">البريد الإلكتروني</Label>
              <Input
                id="admin-email"
                name="email"
                type="email"
                autoComplete="username"
                dir="ltr"
                required
                className="h-12 rounded-xl bg-white"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="admin-password">كلمة المرور</Label>
              <div className="relative">
                <Input
                  id="admin-password"
                  name="password"
                  type={show ? "text" : "password"}
                  autoComplete="current-password"
                  dir="ltr"
                  required
                  maxLength={200}
                  className="h-12 rounded-xl bg-white pe-12"
                />
                <button
                  type="button"
                  onClick={() => setShow(!show)}
                  aria-label={show ? "إخفاء كلمة المرور" : "إظهار كلمة المرور"}
                  className="absolute end-3 top-3 text-slate-500"
                >
                  {show ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
            </div>
            {error && <ErrorText>{error}</ErrorText>}
            <Button
              disabled={busy}
              className="h-12 w-full gap-2 rounded-xl bg-blue-600 text-base font-bold text-white hover:bg-blue-700"
            >
              {busy ? (
                <Loader2 className="h-5 w-5 animate-spin" />
              ) : (
                <ChevronLeft className="h-5 w-5" />
              )}
              الدخول إلى لوحة الإدارة
            </Button>
          </form>
          <p className="mt-6 text-sm leading-7 text-slate-500">
            تُغلق الجلسة تلقائيًا عند عدم النشاط. التسجيل متاح لحساب المدير فقط.
          </p>
          <Link
            href="/ar"
            className="mt-8 inline-flex items-center gap-2 text-sm font-bold text-blue-700"
          >
            العودة إلى الموقع
            <ArrowUpLeft className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </main>
  );
}

function Dashboard() {
  const [tab, setTab] = useState<Tab>("overview");
  const me = useQuery(api.admin.me);
  const summary = useQuery(api.admin.summary);
  const { signOut } = useAuthActions();
  const active = tabs.find((t) => t.id === tab)!;
  const nav = (
    <>
      {tabs.map((item) => (
        <button
          key={item.id}
          onClick={() => setTab(item.id)}
          aria-current={tab === item.id ? "page" : undefined}
          className={`flex items-center gap-3 rounded-xl px-4 py-3.5 text-sm font-bold transition-colors ${tab === item.id ? "bg-blue-600 text-white" : "text-slate-300 hover:bg-slate-800 hover:text-white"}`}
        >
          <item.icon className="h-5 w-5" />
          <span>{item.label}</span>
          {item.id === "messages" && Boolean(summary?.newMessages) && (
            <span className="ms-auto rounded-full bg-white/15 px-2 text-xs">
              {summary!.newMessages}
            </span>
          )}
          {item.id === "requests" && Boolean(summary?.newRequests) && (
            <span className="ms-auto rounded-full bg-white/15 px-2 text-xs">
              {summary!.newRequests}
            </span>
          )}
        </button>
      ))}
    </>
  );
  return (
    <div className="min-h-screen bg-[#f6f8fc] text-slate-900">
      <aside className="fixed inset-y-0 right-0 z-30 hidden w-64 flex-col bg-slate-950 p-5 lg:flex">
        <div className="flex items-center gap-3 border-b border-slate-800 px-3 pb-8 pt-3">
          <div className="rounded-xl bg-blue-600 p-2.5">
            <Layers3 className="h-6 w-6 text-white" />
          </div>
          <div>
            <p className="text-xl font-black text-white">الأرام</p>
            <p className="text-xs text-slate-400">لوحة الإدارة</p>
          </div>
        </div>
        <p className="mb-3 mt-8 px-4 text-xs font-bold text-slate-500">إدارة المتجر</p>
        <nav aria-label="أقسام الإدارة" className="flex flex-col gap-2">
          {nav}
        </nav>
        <div className="mt-auto rounded-2xl border border-slate-800 bg-slate-900 p-4">
          <div className="mb-3 flex items-center gap-2 text-sm text-slate-300">
            <ShieldCheck className="h-4 w-4 text-emerald-400" />
            جلسة مسؤول محمية
          </div>
          <p dir="ltr" className="truncate text-xs text-slate-400">
            {me?.email}
          </p>
          <button
            onClick={() => void signOut()}
            className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-slate-300 hover:text-white"
          >
            <LogOut className="h-4 w-4" />
            تسجيل الخروج
          </button>
        </div>
      </aside>
      <div className="lg:mr-64">
        <header className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-200 bg-white px-5 py-5 sm:px-9">
          <div>
            <p className="text-xs text-slate-500">الأرام / الإدارة</p>
            <p className="mt-1 font-black">{active.label}</p>
          </div>
          <div className="flex items-center gap-3">
            <span className="hidden items-center gap-2 text-xs text-slate-500 sm:inline-flex">
              <span className="h-2 w-2 rounded-full bg-emerald-500" />
              تحديث تلقائي
            </span>
            <Link
              href="/ar"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-xl border border-slate-200 px-4 py-2 text-sm font-bold hover:bg-slate-50"
            >
              زيارة الموقع
              <ArrowUpLeft className="h-4 w-4" />
            </Link>
            <button
              onClick={() => void signOut()}
              className="rounded-xl border p-2 lg:hidden"
              aria-label="تسجيل الخروج"
            >
              <LogOut className="h-5 w-5" />
            </button>
          </div>
        </header>
        <nav
          aria-label="أقسام الإدارة على الجوال"
          className="flex gap-2 overflow-x-auto bg-slate-950 p-3 lg:hidden"
        >
          {nav}
        </nav>
        <main className="mx-auto max-w-[1500px] space-y-7 p-5 sm:p-9">
          <div>
            <h1 className="text-2xl font-black sm:text-3xl">
              {tab === "overview" ? "نظرة على أعمالك" : active.label}
            </h1>
            <p className="mt-2 text-sm leading-7 text-slate-500">
              {tab === "overview"
                ? "ملخص المبيعات والرسائل والطلبات التي تحتاج إلى متابعتك."
                : tab === "packages"
                  ? "أنشئ الباقات وحدّث أسعارها ومزاياها وظهورها في الموقع."
                  : tab === "purchases"
                    ? "تابع الدفعات المؤكدة وحالة التسليم وبيانات العملاء."
                    : "رتّب المحادثات، وحدّث الحالة، واحتفظ بملاحظات المتابعة."}
            </p>
          </div>
          {tab === "overview" ? (
            <Overview summary={summary} onTab={setTab} />
          ) : tab === "packages" ? (
            <Packages />
          ) : tab === "purchases" ? (
            <Purchases />
          ) : (
            <Inquiries key={tab} kind={tab === "messages" ? "contact" : "demo"} />
          )}
        </main>
      </div>
    </div>
  );
}

function Overview({
  summary,
  onTab,
}: {
  summary:
    | {
        revenueMinor: number;
        paid: number;
        pending: number;
        testPayments: number;
        newMessages: number;
        newRequests: number;
      }
    | undefined;
  onTab: (t: Tab) => void;
}) {
  if (!summary) return <Spinner />;
  const cards = [
    {
      title: "إجمالي المبيعات الفعلية",
      value: formatMoney(summary.revenueMinor),
      icon: CreditCard,
      color: "text-blue-700 bg-blue-50",
    },
    {
      title: "مشتريات مكتملة",
      value: summary.paid,
      icon: ShoppingBag,
      color: "text-emerald-700 bg-emerald-50",
    },
    {
      title: "رسائل جديدة",
      value: summary.newMessages,
      icon: Mail,
      color: "text-violet-700 bg-violet-50",
    },
    {
      title: "طلبات عروض جديدة",
      value: summary.newRequests,
      icon: CalendarDays,
      color: "text-amber-700 bg-amber-50",
    },
  ];
  return (
    <>
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {cards.map((c) => (
          <Card key={c.title} className="rounded-2xl border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <p className="text-sm font-semibold text-slate-500">{c.title}</p>
              <div className={`rounded-xl p-2.5 ${c.color}`}>
                <c.icon className="h-5 w-5" />
              </div>
            </div>
            <p className="mt-5 text-3xl font-black tracking-tight">{c.value}</p>
            <p className="mt-2 text-xs text-slate-500">
              {c.title.includes("المبيعات")
                ? "مدفوعات الإنتاج المؤكدة فقط"
                : "تتحدث عند وصول بيانات جديدة"}
            </p>
          </Card>
        ))}
      </div>
      <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-blue-200 bg-blue-50 px-5 py-4">
        <p className="text-sm leading-7 text-blue-900">
          {summary.pending} طلبات فعلية بانتظار الدفع · {summary.testPayments} عمليات تجريبية
          محفوظة. لا تُحتسب العمليات التجريبية ضمن المبيعات.
        </p>
        <button
          onClick={() => onTab("purchases")}
          className="inline-flex items-center gap-2 text-sm font-black text-blue-800"
        >
          عرض السجل
          <ChevronLeft className="h-4 w-4" />
        </button>
      </div>
      <div className="grid gap-5 md:grid-cols-3">
        {[
          {
            title: "تحديث باقاتك",
            body: "السعر والمزايا والتفعيل من مكان واحد.",
            tab: "packages" as Tab,
            icon: Package,
          },
          {
            title: "متابعة الرسائل",
            body: "نظّم الرسائل الجديدة وملاحظات فريقك.",
            tab: "messages" as Tab,
            icon: Mail,
          },
          {
            title: "متابعة العروض",
            body: "تفاصيل العميل والموعد واحتياجه.",
            tab: "requests" as Tab,
            icon: CalendarDays,
          },
        ].map((x) => (
          <button
            key={x.tab}
            onClick={() => onTab(x.tab)}
            className="rounded-2xl border border-slate-200 bg-white p-6 text-start transition-shadow hover:shadow-md"
          >
            <x.icon className="mb-5 h-6 w-6 text-blue-700" />
            <h2 className="font-black">{x.title}</h2>
            <p className="mt-2 text-sm leading-7 text-slate-500">{x.body}</p>
            <span className="mt-5 inline-flex items-center gap-2 text-xs font-bold text-blue-700">
              فتح القسم
              <ChevronLeft className="h-4 w-4" />
            </span>
          </button>
        ))}
      </div>
    </>
  );
}

function Packages() {
  const packages = useQuery(api.packages.list);
  const setActive = useMutation(api.packages.setActive);
  const [editor, setEditor] = useState<Doc<"packages"> | "new" | null>(null);
  const [error, setError] = useState("");
  const [busy, setBusy] = useState("");
  async function toggle(row: Doc<"packages">) {
    setBusy(row._id);
    setError("");
    try {
      await setActive({ id: row._id, active: !row.active });
    } catch (e) {
      setError(friendlyError(e));
    } finally {
      setBusy("");
    }
  }
  return (
    <>
      <div className="flex items-center justify-between">
        <p className="text-sm text-slate-500">{packages?.length ?? "…"} باقات مسجلة</p>
        <Button
          onClick={() => setEditor("new")}
          className="gap-2 rounded-xl bg-blue-600 text-white hover:bg-blue-700"
        >
          <Plus className="h-4 w-4" />
          إضافة باقة
        </Button>
      </div>
      {error && <ErrorText>{error}</ErrorText>}
      {!packages ? (
        <Spinner />
      ) : (
        <div className="grid gap-5 xl:grid-cols-2">
          {packages.map((p) => (
            <Card key={p._id} className="rounded-2xl border-slate-200 bg-white p-6 shadow-sm">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-xs font-bold text-blue-700">{productNames[p.product].ar}</p>
                  <h2 className="mt-2 text-xl font-black">{p.nameAr}</h2>
                  <p className="mt-1 text-xs text-slate-400" dir="ltr">
                    {p.nameEn}
                  </p>
                </div>
                <Badge color={p.active ? "green" : "slate"}>
                  {p.active ? "متاحة في الموقع" : "متوقفة"}
                </Badge>
              </div>
              <div className="my-5 flex flex-wrap items-end gap-2">
                <strong className="text-3xl font-black">{formatMoney(p.amountMinor)}</strong>
                <span className="pb-1 text-xs text-slate-500">{intervalNames[p.interval].ar}</span>
                {p.featured && <Badge color="blue">باقة مميزة</Badge>}
              </div>
              <p className="line-clamp-2 min-h-14 text-sm leading-7 text-slate-600">
                {p.descriptionAr}
              </p>
              <div className="mt-5 flex flex-wrap items-center gap-3 border-t border-slate-100 pt-5">
                <Button variant="outline" onClick={() => setEditor(p)} className="gap-2 rounded-xl">
                  <Pencil className="h-4 w-4" />
                  تعديل الباقة
                </Button>
                <button
                  onClick={() => void toggle(p)}
                  disabled={busy === p._id}
                  className="text-sm font-bold text-slate-600 hover:text-blue-700 disabled:opacity-50"
                >
                  {busy === p._id ? "جارٍ الحفظ…" : p.active ? "إيقاف مؤقت" : "تفعيل الباقة"}
                </button>
              </div>
            </Card>
          ))}
        </div>
      )}
      <Dialog open={editor !== null} onOpenChange={(open) => !open && setEditor(null)}>
        <DialogContent className="max-w-3xl">
          {editor && (
            <PackageEditor
              key={editor === "new" ? "new" : editor._id}
              row={editor === "new" ? undefined : editor}
              onDone={() => setEditor(null)}
            />
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}

function PackageEditor({ row, onDone }: { row?: Doc<"packages">; onDone: () => void }) {
  const save = useMutation(api.packages.save);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const text = (key: string) => String(form.get(key) || "");
    const input = packageInputSchema.safeParse({
      product: row?.product || text("product"),
      slug: row?.slug || text("slug"),
      nameAr: text("nameAr"),
      nameEn: text("nameEn"),
      descriptionAr: text("descriptionAr"),
      descriptionEn: text("descriptionEn"),
      featuresAr: text("featuresAr")
        .split("\n")
        .map((x) => x.trim())
        .filter(Boolean),
      featuresEn: text("featuresEn")
        .split("\n")
        .map((x) => x.trim())
        .filter(Boolean),
      amountMinor: Math.round(Number(text("price")) * 100),
      interval: text("interval"),
      active: form.get("active") === "on",
      featured: form.get("featured") === "on",
      sortOrder: Number(text("sortOrder")),
    });
    if (!input.success) {
      setError("راجع الاسم ورمز الباقة والسعر. اكتب المزايا في أسطر مستقلة.");
      return;
    }
    setBusy(true);
    setError("");
    try {
      await save({ id: row?._id, data: input.data });
      onDone();
    } catch (e) {
      setError(friendlyError(e));
    } finally {
      setBusy(false);
    }
  }
  return (
    <>
      <DialogTitle className="pe-8 text-2xl font-black">
        {row ? "تعديل الباقة" : "إضافة باقة جديدة"}
      </DialogTitle>
      <DialogDescription className="mt-2 text-sm leading-7 text-slate-500">
        تظهر التغييرات في صفحة المنتج، ويُعتمد السعر الجديد عند بدء دفع جديد.
      </DialogDescription>
      <form onSubmit={submit} className="mt-6 space-y-5">
        <fieldset disabled={busy} className="space-y-5">
          <div className="grid gap-4 sm:grid-cols-2">
            <Field title="المنتج">
              <select
                aria-label="المنتج"
                name="product"
                className={`${selectClass} w-full`}
                defaultValue={row?.product || "lms"}
                disabled={Boolean(row)}
              >
                <option value="lms">منصة الدورات التدريبية</option>
                <option value="estimator">مُقدّر التكلفة</option>
              </select>
            </Field>
            <Field title="رمز الباقة">
              <Input
                aria-label="رمز الباقة"
                name="slug"
                dir="ltr"
                defaultValue={row?.slug}
                disabled={Boolean(row)}
                required
                pattern="[a-z0-9]+(-[a-z0-9]+)*"
                maxLength={40}
                placeholder="starter-plan"
              />
            </Field>
            <Field title="الاسم بالعربية">
              <Input
                aria-label="الاسم بالعربية"
                name="nameAr"
                defaultValue={row?.nameAr}
                required
                minLength={2}
                maxLength={120}
              />
            </Field>
            <Field title="الاسم بالإنجليزية">
              <Input
                aria-label="الاسم بالإنجليزية"
                name="nameEn"
                dir="ltr"
                defaultValue={row?.nameEn}
                required
                minLength={2}
                maxLength={120}
              />
            </Field>
            <Field title="السعر الإجمالي بالريال">
              <Input
                aria-label="السعر الإجمالي بالريال"
                name="price"
                type="number"
                step="0.01"
                min={1}
                max={1000000}
                defaultValue={row ? row.amountMinor / 100 : ""}
                required
                dir="ltr"
              />
            </Field>
            <Field title="مدة الباقة">
              <select
                aria-label="مدة الباقة"
                name="interval"
                className={`${selectClass} w-full`}
                defaultValue={row?.interval || "once"}
              >
                <option value="once">دفعة واحدة</option>
                <option value="month">شهر · تجديد يدوي</option>
                <option value="year">12 شهرًا · تجديد يدوي</option>
              </select>
            </Field>
            <Field title="الوصف بالعربية">
              <Textarea
                aria-label="الوصف بالعربية"
                name="descriptionAr"
                defaultValue={row?.descriptionAr}
                maxLength={1000}
                rows={3}
              />
            </Field>
            <Field title="الوصف بالإنجليزية">
              <Textarea
                aria-label="الوصف بالإنجليزية"
                name="descriptionEn"
                dir="ltr"
                defaultValue={row?.descriptionEn}
                maxLength={1000}
                rows={3}
              />
            </Field>
            <Field title="المزايا بالعربية · ميزة في كل سطر">
              <Textarea
                aria-label="المزايا بالعربية"
                name="featuresAr"
                defaultValue={row?.featuresAr.join("\n")}
                rows={5}
              />
            </Field>
            <Field title="المزايا بالإنجليزية · ميزة في كل سطر">
              <Textarea
                aria-label="المزايا بالإنجليزية"
                name="featuresEn"
                dir="ltr"
                defaultValue={row?.featuresEn.join("\n")}
                rows={5}
              />
            </Field>
          </div>
          <div className="flex flex-wrap items-center gap-6 rounded-xl bg-slate-50 p-4">
            <label className="flex items-center gap-2 text-sm">
              <input name="active" type="checkbox" defaultChecked={row?.active ?? true} />
              متاحة للشراء
            </label>
            <label className="flex items-center gap-2 text-sm">
              <input name="featured" type="checkbox" defaultChecked={row?.featured ?? false} />
              باقة مميزة
            </label>
            <label className="flex items-center gap-2 text-sm">
              الترتيب
              <Input
                name="sortOrder"
                type="number"
                min={0}
                max={1000}
                defaultValue={row?.sortOrder ?? 0}
                required
                className="w-20"
                aria-label="ترتيب الباقة"
              />
            </label>
          </div>
          {error && <ErrorText>{error}</ErrorText>}
          <div className="flex gap-3 border-t pt-5">
            <Button
              disabled={busy}
              className="gap-2 rounded-xl bg-blue-600 text-white hover:bg-blue-700"
            >
              {busy ? <Loader2 className="h-4 w-4 animate-spin" /> : <Check className="h-4 w-4" />}
              حفظ الباقة
            </Button>
            <Button type="button" variant="outline" onClick={onDone} className="rounded-xl">
              إلغاء
            </Button>
          </div>
        </fieldset>
      </form>
    </>
  );
}
function Field({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="space-y-2">
      <p className="text-sm font-semibold text-slate-700">{title}</p>
      {children}
    </div>
  );
}

function Purchases() {
  const [mode, setMode] = useState("all");
  const [status, setStatus] = useState("");
  const [search, setSearch] = useState("");
  const query = useDeferredValue(search);
  const {
    results,
    status: loading,
    loadMore,
  } = usePaginatedQuery(
    api.admin.orders,
    {
      ...(mode !== "all" ? { mode: mode as "test" | "live" } : {}),
      ...(status ? { status: status as "pending" | "paid" | "failed" } : {}),
      ...(query.trim() ? { search: query.trim() } : {}),
    },
    { initialNumItems: 25 }
  );
  const [selected, setSelected] = useState<Doc<"orders"> | null>(null);
  return (
    <>
      <div className="flex flex-wrap gap-3">
        <SearchBox
          value={search}
          onChange={setSearch}
          placeholder="الاسم أو البريد أو مرجع العملية"
        />
        <select
          aria-label="بيئة الدفع"
          value={mode}
          onChange={(e) => setMode(e.target.value)}
          className={selectClass}
        >
          <option value="all">كل العمليات</option>
          <option value="live">مدفوعات فعلية</option>
          <option value="test">مدفوعات تجريبية</option>
        </select>
        <select
          aria-label="حالة الدفع"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className={selectClass}
        >
          <option value="">كل حالات الدفع</option>
          {Object.entries(orderStatusLabels).map(([k, v]) => (
            <option key={k} value={k}>
              {v}
            </option>
          ))}
        </select>
      </div>
      <Card className="overflow-hidden rounded-2xl border-slate-200 bg-white shadow-sm">
        {loading === "LoadingFirstPage" ? (
          <Spinner />
        ) : results.length === 0 ? (
          <Empty text="لا توجد مشتريات تطابق العرض الحالي" />
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-start text-sm">
              <thead className="bg-slate-50 text-xs text-slate-500">
                <tr>
                  {["العميل", "الباقة", "المبلغ", "الدفع", "التسليم", "التاريخ", ""].map((x, i) => (
                    <th key={i} className="whitespace-nowrap px-5 py-4 text-start font-bold">
                      {x}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {results.map((row) => (
                  <tr key={row._id} className="border-t border-slate-100 hover:bg-slate-50/60">
                    <td className="px-5 py-4">
                      <p className="font-bold">{row.customerName}</p>
                      <p className="mt-1 text-xs text-slate-400" dir="ltr">
                        {row.customerEmail}
                      </p>
                    </td>
                    <td className="px-5 py-4">
                      <p className="font-semibold">{row.packageName}</p>
                      <p className="mt-1 text-xs text-slate-500">{productNames[row.product].ar}</p>
                    </td>
                    <td className="whitespace-nowrap px-5 py-4 font-black">
                      {formatMoney(row.amountMinor)}
                    </td>
                    <td className="px-5 py-4">
                      <Badge
                        color={
                          row.status === "paid"
                            ? "green"
                            : row.status === "failed"
                              ? "red"
                              : "amber"
                        }
                      >
                        {orderStatusLabels[row.status]}
                      </Badge>
                      {row.mode === "test" && (
                        <span className="mt-1 block text-xs text-amber-700">عملية تجريبية</span>
                      )}
                    </td>
                    <td className="px-5 py-4 text-xs text-slate-500">
                      {row.mode === "test"
                        ? "لا تتطلب تسليمًا"
                        : fulfillmentLabels[row.fulfillment]}
                    </td>
                    <td className="whitespace-nowrap px-5 py-4 text-xs text-slate-500">
                      {date(row.createdAt)}
                    </td>
                    <td className="px-5 py-4">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setSelected(row)}
                        className="rounded-lg"
                      >
                        التفاصيل
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Card>
      <LoadMore status={loading} onClick={() => loadMore(25)} />
      <Dialog open={selected !== null} onOpenChange={(open) => !open && setSelected(null)}>
        <DialogContent>
          {selected && (
            <OrderDetail row={results.find((r) => r._id === selected._id) || selected} />
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}

function OrderDetail({ row }: { row: Doc<"orders"> }) {
  const update = useMutation(api.admin.updateOrder);
  const token = useAuthToken();
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [saved, setSaved] = useState(false);
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    setBusy(true);
    setError("");
    setSaved(false);
    try {
      await update({
        id: row._id,
        notes: String(data.get("notes") || ""),
        fulfillment: (data.get("fulfillment") || row.fulfillment) as Doc<"orders">["fulfillment"],
      });
      setSaved(true);
    } catch (e) {
      setError(friendlyError(e));
    } finally {
      setBusy(false);
    }
  }
  async function reconcile() {
    setBusy(true);
    setError("");
    try {
      const r = await fetch("/api/admin/orders/reconcile", {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({ orderId: row.orderId }),
      });
      if (!r.ok) throw new Error();
      setSaved(true);
    } catch {
      setError("تعذر تحديث النتيجة من تاب. تحقق من الاتصال ووضع الدفع الحالي.");
    } finally {
      setBusy(false);
    }
  }
  return (
    <>
      <DialogTitle className="text-2xl font-black">تفاصيل الشراء</DialogTitle>
      <DialogDescription className="mt-2 text-slate-500">
        {row.packageName} · {formatMoney(row.amountMinor)}
      </DialogDescription>
      <div className="mt-5 flex gap-2">
        <Badge color={row.status === "paid" ? "green" : "amber"}>
          {orderStatusLabels[row.status]}
        </Badge>
        <Badge color={row.mode === "test" ? "amber" : "blue"}>
          {row.mode === "test" ? "اختبار" : "فعلي"}
        </Badge>
      </div>
      <dl className="my-6 grid gap-4 rounded-xl bg-slate-50 p-5 text-sm sm:grid-cols-2">
        {[
          { k: "الاسم", v: row.customerName },
          { k: "البريد", v: row.customerEmail },
          { k: "الجوال", v: row.customerPhone },
          { k: "التاريخ", v: date(row.createdAt) },
          { k: "رقم الطلب", v: row.orderId },
          { k: "مرجع تاب", v: row.chargeId || "لم يصدر بعد" },
          { k: "حالة تاب", v: row.providerStatus },
          { k: "آخر تحقق", v: row.verifiedAt ? date(row.verifiedAt) : "بانتظار التحقق" },
        ].map((x) => (
          <div key={x.k}>
            <dt className="text-xs text-slate-500">{x.k}</dt>
            <dd className="mt-1 break-all font-semibold">{x.v}</dd>
          </div>
        ))}
      </dl>
      <form onSubmit={submit} className="space-y-4">
        <Field title="حالة التسليم">
          <select
            name="fulfillment"
            aria-label="حالة التسليم"
            defaultValue={row.fulfillment}
            disabled={row.mode === "test" || row.status !== "paid" || busy}
            className={`${selectClass} w-full`}
          >
            {Object.entries(fulfillmentLabels).map(([k, v]) => (
              <option key={k} value={k}>
                {v}
              </option>
            ))}
          </select>
        </Field>
        <Field title="ملاحظات داخلية">
          <Textarea
            name="notes"
            aria-label="ملاحظات الطلب"
            defaultValue={row.notes}
            maxLength={5000}
            rows={4}
          />
        </Field>
        {error && <ErrorText>{error}</ErrorText>}
        {saved && (
          <p role="status" className="text-sm text-emerald-700">
            تم تحديث الطلب.
          </p>
        )}
        <div className="flex flex-wrap gap-3">
          <Button disabled={busy} className="rounded-xl bg-blue-600 text-white hover:bg-blue-700">
            حفظ المتابعة
          </Button>
          <Button
            type="button"
            variant="outline"
            disabled={busy || !row.chargeId}
            onClick={() => void reconcile()}
            className="gap-2 rounded-xl"
          >
            <RefreshCw className={`h-4 w-4 ${busy ? "animate-spin" : ""}`} />
            التحقق من تاب
          </Button>
        </div>
      </form>
    </>
  );
}

function Inquiries({ kind }: { kind: "contact" | "demo" }) {
  const [status, setStatus] = useState("");
  const [search, setSearch] = useState("");
  const query = useDeferredValue(search);
  const [selected, setSelected] = useState<Doc<"inquiries"> | null>(null);
  const {
    results,
    status: loading,
    loadMore,
  } = usePaginatedQuery(
    api.admin.inquiries,
    {
      kind,
      ...(status ? { status: status as Doc<"inquiries">["status"] } : {}),
      ...(query.trim() ? { search: query.trim() } : {}),
    },
    { initialNumItems: 25 }
  );
  return (
    <>
      <div className="flex flex-wrap gap-3">
        <SearchBox
          value={search}
          onChange={setSearch}
          placeholder="ابحث بالاسم أو البريد أو نص الرسالة"
        />
        <select
          aria-label="حالة المتابعة"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className={selectClass}
        >
          <option value="">كل الحالات</option>
          {Object.entries(inquiryStatusLabels).map(([k, v]) => (
            <option key={k} value={k}>
              {v}
            </option>
          ))}
        </select>
      </div>
      <Card className="overflow-hidden rounded-2xl border-slate-200 bg-white shadow-sm">
        {loading === "LoadingFirstPage" ? (
          <Spinner />
        ) : results.length === 0 ? (
          <Empty
            text={
              kind === "contact"
                ? "لا توجد رسائل تطابق العرض الحالي"
                : "لا توجد طلبات عروض تطابق العرض الحالي"
            }
          />
        ) : (
          <div className="divide-y divide-slate-100">
            {results.map((row) => (
              <button
                key={row._id}
                onClick={() => setSelected(row)}
                className="flex w-full items-start gap-4 px-5 py-5 text-start transition-colors hover:bg-slate-50 sm:px-6"
              >
                <div
                  className={`hidden h-11 w-11 shrink-0 items-center justify-center rounded-xl font-bold sm:flex ${row.status === "new" ? "bg-blue-100 text-blue-800" : "bg-slate-100 text-slate-500"}`}
                >
                  {row.name.slice(0, 1)}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-3">
                    <p className="font-black">{row.name}</p>
                    {row.company && <span className="text-sm text-slate-500">{row.company}</span>}
                    <Badge
                      color={
                        row.status === "new" ? "blue" : row.status === "done" ? "green" : "slate"
                      }
                    >
                      {inquiryStatusLabels[row.status]}
                    </Badge>
                  </div>
                  <p className="mt-2 line-clamp-1 text-sm leading-7 text-slate-500">
                    {row.message || "طلب عرض توضيحي"}
                  </p>
                  <div className="mt-2 flex flex-wrap gap-3 text-xs text-slate-400">
                    <span dir="ltr">{row.email}</span>
                    <span>{date(row._creationTime)}</span>
                    {kind === "demo" && row.preferredDate && (
                      <span>الموعد: {row.preferredDate}</span>
                    )}
                  </div>
                </div>
                <ChevronLeft className="mt-2 h-4 w-4 shrink-0 text-slate-400" />
              </button>
            ))}
          </div>
        )}
      </Card>
      <LoadMore status={loading} onClick={() => loadMore(25)} />
      <Dialog open={Boolean(selected)} onOpenChange={(open) => !open && setSelected(null)}>
        <DialogContent>
          {selected && (
            <InquiryDetail row={results.find((r) => r._id === selected._id) || selected} />
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}

function InquiryDetail({ row }: { row: Doc<"inquiries"> }) {
  const update = useMutation(api.admin.updateInquiry);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [saved, setSaved] = useState(false);
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    setBusy(true);
    setError("");
    setSaved(false);
    try {
      await update({
        id: row._id,
        status: String(data.get("status")) as Doc<"inquiries">["status"],
        notes: String(data.get("notes") || ""),
      });
      setSaved(true);
    } catch (e) {
      setError(friendlyError(e));
    } finally {
      setBusy(false);
    }
  }
  return (
    <>
      <DialogTitle className="text-2xl font-black">
        {row.kind === "demo" ? "طلب عرض توضيحي" : "تفاصيل الرسالة"}
      </DialogTitle>
      <DialogDescription className="mt-2 text-slate-500">
        {row.name} · {date(row._creationTime)}
      </DialogDescription>
      <dl className="my-5 grid gap-4 rounded-xl bg-slate-50 p-5 text-sm sm:grid-cols-2">
        {[
          { k: "البريد", v: row.email },
          { k: "الجوال", v: row.phone },
          { k: "المنشأة", v: row.company },
          { k: "القطاع", v: row.industry },
          { k: "عدد الموظفين", v: row.employeeCount },
          { k: "الموعد المفضل", v: row.preferredDate },
          {
            k: "الفترة",
            v: row.preferredTime
              ? { morning: "صباحًا", afternoon: "ظهرًا", evening: "مساءً" }[row.preferredTime] ||
                row.preferredTime
              : undefined,
          },
          { k: "النظام الحالي", v: row.currentSolution },
        ]
          .filter((x) => x.v)
          .map((x) => (
            <div key={x.k}>
              <dt className="text-xs text-slate-500">{x.k}</dt>
              <dd className="mt-1 break-words font-semibold">{x.v}</dd>
            </div>
          ))}
      </dl>
      <div className="mb-5 rounded-xl border border-slate-200 p-5">
        <p className="mb-2 text-xs font-bold text-slate-500">الرسالة</p>
        <p className="whitespace-pre-wrap break-words text-sm leading-8">
          {row.message || "لم تُرفق رسالة إضافية."}
        </p>
      </div>
      <a
        href={`mailto:${encodeURIComponent(row.email)}`}
        className="mb-6 inline-flex items-center gap-2 text-sm font-bold text-blue-700"
      >
        <Mail className="h-4 w-4" />
        فتح البريد للرد على العميل
        <ArrowUpLeft className="h-4 w-4" />
      </a>
      <form onSubmit={submit} className="space-y-4">
        <Field title="حالة المتابعة">
          <select
            name="status"
            aria-label="حالة الرسالة"
            defaultValue={row.status}
            className={`${selectClass} w-full`}
          >
            {Object.entries(inquiryStatusLabels).map(([k, v]) => (
              <option key={k} value={k}>
                {v}
              </option>
            ))}
          </select>
        </Field>
        <Field title="ملاحظات داخلية">
          <Textarea
            name="notes"
            aria-label="ملاحظات المتابعة"
            defaultValue={row.notes}
            maxLength={5000}
            rows={4}
          />
        </Field>
        {error && <ErrorText>{error}</ErrorText>}
        {saved && (
          <p role="status" className="text-sm text-emerald-700">
            تم حفظ المتابعة.
          </p>
        )}
        <Button disabled={busy} className="rounded-xl bg-blue-600 text-white hover:bg-blue-700">
          {busy ? "جارٍ الحفظ…" : "حفظ المتابعة"}
        </Button>
      </form>
    </>
  );
}

function SearchBox({
  value,
  onChange,
  placeholder,
}: {
  value: string;
  onChange: (v: string) => void;
  placeholder: string;
}) {
  return (
    <div className="relative min-w-60 flex-1">
      <Search className="pointer-events-none absolute right-3 top-3 h-4 w-4 text-slate-400" />
      <Input
        aria-label="البحث"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        maxLength={120}
        placeholder={placeholder}
        className="h-10 rounded-xl border-slate-300 bg-white pr-10"
      />
    </div>
  );
}
function LoadMore({ status, onClick }: { status: string; onClick: () => void }) {
  if (status === "Exhausted" || status === "LoadingFirstPage") return null;
  return (
    <div className="text-center">
      <Button
        variant="outline"
        disabled={status === "LoadingMore"}
        onClick={onClick}
        className="rounded-xl"
      >
        {status === "LoadingMore" ? "جارٍ التحميل…" : "عرض المزيد"}
      </Button>
    </div>
  );
}
