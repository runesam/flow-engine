import { expect, should as shouldFN } from 'chai';

import rules from './rules.json';
import FlowEngine from './';

shouldFN();

describe('The Flow Engine', () => {
    const input = document.getElementById('input_data').value;
    it('constructs', () => {
        const expected = {
            basicStyles: 'font-weight: 600; font-size: 15px;',
            input,
            excutedRules: {},
        };
        expect(JSON.stringify(expected)).to.equal(JSON.stringify(FlowEngine));
    });
    describe('rule excuter', () => {
        const ruleId = '1';
        const { func } = rules.find(i => i.id === ruleId);
        const expected = eval(func)(JSON.parse(input));
        const result = FlowEngine.excuteRule('1');
        it('return the right type of result', () => {
            expected.should.be.a('boolean');
        });
        it('return the right value of result', () => {
            expect(expected).to.equal(result.ruleResult);
        });
    });
    describe('rules runner', () => {
        it('excutes the correct number of rules', () => {
            FlowEngine.runRules('1');
            const excutedRules = Object.keys(FlowEngine.excutedRules).length;
            expect(excutedRules).to.equal(4);
        });
    });
});
