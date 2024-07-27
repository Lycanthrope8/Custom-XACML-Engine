async function addPolicy() {
    const policyId = document.getElementById('policyId').value;
    const policyXml = document.getElementById('policyXml').value;
    const response = await fetch('/api/policy', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ policyId, policyXml })
    });
    alert(await response.text());
}

async function setAttributeInPIP() {
    const subjectId = document.getElementById('subjectId').value;
    const attributeId = document.getElementById('attributeId').value;
    const value = document.getElementById('attributeValue').value;
    const response = await fetch('/api/attribute', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ subjectId, attributeId, value })
    });
    alert(await response.text());
}

async function enforceAccess() {
    const subject = document.getElementById('subject').value;
    const action = document.getElementById('action').value;
    const resource = document.getElementById('resource').value;
    const response = await fetch('/api/enforce', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ subject, action, resource })
    });
    document.getElementById('decision').innerText = await response.text();
}
