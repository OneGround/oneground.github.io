import { themes as prismThemes } from "prism-react-renderer";
import type { Config } from "@docusaurus/types";
import type * as Preset from "@docusaurus/preset-classic";
import type * as PluginContentBlog from "@docusaurus/plugin-content-blog";

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

const config: Config = {
    title: "OneGround - ZGW API Documentation & Developer Portal",
    tagline: "Production-ready ZGW APIs for Dutch government applications",
    favicon: "img/favicon.png",
    url: "https://dev.oneground.nl",
    baseUrl: "/",
    organizationName: "OneGround",
    projectName: "DevPortal",
    onBrokenLinks: "throw",
    trailingSlash: false,
    i18n: {
        defaultLocale: "en",
        locales: ["en"]
    },

    markdown: {
        hooks: {
            onBrokenMarkdownLinks: "warn",
            onBrokenMarkdownImages: "throw"
        }
    },

    presets: [
        [
            "classic",
            {
                docs: {
                    sidebarPath: "./sidebars.ts",
                    editUrl: "https://github.com/OneGround/oneground.github.io/tree/main/",
                    showLastUpdateTime: true,
                    showLastUpdateAuthor: true
                },
                blog: {
                    showReadingTime: true,
                    blogTitle: "OneGround ZGW API Blog - Insights & Best Practices",
                    blogDescription:
                        "Latest insights, best practices, and technical articles about ZGW API implementation, Dutch case management, and OneGround platform updates.",
                    feedOptions: {
                        type: ["rss", "atom"],
                        xslt: true,
                        title: "OneGround ZGW API Blog",
                        description: "Latest insights and best practices for ZGW API implementation and Dutch case management"
                    },
                    onInlineTags: "warn",
                    onInlineAuthors: "warn",
                    onUntruncatedBlogPosts: "warn"
                },
                theme: {
                    customCss: "./src/css/custom.css"
                }
            } satisfies Preset.Options
        ]
    ],
    themeConfig: {
        metadata: [
            {
                name: "description",
                content:
                    "OneGround ZGW API documentation - Complete implementation of Dutch case management APIs (Zaakgericht Werken). Access developer guides, API references, integration examples, and best practices for ZRC, DRC, ZTC, BRC, NRC, and AC components."
            },
            {
                name: "keywords",
                content:
                    "ZGW API, Zaakgericht Werken, Dutch case management, ZRC, DRC, ZTC, BRC, NRC, AC, OneGround, API documentation, VNG standards, government APIs, case registration, document management, type catalog, decision registration, notification center, authorization component"
            },
            {
                property: "og:title",
                content: "OneGround - ZGW API Documentation & Developer Portal"
            },
            {
                property: "og:description",
                content:
                    "Complete ZGW API implementation for Dutch case management (Zaakgericht Werken). Developer documentation, guides, and integration resources for all ZGW components."
            },
            {
                property: "og:type",
                content: "website"
            },
            {
                property: "og:site_name",
                content: "OneGround Developer Portal"
            },
            {
                name: "twitter:card",
                content: "summary_large_image"
            },
            {
                name: "twitter:title",
                content: "OneGround - ZGW API Documentation & Developer Portal"
            },
            {
                name: "twitter:description",
                content:
                    "Complete ZGW API implementation for Dutch case management (Zaakgericht Werken). Developer documentation, guides, and integration resources."
            }
        ],
        colorMode: {
            defaultMode: "light",
            disableSwitch: true
        },

        navbar: {
            logo: {
                alt: "OneGround logo",
                src: "img/logo.svg"
            },
            items: [
                {
                    type: "docSidebar",
                    sidebarId: "docs",
                    position: "left",
                    label: "Docs"
                },
                {
                    to: "/changelog",
                    position: "left",
                    label: "Changelog"
                },
                {
                    to: "/blog",
                    label: "Blog",
                    position: "left"
                },
                {
                    href: "https://github.com/OneGround/ZGW-APIs",
                    position: "right",
                    className: "header-github-link",
                    "aria-label": "GitHub repository"
                },
                {
                    href: "https://oneground.nl",
                    label: "OneGround.nl",
                    position: "right"
                }
            ]
        },
        footer: {
            style: "dark",
            logo: {
                alt: "Roxit Logo",
                src: "img/roxit_logo.svg",
                href: "https://roxit.nl",
                target: "_blank",
                width: 100,
                height: 27
            },
            links: [
                {
                    title: "Navigation",
                    items: [
                        {
                            label: "Docs",
                            to: "/docs/about-oneground"
                        },
                        {
                            label: "Changelog",
                            to: "/changelog"
                        },
                        {
                            label: "Blog",
                            to: "/blog"
                        }
                    ]
                },
                {
                    title: "Social",
                    items: [
                        {
                            label: "GitHub",
                            href: "https://github.com/OneGround"
                        },
                        {
                            label: "Linkedin",
                            href: "https://www.linkedin.com/showcase/one-ground/"
                        },
                        {
                            label: "Youtube",
                            href: "https://www.youtube.com/@vismaroxit"
                        }
                    ]
                },
                {
                    title: "Privacy",
                    items: [
                        {
                            label: "Cookie Statement",
                            to: "https://oneground.nl/cookiestatement"
                        },
                        {
                            label: "Privacy Statement",
                            to: "https://oneground.nl/privacyverklaring"
                        },
                        {
                            label: "Whistleblowing",
                            to: "https://www.visma.com/whistleblowing"
                        }
                    ]
                }
            ],
            copyright: `Copyright © ${new Date().getFullYear()}`
        },

        prism: {
            theme: prismThemes.github,
            darkTheme: prismThemes.dracula
        }
    } satisfies Preset.ThemeConfig,

    plugins: [
        [
            "@docusaurus/plugin-content-blog",
            {
                id: "changelog",
                routeBasePath: "changelog",
                path: "./changelog",
                blogTitle: "OneGround ZGW API Changelog - Release Notes & Updates",
                blogDescription:
                    "Complete changelog and release notes for OneGround ZGW API components including ZRC, DRC, ZTC, BRC, NRC, and AC updates, bug fixes, and new features.",
                blogSidebarTitle: "Recent releases",
                showReadingTime: false,
                tags: false,
                onUntruncatedBlogPosts: "ignore",
                feedOptions: {
                    type: "all",
                    title: "OneGround ZGW API Changelog",
                    description: "Latest releases and updates for OneGround ZGW API platform"
                }
            } satisfies PluginContentBlog.Options
        ],
        [
            "@docusaurus/plugin-client-redirects",
            {
                // Redirects for the old website
                redirects: [
                    {
                        from: "/docs",
                        to: "/docs/about-oneground"
                    },
                    {
                        from: "/About",
                        to: "/"
                    },
                    {
                        from: ["/About/CHANGELOG.html", "/About/CHANGELOG"],
                        to: "/changelog"
                    },
                    {
                        from: ["/About/ApiVersions.html", "/About/ApiVersions", "/docs/api-versions"],
                        to: "/docs/general/api-versions"
                    },
                    {
                        from: ["/About/ClientID.html", "/About/ClientID", "/docs/usage-of-clientids"],
                        to: "/docs/general/authentication"
                    },
                    {
                        from: ["/About/Authorisation.html", "/About/Authorisation", "/docs/authorizations"],
                        to: "/docs/authorization/introduction"
                    },
                    {
                        from: ["/About/VersionHeader.html", "/About/VersionHeader", "/docs/version-header"],
                        to: "/docs/general/version-header"
                    },
                    {
                        from: [
                            "/About/exampledocumentupload.html",
                            "/About/exampledocumentupload",
                            "/About/example-document-upload/examplepm.json",
                            "/docs/example-document-upload"
                        ],
                        to: "/docs/documents/example-document-upload"
                    },
                    {
                        from: [
                            "/About/ztc1_3problemsandsolutions.html",
                            "/About/ztc1_3problemsandsolutions",
                            "/docs/ztc1_3problemsandsolutions"
                        ],
                        to: "/docs/catalogs/ztc1_3problemsandsolutions"
                    },
                    {
                        from: [
                            "/About/Articles/20241203_Best-Practices-for-JWT-Usage-in-APIs",
                            "/About/Articles/20241203_Best-Practices-for-JWT-Usage-in-APIs.html"
                        ],
                        to: "/blog/best-practices-for-jwt-usage-in-apis"
                    },
                    {
                        from: ["/docs/gebruik-van-subscriptions-in-autorisaties"],
                        to: "/docs/notifications/notification-subscription-usage-guide"
                    }
                ]
            }
        ]
    ]
};

export default config;
