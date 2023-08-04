import jwt from "jsonwebtoken";
import uuid4 from "uuid4";

const host = "https://api.100ms.live";
const liveStream100ms = {
  host: host,
  createRoom: `${host}/v2/rooms`,
  createRoomCode: `${host}/v2/room-codes/room`,
  activeSessions: `${host}/v2/sessions?active=true`,
  listPeers: `${host}/v2/active-rooms`,
  async getManagementToken() {
    const app_access_key = process.env.NEXT_PUBLIC_100MS_APP_ACCESS_KEY;
    const app_secret = process.env.NEXT_PUBLIC_100MS_APP_SECRET;
    const payload = {
      access_key: app_access_key,
      type: "management",
      version: 2,
      iat: Math.floor(Date.now() / 1000),
      nbf: Math.floor(Date.now() / 1000),
    };

    return new Promise((resolve, reject) => {
      jwt.sign(
        payload,
        app_secret,
        {
          algorithm: "HS256",
          expiresIn: "24h",
          jwtid: uuid4(),
        },
        function (err, token) {
          if (err) {
            console.error(err);
            reject(err);
            return;
          }
          resolve(token);
        }
      );
    });
  },
};

export default liveStream100ms;
