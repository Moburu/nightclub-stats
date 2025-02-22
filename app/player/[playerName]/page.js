'use client'

import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from "next/navigation"
import styles from "../../page.module.css"

// const getPlayerSets = async (name) => {
//     axios.get(`http://localhost:4000/player/${name}`).then((data) => {
//         console.log(data.data)
//         return data.data
//     })
// }

export default function Player() {
    const { playerName } = useParams();
    const [sets, setSets] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        console.log(playerName)
        const getPlayerSets = async (name) => {
            try {
            const response = await axios.get(`http://localhost:4000/player/${name}`).then((data) => {
                return data
            }
            );
                setSets(response.data);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        }

        getPlayerSets(playerName)}, [])

    return (
        <div>
            <h1 className={styles.header}>{playerName}</h1>
            <br />
            {loading ? <p>Loading...</p> :
            <ul>
                {sets.map((set) => <li key={set.id}>{set.p1_tag} {set.p1_score} - {set.p2_score} {set.p2_tag}</li>)}
            </ul>}
        </div>
    )
}
