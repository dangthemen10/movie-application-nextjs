import { Paper, Toolbar, LinearProgress, Box } from '@mui/material';
import Navbar from '@/components/Layout/Navbar';
import { useEffect, useState } from 'react';

type Props = {
  isLoading: boolean;
};

const GlobalLoading: React.FC<Props> = ({ isLoading }: Props) => {
  const [progress, setProgress] = useState(0);
  const [buffer, setBuffer] = useState(25);

  useEffect(() => {
    const interval = setInterval(() => {
      if (progress === 100) {
        setProgress(90);
      } else if (progress < 75) {
        setProgress(70);
        setBuffer(100);
      } else if (progress < 50) {
        setProgress(49);
        setBuffer(75);
      } else {
        setProgress(25);
        setBuffer(50);
      }
    }, 500);

    return () => clearInterval(interval);
  }, []);
  return (
    <>
      <Paper
        sx={{
          opacity: isLoading ? 1 : 0,
          pointerEvents: 'none',
          transition: 'all .3s ease',
          position: 'fixed',
          width: '100vw',
          height: '100vh',
          zIndex: 999,
          background: '#141414'
        }}
      >
        <Navbar />
        <br />
        <Toolbar />
        <LinearProgress
          variant="buffer"
          value={progress}
          valueBuffer={buffer}
        />
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)'
          }}
        >
          <p className="font-bold text-5xl text-white animate-pulse">
            Flick.<span className="text-red-500">Flair</span>
          </p>
        </Box>
      </Paper>
    </>
  );
};

export default GlobalLoading;
