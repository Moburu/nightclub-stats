'use client'

import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams, useRouter } from "next/navigation"
import Tournament from '@/components/Tournament';

export default function Player() {
    const router = useRouter();
    const { playerName } = useParams();
    const [tournaments, setTournaments] = useState([]);
    const [name, setName] = useState("")
    // const [sets, setSets] = useState([]);
    // const [loadingSets, setLoadingSets] = useState(true);
    const [loadingTournaments, setLoadingTournaments] = useState(true);

    // Fetch sets from our database when page loads
    useEffect(() => {
        const getTournaments = async (name) => {
            try {
                const response = await axios.get(`http://localhost:4000/entrants/${name}`).then((data) => data);
                setTournaments(response.data)
                setName(response.data[0].tag)
            } catch (error) {
                console.error(error);
                router.push('/');
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
    console.log(tournaments)
    return (
        <div className="flex flex-col gap-15 justify-center content-center items-center w-full text-center">
            <h1 className="text-6xl">{name}</h1>
            {(loadingTournaments) ? <p>Loading...</p> :
            tournaments.map((tournament) => <Tournament key={tournament.id} {...tournament}/>)}
        </div>
    )
}
