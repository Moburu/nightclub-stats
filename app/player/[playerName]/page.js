'use client'

import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams, useRouter } from "next/navigation"
import Tournament from '@/app/components/Tournament';
import PlayerCard from '@/app/components/PlayerCard';
import LoadingSpinner from '@/app/components/LoadingSpinner';
import LineGraph from '@/app/components/LineGraph';

export default function Player() {
    const router = useRouter();
    const { playerName } = useParams();
    const [tournaments, setTournaments] = useState([]);
    const [filteredTournaments, setFilteredTournaments] = useState([]);
    const [name, setName] = useState("");
    const [loadingTournaments, setLoadingTournaments] = useState(true);

    // Fetch sets from our database when page loads
    useEffect(() => {
        const getTournaments = async (name) => {
            try {
                const response = await axios.get(`http://localhost:4000/entrants/${name}`).then((data) => data);
                const filteredData = response.data.filter(tourney => tourney.is_dq === 'False');
                setTournaments(response.data);
                setFilteredTournaments(filteredData);
                setName(response.data[0].tag);
            } catch (error) {
                console.error(error);
                router.push('/');
            } finally {
                setLoadingTournaments(false);
            }
        }

        getTournaments(playerName);
    }, [])

    return (
        <div className="flex flex-col gap-15 justify-center content-center items-center w-full text-center">
            <h1 className="text-6xl">{name}</h1>
            {loadingTournaments ?
            <LoadingSpinner />
            :
            <div className="flex flex-col gap-15 justify-center content-center items-center w-full text-center">
                <h1 className="text-4xl">Player Card</h1>
                <PlayerCard tournaments={filteredTournaments} playerName={name} />
                <h1 className="text-4xl">Recent Tournaments</h1>
                {tournaments.slice(0, 3).map((tournament) => <Tournament key={tournament.id} {...tournament}/>)}
                <h1 className="text-4xl">Graphs</h1>
                <LineGraph tournaments={filteredTournaments} playerName={name} />
            </div>}
        </div>
    )
}
