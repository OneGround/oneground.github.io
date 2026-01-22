import type { SidebarsConfig } from "@docusaurus/plugin-content-docs";

const sidebars: SidebarsConfig = {
    docs: [
        "about-oneground",
        "api-versions",
        "usage-of-clientids",
        "authorizations",
        {
            type: "category",
            label: "Notifications",
            link: {
                type: 'doc',
                id: 'notifications/nrc-introduction'
            },
            items: [
                {
                    type: "doc",
                    id: "notifications/nrc-subscriptions-use",
                    label: "Usage Guide"
                },
                {
                    type: "doc",
                    id: "notifications/nrc-db-subscriptions",
                    label: "Data Models"
                },
                {
                    type: "doc",
                    id: "notifications/nrc-retry-architecture",
                    label: "Retries & Reliability"
                }
            ]
        },
        "version-header",
        "example-document-upload/example-document-upload",
        "ztc1_3problemsandsolutions"
    ]
};

export default sidebars;
