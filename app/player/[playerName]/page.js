'use client'

import axios from 'axios';
import { useParams } from "next/navigation"
import styles from "../../page.module.css"

const getPlayerSets = (name) => {
    axios.get(`http://localhost:4000/player/${name}`).then((data) => {
      console.log(data.data)
      return data.data
    })
  }

export default function Player() {
    const { playerName } = useParams();

    const sets = getPlayerSets(playerName)

    return (
        <div>
            <h1 className={styles.header}>{playerName}</h1>
            <br />
            <p>{sets}</p>
        </div>
    )
}
