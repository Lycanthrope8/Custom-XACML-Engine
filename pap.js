const fs = require('fs');
const path = require('path');

class PAP {
    constructor() {
        this.policiesDir = path.join(__dirname, 'policies');

        // Ensure the policies directory exists
        if (!fs.existsSync(this.policiesDir)) {
            fs.mkdirSync(this.policiesDir);
        }
    }

    // Save policy to a file
    addPolicy(policyId, policyXml) {
        const filePath = path.join(this.policiesDir, `${policyId}.xml`);
        fs.writeFileSync(filePath, policyXml, 'utf8');
    }

    // Load policy from a file
    getPolicy(policyId) {
        const filePath = path.join(this.policiesDir, `${policyId}.xml`);
        if (fs.existsSync(filePath)) {
            return fs.readFileSync(filePath, 'utf8');
        } else {
            return null;
        }
    }

    // Load all policies
    getAllPolicies() {
        const files = fs.readdirSync(this.policiesDir);
        const policies = {};
        files.forEach(file => {
            const policyId = path.basename(file, '.xml');
            const policyXml = fs.readFileSync(path.join(this.policiesDir, file), 'utf8');
            policies[policyId] = policyXml;
        });
        return policies;
    }
}

module.exports = PAP;
