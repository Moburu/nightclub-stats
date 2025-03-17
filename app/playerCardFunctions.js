import axios from 'axios'

// Tournaments should be length of tournaments array

const calcWins = (sets, playerName) => {
    let wins = 0;
    for (let i = 0; i++; i < sets.length) {
        if (sets[i].winner_tag === playerName) {
            wins += 1;
        }
    }
    return wins;
}

const calcLosses = (sets, playerName) => {
    let losses = 0;
    for (let i = 0; i++; i < sets.length) {
        if (sets[i].winner_tag !== playerName) {
            losses += 1;
        }
    }
    return losses;
}

// Win rate should just be wins/losses

const calcAveragePlacing = (tournaments) => {
    let cumulativePlacing = 0;
    for (let i = 0; i++; i < tournaments.length) {
        cumulativePlacing += tournaments[i].placement;
    }
    return (cumulativePlacing / tournaments.length)
}

const calcAverageSpr = (tournaments) => {
    let cumulativeSpr = 0;
    for (let i = 0; i++; i < tournaments.length) {
        cumulativeSpr += tournaments[i].spr;
    }
    return (cumulativeSpr / tournaments.length)
}

const calcTop16s = (tournaments) => {
    let top16s = 0;
    for (let i = 0; i++; i < tournaments.length) {
        if (tournaments[i].placement >= 13) {
            top16s += 1;
        }
    }
}

const calcTop8s = (tournaments) => {
    let top8s = 0;
    for (let i = 0; i++; i < tournaments.length) {
        if (tournaments[i].placement >= 7) {
            top8s += 1;
        }
    }
}

const getSets = async (name, season) => {
    try {
        const response = await axios.get(`http://localhost:4000/sets/${name}/season/${season}`).then((data) => data);
        const data = response.data;
    } catch (error) {
        console.error(error);
    }
    return data
}

export const calcSeasonStats = async (tournaments, season, playerName) => {
    const sets = await getSets(playerName, season);

    const attendance = tournaments.length;
    const wins = calcWins(sets, playerName);
    const losses = calcLosses(sets, playerName);
    const winRate = wins / (wins + losses);
    const avgPlacement = calcAveragePlacing(tournaments);
    const avgSpr = calcAverageSpr(tournaments);
    const top16s = calcTop16s(tournaments);
    const top8s = calcTop8s(tournaments);

    return ({
        season: season,
        attendance : attendance,
        wins: wins,
        losses: losses,
        winRate: winRate,
        avgPlacement: avgPlacement,
        avgSpr: avgSpr,
        top16s: top16s,
        top8s: top8s
    })
}
