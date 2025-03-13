import React from 'react';
import { Field, ComponentParams, ComponentRendering } from '@sitecore-jss/sitecore-jss-nextjs';
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface Fields {
  Markdown: Field<string>;
}

interface MarkdownProps {
  rendering: ComponentRendering & { params: ComponentParams };
  params: ComponentParams;
  fields: Fields;
}

export const Default = (props: MarkdownProps): JSX.Element => {
  const id = props.params.RenderingIdentifier;

  const markdown = props.fields.Markdown.value;

  return (
    <div className={`component markdown ${props.params.styles}`} id={id ? id : undefined}>
      <div className="component-content">
        <Markdown remarkPlugins={[remarkGfm]}>{markdown}</Markdown>
      </div>
    </div>
  );
};
