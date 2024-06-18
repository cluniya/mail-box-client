import React, { useEffect,useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, ListGroup, Modal } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { fetchMails,markAsRead } from '../../../Store/mailSlice';
import './Mailbox.css'; // Add custom styles

const Mailbox = () => {
  const [selectedMail, setSelectedMail] = useState(null);
  const [showMailModal, setShowMailModal] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const currentUserEmail = useSelector((state) => state.auth.email);
  const mails = useSelector((state) => state.mail.mails);

  useEffect(() => {
    if (currentUserEmail) {
      dispatch(fetchMails(currentUserEmail));
    }
  }, [currentUserEmail, dispatch]);

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

  return (
    <div className="mailbox-container">
      <div className="mailbox-header">
        <h2>Inbox</h2>
        <Button variant="primary" onClick={handleComposeClick}>
          Compose
        </Button>
      </div>
      <div className="mailbox-content">
        <div className="mail-list">
          <ListGroup>
            {mails.map((mail) => (
              <ListGroup.Item
                key={mail.id}
                action
                onClick={() => handleMailClick(mail)}
                className={!mail.read ? 'unread-mail' : ''}
              >
                <strong>{mail.senderEmail}</strong> - {mail.subject}
                {!mail.read && <span className="blue-dot"></span>}
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
