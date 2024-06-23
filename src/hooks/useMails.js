// src/hooks/useMails.js
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMails, fetchSentMails, markAsRead, deleteMail } from '../Store/mailSlice';

const useMails = (currentUserEmail, pathname) => {
  const dispatch = useDispatch();
  const mails = useSelector((state) => state.mail.mails);
  const sentMails = useSelector((state) => state.mail.sentMails);
  
  useEffect(() => {
    if (currentUserEmail) {
      if (pathname === '/sent') {
        dispatch(fetchSentMails(currentUserEmail));
      } else {
        dispatch(fetchMails(currentUserEmail));
      }
      const intervalId = setInterval(() => {
        if (pathname === '/sent') {
          dispatch(fetchSentMails(currentUserEmail));
        } else {
          dispatch(fetchMails(currentUserEmail));
        }
      }, 2000);
      return () => clearInterval(intervalId);
    }
  }, [currentUserEmail, dispatch, pathname]);

  return { mails, sentMails, markAsRead, deleteMail };
};

export default useMails;
