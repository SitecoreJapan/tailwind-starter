import React from 'react';
import { useSitecoreContext } from '@sitecore-jss/sitecore-jss-nextjs';

interface Ancestor {
  field: {
    value: string;
  };
  url: {
    path: string;
  };
}

interface Fields {
  data: {
    item: {
      ancestors: Ancestor[];
    };
  };
}

interface BreadcrumbProps {
  params: { [key: string]: string };
  fields: Fields;
}

export const Default = (props: BreadcrumbProps): JSX.Element => {
  const id = props.params.RenderingIdentifier;
  const data = props.fields?.data;

  const { sitecoreContext } = useSitecoreContext();
  const locale = sitecoreContext.language || process.env.DEFAULT_LANGUAGE || 'en';

  if (data.item.ancestors.length > 0) {
    return (
      <>
        <div className={`content breadcrumb ${props.params.styles}`} id={id ? id : undefined}>
          <div className="component-content">
            {generateBreadcrumbList(data.item.ancestors, locale)}
          </div>
        </div>
      </>
    );
  }

  return (
    <div className="content breadcrumb" id={id ? id : undefined}>
      <div className="component-content">
        <div>Breadcrumb</div>
      </div>
    </div>
  );
};

function generateBreadcrumbList(ancestors: Ancestor[], locale: string): JSX.Element {
  // Reverse the ancestors array
  const reversedAncestors = ancestors.reverse();

  // check locale and create base Url
  const baseUrl = locale === 'en' ? '' : `/${locale}`;

  const ancestorListItems = reversedAncestors.map((ancestor: Ancestor, index: number) => {
    return (
      <li key={index}>
        <a href={baseUrl + ancestor.url.path}>{ancestor.field.value}</a>
      </li>
    );
  });

  // Wrap the list items with ul tags and return the JSX element
  return <ul className="flex space-x-2">{ancestorListItems}</ul>;
}
