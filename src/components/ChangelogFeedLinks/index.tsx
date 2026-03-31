import React, { type ReactNode } from "react";
import Link from "@docusaurus/Link";
import styles from "./styles.module.css";

const RSS_ATOM_PATH =
    "M6.503 20.752c0 1.794-1.456 3.248-3.251 3.248-1.796 0-3.252-1.454-3.252-3.248 0-1.794 1.456-3.248 3.252-3.248 1.795.001 3.251 1.454 3.251 3.248zm-6.503-12.572v4.811c6.05.062 10.96 4.966 11.022 11.009h4.817c-.062-8.71-7.118-15.758-15.839-15.82zm0-3.368c10.58.046 19.152 8.594 19.183 19.188h4.817c-.03-13.231-10.755-23.954-24-24v4.812z";

const JSON_PATH = "M9.4 16.6L4.8 12l4.6-4.6L8 6l-6 6 6 6 1.4-1.4zm5.2 0l4.6-4.6-4.6-4.6L16 6l6 6-6 6-1.4-1.4z";

function FeedIcon({ color, path }: { color: string; path: string }): ReactNode {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width="16"
            height="16"
            style={{ fill: color, flexShrink: 0 }}
            aria-hidden="true"
        >
            <path d={path} />
        </svg>
    );
}

export default function ChangelogFeedLinks(): ReactNode {
    return (
        <div className={styles.feedContainer}>
            <Link
                href="pathname:///changelog/rss.xml"
                className={styles.feedLink}
                style={{ "--feed-accent": "#f26522" } as React.CSSProperties}
            >
                <FeedIcon color="#f26522" path={RSS_ATOM_PATH} />
                <span>RSS</span>
            </Link>
            <Link
                href="pathname:///changelog/atom.xml"
                className={styles.feedLink}
                style={{ "--feed-accent": "#4caf50" } as React.CSSProperties}
            >
                <FeedIcon color="#4caf50" path={RSS_ATOM_PATH} />
                <span>Atom</span>
            </Link>
            <Link
                href="pathname:///changelog/feed.json"
                className={styles.feedLink}
                style={{ "--feed-accent": "#2196f3" } as React.CSSProperties}
            >
                <FeedIcon color="#2196f3" path={JSON_PATH} />
                <span>JSON</span>
            </Link>
        </div>
    );
}
