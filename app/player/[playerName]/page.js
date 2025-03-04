'use client'

import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from "next/navigation"
import styles from "./page.module.css"
import Tournament from '@/app/components/Tournament/Tournament';

export default function Player() {
    const { playerName } = useParams();
    const [tournaments, setTournaments] = useState([]);
    const [sets, setSets] = useState([]);
    // const [loadingSets, setLoadingSets] = useState(true);
    const [loadingTournaments, setLoadingTournaments] = useState(true);

    // Fetch sets from our database when page loads
    useEffect(() => {
        const getTournaments = async (name) => {
            try {
                const response = await axios.get(`http://localhost:4000/entrants/${name}`).then((data) => data);
                setTournaments(response.data)
            } catch (error) {
                console.error(error);
            } finally {
                setLoadingTournaments(false);
            }
        }

        // const getSets = async (name) => {
        //     try {
        //         const response = await axios.get(`http://localhost:4000/sets/${name}`).then((data) => data);
        //         setSets(response.data);
        //     } catch (error) {
        //         console.error(error);
        //     } finally {
        //         setLoadingSets(false);
        //     }
        // }

        getTournaments(playerName);
    }, [])

    return (
        <div className={styles.player_container}>
            <h1 className={styles.header}>{playerName}</h1>
            {(loadingTournaments) ? <p>Loading...</p> :
            tournaments.map((tournament) => <Tournament key={tournament.id} {...tournament}/>)}
        </div>
    )
}
