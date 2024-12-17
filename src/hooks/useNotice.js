import {useState, useEffect} from 'react';

export const useNotice = () => {

    const [notice, setNotice] = useState({
        isVisible: false,
        type: '',
        message: ''
    })

    const showNotice = (isVisible, type, message) => {
        setNotice({
            isVisible,
            type,
            message
        });
    }

    const dismissNotice = () => {
        setNotice({
            isVisible: false,
            type: '',
            message: ''
        })
    }

    // Automatically hide the notice after 4 seconds
    useEffect(() => {
        if (notice.isVisible) {
            const timer = setTimeout(() => {
                dismissNotice()
            }, 4000);

            return () => clearTimeout(timer);
        }
    }, [notice.isVisible]);

    return {notice, showNotice, dismissNotice}

}