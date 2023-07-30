const host = "https://api.100ms.live";
const liveStream100ms = {
  host: host,
  createRoom: `${host}/v2/rooms`,
  createRoomCode: `${host}/v2/room-codes/room`,
  activeSessions: `${host}/v2/sessions?active=true`,
  listPeers: `${host}/v2/active-rooms`,
};

export default liveStream100ms;
