import { notFound } from "next/navigation";

// Unknown paths under a locale render app/[locale]/not-found.tsx (with navbar and
// the correct lang) instead of falling through to the bare root not-found page.
export default function CatchAllPage() {
  notFound();
}
