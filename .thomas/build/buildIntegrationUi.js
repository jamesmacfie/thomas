const { getWidgets } = require('./widgets');
const { getSettings } = require('./settings');

console.log('📦 Build integration UI - buidling widgets');
getWidgets();
console.log('🌈 Build integration UI - buidling settings');
getSettings();
console.log('✅ Build integration UI - complete');
