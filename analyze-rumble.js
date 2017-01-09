const _ = require("lodash");

// When playing in the browser, the JSON comes from:
// https://cb-live.synapse-games.com/api.php?message=getRankings&user_id=XXXXXX
const rumble = require("./rumble.json");

const rankings = rumble.rankings.data;

const roundsPlayed = 10;
const maxPointsPerPlay = 100;
const maxPointsPerRound = maxPointsPerPlay * roundsPlayed; // 1000
const perfectScore = roundsPlayed * maxPointsPerRound;

console.info(`Perfect score is ${perfectScore}.`);
const stats = _.map(rankings, (r) => {
    const points = 0 + r.stat;
    const efficiency = perfectScore - points;
    const efficiencyPercent = points / perfectScore;
    const estRoundsPlayed = Math.round(efficiencyPercent * roundsPlayed);
    const estRoundsMissed = roundsPlayed - estRoundsPlayed;
    return {
        name: r.name,
        points,
        efficiency,
        efficiencyPercent,
        estRoundsMissed
    };
});

_.forEach(stats, stat =>
    console.info(`${stat.name} has ${stat.points} points and is ${stat.efficiency} (${stat.efficiencyPercent}%) from perfect.`));

_.chain(stats)
    .groupBy("estRoundsMissed")
    .forEach((v, k) => {
        const peeps = _.map(v, "name").sort((a, b) => _.upperCase(a).localeCompare(_.upperCase(b))).join(", ");
        console.info(`Missed ${k} rounds: ${peeps}`)
    })
    .value();
