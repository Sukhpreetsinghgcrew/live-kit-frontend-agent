import React, { useState, useEffect } from 'react';
import { LiveKitRoom, VideoConference } from '@livekit/components-react';
import '@livekit/components-styles';
import axios from 'axios';

const serverUrl = 'wss://live-ai-agent-project-z0euvv6c.livekit.cloud';

const ConfirmDetail = () => {
  const [joined, setJoined] = useState(false);
  const [startCall, setStartCall] = useState(false);
  const [apiData, setApiData] = useState(null);
  const [livekitToken, setLivekitToken] = useState(null);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get('/api/some-endpoint');
        setApiData(res.data);
      } catch (err) {
        console.error('Failed to fetch backend data:', err);
      }
    };
    fetchData();
  }, []);

  const handleStartCall = async () => {
    try {
      const identity = `user-${Math.floor(Math.random() * 1000)}`;
      const res = await axios.get('http://127.0.0.1:5001/get-token', {
        params: { identity },
      });

      const { token } = res.data;
      setLivekitToken(token);
      setStartCall(true);
    } catch (error) {
      console.error('Error getting LiveKit token:', error);
    }
  };

  const backgroundGradient = darkMode
    ? 'linear-gradient(to bottom, #0f172a, #1e293b)'
    : 'linear-gradient(to bottom, #eef2ff, #c7d2fe)';

  return (
    <div
      style={{
        height: '100vh',
        background: backgroundGradient,
        display: 'flex',
        flexDirection: 'column',
        fontFamily: "'Segoe UI', sans-serif",
        color: darkMode ? '#f9fafb' : '#1f2937',
        transition: 'background 0.3s ease, color 0.3s ease',
      }}
    >
      {/* Dark Mode Toggle */}
      <div style={{ position: 'absolute', top: 20, right: 20 }}>
        <button
          onClick={() => setDarkMode(!darkMode)}
          style={{
            background: darkMode ? '#334155' : '#c7d2fe',
            color: darkMode ? '#f9fafb' : '#111827',
            border: 'none',
            padding: '0.5rem 1rem',
            borderRadius: '20px',
            cursor: 'pointer',
            fontWeight: '500',
            transition: 'all 0.3s ease',
          }}
        >
          {darkMode ? '🌙 Dark Mode' : '☀️ Light Mode'}
        </button>
      </div>

      {/* Header */}
      <header
        style={{
          padding: '2rem',
          backgroundColor: darkMode ? '#1e293b' : '#4338ca',
          color: 'white',
          textAlign: 'center',
          boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
        }}
      >
        <h1 style={{ fontSize: '2.5rem', fontWeight: '700', marginBottom: '0.3rem' }}>
          🤖 AI Learning Assistant
        </h1>
        <p style={{ fontSize: '1.1rem', opacity: 0.9 }}>
          Learn. Ask. Practice. Powered by AI.
        </p>
      </header>

      {/* Content */}
      <main
        style={{
          flex: 1,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          padding: '2rem',
        }}
      >
        <div
          style={{
            background: darkMode ? '#1e293b' : 'white',
            color: darkMode ? '#f9fafb' : '#111827',
            borderRadius: '20px',
            padding: '2.5rem 3rem',
            maxWidth: '700px',
            width: '100%',
            boxShadow: '0 12px 40px rgba(67, 56, 202, 0.1)',
            textAlign: 'center',
            transition: 'all 0.3s ease',
          }}
        >
          <h2 style={{ color: darkMode ? '#c084fc' : '#4338ca', marginBottom: '1.5rem', fontSize: '1.9rem', fontWeight: '600' }}>
            Ready to learn with your AI mentor?
          </h2>

          {apiData ? (
            <div
              style={{
                backgroundColor: darkMode ? '#334155' : '#f3f4f6',
                padding: '1.3rem',
                borderRadius: '12px',
                marginBottom: '1.5rem',
                textAlign: 'left',
                fontSize: '1rem',
                lineHeight: '1.7',
                border: `1px solid ${darkMode ? '#475569' : '#e5e7eb'}`,
              }}
            >
              <p><strong>👩‍🎓 Learner:</strong> {apiData.candidate_name || 'N/A'}</p>
              <p><strong>📘 Lesson:</strong> {apiData.job_title || 'N/A'}</p>
              <p><strong>🏫 Course:</strong> {apiData.company_name || 'N/A'}</p>
            </div>
          ) : (
            <p style={{ color: darkMode ? '#94a3b8' : 'gray', marginBottom: '1.5rem' }}>Loading course info…</p>
          )}

          {!startCall && (
            <button
              onClick={handleStartCall}
              style={{
                padding: '1rem 2.5rem',
                background: 'linear-gradient(to right, #6366f1, #4f46e5)',
                color: '#fff',
                fontSize: '1.1rem',
                fontWeight: '600',
                border: 'none',
                borderRadius: '14px',
                cursor: 'pointer',
                boxShadow: '0 8px 24px rgba(79, 70, 229, 0.3)',
                transition: 'all 0.3s ease',
              }}
              onMouseOver={(e) => (e.currentTarget.style.transform = 'scale(1.05)')}
              onMouseOut={(e) => (e.currentTarget.style.transform = 'scale(1)')}
            >
              🚀 Start Learning
            </button>
          )}
        </div>
      </main>

      {/* LiveKit Room */}
      {startCall && livekitToken && (
        <div style={{ flex: 1, backgroundColor: darkMode ? '#0f172a' : '#1e293b' }}>
          <LiveKitRoom
            token={livekitToken}
            serverUrl={serverUrl}
            connect={true}
            video={false}
            audio={true}
            onConnected={() => setJoined(true)}
            onDisconnected={() => setJoined(false)}
            onError={(e) => console.error('LiveKit: Error occurred:', e)}
            style={{ height: '100%' }}
          >
            {joined ? (
              <VideoConference />
            ) : (
              <div style={{ color: '#fff', textAlign: 'center', paddingTop: '2rem', fontSize: '1.2rem' }}>
                🎙 Connecting to your AI learning assistant...
              </div>
            )}
          </LiveKitRoom>
        </div>
      )}
    </div>
  );
};

export default ConfirmDetail;
