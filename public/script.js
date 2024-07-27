async function addPolicy() {
    const policyId = document.getElementById('policyId').value;
    const policyXml = document.getElementById('policyXml').value;
    try {
        const response = await fetch('/api/policy', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ policyId, policyXml })
        });
        const result = await response.text();
        alert(result);
    } catch (error) {
        console.error('Error adding policy:', error);
        alert('Failed to add policy.');
    }
}

async function setAttributeInPIP() {
    const subjectId = document.getElementById('subjectId').value;
    const attributeId = document.getElementById('attributeId').value;
    const value = document.getElementById('attributeValue').value;
    try {
        const response = await fetch('/api/attribute', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ subjectId, attributeId, value })
        });
        const result = await response.text();
        alert(result);
    } catch (error) {
        console.error('Error setting attribute:', error);
        alert('Failed to set attribute.');
    }
}

async function enforceAccess() {
    const subject = document.getElementById('subject').value;
    const action = document.getElementById('action').value;
    const resource = document.getElementById('resource').value;
    try {
        const response = await fetch('/api/enforce', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ subject, action, resource })
        });
        const result = await response.text();
        document.getElementById('decision').innerText = 'Decision: ' + result;
    } catch (error) {
        console.error('Error enforcing access:', error);
        document.getElementById('decision').innerText = 'Failed to enforce access.';
    }
}
