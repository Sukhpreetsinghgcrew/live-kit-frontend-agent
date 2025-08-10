import React, { useState } from 'react';
import { LiveKitRoom, VideoConference } from '@livekit/components-react';
import '@livekit/components-styles';
import axios from 'axios';

// const serverUrl = 'wss://live-ai-agent-project-z0euvv6c.livekit.cloud';
//const serverUrl = 'ws://localhost:7880'
const serverUrl='wss://fair-hidden-birmingham-taking.trycloudflare.com'
const tokenEndpoint = 'https://usual-haven-generation-avenue.trycloudflare.com/get-token';

function App() {
  const [token, setToken] = useState(null);
  const [room, setRoom] = useState(null);
  const [identity, setIdentity] = useState(null);

  const joinRoom = async () => {
    try {
      const identity = `user-${Math.floor(Math.random() * 1000)}`;
      const res = await axios.get(tokenEndpoint, {
        params: {
          identity,
          room: 'global-room',
        },
      });

      setToken(res.data.token);
      setRoom(res.data.room);
      setIdentity(res.data.identity);
    } catch (err) {
      console.error('Failed to join room:', err);
      alert('Could not get token. Check if backend is running.');
    }
  };

  return (
    <div style={{ height: '100vh' }}>
      {!token ? (
        <div style={{ textAlign: 'center', paddingTop: '4rem' }}>
          <h1>🌐 Global Room</h1>
          <button
            onClick={joinRoom}
            style={{
              padding: '1rem 2rem',
              fontSize: '1.2rem',
              backgroundColor: '#2563eb',
              color: 'white',
              borderRadius: '8px',
              border: 'none',
              cursor: 'pointer',
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
            }}
          >
            Join Now
          </button>
        </div>
      ) : (
        <LiveKitRoom
          token={token}
          serverUrl={serverUrl}
          connect={true}
          video={true}
          audio={true}
          data-lk-theme="default"
          style={{ height: '100%' }}
        >
          <VideoConference />
        </LiveKitRoom>
      )}
    </div>
  );
}

export default App;
