import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import eventReducer from '../module/events/eventsSlice';

export const store = configureStore({
  reducer: {
    event: eventReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
