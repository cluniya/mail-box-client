import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import './Mailbox.css'; // Add custom styles

const Mailbox = () => {
  const [mails, setMails] = useState([]);
  const [selectedMail, setSelectedMail] = useState(null);
//   const currentUserEmail = useSelector((state) => state.auth.email);
  const currentUserEmail = "chandan1@test.com";
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMails = async () => {
      try {
        const response = await fetch(`https://mail-box-client-33a30-default-rtdb.firebaseio.com/emails/${currentUserEmail.split('@')[0]}/inbox.json`);
        if (response.ok) {
          const data = await response.json();
          const loadedMails = [];
          for (const key in data) {
            loadedMails.push({ id: key, ...data[key] });
          }
          setMails(loadedMails);
        } else {
          throw new Error('Failed to fetch emails.');
        }
      } catch (error) {
        console.error('Error fetching emails:', error);
      }
    };

    fetchMails();
  }, [currentUserEmail]);

  const handleComposeClick = () => {
    navigate('/compose');
  };

  const handleMailClick = (mail) => {
    setSelectedMail(mail);
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
          <ul className="list-group">
            {mails.map((mail) => (
              <li
                key={mail.id}
                className="list-group-item"
                onClick={() => handleMailClick(mail)}
              >
                <strong>{mail.senderEmail}</strong> - {mail.subject}
              </li>
            ))}
          </ul>
        </div>
        <div className="mail-details">
          {selectedMail ? (
            <div>
              <h5>{selectedMail.subject}</h5>
              <p>{selectedMail.content}</p>
              <small>From: {selectedMail.senderEmail}</small><br />
              <small>{new Date(selectedMail.timestamp).toLocaleString()}</small>
            </div>
          ) : (
            <p>Select an email to read</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Mailbox;
