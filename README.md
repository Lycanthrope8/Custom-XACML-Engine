# XACML Web Application with Role-Based Access Control (RBAC)

## Overview

This web application demonstrates the use of XACML (eXtensible Access Control Markup Language) for implementing Role-Based Access Control (RBAC). The application allows you to add policies, set attributes, and enforce access controls based on defined policies.

## Installation

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/Lycanthrope8/Custom-XACML-Engine.git
   cd Custom-XACML-Engine
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **Start the Server**:
   ```bash
   npm start
   ```

4. **Access the Application**:
   Open your browser and navigate to [http://localhost:3000](http://localhost:3000).

## Directory Structure

```
.
├── app.js
├── pap.js
├── pip.js
├── pdp.js
├── pep.js
├── policies/
│   └── <policyId>.xml
├── public/
│   ├── index.html
│   └── script.js
└── attributes.json
```

## Files and Their Purpose

### app.js

This is the main server file that sets up the Express application, handles API endpoints, and serves the static HTML file.

- **Endpoints**:
  - `POST /api/policy`: Adds a new policy.
  - `POST /api/attribute`: Sets an attribute for a subject.
  - `POST /api/enforce`: Enforces access control based on the policies and attributes.

### pap.js

The Policy Administration Point (PAP) class handles storing and retrieving policies from the local file system.

- **Methods**:
  - `addPolicy(policyId, policyXml)`: Adds a new policy with the given ID and XML content.
  - `getPolicy(policyId)`: Retrieves a policy by its ID.
  - `getAllPolicies()`: Retrieves all policies.

### pip.js

The Policy Information Point (PIP) class manages attributes of subjects, storing them in a JSON file.

- **Methods**:
  - `setAttribute(subjectId, attributeId, attributeValue)`: Sets an attribute for a subject.
  - `getAttribute(subjectId, attributeId)`: Retrieves a specific attribute for a subject.
  - `getRoles(subjectId)`: Retrieves all roles assigned to a subject.

### pdp.js

The Policy Decision Point (PDP) class evaluates access requests against the stored policies and attributes.

- **Methods**:
  - `evaluate(request)`: Evaluates an access request against all policies.
  - `evaluatePolicy(policy, request)`: Evaluates a specific policy against an access request.
  - `matchRule(rule, request)`: Checks if a rule matches an access request.

### pep.js

The Policy Enforcement Point (PEP) class interacts with the PDP to enforce access decisions.

- **Methods**:
  - `enforce(subject, action, resource)`: Enforces access control by evaluating an access request.

### public/index.html

The main HTML file for the web application interface. It includes forms for adding policies, setting attributes, and enforcing access.

### public/script.js

The JavaScript file for handling the client-side logic, including making API requests to add policies, set attributes, and enforce access.

- **Functions**:
  - `addPolicy()`: Sends a request to add a new policy.
  - `setAttributeInPIP()`: Sends a request to set an attribute.
  - `enforceAccess()`: Sends a request to enforce access and displays the decision.

### attributes.json

Stores attributes associated with subjects, managed by the PIP class.

## Usage

1. **Add Policy**:
   - Enter the policy XML and a unique policy ID.
   - Click "Add Policy" to save the policy.

2. **Set Attribute**:
   - Enter the subject ID, attribute ID, and attribute value.
   - Click "Set Attribute" to save the attribute.

3. **Enforce Access**:
   - Enter the subject, action, and resource.
   - Click "Enforce Access" to check if the access is permitted or denied.

## Notes

- Policies are stored in the `policies` directory with filenames based on the policy ID.
- Attributes are stored in a JSON file named `attributes.json` in the root directory.
- The application uses `xml2js` for parsing XML policies and `fs` for file system operations.

This documentation provides a brief overview of the files and their purposes, how to use the application, and instructions for running the application.
