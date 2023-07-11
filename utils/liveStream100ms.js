const host = "https://api.100ms.live";
const liveStream100ms = {
  host: host,
  activeSessions: `${host}/v2/sessions?active=true`,
  createRoomCode: `${host}/v2/room-codes/room`,
  listPeers: `${host}/v2/active-rooms`,
};

export default liveStream100ms;
