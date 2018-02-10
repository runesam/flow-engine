import rules from './rules.json';

class FlowEngine {
    constructor() {
        this.basicStyles = 'font-weight: 600; font-size: 15px;';
        this.runRules = this.runRules.bind(this);
        this.input = document.getElementById('input_data').value;
        this.excutedRules = {};
    }
    excuteRule(id) {
        const currentRule = rules.filter(rule => rule.id === id)[0];
        const ruleFn = eval(currentRule.func);
        const inputData = JSON.parse(this.input);
        const ruleResult = ruleFn(inputData);
        const ruleToExcuteID = ruleResult ? currentRule.true_id : currentRule.false_id;
        return ({
            ruleResult,
            ruleToExcuteID,
        });
    }
    consoleSingleResult(ruleId, i) {
        setTimeout(() => console.log(
            `%c ${rules.find(item => item.id === ruleId).title}${this.excutedRules[ruleId] ? '✔️' : '❌'}`,
            `
                color: ${this.excutedRules[ruleId] ? 'green' : 'red'};
                font-size: 17px;
                font-weight: 600;
            `,
        ), 500 * (i + 1));
    }
    consoleLogResults() {
        console.group(`%c 👉 ${this.input}`, this.basicStyles);
        console.log('%c ✅ Well, The flow Ended! and here are the results 👇', this.basicStyles);
        Object.keys(this.excutedRules).forEach((ruleId, i) => {
            this.consoleSingleResult(ruleId, i);
            setTimeout(() => console.groupEnd(), 500 * (Object.keys(this.excutedRules).length + 1));
        });
    }
    runRules(id) {
        try {
            if (Object.prototype.hasOwnProperty.call(this.excutedRules, id)) {
                const doneSoFar = [...Object.keys(this.excutedRules), id].join(' => ');
                throw new Error(`Infinite loop at rule ${id}: ${doneSoFar}`);
            }
            const { ruleResult, ruleToExcuteID } = this.excuteRule(id);
            this.excutedRules[id] = ruleResult;
            if (ruleToExcuteID && ruleToExcuteID !== null) {
                return this.runRules(ruleToExcuteID);
            }
            return this.consoleLogResults();
        } catch (e) {
            return console.log(`⚠️ ERROR EXECUTING RULE: "${id}". REASON: ${e}`);
        }
    }
}

window.flowEngine = id => (new FlowEngine()).runRules(id);

export default new FlowEngine();
