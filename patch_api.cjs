const fs = require('fs');
const path = 'src/services/api.ts';
let content = fs.readFileSync(path, 'utf-8');

const safeFetchLogic = `
const safeFetch = async (url: string) => {
  try {
    const res = await fetch(url);
    const contentType = res.headers.get("content-type");
    if (contentType && contentType.indexOf("application/json") !== -1) {
      const data = await res.json();
      if (!res.ok) {
        return { success: false, message: data.message || \`HTTP \${res.status}\`, errorCode: data.errorCode || \`HTTP_\${res.status}\` };
      }
      return data;
    } else {
      const text = await res.text();
      return { success: false, message: \`Unexpected response format (HTTP \${res.status})\`, errorCode: 'INVALID_FORMAT' };
    }
  } catch (err: any) {
    return { success: false, message: err.message || 'Network error', errorCode: 'NETWORK_ERROR' };
  }
};
`;

if (!content.includes('safeFetch')) {
  content = content.replace("export const api = {", safeFetchLogic + "\nexport const api = {");
  
  // Replace all fetch calls
  content = content.replace(/const res = await fetch\(`\$\{API_BASE_URL\}(.*?)`\);\n\s*return res\.json\(\);/g, "return await safeFetch(`${API_BASE_URL}$1`);");
  fs.writeFileSync(path, content, 'utf-8');
  console.log('Patched api.ts with safeFetch.');
} else {
  console.log('Already patched.');
}
