import Image from "next/image";
import styles from "./page.module.css";

export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <h1 className={styles.header}>Nightclub Stats</h1>
        <input
        className={styles.search}
        placeholder="Search for someone's tag..."
        ></input>
      </main>
    </div>
  );
}
