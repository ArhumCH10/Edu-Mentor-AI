import { ZegoUIKitPrebuilt } from '@zegocloud/zego-uikit-prebuilt';
import { useEffect, useRef } from 'react';

function randomID(len) {
  let result = '';
  if (result) return result;
  var chars = '12345qwertyuiopasdfgh67890jklmnbvcxzMNBVCZXASDQWERTYHGFUIOLKJP',
    maxPos = chars.length,
    i;
  len = len || 5;
  for (i = 0; i < len; i++) {
    result += chars.charAt(Math.floor(Math.random() * maxPos));
  }
  return result;
}

export function getUrlParams(url = window.location.href) {
  let urlStr = url.split('?')[1];
  return new URLSearchParams(urlStr);
}

export default function App() {
  const containerRef = useRef(null);

  useEffect(() => {
    const roomID = getUrlParams().get('roomID') || randomID(5);
    const meetContent = getUrlParams().get('meetContent') || "No Topic";

    const appID = 1727737219;
    const serverSecret = "58e68dd856752570b67e3073fb3051ff";
    const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(appID, serverSecret, roomID, randomID(5), randomID(5));

    const zp = ZegoUIKitPrebuilt.create(kitToken);
    zp.joinRoom({
      container: containerRef.current,
      sharedLinks: [
        {
          name: 'Personal link',
          url: window.location.protocol + '//' + 
               window.location.host + window.location.pathname +
               '?roomID=' + roomID + '&meetContent=' + encodeURIComponent(meetContent),
        },
      ],
      scenario: {
        mode: ZegoUIKitPrebuilt.GroupCall, 
      },
    });
  }, []);

  return (
    <div
      className="myCallContainer"
      ref={containerRef}
      style={{ width: '100vw', height: '100vh' }}
    ></div>
  );
}