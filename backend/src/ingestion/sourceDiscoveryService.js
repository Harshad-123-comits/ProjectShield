const fs = require('fs');
const path = require('path');

const CATALOG_PATH = path.join(__dirname, '../../data/paimana/source_catalog.json');

exports.getCatalog = () => {
    if (!fs.existsSync(CATALOG_PATH)) return [];
    return JSON.parse(fs.readFileSync(CATALOG_PATH, 'utf8'));
};

exports.updateSourceStatus = (sourceId, status) => {
    const catalog = this.getCatalog();
    const source = catalog.find(s => s.sourceId === sourceId);
    if (source) {
        source.status = status;
        fs.writeFileSync(CATALOG_PATH, JSON.stringify(catalog, null, 2));
    }
};

exports.addDiscoveredSource = (sourceData) => {
    const catalog = this.getCatalog();
    if (!catalog.find(s => s.sourceId === sourceData.sourceId)) {
        catalog.push({
            ...sourceData,
            discoveredAt: new Date().toISOString(),
            status: 'DISCOVERED'
        });
        fs.writeFileSync(CATALOG_PATH, JSON.stringify(catalog, null, 2));
    }
};
