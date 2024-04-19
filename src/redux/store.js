import { configureStore } from '@reduxjs/toolkit';
import counterReducer from './sliders/counterSlice';
import userReducer from './sliders/userSlide';

export default configureStore({
  reducer: {
    counter: counterReducer,
    user: userReducer,
  }
});