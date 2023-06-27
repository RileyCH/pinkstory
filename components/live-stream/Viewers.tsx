import { useHMSStore, selectPeers } from "@100mslive/react-sdk";

const Viewers = () => {
  const peers = useHMSStore(selectPeers);
  return <div>觀看人數 {peers.length > 1 ? peers.length - 1 : 0} 人</div>;
};

export default Viewers;
