import type { SidebarsConfig } from "@docusaurus/plugin-content-docs";

const sidebars: SidebarsConfig = {
    docs: [
        "about-oneground",
        "api-versions",
        "usage-of-clientids",
        "authorizations",
        {
            type: "doc",
            id: "gebruik-van-subscriptions-in-autorisaties",
            label: "Use of Subscriptions for Notifications"
        },
        "version-header",
        "example-document-upload/example-document-upload",
        "ztc1_3problemsandsolutions"
        // {
        //   type: 'category',
        //   label: 'Category',
        //   items: ['usage-of-clientids'],
        // },
    ]
};

export default sidebars;
