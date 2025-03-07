export default function Set(props) {
    // Destructure props
    const {
        id,
        tournament,
        round_text,
        p1_tag,
        p2_tag,
        p1_score,
        p2_score,
        winner_tag,
        round,
        phase_order,
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
        <div>
            {
                did_hero_win ? (
                    <div className="grid grid-cols-8 grid-rows-2">
                        <span className="col-span-8">{round_text}</span>
                        <span className="col-span-3 bg-linear-to-r from-none via-green-1000 to-green-600">{winner_tag}</span>
                        <span className="col-span-1 bg-green-600">{winner_score}</span>
                        <span className="col-span-1 bg-red-600">{loser_score}</span>
                        <span className="col-span-3 bg-linear-to-l from-none via-red-1000 to-red-600">{loser_tag}</span>
                    </div>
                    )
                    :
                    (
                    <div className="grid grid-cols-8 grid-rows-1">
                        <span className="col-span-8">{round_text}</span>
                        <span className="col-span-3 bg-linear-to-r from-none via-red-1000 to-red-600">{loser_tag}</span>
                        <span className="col-span-1 bg-red-600">{loser_score}</span>
                        <span className="col-span-1 bg-green-600">{winner_score}</span>
                        <span className="col-span-3 bg-linear-to-l from-none via-green-1000 to-green-600">{winner_tag}</span>
                    </div>
                    )
            }
        </div>
    )
}
