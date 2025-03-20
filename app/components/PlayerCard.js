import { useState, useEffect } from "react";
import { calcSeasonStats } from "../playerCardFunctions";

export default function PlayerCard(props) {
    const { tournaments, playerName } = props;
    const [data, setData] = useState([]);

    // Tournaments with season 0 are 'special' tournaments, so we don't wish to include them on the player card.
    const filteredTournaments = tournaments.filter(tournament => tournament.season !== 0);

    // Source: https://stackoverflow.com/questions/15125920/how-to-get-distinct-values-from-an-array-of-objects-in-javascript
    const uniqueSeasons = [...new Set(filteredTournaments.map(tournament => tournament.season))];

    useEffect(() => {
        const getStats = async (tournaments, season, playerName) => {
            const response = await calcSeasonStats(tournaments, season, playerName).then(data => data);
            return response;
        }

        for (let i = 0; i < uniqueSeasons.length; i++) {
            let currentTournaments = tournaments.filter((tournament => tournament.season === uniqueSeasons[i]))
            setData(getStats(currentTournaments, uniqueSeasons[i], playerName));
        }
        console.log(data);
    }, [])

    const handleClick = () => {
        console.log(data);
    }

    return (
        <div>
            <button onClick={handleClick}>Click me!</button>
        </div>
    )
}
