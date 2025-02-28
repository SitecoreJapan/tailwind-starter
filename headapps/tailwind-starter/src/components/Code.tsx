import { useEffect, useState } from 'react';
import { codeToHtml } from 'shiki';
import { Clipboard } from 'lucide-react';
import { ComponentParams, ComponentRendering, Field } from '@sitecore-jss/sitecore-jss-nextjs';

interface Fields {
  Code: Field<string>;
  Filename: Field<string>;
}
interface CodeBlockProps {
  rendering: ComponentRendering & { params: ComponentParams };
  params: ComponentParams;
  fields: Fields;
}

export const Default = (props: CodeBlockProps): JSX.Element => {
  const id = props.params.RenderingIdentifier;
  const [html, setHtml] = useState<string>('');
  const [code, setCode] = useState<string>('');
  const [tooltipVisible, setTooltipVisible] = useState<boolean>(false);

  const styles = props.params.styles;

  let lang = 'html';
  if (styles) {
    const classes = styles.split(' ');
    const langClass = classes.find((cls) => cls.startsWith('lang-'));
    if (langClass) {
      lang = langClass.substring(5);
    }
  }

  const filename = props.fields.Filename.value || 'Sample';

  useEffect(() => {
    const code = props.fields.Code.value;

    setCode(code);

    codeToHtml(code, {
      lang: lang,
      theme: 'github-dark',
      meta: { filePath: filename },
    }).then((result) => {
      setHtml(result);
    });
  }, [props.fields.Code.value, lang, filename]);

  const handleCopyToClipboard = () => {
    navigator.clipboard.writeText(code).then(() => {
      setTooltipVisible(true);
      setTimeout(() => {
        setTooltipVisible(false);
      }, 1000);
    });
  };

  return (
    <div className={`component code ${props.params.styles}`} id={id ? id : undefined}>
      <div className="component-content">
        <div className="relative">
          <button
            onClick={handleCopyToClipboard}
            className="absolute top-4 right-4 bg-gray-800 text-white p-2 rounded z-10"
          >
            <Clipboard />
          </button>
          {tooltipVisible && (
            <div className="absolute top-4 z-20 right-14 bg-white p-1 rounded">Copied!</div>
          )}
          <div className="p-4 rounded-md" dangerouslySetInnerHTML={{ __html: html }} />
        </div>
        {/* <Text className="m-4 p-2 border-spacing-2" field={props.fields.Code} tag="p" /> */}
      </div>
    </div>
  );
};
