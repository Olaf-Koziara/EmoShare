const WebSocket = require("ws");
const util = require("util");
const wss = new WebSocket.Server({ port: 5000, clientTracking: true });
wss.getUniqueID = function () {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }
  return s4() + s4() + "-" + s4();
};
wss.on("connection", (ws) => {
  ws.id = wss.getUniqueID();
  wss.clients.forEach((client) => {
    console.log(client.id);
    client.send(JSON.stringify({ uid: client.id }));
  });

  ws.on("message", (data) => {
    wss.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN && client !== ws) {
        const uid = JSON.parse(data).uid;

        if (uid === client.id) {
          client.send(data);
        }
      }
    });
  });
});
