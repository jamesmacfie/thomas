const { getWidgets } = require('./withIntegrations/widgets');
const { getSettings } = require('./withIntegrations/settings');

console.log('📦 Build integration UI - buidling widgets');
getWidgets();
console.log('🌈 Build integration UI - buidling settings');
getSettings();
console.log('✅ Build integration UI - complete');
