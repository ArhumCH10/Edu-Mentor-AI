import { ZegoUIKitPrebuilt } from '@zegocloud/zego-uikit-prebuilt';
import { useEffect, useRef } from 'react';
import { useLocation ,useNavigate } from 'react-router-dom';

function randomID(len) {
  let result = '';
  var chars = '12345qwertyuiopasdfgh67890jklmnbvcxzMNBVCZXASDQWERTYHGFUIOLKJP',
    maxPos = chars.length;
  len = len || 5;
  for (let i = 0; i < len; i++) {
    result += chars.charAt(Math.floor(Math.random() * maxPos));
  }
  return result;
}

export function getUrlParams(url = window.location.href) {
  let urlStr = url.split('?')[1];
  return new URLSearchParams(urlStr);
}

export default function Calling() {
  const containerRef = useRef(null);
  const location = useLocation();
  // Generate a unique ID for the presenter
  const role = location?.state?.userRole;
  const Name = location?.state?.name;
  const Id = location?.state?.Id;
  const ProfilePhoto = location?.state?.picture;
  const topic = location?.state?.Topic;
  const quizOutline = location?.state?.QuizOutline;
 
  const nav = useNavigate();
  useEffect(() => {
    if (role === 'student') {
      console.log(location?.state)
      if ( quizOutline) {
        console.log('Take Quiz must');
      }
    }
    const urlParams = getUrlParams();
    const roomID = urlParams.get('roomID') || randomID(5);
    const meetContent = urlParams.get('meetContent') || "No Topic";
    const appID = 1727737219;
    const serverSecret = "58e68dd856752570b67e3073fb3051ff";
    const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(appID, serverSecret, roomID, Id, Name,60);
    const zp = ZegoUIKitPrebuilt.create(kitToken);
    

    zp.joinRoom({
      container: containerRef.current,
      showPreJoinView: false,
      showInviteToCohostButton: true,
      showRemoveCohostButton: true,
      showRemoveUserButton: true,
      showLeaveRoomConfirmDialog: true,
      showTextChat: false,
      showMyCameraToggleButton: true, 
        showMyMicrophoneToggleButton: true,
      showAudioVideoSettingsButton: true,
      autoHideFooter: true,
      showRoomTimer: true,
      enableUserSearch: true,
      showLeavingView: true,
      maxUsers: 2,
      showTurnOffRemoteCameraButton: true,
      branding: {
        logoURL: './logo.png'
      },
      sharedLinks: [
        {
          name: 'Personal link',
          url: `${window.location.protocol}//${window.location.host}${window.location.pathname}?roomID=${roomID}&meetContent=${encodeURIComponent(meetContent)}`,
        },
      ],
      scenario: {
        mode: ZegoUIKitPrebuilt.GroupCall,
      },
      onUserJoin: (users) => {
        console.log('User(s) joined:', users.map(user => user.userID));
      },
      
      onUserLeave: (users) => {
        console.log('User(s) left:', users.map(user => user.userID));
        if (users.length === 1) {

          zp.destroy();
          if ( quizOutline) {
            nav('/quiz', { state: { topic, quizOutline } });
            
          } else {
            setTimeout(() => {
              window.location.href = 'http://localhost:5173/studentdashboard/dashboard';
            }, 3000);}
          if (role === 'student') {
            window.location.href = 'http://localhost:5173/studentdashboard/dashboard';
            
          } else {
            window.location.href = 'http://localhost:5173/dashboardlinks/Dashboard';

            
          }
        }
      },
      onUserAvatarSetter: (users) => {
        users.forEach(user => {
          if (user.userID === Id) {
            user.setUserAvatar(ProfilePhoto);
          }
        });
      },
      onLeaveRoom: () => {
        console.log('user left id:', Id);
        if (role === 'student') {
          console.log('in condition of student role: status of topic and quizOutline', topic, quizOutline)
          if (quizOutline) {
            console.log('studend must go for a quiz');
            nav('/quiz', { state: { topic, quizOutline } });
            
          } else {
            setTimeout(() => {
             // window.location.href = 'http://localhost:5173/studentdashboard/dashboard';
            }, 3000);}
        } else {
          // console.log('move to teacher');
          setTimeout(() => {
           // window.location.href = 'http://localhost:5173/dashboardlinks/Dashboard';
           
          }, 3000);
        }
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
