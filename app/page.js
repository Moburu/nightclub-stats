'use client'

import Image from "next/image";
import styles from "./page.module.css";
import { useRouter } from 'next/navigation'

export default function Home() {

  const router = useRouter();

  const handleSubmit = async e => {
    e.preventDefault();
    let playerName = e.target.elements.playerName.value;
    let slug = '/player/' + playerName;
    router.push(slug);
  }

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <h1 className={styles.header}>Nightclub Stats</h1>
        <form
        className={styles.search}
        onSubmit={handleSubmit}
        >
          <input
          className={styles.searchbar}
          placeholder="Search for someone's tag..."
          name = "playerName"
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
