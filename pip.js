class PIP {
    constructor() {
        this.attributes = {};
    }

    setAttribute(subjectId, attributeId, attributeValue) {
        if (!this.attributes[subjectId]) {
            this.attributes[subjectId] = {};
        }
        this.attributes[subjectId][attributeId] = attributeValue;
    }

    getAttribute(subjectId, attributeId) {
        return this.attributes[subjectId] ? this.attributes[subjectId][attributeId] : null;
    }

    getRoles(subjectId) {
        return this.attributes[subjectId] ? this.attributes[subjectId]['role'] : null;
    }
}

module.exports = PIP;
