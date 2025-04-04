import React from 'react';
import { ComponentParams, ComponentRendering } from '@sitecore-jss/sitecore-jss-nextjs';

interface HTMLBlockProps {
  rendering: ComponentRendering & { params: ComponentParams };
  params: ComponentParams;
}

export const Default = (props: HTMLBlockProps): JSX.Element => {
  const id = props.params.RenderingIdentifier;

  return (
    <div className={`component htmlblock ${props.params.styles}`} id={id ? id : undefined}>
      <div className="component-content">
        <p>HTMLBlock Component</p>
      </div>
    </div>
  );
};
