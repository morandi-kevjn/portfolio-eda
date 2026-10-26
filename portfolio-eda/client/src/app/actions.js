import { createAction } from '@reduxjs/toolkit';
// Server events enter the store through ONE action; slices decide what they care about.
export const serverEventReceived = createAction('server/eventReceived');
