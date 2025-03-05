import React, { useCallback, useMemo, useState } from 'react';
import {
  ComponentParams,
  ComponentRendering,
  useSitecoreContext,
} from '@sitecore-jss/sitecore-jss-nextjs';
import { useRouter } from 'next/router';
import { Globe, ChevronUp, ChevronDown } from 'lucide-react';

interface LanguageSelectorProps {
  rendering: ComponentRendering & { params: ComponentParams };
  params: ComponentParams;
}

export const Default = (props: LanguageSelectorProps): JSX.Element => {
  const id = props.params.RenderingIdentifier;
  const { sitecoreContext } = useSitecoreContext();

  const router = useRouter();
  const { pathname, asPath, query } = router;

  const availableLanguages = useMemo(
    () => [
      { language: 'en', locale: 'en', label: 'English' },
      { language: 'ja', locale: 'ja-JP', label: '日本語' },
    ],
    []
  );

  const [showLanguageDropdown, setShowLanguageDropdown] = useState(false);

  const changeLanguage = useCallback(
    (langCode: string) => {
      if (pathname && asPath && query) {
        router.push(
          {
            pathname,
            query,
          },
          asPath,
          {
            locale: langCode,
            shallow: false,
          }
        );
      }
    },
    [asPath, pathname, query, router]
  );

  return (
    <div
      className={`component ${props.params.styles}`}
      id={id ? id : undefined}
      onClick={() => setShowLanguageDropdown(!showLanguageDropdown)}
    >
      <div className="component-content language-selector flex items-center relative whitespace-nowrap">
        <Globe className="mr-2" />
        <span className="selected-language">
          {availableLanguages.find((lang) => lang.locale === sitecoreContext.language)?.label}
        </span>
        {showLanguageDropdown ? <ChevronUp className="ml-2" /> : <ChevronDown className="ml-2" />}
        {showLanguageDropdown && (
          <div className="language-dropdown z-10 absolute top-full py-2 px-4 border bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-500">
            {availableLanguages.map((lang) => (
              <span
                key={lang.locale}
                onClick={() => changeLanguage(lang.locale)}
                className="language-list block cursor-pointer mb-2"
              >
                {lang.label}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
