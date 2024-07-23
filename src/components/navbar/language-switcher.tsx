'use client';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { usePathname, useRouter } from '@/lib/i18n';
import {
  AvailableLanguageTag,
  availableLanguageTags,
  languageTag,
} from '@/paraglide/runtime';

const LanguageLabel: Record<AvailableLanguageTag, string> = {
  en: 'English',
  vn: 'Vietnamese',
};

export const LanguageSwitcher = () => {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="secondary"
          size="icon"
          className="border-foreground bg-background size-12 rounded-full border-[3px]"
        >
          {languageTag().toUpperCase()}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent side="left" align="center" className="mr-2">
        {availableLanguageTags.map((locale) => (
          <DropdownMenuItem
            key={locale}
            onClick={() => {
              router.push(pathname, { locale });
            }}
          >
            {LanguageLabel[locale]}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
