import React, { useState } from "react";
import { Form, InputGroup, Button } from "react-bootstrap";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
// import { useSelector } from "react-redux";

const EmailEditor = () => {
  const [editorState, setEditorState] = useState(null);
  const [toEmail, setToEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [sending, setSending] = useState(false);
  const [sendError, setSendError] = useState(null);
//   const currentUserEmail = useSelector((state) => state.auth.email);
  const currentUserEmail = 'chandan@test.com'

  const handleEditorStateChange = (editorState) => {
    setEditorState(editorState);
  };

  const handleSendEmail = async () => {
    if (!editorState) return; // Prevent sending empty emails

    const content = editorState.getCurrentContent().getPlainText("\u0001"); // Get plain text content
    const timestamp = new Date().toISOString(); // Timestamp in ISO format

    const emailData = {
      senderEmail: currentUserEmail,
      receiverEmail: toEmail,
      subject: subject,
      content: content,
      timestamp: timestamp,
    };

    try {
      setSending(true);
      console.log(emailData);

      // Send email to receiver's inbox
      const response1 = await fetch(
        `https://mail-box-client-33a30-default-rtdb.firebaseio.com/emails/${toEmail.split("@")[0]}/inbox.json`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(emailData),
        }
      );

      if (!response1.ok) {
        throw new Error("Failed to send email to receiver.");
      }

      // Send email to sender's sentbox
      const response2 = await fetch(
        `https://mail-box-client-33a30-default-rtdb.firebaseio.com/emails/${currentUserEmail.split("@")[0]}/sent.json`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(emailData),
        }
      );

      if (!response2.ok) {
        throw new Error("Failed to store email in sentbox.");
      }

      // Reset form after successful send
      setEditorState(null);
      setToEmail("");
      setSubject("");
      setSendError(null);
    } catch (error) {
      console.error("Error sending email:", error);
      setSendError("Failed to send email. Please try again.");
    } finally {
      setSending(false);
    }
  };

  return (
    <Form onSubmit={(e) => e.preventDefault()} className="p-3 mt-5 mt-lg-0">
      <InputGroup className="mb-3">
        <InputGroup.Text id="basic-addon1">To</InputGroup.Text>
        <Form.Control
          type="email"
          placeholder="example@gmail.com"
          value={toEmail}
          onChange={(e) => setToEmail(e.target.value)}
          required
        />
      </InputGroup>
      <InputGroup className="mb-3">
        <InputGroup.Text id="basic-addon2">Subject</InputGroup.Text>
        <Form.Control
          type="text"
          placeholder=""
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          required
        />
      </InputGroup>
      <Form.Group className="mb-3" controlId="textEditor">
        <Editor
          toolbarClassName="py-3 border-bottom bg-light"
          wrapperClassName="card mt-3"
          editorClassName="card-body pt-0"
          editorStyle={{ minHeight: "15rem" }}
          editorState={editorState}
          onEditorStateChange={handleEditorStateChange}
        />
      </Form.Group>
      <div>
        <Button
          type="button"
          variant="danger"
          className="bg-gradient shadow rounded-0 px-4"
          onClick={handleSendEmail}
          disabled={sending}
        >
          {sending ? "Sending..." : "Send Email"}
        </Button>
        {sendError && <p className="text-danger mt-2">{sendError}</p>}
      </div>
    </Form>
  );
};

export default EmailEditor;
