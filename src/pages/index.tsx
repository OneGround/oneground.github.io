import clsx from "clsx";
import Link from "@docusaurus/Link";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import Layout from "@theme/Layout";
import Heading from "@theme/Heading";

import styles from "./index.module.css";

function HomepageHeader() {
    const { siteConfig } = useDocusaurusContext();
    return (
        <header className={clsx("hero hero--primary", styles.heroBanner)}>
            <div className="container">
                <div className={styles.heroContent}>
                    <div className={styles.heroText}>
                        <Heading as="h1" className={styles.heroTitle}>
                            {siteConfig.title}
                        </Heading>
                        <p className={styles.heroSubtitle}>{siteConfig.tagline}</p>
                        <p className={styles.heroDescription}>
                            OneGround’s implementation of ZGW APIs, providing API components and related modules for a standardized Dutch
                            approach to case management (Zaakgericht Werken).
                        </p>
                        <div className={styles.buttons}>
                            <Link className={clsx("button button--primary button--lg", styles.primaryButton)} to="/docs/about-oneground">
                                Get Started
                            </Link>
                            <Link
                                className={clsx("button button--outline button--primary button--lg", styles.outlineButton)}
                                to="/changelog"
                            >
                                What's New
                            </Link>
                            <Link className={clsx("button button--outline button--primary button--lg", styles.outlineButton)} to="/blog">
                                Blog
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
}

function OneGroundEditions() {
    return (
        <section className={styles.editions}>
            <div className="container">
                <div className={styles.editionsHeader}>
                    <Heading as="h2" className={styles.editionsTitle}>
                        Choose Your OneGround Edition
                    </Heading>
                    <p className={styles.editionsSubtitle}>Select the perfect solution for your Common Ground development needs</p>
                </div>
                <div className="row">
                    <div className={clsx("col col--6")}>
                        <div className={styles.editionCard}>
                            <div className={styles.editionHeader}>
                                <Heading as="h4" className={styles.editionBrand}>
                                    OneGround
                                </Heading>
                                <Heading as="h3" className={styles.editionName}>
                                    Community Edition
                                </Heading>
                            </div>{" "}
                            <div className={styles.editionContent}>
                                <p className={styles.editionDescription}>
                                    The Community Edition is available as an open source variant and can be downloaded via GitHub by
                                    governments and software parties to install themselves on their own hosting environment. Free to use,
                                    inspect, and enhance.
                                </p>
                                <div className={styles.editionFeatures}>
                                    <div className={styles.feature}>Open source available via GitHub</div>
                                    <div className={styles.feature}>Self-hosted and managed</div>
                                    <div className={styles.feature}>Source code available for inspection</div>
                                    <div className={styles.feature}>All ZGW API components included</div>
                                    <div className={styles.feature}>Free to use and customize</div>
                                </div>
                                <div className={styles.editionButtons}>
                                    <Link className="button button--primary button--block" to="/docs/about-oneground">
                                        Get Started Free
                                    </Link>
                                    <Link
                                        className="button button--outline button--primary button--block"
                                        href="https://github.com/OneGround/ZGW-APIs"
                                        target="_blank"
                                    >
                                        View on GitHub
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={clsx("col col--6")}>
                        <div className={clsx(styles.editionCard, styles.editionCardFeatured)}>
                            <div className={styles.editionHeader}>
                                <Heading as="h4" className={styles.editionBrand}>
                                    OneGround
                                </Heading>
                                <Heading as="h3" className={styles.editionName}>
                                    Unlimited
                                </Heading>
                            </div>{" "}
                            <div className={styles.editionContent}>
                                <p className={styles.editionDescription}>
                                    The Unlimited variant offers a complete SaaS experience where you are fully supported and provided with
                                    all conveniences to quickly deploy Common Ground applications. Roxit handles hosting, technical
                                    management, and security.
                                </p>
                                <div className={styles.editionFeatures}>
                                    <div className={styles.feature}>Hosting on Dutch servers</div>
                                    <div className={styles.feature}>24-hour monitoring</div>
                                    <div className={styles.feature}>Complies with ISO standards for archiving</div>
                                    <div className={styles.feature}>ADFS integration available</div>
                                    <div className={styles.feature}>Configuration tool for ClientID's and authorisations/div>
                                    <div className={styles.feature}>Rate limiting on API Gateway</div>
                                </div>
                                <div className={styles.editionButtons}>
                                    <Link className="button button--primary button--block" to="https://portaal.oneground.nl/register">
                                        Request Free Trial
                                    </Link>
                                    <Link
                                        className="button button--outline button--primary button--block"
                                        href="https://oneground.nl/contact/"
                                        target="_blank"
                                    >
                                        Contact for Sale
                                    </Link>
                                </div>
                            </div>
                        </div>{" "}
                    </div>
                </div>
                <div className={styles.comparisonNote}>
                    <p>
                        For a complete feature comparison between editions, visit{" "}
                        <Link href="https://oneground.nl/varianten/" target="_blank">
                            oneground.nl/varianten
                        </Link>
                    </p>
                </div>
            </div>
        </section>
    );
}

export default function Home(): JSX.Element {
    const { siteConfig } = useDocusaurusContext();

    return (
        <Layout title="Home" description="ZGW registrations and Api's">
            <HomepageHeader />
            <main>
                <OneGroundEditions />
            </main>
        </Layout>
    );
}
