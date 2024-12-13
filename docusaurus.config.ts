import { themes as prismThemes } from "prism-react-renderer";
import type { Config } from "@docusaurus/types";
import type * as Preset from "@docusaurus/preset-classic";

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

const config: Config = {
    title: "OneGround",
    tagline: "ZGW registrations and Api's",
    favicon: "img/favicon.png",
    url: "https://oneground.github.io",
    baseUrl: "/",
    organizationName: "OneGround",
    projectName: "DevPortal",
    onBrokenLinks: "throw",
    onBrokenMarkdownLinks: "warn",
    i18n: {
        defaultLocale: "en",
        locales: ["en"]
    },

    presets: [
        [
            "classic",
            {
                docs: {
                    sidebarPath: "./sidebars.ts"
                },
                blog: {
                    showReadingTime: true,
                    feedOptions: {
                        type: ["rss", "atom"],
                        xslt: true
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
                            href: "https://www.linkedin.com/company/roxit/"
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
                blogTitle: "Changelog",
                blogDescription: "Changelog for OneGround",
                blogSidebarTitle: "Recent releases",
                showReadingTime: false,
                tags: false,
                onUntruncatedBlogPosts: "ignore",
                feedOptions: {
                    type: "all"
                }
            }
        ]
    ]
};

export default config;
