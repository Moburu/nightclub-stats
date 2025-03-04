import styles from './Tournament.module.css'
import { useState, useEffect } from 'react';
import axios from 'axios';
import Set from '../Set/Set';

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

    return (
        <div className={styles.tournament}>
            {(
                loadingTournamentInfo ?
                    <p>Loading...</p> :
                    (<div><h2>{tournamentInfo['name']}</h2><h2>{tournamentInfo['date']} - {tournamentInfo['entrants']} entrants</h2></div>))
            }
            {(
                loadingSets ?
                    <p>Loading ...</p> :
                    sets.map(set => <Set key={set.id} {...set} playerName={tag}/>)
            )}
        </div>
    )
}
