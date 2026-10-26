import { createSlice, createAsyncThunk, nanoid } from '@reduxjs/toolkit';
import { serverEventReceived } from '../../app/actions';

export const fetchPublished = createAsyncThunk('portfolio/fetchPublished',
    async () => (await fetch('/api/portfolio')).json());

const initialState = {
  draft: { name: '', title: '', bio: '', projects: [{ id: nanoid(), title: '', description: '' }] },
  published: null,
};

const portfolioSlice = createSlice({
  name: 'portfolio',
  initialState,
  reducers: {
    fieldChanged: (s, { payload: { field, value } }) => { s.draft[field] = value; },
    projectAdded: (s) => { s.draft.projects.push({ id: nanoid(), title: '', description: '' }); },
    projectChanged: (s, { payload: { id, field, value } }) => {
      const p = s.draft.projects.find((x) => x.id === id); if (p) p[field] = value;
    },
    projectRemoved: (s, { payload }) => {
      s.draft.projects = s.draft.projects.filter((p) => p.id !== payload);
    },
  },
  extraReducers: (b) => {
    b.addCase(fetchPublished.fulfilled, (s, { payload }) => {
      s.published = payload;
    });
    b.addCase(serverEventReceived, (s, { payload }) => {
      if (payload.type === 'portfolio.publish.published') s.published = payload.portfolio;
    });
  },
});

export const { fieldChanged, projectAdded,
  projectChanged, projectRemoved } = portfolioSlice.actions;
export const selectDraft = (st) => st.portfolio.draft;
export const selectPublished = (st) => st.portfolio.published;
export default portfolioSlice.reducer;
