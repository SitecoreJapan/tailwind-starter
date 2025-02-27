import React from 'react';
import {
  ComponentParams,
  ComponentRendering,
  Text,
  Field,
} from '@sitecore-jss/sitecore-jss-nextjs';

interface Fields {
  Code: Field<string>;
}
interface CodeBlockProps {
  rendering: ComponentRendering & { params: ComponentParams };
  params: ComponentParams;
  fields: Fields;
}

export const Default = (props: CodeBlockProps): JSX.Element => {
  const id = props.params.RenderingIdentifier;

  return (
    <div className={`component codeblock ${props.params.styles}`} id={id ? id : undefined}>
      <div className="component-content">
        Code
        <Text className="m-4 p-2 border-spacing-2" field={props.fields.Code} tag="p" />
      </div>
    </div>
  );
};
