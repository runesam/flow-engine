import rules from './rules.json';

const basicStyles = 'font-weight: 600; font-size: 15px;';

function consoleSingleResult(ruleId, i, excutedRules) {
    setTimeout(() => console.log(
        `%c ${rules.find(item => item.id === ruleId).title} ${excutedRules[ruleId] ? '✔️' : '❌'}`,
        `
            color: ${excutedRules[ruleId] ? 'green' : 'red'};
            font-size: 17px;
            font-weight: 600;
        `,
    ), 500 * (i + 1));
}

function consoleLogResults(input, excutedRules) {
    console.group(`%c 👉 ${input}`, basicStyles);
    console.log('%c ✅ Well, The flow Ended! and here are the results 👇', basicStyles);
    Object.keys(excutedRules).forEach((ruleId, i) => {
        consoleSingleResult(ruleId, i, excutedRules);
        // closing the console group after loging out the rules results
        setTimeout(() => console.groupEnd(), 500 * (Object.keys(excutedRules).length + 1));
    });
}

function consoleLogSingle(what) {
    console.log(`%c ${what}`, basicStyles);
}

module.exports = {
    consoleLogResults,
    consoleLogSingle,
};
