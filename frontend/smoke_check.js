const axios = require('axios');

// Try common dev / preview ports for frontend (3002, 3001 and 3000)
const FRONTEND_PORTS = [3002, 3001, 3000];
let FRONTEND = null;
for (const p of FRONTEND_PORTS) {
  try { new URL(`http://localhost:${p}/`); FRONTEND = `http://localhost:${p}/`; break; } catch (e) {}
}
if (!FRONTEND) FRONTEND = 'http://localhost:3000/';
const API = 'http://127.0.0.1:8000/api/projects/';

(async () => {
  try {
    console.log('Checking frontend (GET /)...');
    const r1 = await axios.get(FRONTEND, { timeout: 5000 });
    if (r1.status === 200 && r1.data.includes('<title>Flipr Studio</title>')) {
      console.log('✅ Frontend index.html served and title found');
    } else {
      console.warn('⚠️ Frontend served but title not found (check content)');
    }
  } catch (err) {
    console.error('❌ Frontend check failed:', err.message);
  }

  try {
    console.log('Checking API (GET /api/projects/) ...');
    const r2 = await axios.get(API, { timeout: 5000 });
    if (r2.status === 200) {
      console.log(`✅ API reachable, returned ${Array.isArray(r2.data) ? r2.data.length : 'unknown'} items`);
    } else {
      console.warn('⚠️ API returned non-200 status', r2.status);
    }
  } catch (err) {
    console.error('❌ API check failed:', err.message);
  }
})();
