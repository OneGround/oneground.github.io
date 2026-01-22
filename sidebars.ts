import type { SidebarsConfig } from "@docusaurus/plugin-content-docs";

const sidebars: SidebarsConfig = {
    docs: [
        {
            type: "doc",
            id: "about-oneground",
            label: "About OneGround"
        },
        {
            type: "category",
            label: "General",
            collapsed: false,
            items: [
                {
                    type: "doc",
                    id: "general/authentication",
                    label: "Authentication"
                },
                {
                    type: "doc",
                    id: "general/api-versions",
                    label: "Supported API Versions"
                },
                {
                    type: "doc",
                    id: "general/version-header",
                    label: "Version Headers"
                }
            ]
        },
        {
            type: "category",
            label: "Authorization (AC)",
            link: {
                type: "doc",
                id: "authorization/ac-introduction"
            },
            items: [
                {
                    type: "doc",
                    id: "authorization/ac-configuration",
                    label: "Configuration & Tooling"
                }
            ]
        },
        {
            type: "category",
            label: "Catalogs (ZTC)",
            link: {
                type: "doc",
                id: "catalogs/ztc-introduction"
            },
            items: [
                {
                    type: "doc",
                    id: "catalogs/ztc1_3problemsandsolutions",
                    label: "ZTC 1.3 Compliance"
                }
            ]
        },
        {
            type: "category",
            label: "Notifications (NRC)",
            link: {
                type: "doc",
                id: "notifications/nrc-introduction"
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
        {
            type: "category",
            label: "Documents (DRC)",
            link: {
                type: "doc",
                id: "documents/drc-introduction"
            },
            items: [
                {
                    type: "doc",
                    id: "documents/example-document-upload",
                    label: "Document Upload Guide"
                }
            ]
        }
    ]
};

export default sidebars;
