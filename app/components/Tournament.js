// Source for SVGs: https://www.iconfinder.com/

import { useState, useEffect } from 'react';
import Set from './Set';
import supabase from '../client';

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
    const [expanded, setExpanded] = useState('hidden');

    useEffect(() => {
        const getTournamentInfo = async (slug) => {
            try {
                const { data, error } = await supabase
                    .from('tournament')
                    .select()
                    .eq('slug', `${slug}`);
                setTournamentInfo(data[0]);
            } catch (error) {
                console.error(error);
            } finally {
                setLoadingTournamentInfo(false);
            }
        }

        const getSets = async (name, slug) => {
            try {
                const { data, error } = await supabase
                    .from('set')
                    .select()
                    .eq('tournament', `${slug}`)
                    .or(`p1_tag.eq.${name},p2_tag.eq.${name}`)
                    .order('phase_order')
                    .order('round');
                setSets(data);
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

    const handleClick = () => {
        if (expanded === 'hidden') {
            setExpanded('');
        } else {
            setExpanded('hidden');
        }
    }

    return (
        <div className="flex flex-col gap-2 w-1/2 font-fjalla-one font-semibold text-lg">
            {(
                loadingTournamentInfo ?
                    <p>Loading...</p> :
                    (<div className="relative grid grid-rows-2">
                        <h2>{tournamentInfo['name']}</h2>
                        <h2>{tournamentInfo['date']} - {placement_with_ordinal} / {tournamentInfo['entrants']}</h2>
                        <button className="absolute right-0" onClick={handleClick}>
                            { (expanded === 'hidden') ?
                                <svg height="48" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg"><path d="M14.83 16.42 24 25.59l9.17-9.17L36 19.25l-12 12-12-12z" fill="#ffffff" className="fill-000000"></path><path d="M0-.75h48v48H0z" fill="none"></path></svg>
                                :
                                <svg height="48" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg"><path d="M14.83 30.83 24 21.66l9.17 9.17L36 28 24 16 12 28z" fill="#ffffff" className="fill-000000"></path><path d="M0 0h48v48H0z" fill="none"></path></svg>
                            }
                        </button>
                    </div>)
            )}
            <hr className="h-0.5 border-t-0 bg-white/20" />
            {(
                loadingSets ?
                    <p>Loading ...</p> :
                    <div className={expanded}>{sets.map(set => <Set key={set.id} {...set} playerName={tag}/>)}</div>
            )}
        </div>
    )
}
