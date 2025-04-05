import { useState, useEffect } from "react";
import { calcSeasonStats } from "../playerCardFunctions";

export default function PlayerCard(props) {
    const { tournaments, playerName } = props;
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    // Tournaments with season 0 are 'special' tournaments, so we don't wish to include them on the player card.
    const filteredTournaments = tournaments.filter(tournament => tournament.season !== 0);

    // Source: https://stackoverflow.com/questions/15125920/how-to-get-distinct-values-from-an-array-of-objects-in-javascript
    const uniqueSeasons = [...new Set(filteredTournaments.map(tournament => tournament.season))].sort((a, b) => (a-b));

    useEffect(() => {
        const getStats = async (tournaments, seasons, playerName) => {
            let dataHolder = [];
            for (let i = 0; i < seasons.length; i++) {
                let currentTournaments = tournaments.filter((tournament => tournament.season === seasons[i]))

                await calcSeasonStats(currentTournaments, seasons[i], playerName).then(response => {
                    dataHolder.push(response);
                });
            }
            setData(dataHolder)
        }

        setLoading(true);
        getStats(tournaments, uniqueSeasons, playerName);
        setLoading(false);
    }, [])

    return (
        <div className="w-[50%] overflow-x-auto rounded-md border-2 border-violet-950">
            {
                loading ? <p>Loading...</p> :
                (
                    <table className="w-full text-l text-left rtl:text-right text-gray-400 rounded-sm">
                        <thead className="text-m text-gray-400 uppercase bg-violet-950">
                            <tr>
                                <th>Season</th>
                                <th>TE</th>
                                <th>W</th>
                                <th>L</th>
                                <th>WR</th>
                                <th>AP</th>
                                <th>ASPR</th>
                                <th>T16s</th>
                                <th>T8s</th>
                            </tr>
                        </thead>
                        <tbody>
                        {
                            data.map((row, index) => {
                                return (
                                    <tr key={row.season} className={(index % 2 === 0) ? "bg-zinc-800" : ""}>
                                        <th>{row.season}</th>
                                        <th>{row.attendance}</th>
                                        <th>{row.wins}</th>
                                        <th>{row.losses}</th>
                                        <th>{row.winRate}</th>
                                        <th>{row.avgPlacement}</th>
                                        <th>{row.avgSpr}</th>
                                        <th>{row.top16s}</th>
                                        <th>{row.top8s}</th>
                                    </tr>
                                )
                            })
                        }
                        </tbody>
                    </table>
                )
            }
        </div>
    )
}
