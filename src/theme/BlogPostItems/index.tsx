import React, { type ReactNode } from "react";
import { useLocation } from "@docusaurus/router";
import BlogPostItems from "@theme-original/BlogPostItems";
import type { Props } from "@theme/BlogPostItems";
import ChangelogFeedLinks from "@site/src/components/ChangelogFeedLinks";

export default function BlogPostItemsWrapper(props: Props): ReactNode {
    const { pathname } = useLocation();
    const isChangelog = pathname.startsWith("/changelog");

    return (
        <>
            {isChangelog && <ChangelogFeedLinks />}
            <BlogPostItems {...props} />
        </>
    );
}
