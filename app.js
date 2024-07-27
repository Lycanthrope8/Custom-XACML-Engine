const express = require('express');
const bodyParser = require('body-parser');
const PAP = require('./pap');
const PIP = require('./pip');
const PDP = require('./pdp');
const PEP = require('./pep');

const app = express();
const pap = new PAP();
const pip = new PIP();
const pdp = new PDP(pap, pip);
const pep = new PEP(pdp);

app.use(bodyParser.json());
app.use(express.static('public'));

// Endpoint to add a policy
app.post('/api/policy', (req, res) => {
    const { policyId, policyXml } = req.body;
    pap.addPolicy(policyId, policyXml);
    res.send('Policy added');
});

// Endpoint to set an attribute
app.post('/api/attribute', (req, res) => {
    const { subjectId, attributeId, value } = req.body;
    pip.setAttribute(subjectId, attributeId, value);
    res.send('Attribute set');
});

// Endpoint to enforce access
app.post('/api/enforce', (req, res) => {
    const { subject, action, resource } = req.body;
    const decision = pep.enforce(subject, action, resource);
    res.send(decision);
});

// Serve the static HTML file
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});

app.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
});
