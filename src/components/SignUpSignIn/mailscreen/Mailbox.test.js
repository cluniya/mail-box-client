import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { BrowserRouter } from 'react-router-dom';
import Mailbox from './Mailbox';
import { fetchMails, fetchSentMails, markAsRead, deleteMail } from '../../../Store/mailSlice';

jest.mock('../../../Store/mailSlice', () => ({
  fetchMails: jest.fn(),
  fetchSentMails: jest.fn(),
  markAsRead: jest.fn(),
  deleteMail: jest.fn(),
}));

const mockStore = configureStore([]);

describe('Mailbox', () => {
  let store;

  beforeEach(() => {
    store = mockStore({
      auth: { email: 'test@example.com' },
      mail: { mails: [{ id: '1', senderEmail: 'sender@example.com', subject: 'Test Mail', content: 'This is a test mail.', timestamp: Date.now(), read: false }], sentMails: [{ id: '2', senderEmail: 'test@example.com', recipientEmail: 'recipient@example.com', subject: 'Sent Mail', content: 'This is a sent mail.', timestamp: Date.now(), read: true }] },
    });
    store.dispatch = jest.fn();
  });

  const renderComponent = (path = '/') =>
    render(
      <Provider store={store}>
        <BrowserRouter>
          <Mailbox />
        </BrowserRouter>
      </Provider>,
      { wrapper: ({ children }) => <BrowserRouter initialEntries={[path]}>{children}</BrowserRouter> }
    );

  it('should render the Mailbox component', () => {
    renderComponent();
    expect(screen.getByText('Inbox')).toBeInTheDocument();
    expect(screen.getByText('Compose')).toBeInTheDocument();
    expect(screen.getByText('sender@example.com - Test Mail')).toBeInTheDocument();
  });

  it('should dispatch fetchMails on mount', () => {
    renderComponent();
    expect(fetchMails).toHaveBeenCalledWith('test@example.com');
  });

  it('should navigate to /compose on Compose button click', () => {
    const { container } = renderComponent();
    const composeButton = container.querySelector('button');
    fireEvent.click(composeButton);
    expect(screen.getByText('Compose')).toBeInTheDocument();
  });

  it('should open the mail modal and mark as read on mail click', () => {
    renderComponent();
    const mailItem = screen.getByText('sender@example.com - Test Mail');
    fireEvent.click(mailItem);

    expect(screen.getByText('This is a test mail.')).toBeInTheDocument();
    expect(markAsRead).toHaveBeenCalledWith({ userEmail: 'test@example.com', mailId: '1' });
  });

  it('should close the modal on close button click', () => {
    renderComponent();
    const mailItem = screen.getByText('sender@example.com - Test Mail');
    fireEvent.click(mailItem);

    const closeButton = screen.getByLabelText('Close');
    fireEvent.click(closeButton);

    expect(screen.queryByText('This is a test mail.')).not.toBeInTheDocument();
  });

  it('should render the Sent Mails component', () => {
    renderComponent('/sent');
    expect(screen.getByText('Sent')).toBeInTheDocument();
    expect(screen.getByText('recipient@example.com - Sent Mail')).toBeInTheDocument();
  });

  it('should dispatch fetchSentMails on /sent route mount', () => {
    renderComponent('/sent');
    expect(fetchSentMails).toHaveBeenCalledWith('test@example.com');
  });

  it('should delete a mail on delete button click', () => {
    renderComponent();
    const deleteButton = screen.getByText('Delete');
    fireEvent.click(deleteButton);

    expect(deleteMail).toHaveBeenCalledWith({ userEmail: 'test@example.com', mailId: '1' });
  });
});
