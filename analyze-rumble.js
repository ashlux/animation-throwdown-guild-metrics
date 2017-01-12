const _ = require("lodash");
const rumble = require("./rumble.json"); // See README

const rankings = rumble.rankings.data;

const roundsPlayed = 18; // Change this to the current rumble round
const maxPointsPerPlay = 100;
const maxPointsPerRound = maxPointsPerPlay * 10;
const perfectScore = roundsPlayed * maxPointsPerRound;

console.info(`Perfect score is ${perfectScore}.`);
const stats = _.map(rankings, (r) => {
    const points = 0 + r.stat; // 17957
    const efficiency = perfectScore - points; // 18000 - 17957 = 43
    const efficiencyPercent = points / perfectScore; // 17957 / 18000 = .997611111
    const estRoundsPlayed = Math.ceil(efficiencyPercent * roundsPlayed); // .997611111 * 18 = 17.956999998 = 18
    const estRoundsMissed = roundsPlayed - estRoundsPlayed; // 18 - 18
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
