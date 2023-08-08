import React from 'react';
import { Button, Typography } from '@mui/material';

const StartScreen = ({ onStartQuiz }) => {
  const currentYear = new Date().getFullYear();

  return (
    <div
      style={{
        background: 'linear-gradient(to bottom right, #a8c0ff, #3f2b96)',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '2rem',
      }}
    >
      <div
        style={{
          background: 'white',
          padding: '2rem',
          borderRadius: '12px',
          textAlign: 'center',
        }}
      >
        <Typography variant="h1" style={{ fontSize: '2.5rem', marginBottom: '1rem', color: '#3f2b96' }}>
          Are you ready to start your quiz?
        </Typography>
        <Button
          variant="contained"
          style={{
            padding: '1rem 4rem',
            fontSize: '1.5rem',
            borderRadius: '8px',
            backgroundColor: '#3f2b96',
            color: 'white',
            fontWeight: 'bold',
          }}
          onClick={onStartQuiz}
        >
          Start my quiz
        </Button>
      </div>

      <div
        style={{
          marginTop: '2rem',
          color: 'white',
          textAlign: 'center',
          fontSize: '1rem',
        }}
      >
        Copyright ©️ Laiba Sheikh {currentYear}
      </div>
    </div>
  );
};

export default StartScreen;
