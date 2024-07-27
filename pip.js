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
        // Check for duplicate entry
        if (this.attributes[subjectId][attributeId] === undefined) {
            this.attributes[subjectId][attributeId] = attributeValue;
            this.saveAttributes();
        } else {
            console.log(`Attribute ${attributeId} for subject ${subjectId} already exists.`);
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
