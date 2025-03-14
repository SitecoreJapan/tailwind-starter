import React from 'react';
import {
  Link as JssLink,
  Text,
  LinkField,
  useSitecoreContext,
  SitecoreContextValue,
  GetStaticComponentProps,
} from '@sitecore-jss/sitecore-jss-nextjs';
import { Fields, ResultsFieldLink, TitleQuery } from '../interfaces/LinkList';
import graphqlClientFactory from 'lib/graphql-client-factory';

type LinkListProps = {
  params: { [key: string]: string };
  fields: Fields;
  results: Fields;
};

type LinkListItemProps = {
  key: string;
  index: number;
  total: number;
  field: LinkField;
  locale: string;
};

const LinkListItem = (props: LinkListItemProps) => {
  let className = `item${props.index}`;
  className += (props.index + 1) % 2 == 0 ? ' even' : ' odd';
  if (props.index == 0) {
    className += ' first';
  }
  if (props.index + 1 == props.total) {
    className += ' last';
  }

  return (
    <li className={className}>
      <div className="field-link">
        <JssLink field={props.field} href={`${props.locale}${props.field.value.href}`} />
      </div>
    </li>
  );
};

const getLocale = function (props: SitecoreContextValue): string {
  let locale;

  if (!props.language || props.language === `en`) {
    locale = '';
  } else {
    locale = '/' + props.language;
  }

  return locale;
};

export const Default = (props: LinkListProps): JSX.Element => {
  const { sitecoreContext } = useSitecoreContext();

  const contentLocale = getLocale(sitecoreContext);

  console.log(props.fields);
  console.log(props.results);

  const datasource = props.fields?.data?.datasource;
  const styles = `component link-list ${props?.params?.styles}`.trimEnd();
  const id = props.params.RenderingIdentifier;

  if (datasource) {
    const list = datasource.children.results
      .filter((element: ResultsFieldLink) => element?.field?.link)
      .map((element: ResultsFieldLink, key: number) => (
        <LinkListItem
          index={key}
          key={`${key}${element.field.link}`}
          total={datasource.children.results.length}
          field={element.field.link}
          locale={contentLocale}
        />
      ));

    return (
      <div className={styles} id={id ? id : undefined}>
        <div className="component-content">
          <Text tag="h3" field={datasource?.field?.title} />
          <ul>{list}</ul>
        </div>
      </div>
    );
  }

  return (
    <div className={styles} id={id ? id : undefined}>
      <div className="component-content">
        <h3>Link List</h3>
      </div>
    </div>
  );
};

export const getStaticProps: GetStaticComponentProps = async (rendering, layoutData) => {
  const graphQLClient = graphqlClientFactory();
  const query = TitleQuery(rendering.dataSource, layoutData?.sitecore?.context?.language);
  const results = await graphQLClient.request<Fields>(query);

  return {
    results,
  };
};
