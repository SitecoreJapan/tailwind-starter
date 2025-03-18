export interface Ancestor {
  field: {
    value: string;
  };
  url: {
    path: string;
  };
}

export interface Fields {
  data: {
    item: {
      ancestors: Ancestor[];
    };
  };
}

const templateIDs = 'A25F725D-9FF0-4EBB-9CE4-7AD92CFDBCB9';
//   'A25F725D-9FF0-4EBB-9CE4-7AD92CFDBCB9',
//   'F5D9AE9C-A8A8-452F-9653-680ADB855B65',
//   '2A8C794E-16C9-467C-AF43-6B8F93A3F8ED',
// ];

export const BreadcrumbsQuery = (contextItem: string | undefined, language: string | undefined) => {
  return `
fragment breadcrumbFields on Item {
    field(name: "NavigationTitle") {
        ... on TextField {
            value
        }
    }
    url {
        path
    }
}
query BreadcrumbQuery {
    item(path: "${contextItem}", language: "${language}") {
        ancestors(
            hasLayout: true
            includeTemplateIDs: "${templateIDs}"
        ) {
            ...breadcrumbFields
        }
    }
}
`;
};
