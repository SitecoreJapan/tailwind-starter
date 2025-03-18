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
  // const isPageEditing = sitecoreContext.pageEditing;

  const locale = sitecoreContext.language || process.env.DEFAULT_LANGUAGE || 'en';

  if (data.item.ancestors.length > 0) {
    const sortedBreadcrumbs = data.item.ancestors.sort(
      (a, b) => a.url.path.length - b.url.path.length
    );

    return (
      <>
        <div className={`component breadcrumb ${props.params.styles}`} id={id ? id : undefined}>
          <div className="component-content">
            {generateBreadcrumbList(sortedBreadcrumbs, locale)}
          </div>
        </div>
      </>
    );
  }

  return (
    <div className="component breadcrumb" id={id ? id : undefined}>
      <div className="component-content">
        <div>Breadcrumb</div>
      </div>
    </div>
  );
};

function generateBreadcrumbList(ancestors: Ancestor[], locale: string): JSX.Element {
  const baseUrl = locale === 'en' ? '' : `/${locale}`;

  const ancestorListItems = ancestors.map((ancestor: Ancestor, index: number) => {
    return (
      <li key={index}>
        <a href={baseUrl + ancestor.url.path}>{ancestor.field.value}</a>
      </li>
    );
  });

  return <ul className="flex space-x-2">{ancestorListItems}</ul>;
}
