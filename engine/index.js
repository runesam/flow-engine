import rules from './rules.json';
import utils from './utils';

class FlowEngine {
    constructor() {
        this.runRules = this.runRules.bind(this);
        this.input = document.getElementById('input_data').value;
        this.excutedRules = {};
    }
    excuteRule(id) {
        const currentRule = rules.find(rule => rule.id === id);
        const ruleFn = eval(currentRule.func);
        const inputData = JSON.parse(this.input);
        const ruleResult = ruleFn(inputData);
        const ruleToExcuteID = ruleResult ? currentRule.true_id : currentRule.false_id;
        return ({
            ruleResult,
            ruleToExcuteID,
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
            return utils.consoleLogResults(this.input, this.excutedRules);
        } catch (error) {
            return utils.consoleLogSingle(`⚠️ ERROR EXECUTING RULE: "${id}". \n ${error}`);
        }
    }
}

export default new FlowEngine();
