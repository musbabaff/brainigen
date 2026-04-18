"use client";

import { useLocale } from "next-intl";
import { useRouter, usePathname } from "@/i18n/navigation";
import { locales } from "@/i18n/routing";
import { Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const localeLabels: Record<string, string> = {
  en: "English",
  tr: "Türkçe",
  az: "Azərbaycan",
  ru: "Русский",
  de: "Deutsch",
  fr: "Français",
  es: "Español",
  ar: "العربية",
};

const localeFlags: Record<string, string> = {
  en: "🇬🇧",
  tr: "🇹🇷",
  az: "🇦🇿",
  ru: "🇷🇺",
  de: "🇩🇪",
  fr: "🇫🇷",
  es: "🇪🇸",
  ar: "🇸🇦",
};

export function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  function onSelectLocale(newLocale: string) {
    router.replace(pathname, { locale: newLocale });
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={<Button variant="ghost" size="icon" className="h-9 w-9 cursor-pointer" id="language-switcher" />}
      >
        <Globe className="h-4 w-4" />
        <span className="sr-only">Change language</span>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="min-w-[160px]">
        {locales.map((loc) => (
          <DropdownMenuItem
            key={loc}
            onClick={() => onSelectLocale(loc)}
            className={`cursor-pointer ${locale === loc ? "bg-accent" : ""}`}
          >
            <span className="mr-2">{localeFlags[loc]}</span>
            {localeLabels[loc]}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
