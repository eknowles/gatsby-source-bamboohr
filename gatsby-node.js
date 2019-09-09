const fetch = require('node-fetch');

exports.sourceNodes = async ({ actions, createNodeId, createContentDigest }, pluginOptions) => {
  const { createNode } = actions;

  const processEmployee = (employee) => {
    const nodeId = createNodeId(`bamboohr-employee-${employee.id}`);
    const content = { ...employee, bambooId: employee.id };
    return {
      ...content,
      id: nodeId,
      parent: null,
      children: [],
      internal: {
        type: `BambooEmployee`,
        content: JSON.stringify(content),
        contentDigest: createContentDigest(content),
      },
    }
  };

  const response = await fetch(
    `https://api.bamboohr.com/api/gateway.php/${pluginOptions.subdomain}/v1/employees/directory`,
    {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: `Basic ${Buffer.from(`${pluginOptions.apiKey}:x`).toString('base64')}`,
      }
    }
  );

  const { employees } = await response.json();

  employees.forEach(employee => createNode(processEmployee(employee)));
};
