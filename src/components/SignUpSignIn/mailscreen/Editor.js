// // src/components/EmailEditor.js
// import React, { useState } from 'react';
// import { EditorState, convertToRaw, ContentState } from 'draft-js';
// import { Editor } from 'react-draft-wysiwyg';
// // import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
// import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'
// import firebase from 'firebase/app';
// import 'firebase/firestore';

// const EmailEditor = () => {
//   const [editorState, setEditorState] = useState(EditorState.createEmpty());

//   const onEditorStateChange = (editorState) => {
//     setEditorState(editorState);
//   };

//   const handleSendEmail = async () => {
//     // Convert editorState to raw text
//     const contentState = editorState.getCurrentContent();
//     const rawText = JSON.stringify(convertToRaw(contentState));

//     try {
//       // Example: Sending email to Firestore
//       const db = firebase.firestore();
//       const emailsRef = db.collection('emails');

//       // Example email data
//       const emailData = {
//         senderId: 'sender@example.com', // Replace with actual sender ID
//         receiverId: 'receiver@example.com', // Replace with actual receiver ID
//         content: rawText,
//         timestamp: firebase.firestore.FieldValue.serverTimestamp(),
//       };

//       // Save email to Firestore
//       await emailsRef.add(emailData);

//       alert('Email sent successfully!');
//       setEditorState(EditorState.createEmpty()); // Clear editor after sending
//     } catch (error) {
//       console.error('Error sending email:', error);
//       alert('Failed to send email. Please try again.');
//     }
//   };

//   return (
//     <div>
//       <h2>Email Editor</h2>
//       <Editor
//         editorState={editorState}
//         wrapperClassName="wrapperClassName"
//         editorClassName="editorClassName"
//         toolbarClassName="toolbarClassName"
//         onEditorStateChange={onEditorStateChange}
//       />
//       <button onClick={handleSendEmail}>Send Email</button>
//     </div>
//   );
// };

// export default EmailEditor;
