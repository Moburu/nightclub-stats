'use client'

import axios from 'axios';
import Set from '@/app/components/Set';
import { useEffect, useState } from 'react';
import { useParams } from "next/navigation"
import styles from "../../page.module.css"

export default function Player() {
    const { playerName } = useParams();
    const [sets, setSets] = useState([]);
    const [loading, setLoading] = useState(true);

    // Fetch sets from our database when page loads
    useEffect(() => {
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
            sets.map((set) => <Set key={set.id} {...set} playerName={playerName}/>)}
        </div>
    )
}
