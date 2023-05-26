import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface IMapState {
  directions: string;
}

const initialState: IMapState = {
  directions: '',
};

const mapSlice = createSlice({
  name: 'map',
  initialState,
  reducers: {
    setDirections: (state, action: PayloadAction<string>) => {
      state.directions = action.payload;
    },
  },
});

export const { setDirections } = mapSlice.actions;
export default mapSlice.reducer;
