import { LinkField, TextField } from '@sitecore-jss/sitecore-jss-nextjs';

export interface Fields {
  data: {
    datasource: {
      children: {
        results: ResultsFieldLink[];
      };
      field: {
        title: TextField;
      };
    };
  };
}

export type ResultsFieldLink = {
  field: {
    link: LinkField;
  };
};

export const TitleQuery = (datasource: string | undefined, language: string | undefined) => {
  return `
query TitleQuery {
  datasource: item(path: "${datasource}", language: "${language}") {
    field(name: "Title") {
      title: jsonValue
    }
      children {
            results {
                field(name: "Link") {
                    link: jsonValue
                }
            }
        }
  }
}
`;
};
