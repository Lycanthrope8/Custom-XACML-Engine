const fs = require('fs');
const path = require('path');

class PIP {
    constructor() {
        this.attributesFile = path.join(__dirname, 'attributes.json');
        this.attributes = this.loadAttributes();
    }

    // Load attributes from the JSON file
    loadAttributes() {
        if (fs.existsSync(this.attributesFile)) {
            const data = fs.readFileSync(this.attributesFile, 'utf8');
            return JSON.parse(data);
        } else {
            return {};
        }
    }

    // Save attributes to the JSON file
    saveAttributes() {
        fs.writeFileSync(this.attributesFile, JSON.stringify(this.attributes, null, 2), 'utf8');
    }

    setAttribute(subjectId, attributeId, attributeValue) {
        if (!this.attributes[subjectId]) {
            this.attributes[subjectId] = {};
        }

        // Allow multiple roles for a subject
        if (attributeId === 'role') {
            if (!Array.isArray(this.attributes[subjectId][attributeId])) {
                this.attributes[subjectId][attributeId] = [];
            }
            if (!this.attributes[subjectId][attributeId].includes(attributeValue)) {
                this.attributes[subjectId][attributeId].push(attributeValue);
                this.saveAttributes();
            } else {
                console.log(`Role ${attributeValue} for subject ${subjectId} already exists.`);
            }
        } else {
            this.attributes[subjectId][attributeId] = attributeValue;
            this.saveAttributes();
        }
    }

    getAttribute(subjectId, attributeId) {
        return this.attributes[subjectId] ? this.attributes[subjectId][attributeId] : null;
    }

    getRoles(subjectId) {
        return this.attributes[subjectId] ? this.attributes[subjectId]['role'] : null;
    }
}

module.exports = PIP;
