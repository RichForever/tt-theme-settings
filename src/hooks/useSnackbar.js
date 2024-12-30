import { useState, useEffect } from 'react';

export const useSnackbar = () => {
  const [snackbar, setSnackbar] = useState({
    isVisible: false,
    message: ''
  });

  const showSnackbar = (isVisible, message) => {
    setSnackbar({
      isVisible: isVisible,
      message: message
    });
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setSnackbar({
        isVisible: false,
        message: ''
      });
    }, 2000);

    return () => clearTimeout(timer);
  }, [snackbar]);

  return { snackbar, setSnackbar, showSnackbar };
};
