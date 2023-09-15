const XLSX = require('xlsx');
const workbook = XLSX.readFile('nse.xlsx');
const worksheet = workbook.Sheets['Sheet1']; // Replace 'Sheet1' with your sheet name

// Define a function to get data from Excel
function getDataFromExcel() {
  return XLSX.utils.sheet_to_json(worksheet);
}


const WebSocket = require('ws');
const wss = new WebSocket.Server({ port: 8080 }); // WebSocket server port

// Define a function to send data to connected clients
function sendDataToClients() {
  const data = getDataFromExcel();
  wss.clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(JSON.stringify(data));
    }
  });
}

// Periodically send updates to clients (adjust the interval as needed)
setInterval(sendDataToClients, 1000); // Send updates every 1 second




const express = require('express');
const app = express();

// Define a route to serve the HTML/JavaScript client
app.get('/api', (req, res) => {
  res.sendFile(__dirname + '/client.html'); // Create this HTML file
});

// Start the Express server
const server = app.listen(3000, () => {
  console.log('API Server is running on port 3000');
});
