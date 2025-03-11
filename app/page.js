'use client'

import styles from "./page.module.css";
import { useRouter } from 'next/navigation'

export default function Home() {

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const playerName = e.target.elements.playerName.value.toLowerCase();
    const slug = '/player/' + playerName;
    router.push(slug);
  }

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <div className="flex flex-col gap-10">
          <h1 className="text-6xl">Nightclub Stats</h1>
          <form
          className="block"
          onSubmit={handleSubmit}
          >
            <input
            className="rounded-l-md border-2 border-violet-500 w-4/5 text-xl h-10 active:border-violet-500 pl-2"
            placeholder="Search for someone's tag..."
            name="playerName"
            >
            </input>
            <input
            className="w-1/5 text-xl h-10 bg-violet-500 rounded-r-md cursor-pointer"
            type="submit"
            ></input>
          </form>
        </div>
      </main>
    </div>
  );
}
