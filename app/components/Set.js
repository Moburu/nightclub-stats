import styles from './Set.module.css'

export default function Set(props) {
    // Destructure props
    const {
        id,
        tournament,
        p1_tag,
        p2_tag,
        p1_score,
        p2_score,
        winner_tag,
        playerName
    } = props;

    // Use these for conditionals (hero is the player whose page is being displayed)
    const did_p1_win = (p1_tag === winner_tag)
    const did_hero_win = (playerName === winner_tag)

    // Use these to make sure the winner is on the left side=
    const winner_score = (did_p1_win ? p1_score : p2_score);
    const loser_tag = (did_p1_win ? p2_tag : p1_tag);
    const loser_score = (did_p1_win ? p2_score : p1_score);

    return (
        <div className={styles.set}>
            <h1 className={did_hero_win ? styles.winner : styles.loser}>{winner_tag} {winner_score} - {loser_tag} {loser_score}</h1>
        </div>
    )
}
