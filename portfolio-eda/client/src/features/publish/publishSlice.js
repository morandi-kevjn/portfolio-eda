import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { serverEventReceived } from '../../app/actions';

export const requestPublish = createAsyncThunk('publish/request', async (_, { getState }) => {
  const res = await fetch('/api/portfolio/publish', {
    method: 'POST', headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(getState().portfolio.draft),
  });
  if (!res.ok) throw new Error('Request failed');
  return res.json(); // { publishId }
});

const LABELS = {
  'portfolio.publish.requested': 'Request received',
  'portfolio.publish.validated': 'Content validated',
  'portfolio.publish.built': 'Site built',
  'portfolio.publish.published': 'Published',
  'portfolio.publish.failed': 'Publish failed',
};

const publishSlice = createSlice({
  name: 'publish',
  initialState: { publishId: null, status: 'idle', steps: [], errors: [] },
  reducers: {},
  extraReducers: (b) => {
    b.addCase(requestPublish.pending, () => ({ publishId: null, status: 'requesting', steps: [], errors: [] }));
    b.addCase(requestPublish.fulfilled, (s, { payload }) => { s.publishId = payload.publishId; s.status = 'running'; });
    b.addCase(requestPublish.rejected, (s, { error }) => { s.status = 'failed'; s.errors = [error.message]; });
    b.addCase(serverEventReceived, (s, { payload: e }) => {
      if (s.publishId && e.publishId !== s.publishId) return; // ignore other publishes
      if (!s.publishId && s.status !== 'requesting') return;
      s.publishId ??= e.publishId; // event can beat the HTTP response
      s.steps.push({ type: e.type, label: LABELS[e.type] ?? e.type, at: e.at });
      if (e.type.endsWith('published')) s.status = 'published';
      if (e.type.endsWith('failed')) { s.status = 'failed'; s.errors = e.errors ?? []; }
    });
  },
});

export const selectPublish = (st) => st.publish;
export default publishSlice.reducer;
