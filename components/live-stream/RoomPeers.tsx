"use client";
import { useEffect, useState } from "react";
import axios from "axios";

const RoomPeers = ({ roomId }: { roomId: string }) => {
  const [roomPeer, setRoomPeer] = useState({
    peers: {
      id: "",
      joined_at: "",
      metadata: "",
      name: "",
      role: "",
      user_id: "",
    },
  });

  useEffect(() => {
    if (roomId) {
      const fetchPeers = async () => {
        await axios
          .post(
            "/api/live-stream/room-peers",
            { roomId },
            {
              headers: { "Content-Type": "application/json" },
            }
          )
          .then((res) => setRoomPeer(res.data));
      };
      fetchPeers();

      // const intervalId = setInterval(fetchPeers, 5000);
      // return () => clearInterval(intervalId);
    }
  }, [roomId]);

  return <div>{Object.keys(roomPeer.peers).length - 1}</div>;
};

export default RoomPeers;
