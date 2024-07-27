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
        // Get roles from PIP
        const roles = this.pip.getRoles(request.subject);
        if (!roles) {
            return false;
        }

        const subjectMatch = rule.Target[0].Subjects[0].Subject[0].AttributeValue[0];
        const actionMatch = rule.Target[0].Actions[0].Action[0].AttributeValue[0];
        const resourceMatch = rule.Target[0].Resources[0].Resource[0].AttributeValue[0];

        console.log(`Matching rule for request: ${JSON.stringify(request)}`);
        console.log(`Subject match: ${subjectMatch}, Action match: ${actionMatch}, Resource match: ${resourceMatch}`);
        console.log(`Roles: ${roles}`);

        // Check if the subject's roles include the required role
        return roles.includes(subjectMatch) &&
               request.action === actionMatch &&
               request.resource === resourceMatch;
    }
}

module.exports = PDP;
