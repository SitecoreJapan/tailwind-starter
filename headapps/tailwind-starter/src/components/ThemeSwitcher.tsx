import { ComponentParams, ComponentRendering } from '@sitecore-jss/sitecore-jss-nextjs';
import { useTheme } from 'next-themes';
import { Moon, Sun } from 'lucide-react';
import { useEffect, useState } from 'react';

interface ComponentProps {
  rendering: ComponentRendering & { params: ComponentParams };
  params: ComponentParams;
}

export const Default = (props: ComponentProps): JSX.Element => {
  const styles = `${props.params.GridParameters ?? ''} ${props.params.Styles ?? ''}`.trimEnd();

  const { theme, setTheme } = useTheme();

  return (
    <div className={`component theme-switcher ${styles}`}>
      <div className="component-content">
        <button onClick={() => setTheme('light')} disabled={theme === 'light'}>
          Light
        </button>
        <span> - </span>
        <button onClick={() => setTheme('dark')} disabled={theme === 'dark'}>
          Dark
        </button>
        <span> - </span>
        <button onClick={() => setTheme('system')} disabled={theme === 'system'}>
          System
        </button>
      </div>
    </div>
  );
};

export const WithButton = (props: ComponentProps): JSX.Element => {
  const styles = `${props.params.GridParameters ?? ''} ${props.params.Styles ?? ''}`.trimEnd();

  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return <></>;

  return (
    <div className={`component theme-switcher ${styles}`}>
      <div className="component-content">
        {theme === 'dark' && (
          <button onClick={() => setTheme('light')}>
            <Sun className="w-6 h-6" />
          </button>
        )}
        {theme === 'light' && (
          <button onClick={() => setTheme('dark')}>
            <Moon className="w-6 h-6" />
          </button>
        )}
        {theme === 'system' && (
          <button onClick={() => setTheme('dark')}>
            <Moon className="w-6 h-6" />
          </button>
        )}
      </div>
    </div>
  );
};
