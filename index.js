const fs = require('fs');

console.log('---------> I am alive!');

// Creates a new WebSocket connection to the specified URL.
const socket = new WebSocket('wss://echo.websocket.org');

// Executes when the connection is successfully established.
socket.addEventListener('open', () => {
  console.log('WebSocket connection established!');
  // Sends a message to the WebSocket server.
  const data = { type: 'message', content: 'Hello from Node.js!' };
  socket.send(JSON.stringify(data));
});

// Listen for messages and executes when a message is received from the server.
socket.addEventListener('message', event => {
  try {
    // this just makes sure that the data is in JSON format
    const receivedData = JSON.parse(event.data);
    console.log('Received JSON success:', receivedData);

    const filename = 'received_data.json';

    // file needs data to be a string - you will need to get what you want out
    const dataForFile = JSON.stringify(receivedData);

    fs.writeFile(filename, JSON.stringify(dataForFile), (err) => {
    if (err) {
      console.error('Error writing to file:', err);
    } else {
      console.log(`Data written to ${filename}`);
    }
  });
  } catch (error) {
    console.error('Error parsing JSON:', error);
    console.log('Received data was:', event.data);
  }
});

// Executes when the connection is closed, providing the close code and reason.
socket.addEventListener('close', event => {
  console.log('WebSocket connection closed:', event.code, event.reason);
});

// Executes if an error occurs during the WebSocket communication.
socket.addEventListener('error', error => {
  console.error('WebSocket error:', error);
});

