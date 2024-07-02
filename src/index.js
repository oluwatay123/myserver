const express = require('express');
const http = require('https');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

app.get('/api/hello', async (req, res) => {
    const getIpLocation = async () => {
        try {
            const ip = req.ip;
            const response = await fetch(`https://ipapi.co/${ip}/json/`);
            if (!response.ok) {
                throw new Error(`Failed to fetch IP location. Status: ${response.status}`);
            }
            const data = await response.json();
            console.log(data);
            return data;
        } catch (error) {
            console.error('Error fetching IP location:', error.message);
            return { error: error.message };
        }
    }

    const ipLocationData = await getIpLocation();
    console.log(ipLocationData)
    res.json(ipLocationData);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
