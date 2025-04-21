'use client'

import MySelect from "@/app/components/MySelect";
import styles from "./page.module.css";
import { useRouter } from 'next/navigation';
import { useEffect, useState } from "react";
import axios from 'axios';
import Select from "react-select";

export default function Home() {
  const router = useRouter();
  const [entrants, setEntrants] = useState([]);
  const [lowercaseEntrants, setLowercaseEntrants] = useState([]);
  const [active, setActive] = useState('hidden');
  let entrantsHolder = [];
  let lowercaseEntrantsHolder = [];

  useEffect(() => {
    const getEntrants = async () => {
      try {
          const response = await axios.get(`http://localhost:4000/entrants/tags`).then((data) => data);
          const data = response.data;
          for (let i = 0; i < data.length; i++) {
            entrantsHolder.push({'value': data[i].tag, 'label': data[i].tag});
            lowercaseEntrantsHolder.push(data[i].lowercase_tag);
          }
          setEntrants(entrantsHolder);
          setLowercaseEntrants(lowercaseEntrantsHolder);
      } catch (error) {
          console.error(error);
      }
    }
    getEntrants();
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault();
    const playerName = e.target.elements.playerName.value.toLowerCase();
    e.target.elements.playerName.value = "";
    if (lowercaseEntrants.includes(playerName)) {
      const slug = '/player/' + playerName;
      router.push(slug);
    } else {
      setActive('');
      setTimeout(function() {
        setActive('transition-opacity duration-2000 opacity-0');
      }, 1000);
    }
  }

  const handleClick = () => {
    setActive('hidden');
  }

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <div className="flex flex-col gap-10 w-110">
          <h1 className="text-6xl">Nightclub Stats</h1>
          <form
          onSubmit={handleSubmit}
          >
            <MySelect entrants={entrants} />
            <input
            className="w-1/5 text-xl h-[41.5px] rounded-r-md cursor-pointer"
            style={{'backgroundColor': 'rgb(110, 41, 230)'}}
            type="submit"
            ></input>
          </form>
          <div className={"bg-red-100 border border-red-400 text-red-700 px-4 py-3 w-110 rounded absolute bottom-10 left-1/2 transform -translate-x-1/2 "+active} role="alert">
            <strong className="font-bold">Error: </strong>
            <span className="block sm:inline">Username not found.</span>
            <span className="absolute top-0 bottom-0 right-0 px-4 py-3">
              <svg onClick={handleClick} className="fill-current h-6 w-6 text-red-500 cursor-pointer " role="button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><title>Close</title><path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z"/></svg>
            </span>
          </div>
        </div>
      </main>
    </div>
  );
}
