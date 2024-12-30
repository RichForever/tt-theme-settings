import { useState } from 'react';

export const useSnackbar = () => {
  const [notices, setNotices] = useState([]);

  const showSnackbar = (content) => {
    const notice = {
      id: Date.now().toString(),
      content,
      spokenMessage: content
    };

    setNotices((prevNotices) => [...prevNotices, notice]);
  };

  const onRemove = (id) => {
    setNotices((prevNotices) => prevNotices.filter((notice) => notice.id !== id));
  };

  return {
    notices,
    showSnackbar,
    onRemove
  };
};
