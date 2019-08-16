import { firebase, googleAuthProvider } from '../firebase/firebase';
import { LOGIN, LOGOUT } from '../action-types';
import { history } from '../routers/AppRouter';

import { Redirect } from 'react-router-dom';
import axios from 'axios';
export const login = uid => ({
  type: LOGIN,
  uid
});

export const startLogin = () => {
  return dispatch => {
    window.location = '/auth/google';
    // axios.get('/auth/current_user').then((user)=>{
    //   console.log(user);
    //   if(user){
    //     dispatch(login(user._id));
    //   }else{
    //   }
    // });

    // const width = 600, height = 600
    // const left = (window.innerWidth / 2) - (width / 2)
    // const top = (window.innerHeight / 2) - (height / 2)
    // const url = '/auth/google'

    // return window.open(url, '',
    //   `toolbar=no, location=no, directories=no, status=no, menubar=no,
    //   scrollbars=no, resizable=no, copyhistory=no, width=${width},
    //   height=${height}, top=${top}, left=${left}`
    // )
    // axios.get('auth/google');
    // return firebase.auth().signInWithPopup(googleAuthProvider);
  };
};

export const logout = () => ({
  type: LOGOUT
});

export const startLogout = () => {
  return dispatch => {
    window.location = '/auth/logout';
  };
};
