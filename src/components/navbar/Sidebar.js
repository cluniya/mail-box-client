import React from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Sidebar.css';  // Import custom CSS for Sidebar

const Sidebar = ({ showSidebar }) => {
  const mails = useSelector((state) => state.mail.mails);
  const unreadCounts = {
    inbox: mails.filter(mail => !mail.read).length,
    unread: mails.filter(mail => !mail.read).length,
    starred: mails.filter(mail => mail.starred && !mail.read).length,
    drafts: mails.filter(mail => mail.draft && !mail.read).length,
    sent: mails.filter(mail => mail.sent && !mail.read).length,
    archive: mails.filter(mail => mail.archived && !mail.read).length,
    spam: mails.filter(mail => mail.spam && !mail.read).length,
  };

  return (
    <div className={`bg-white sidebar ${showSidebar ? 'd-block' : 'd-none'}`} style={{ width: '250px', position: 'absolute', height: '100%', margin: '5px', zIndex: 1000 }}>
      <div className="position-sticky">
        <div className="list-group list-group-flush mx-3 mt-4">
          <NavLink to="/inbox" className="list-group-item list-group-item-action py-2 ripple">
            <i className="fas fa-inbox fa-fw me-3"></i>
            <span>Inbox {unreadCounts.inbox > 0 && <span>({unreadCounts.inbox})</span>}</span>
          </NavLink>
          <NavLink to="/unread" className="list-group-item list-group-item-action py-2 ripple">
            <i className="fas fa-envelope-open-text fa-fw me-3"></i>
            <span>Unread {unreadCounts.unread > 0 && <span>({unreadCounts.unread})</span>}</span>
          </NavLink>
          <NavLink to="/starred" className="list-group-item list-group-item-action py-2 ripple">
            <i className="fas fa-star fa-fw me-3"></i>
            <span>Starred {unreadCounts.starred > 0 && <span>({unreadCounts.starred})</span>}</span>
          </NavLink>
          <NavLink to="/drafts" className="list-group-item list-group-item-action py-2 ripple">
            <i className="fas fa-file-alt fa-fw me-3"></i>
            <span>Drafts {unreadCounts.drafts > 0 && <span>({unreadCounts.drafts})</span>}</span>
          </NavLink>
          <NavLink to="/sent" className="list-group-item list-group-item-action py-2 ripple">
            <i className="fas fa-paper-plane fa-fw me-3"></i>
            <span>Sent {unreadCounts.sent > 0 && <span>({unreadCounts.sent})</span>}</span>
          </NavLink>
          <NavLink to="/archive" className="list-group-item list-group-item-action py-2 ripple">
            <i className="fas fa-archive fa-fw me-3"></i>
            <span>Archive {unreadCounts.archive > 0 && <span>({unreadCounts.archive})</span>}</span>
          </NavLink>
          <NavLink to="/spam" className="list-group-item list-group-item-action py-2 ripple">
            <i className="fas fa-exclamation-circle fa-fw me-3"></i>
            <span>Spam {unreadCounts.spam > 0 && <span>({unreadCounts.spam})</span>}</span>
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
