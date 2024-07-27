class PIP {
    constructor() {
        this.attributes = {};
    }

    setAttribute(subjectId, attributeId, value) {
        if (!this.attributes[subjectId]) {
            this.attributes[subjectId] = {};
        }
        this.attributes[subjectId][attributeId] = value;
        console.log(`Attribute set: ${subjectId}.${attributeId} = ${value}`);
    }

    getAttribute(subjectId, attributeId) {
        return this.attributes[subjectId] ? this.attributes[subjectId][attributeId] : null;
    }
}

module.exports = PIP;
