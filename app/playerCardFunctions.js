import supabase from './client';

// Tournaments should be length of tournaments array

const calcWins = (sets, playerName) => {
    let wins = 0;
    for (let i = 0; i < sets.length; i++) {
        if (sets[i].winner_tag === playerName) {
            wins += 1;
        }
    }
    return wins;
}

const calcLosses = (sets, playerName) => {
    let losses = 0;
    for (let i = 0; i < sets.length; i++) {
        if (sets[i].winner_tag !== playerName) {
            losses += 1;
        }
    }
    return losses;
}

// Win rate should just be wins/losses

const calcAveragePlacing = (tournaments) => {
    let cumulativePlacing = 0;
    for (let i = 0; i < tournaments.length; i++) {
        cumulativePlacing += tournaments[i].placement;
    }
    return +((cumulativePlacing / tournaments.length).toFixed(2))
}

const calcAverageSpr = (tournaments) => {
    let cumulativeSpr = 0;
    for (let i = 0; i < tournaments.length; i++) {
        cumulativeSpr += +(tournaments[i].spr);
    }
    return +((cumulativeSpr / tournaments.length).toFixed(2))
}

const calcTop16s = (tournaments) => {
    let top16s = 0;
    for (let i = 0; i < tournaments.length; i++) {
        if (tournaments[i].placement <= 13) {
            top16s += 1;
        }
    }
    return top16s
}

const calcTop8s = (tournaments) => {
    let top8s = 0;
    for (let i = 0; i < tournaments.length; i++) {
        if (tournaments[i].placement <= 7) {
            top8s += 1;
        }
    }
    return top8s
}

const getSets = async (name, season) => {
    const { data, error } = await supabase
        .from('set').select()
        .eq('season', `${season}`)
        .or(`p1_tag.eq.${name},p2_tag.eq.${name}`);
    return data;
}

export const calcSeasonStats = async (tournaments, season, playerName) => {
    const sets = await getSets(playerName, season).then(result => {
        console.log(result)
        return result
    }).catch(err => {
        console.log(err);
    });
    const attendance = tournaments.length;
    const wins = calcWins(sets, playerName);
    const losses = calcLosses(sets, playerName);
    const winRate = +((wins / (wins + losses)).toFixed(2));
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
