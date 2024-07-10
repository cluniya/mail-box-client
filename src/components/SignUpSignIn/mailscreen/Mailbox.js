import React, { useState } from 'react';
import { Button, ListGroup, Modal, Container, Row, Col, Card } from 'react-bootstrap';
import { useNavigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import useMails from '../../../hooks/useMails';

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
    <Container fluid className="mt-4">
      <Row className="justify-content-center">
        <Col lg={8} md={10}>
          <Card className="shadow-sm">
            <Card.Header className="d-flex justify-content-between align-items-center">
              <h2 className="mb-0">{location.pathname === '/sent' ? 'Sent' : 'Inbox'}</h2>
              <Button variant="primary" onClick={handleComposeClick}>
                Compose
              </Button>
            </Card.Header>
            <Card.Body>
              <ListGroup variant="flush">
                {mailList.map((mail) => (
                  <ListGroup.Item
                    key={mail.id}
                    action
                    onClick={() => handleMailClick(mail)}
                    className={`d-flex justify-content-between align-items-center ${!mail.read ? 'bg-light' : ''}`}
                  >
                    <div>
                      <strong>{mail.senderEmail}</strong> - {mail.subject}
                      {!mail.read && <span className="badge bg-primary ms-2">New</span>}
                    </div>
                    <Button variant="danger" size="sm" onClick={() => handleDeleteMail(mail.id)}>
                      Delete
                    </Button>
                  </ListGroup.Item>
                ))}
              </ListGroup>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Modal show={showMailModal} onHide={handleCloseModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>{selectedMail?.subject}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>{selectedMail?.content}</p>
          <p><strong>From:</strong> {selectedMail?.senderEmail}</p>
          <p><strong>Received:</strong> {new Date(selectedMail?.timestamp).toLocaleString()}</p>
        </Modal.Body>
      </Modal>
    </Container>
  );
};

export default Mailbox;
