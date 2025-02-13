import React from 'react';
import {
  Field,
  Text,
  ComponentParams,
  ComponentRendering,
  useSitecoreContext,
} from '@sitecore-jss/sitecore-jss-nextjs';
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

  const { sitecoreContext } = useSitecoreContext();
  const isEditing = sitecoreContext.pageState === 'edit';

  const markdown = props.fields.Markdown.value;

  const checkEdit = props.params.Edit ? true : false;
  // console.log(checkEdit);

  return (
    <div className={`component markdown ${props.params.styles}`} id={id ? id : undefined}>
      <div className="component-content">
        {!checkEdit && (
          <>
            <Markdown remarkPlugins={[remarkGfm]}>{markdown}</Markdown>
          </>
        )}
        {isEditing && checkEdit && (
          <>
            <div className="flex flex-col md:flex-row basis-full">
              <div className="bg-gray-300 basis-1/2 md:w-1/2">
                <p className="font-bold mx-3">HTML Preview</p>
                <Markdown remarkPlugins={[remarkGfm]}>{markdown}</Markdown>
              </div>
              <div className="bg-gray-800 text-gray-300 basis-1/2 md:w-1/2">
                <p className="font-bold mx-3">Markdown Editor</p>
                <Text className="m-4 p-2 border-spacing-2" field={props.fields.Markdown} tag="p" />
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
