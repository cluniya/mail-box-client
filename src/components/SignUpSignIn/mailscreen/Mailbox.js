import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, ListGroup, Modal } from 'react-bootstrap';
import { useNavigate, useLocation } from 'react-router-dom';
import { fetchMails, fetchSentMails, markAsRead, deleteMail } from '../../../Store/mailSlice';
import './Mailbox.css'; // Add custom styles

const Mailbox = () => {
  const [selectedMail, setSelectedMail] = useState(null);
  const [showMailModal, setShowMailModal] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const currentUserEmail = useSelector((state) => state.auth.email);
  const mails = useSelector((state) => state.mail.mails);
  const sentMails = useSelector((state) => state.mail.sentMails);

  useEffect(() => {
    if (currentUserEmail) {
      if (location.pathname === '/sent') {
        dispatch(fetchSentMails(currentUserEmail));
      } else {
        dispatch(fetchMails(currentUserEmail));
      }
    }
  }, [currentUserEmail, dispatch, location.pathname]);

  const handleComposeClick = () => {
    navigate('/compose');
  };

  const handleMailClick = (mail) => {
    setSelectedMail(mail);
    setShowMailModal(true);
    if (!mail.read) {
      dispatch(markAsRead({ userEmail: currentUserEmail, mailId: mail.id }));
    }
  };

  const handleCloseModal = () => {
    setShowMailModal(false);
  };

  const handleDeleteMail = (mailId) => {
    dispatch(deleteMail({ userEmail: currentUserEmail, mailId }));
  };

  const mailList = location.pathname === '/sent' ? sentMails : mails;

  return (
    <div className="mailbox-container">
      <div className="mailbox-header">
        <h2>{location.pathname === '/sent' ? 'Sent' : 'Inbox'}</h2>
        <Button variant="primary" onClick={handleComposeClick}>
          Compose
        </Button>
      </div>
      <div className="mailbox-content">
        <div className="mail-list">
          <ListGroup>
            {mailList.map((mail) => (
              <ListGroup.Item
                key={mail.id}
                action
                onClick={() => handleMailClick(mail)}
                className={!mail.read ? 'unread-mail' : ''}
              >
                <strong>{mail.senderEmail}</strong> - {mail.subject}
                {!mail.read && <span className="blue-dot"></span>}
                <Button variant="danger" onClick={() => handleDeleteMail(mail.id)}>
                  Delete
                </Button>
              </ListGroup.Item>
            ))}
          </ListGroup>
        </div>
        <Modal show={showMailModal} onHide={handleCloseModal}>
          <Modal.Header closeButton>
            <Modal.Title>{selectedMail?.subject}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>{selectedMail?.content}</p>
            <p>From: {selectedMail?.senderEmail}</p>
            <p>{new Date(selectedMail?.timestamp).toLocaleString()}</p>
          </Modal.Body>
        </Modal>
      </div>
    </div>
  );
};

export default Mailbox;
