import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchMails = createAsyncThunk('mail/fetchMails', async (userEmail) => {
  const response = await fetch(`https://mail-box-client-33a30-default-rtdb.firebaseio.com/emails/${userEmail.split('@')[0]}/inbox.json`);
  const data = await response.json();
  return Object.keys(data).map((key) => ({ id: key, ...data[key] }));
});

export const fetchSentMails = createAsyncThunk('mail/fetchSentMails', async (userEmail) => {
  const response = await fetch(`https://mail-box-client-33a30-default-rtdb.firebaseio.com/emails/${userEmail.split('@')[0]}/sent.json`);
  const data = await response.json();
  return Object.keys(data).map((key) => ({ id: key, ...data[key] }));
});

export const markAsRead = createAsyncThunk('mail/markAsRead', async ({ userEmail, mailId }) => {
  await fetch(`https://mail-box-client-33a30-default-rtdb.firebaseio.com/emails/${userEmail.split('@')[0]}/inbox/${mailId}.json`, {
    method: 'PATCH',
    body: JSON.stringify({ read: true }),
  });
  return mailId;
});

export const deleteMail = createAsyncThunk('mail/deleteMail', async ({ userEmail, mailId }) => {
  await fetch(`https://mail-box-client-33a30-default-rtdb.firebaseio.com/emails/${userEmail.split('@')[0]}/inbox/${mailId}.json`, {
    method: 'DELETE',
  });
  return mailId;
});

const mailSlice = createSlice({
  name: 'mail',
  initialState: {
    mails: [],
    sentMails: [],
    status: 'idle',
    error: null,
  },
  reducers: {
    setMails: (state, action) => {
      state.mails = action.payload;
    },
    markMailRead: (state, action) => {
      const mail = state.mails.find((mail) => mail.id === action.payload);
      if (mail) {
        mail.read = true;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMails.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchMails.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.mails = action.payload;
      })
      .addCase(fetchMails.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(fetchSentMails.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchSentMails.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.sentMails = action.payload;
      })
      .addCase(fetchSentMails.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(markAsRead.fulfilled, (state, action) => {
        const mail = state.mails.find((mail) => mail.id === action.payload);
        if (mail) {
          mail.read = true;
        }
      })
      .addCase(deleteMail.fulfilled, (state, action) => {
        state.mails = state.mails.filter((mail) => mail.id !== action.payload);
      });
  },
});

export const { setMails, markMailRead } = mailSlice.actions;
export default mailSlice.reducer;
