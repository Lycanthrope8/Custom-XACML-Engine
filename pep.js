class PEP {
    constructor(pdp) {
        this.pdp = pdp;
    }

    enforce(subject, action, resource) {
        const request = { subject, action, resource };
        console.log(`Enforcing request: ${JSON.stringify(request)}`);
        const decision = this.pdp.evaluate(request);
        console.log(`Decision: ${decision}`);

        if (decision === 'Permit') {
            return 'Access granted';
        } else {
            return 'Access denied';
        }
    }
}

module.exports = PEP;
