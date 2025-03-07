import { useState, useEffect } from 'react';
import axios from 'axios';
import Set from './Set';

export default function Tournament(props) {
    // Destructure props
    const {
        id,
        tag,
        placement,
        seed,
        tournament
    } = props;

    const [loadingTournamentInfo, setLoadingTournamentInfo] = useState(true);
    const [loadingSets, setLoadingSets] = useState(true);
    const [tournamentInfo, setTournamentInfo] = useState({});
    const [sets, setSets] = useState([]);

    useEffect(() => {
        const getTournamentInfo = async (slug) => {
            try {
                const response = await axios.get(`http://localhost:4000/tournaments/${slug}`).then((data) => data);
                setTournamentInfo(response.data[0]);
            } catch (error) {
                console.error(error);
            } finally {
                setLoadingTournamentInfo(false);
            }
        }

        const getSets = async (name, slug) => {
            try {
                const response = await axios.get(`http://localhost:4000/sets/${name}/${slug}`).then((data) => data);
                setSets(response.data);
            } catch (error) {
                console.error(error);
            } finally {
                setLoadingSets(false);
            }
        }

        getTournamentInfo(tournament);
        getSets(tag, tournament)
    }, [])

    // Source: https://stackoverflow.com/questions/13627308/add-st-nd-rd-and-th-ordinal-suffix-to-a-number
    // We use this to add the ordinal suffix to the player's placement in order to display it in the tournament header
    function ordinal_suffix_of(i) {
        let j = i % 10,
            k = i % 100;
        if (j === 1 && k !== 11) {
            return i + "st";
        }
        if (j === 2 && k !== 12) {
            return i + "nd";
        }
        if (j === 3 && k !== 13) {
            return i + "rd";
        }
        return i + "th";
    }

    const placement_with_ordinal = ordinal_suffix_of(placement);

    return (
        <div className="flex flex-col gap-2 w-1/2 font-fjalla-one font-semibold text-lg">
            {(
                loadingTournamentInfo ?
                    <p>Loading...</p> :
                    (<div className="grid grid-rows-2">
                        <h2>{tournamentInfo['name']}</h2>
                        <h2>{tournamentInfo['date']} - {placement_with_ordinal} / {tournamentInfo['entrants']}</h2>
                    </div>)
            )}
            <hr class="my-12 h-0.5 border-t-0 bg-white/20" />
            {(
                loadingSets ?
                    <p>Loading ...</p> :
                    <div>{sets.map(set => <Set key={set.id} {...set} playerName={tag}/>)}</div>
            )}
        </div>
    )
}
