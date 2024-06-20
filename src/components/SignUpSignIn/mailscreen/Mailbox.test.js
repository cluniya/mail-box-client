import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { BrowserRouter } from 'react-router-dom';
import Mailbox from './Mailbox';
import { fetchMails, markAsRead } from '../../../Store/mailSlice';

jest.mock('../../../Store/mailSlice', () => ({
  fetchMails: jest.fn(),
  markAsRead: jest.fn(),
}));

const mockStore = configureStore([]);

describe('Mailbox', () => {
  let store;

  beforeEach(() => {
    store = mockStore({
      auth: { email: 'test@example.com' },
      mail: { mails: [{ id: '1', senderEmail: 'sender@example.com', subject: 'Test Mail', content: 'This is a test mail.', timestamp: Date.now(), read: false }] },
    });
    store.dispatch = jest.fn();
  });

  const renderComponent = () =>
    render(
      <Provider store={store}>
        <BrowserRouter>
          <Mailbox />
        </BrowserRouter>
      </Provider>
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
});
