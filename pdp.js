const { parseString } = require('xml2js');

class PDP {
    constructor(pap, pip) {
        this.pap = pap;
        this.pip = pip;
    }

    evaluate(request) {
        const policies = this.pap.getAllPolicies();
        let decision = 'Deny';

        for (const policyId in policies) {
            const policyXml = policies[policyId];
            parseString(policyXml, (err, policy) => {
                if (err) {
                    console.error('Error parsing policy:', err);
                    return;
                }
                console.log(`Evaluating policy: ${policyId}`);
                console.log(JSON.stringify(policy, null, 2)); // Log the entire policy object
                const result = this.evaluatePolicy(policy, request);
                console.log(`Policy evaluation result: ${result}`);
                if (result === 'Permit') {
                    decision = 'Permit';
                }
            });
        }

        return decision;
    }

    evaluatePolicy(policy, request) {
        const rules = policy.Policy.Rule;
        
        for (const rule of rules) {
            if (this.matchRule(rule, request)) {
                return rule.$.Effect;
            }
        }

        return 'Deny';
    }

    matchRule(rule, request) {
        // Add logging to inspect the rule structure
        console.log(`Rule: ${JSON.stringify(rule, null, 2)}`);

        // Adjusting navigation according to the expected structure
        const subjectMatch = rule.Target[0].Subjects[0].Subject[0].AttributeValue[0];
        const actionMatch = rule.Target[0].Actions[0].Action[0].AttributeValue[0];
        const resourceMatch = rule.Target[0].Resources[0].Resource[0].AttributeValue[0];

        console.log(`Subject match: ${subjectMatch}, Action match: ${actionMatch}, Resource match: ${resourceMatch}`);

        return request.subject === subjectMatch &&
               request.action === actionMatch &&
               request.resource === resourceMatch;
    }
}

module.exports = PDP;
