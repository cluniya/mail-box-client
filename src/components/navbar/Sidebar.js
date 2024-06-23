// src/components/navbar/Sidebar.js
import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Sidebar.css';  // Add custom styles

const Sidebar = ({ showSidebar }) => {
  const unreadCount = useSelector((state) => state.mail.mails.filter((mail) => !mail.read).length);

  return (
    <div className={`bg-white sidebar ${showSidebar ? 'd-block' : 'd-none'}`} style={{ width: '250px', position: 'absolute', height: '100%', margin: '5px', zIndex: 1000 }}>
      <div className="position-sticky">
        <div className="list-group list-group-flush mx-3 mt-4">
          <NavLink to="/inbox" className="list-group-item list-group-item-action py-2 ripple">
            <i className="fas fa-inbox fa-fw me-3"></i><span>Inbox</span>
            {unreadCount > 0 && <span className="badge bg-danger float-end">{unreadCount}</span>}
          </NavLink>
          <NavLink to="/unread" className="list-group-item list-group-item-action py-2 ripple">
            <i className="fas fa-envelope-open-text fa-fw me-3"></i><span>Unread</span>
          </NavLink>
          <NavLink to="/starred" className="list-group-item list-group-item-action py-2 ripple">
            <i className="fas fa-star fa-fw me-3"></i><span>Starred</span>
          </NavLink>
          <NavLink to="/drafts" className="list-group-item list-group-item-action py-2 ripple">
            <i className="fas fa-file-alt fa-fw me-3"></i><span>Drafts</span>
          </NavLink>
          <NavLink to="/sent" className="list-group-item list-group-item-action py-2 ripple">
            <i className="fas fa-paper-plane fa-fw me-3"></i><span>Sent</span>
          </NavLink>
          <NavLink to="/archive" className="list-group-item list-group-item-action py-2 ripple">
            <i className="fas fa-archive fa-fw me-3"></i><span>Archive</span>
          </NavLink>
          <NavLink to="/spam" className="list-group-item list-group-item-action py-2 ripple">
            <i className="fas fa-exclamation-circle fa-fw me-3"></i><span>Spam</span>
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
