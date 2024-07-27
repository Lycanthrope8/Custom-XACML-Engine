class PAP {
    constructor() {
        this.policies = {};
    }

    addPolicy(policyId, policyXml) {
        this.policies[policyId] = policyXml;
    }

    getPolicy(policyId) {
        return this.policies[policyId];
    }

    getAllPolicies() {
        return this.policies;
    }
}

module.exports = PAP;
