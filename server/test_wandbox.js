const axios = require('axios');

axios.post('https://wandbox.org/api/compile.json', {
    compiler: 'cpython-3.14.0',
    code: 'print("Hello World")',
    stdin: ''
}, { timeout: 15000 })
.then(r => console.log('SUCCESS:', JSON.stringify(r.data, null, 2)))
.catch(e => console.log('FAILED:', e.code, e.message, e.response?.status, e.response?.data));
