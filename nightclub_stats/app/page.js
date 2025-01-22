import Image from "next/image";
import styles from "./page.module.css";

export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <h1 className={styles.header}>Nightclub Stats</h1>
        <form className={styles.search}>
        <input
        className={styles.searchbar}
        placeholder="Search for someone's tag..."
        >
        </input>
        <input
        className={styles.submit}
        type="submit"
        ></input>
        </form>
      </main>
    </div>
  );
}
