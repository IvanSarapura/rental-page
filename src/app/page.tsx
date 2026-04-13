import { redirect } from "next/navigation";
import { routing } from "@/i18n/routing";

/**
 * Root route — redirects to the default locale.
 * The next-intl middleware handles locale routing, but this
 * ensures a clean fallback even if middleware is bypassed.
 */
export default function RootPage() {
  redirect(`/${routing.defaultLocale}`);
}
