import { createSlice } from '@reduxjs/toolkit'
import avatardefault from '../../assets/images/noneavatar.png'

const initialState = {
  name: '',
  email: '',
  access_token: '',
  address: '',
  phone: '',
  date: '',
  gender: '',
  avatar: '',
  id: '',
  isAdmin: false
}

export const userSlide = createSlice({
  name: 'user',
  initialState,
  reducers: {
    updateUser: (state, action) => {
      const { _id = '', username, name = '', email = '', address = '', phone = '', gender = '', date = '', avatar = avatardefault, access_token = '', isAdmin } = action.payload
      // console.log("action", action)
      state.id = _id;
      state.username = username || email;
      state.name = name;
      state.email = email;
      state.address = address;
      state.phone = phone;
      state.gender = gender;
      state.date = date;
      state.avatar = avatar;
      state.access_token = access_token;
      state.isAdmin = isAdmin;
    },
    resetUser: (state) => {
      state.id = '';
      state.username = '';
      state.name = '';
      state.email = '';
      state.address = '';
      state.phone = '';
      state.gender = '';
      state.date = '';
      state.avatar = '';
      state.access_token = '';
      state.isAdmin = false;
    }
  }
})

export const { updateUser, resetUser } = userSlide.actions

export default userSlide.reducer