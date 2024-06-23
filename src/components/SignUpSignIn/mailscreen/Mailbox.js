// src/components/SignUpSignIn/mailscreen/Mailbox.js
import React, { useState } from 'react';
import { Button, ListGroup, Modal } from 'react-bootstrap';
import { useNavigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import useMails from '../../../hooks/useMails';
import './Mailbox.css'; // Add custom styles

const Mailbox = () => {
  const [selectedMail, setSelectedMail] = useState(null);
  const [showMailModal, setShowMailModal] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const currentUserEmail = useSelector((state) => state.auth.email);

  const { mails, sentMails, markAsRead, deleteMail } = useMails(currentUserEmail, location.pathname);

  const handleComposeClick = () => {
    navigate('/compose');
  };

  const handleMailClick = (mail) => {
    setSelectedMail(mail);
    setShowMailModal(true);
    if (!mail.read) {
      markAsRead({ userEmail: currentUserEmail, mailId: mail.id });
    }
  };

  const handleCloseModal = () => {
    setShowMailModal(false);
  };

  const handleDeleteMail = (mailId) => {
    deleteMail({ userEmail: currentUserEmail, mailId });
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
