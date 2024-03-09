import { configureStore } from '@reduxjs/toolkit';
import counterReducer from './sliders/counterSlice';

export default configureStore({
  reducer: {
    counter: counterReducer
  }
});