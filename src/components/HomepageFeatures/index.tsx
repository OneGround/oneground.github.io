import clsx from "clsx";
import Heading from "@theme/Heading";
import styles from "./styles.module.css";

export default function HomepageFeatures(): JSX.Element {
    return (
        <section className={styles.products}>
            <div className="container">
                <div className="row">
                    <div className={clsx("col col--6")}>
                        <div className={clsx("text--center", styles.product, styles.product_left)}>
                            <Heading as="h4">OneGround</Heading>
                            <Heading as="h2">Community Edition</Heading>
                            <p>
                                OneGround is a platform that offers a range of services to help you build, deploy, and manage applications
                                on Common Ground. It is a collaboration between Roxit and the Common Ground community. OneGround is the
                                place where you can find everything you need to get started with Common Ground.
                            </p>
                        </div>
                    </div>
                    <div className={clsx("col col--6")}>
                        <div className={clsx("text--center", styles.product, styles.product_right)}>
                            <Heading as="h4">OneGround</Heading>
                            <Heading as="h2">Unlimited</Heading>
                            <p>
                                As a SaaS service where Roxit provides hosting, technical management and security. With Unlimited you are
                                completely unburdened and provided with all the conveniences to quickly put Common Ground applications into
                                use.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
