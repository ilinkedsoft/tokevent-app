import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from '../../services/axios';

export interface Sport {
  sportID: string;
  name: string;
  abbreviation: string;
  imageUrl: string;
}

export interface Tournament {
  tournamentID: string;
  name: string;
  stage: string;
}

export interface Pool {
  winningsPrizePoolAmount: number;
  bonusPrizePoolAmount: number;
}

export interface Event {
  name: string;
  eventID: string;
  eventStatus: string;
  goLiveAt: string;
  sport: Sport;
  tournament: Tournament;
  prizePools: Pool;
  matchSeries: string;
}

export interface EventState {
  events: Event[];
  loading: boolean;
  error: any;
  entries: string[];
}

const initialState: EventState = {
  events: [],
  loading: false,
  error: '',
  entries: [],
};

export const fetchEvents = createAsyncThunk(
  'events/fetchData',
  async () => {
    const response = await axios.get(`/v3/b20b77ab-7e67-4375-b4ea-233d09177da3`);
    return response.data;
  }
);

export const EventSlice = createSlice({
  name: 'event',
  initialState,
  reducers: {
    toggleEvent: (state: EventState, action: PayloadAction<string>) => {
      if (state.entries.includes(action.payload)) {
        state.entries = state.entries.filter(e => e !== action.payload);
      } else {
        state.entries.push(action.payload);
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchEvents.pending, (state) => {
      state.loading = true;
    })
    builder.addCase(fetchEvents.fulfilled, (state, { payload }) => {
      state.events = payload;
      state.loading = false;
    });
    builder.addCase(fetchEvents.rejected, (state, { payload } ) => {
      if (payload) {
        state.error = payload;
        state.loading = false;
      }
    });
  }
});

export const {
  toggleEvent,
} = EventSlice.actions;

export default EventSlice.reducer;
