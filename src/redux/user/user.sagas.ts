import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';

import {takeLatest, put, all, call} from 'redux-saga/effects';

import {
  signInStart,
  signUpStart,
  signInSuccess,
  signInFailure,
  signUpFailure,
  setLoading,
} from './userSlice';

const baseURL = 'http://trello-purrweb.herokuapp.com';

export function* signIn({payload}) {
  const {email, password} = payload;
  try {
    yield put(setLoading());
    const response = yield axios({
      method: 'post',
      url: `${baseURL}/auth/sign-in`,
      data: {
        email,
        password,
      },
    });
    const {name, token} = response.data;
    if (response.data.message) {
      throw new Error('Wrong email or password');
    }
    yield AsyncStorage.setItem('token', token);
    yield put(signInSuccess(name));
  } catch (error) {
    yield put(signInFailure(error.message));
  }
}

export function* signUp({payload}) {
  const {email, username, password} = payload;
  try {
    yield put(setLoading());
    const response = yield axios({
      method: 'post',
      url: `${baseURL}/auth/sign-up`,
      data: {
        email,
        name: username,
        password,
      },
    });
    const {name, token} = response.data;
    if (response.data.message) {
      throw new Error('This email is already taken');
    }
    yield AsyncStorage.setItem('token', token);
    yield put(signInSuccess(name));
  } catch (error) {
    yield put(signUpFailure(error.message));
  }
}

export function* onSignInStart() {
  yield takeLatest(signInStart, signIn);
}

export function* onSignUpStart() {
  yield takeLatest(signUpStart, signUp);
}

export function* userSagas() {
  yield all([call(onSignInStart), call(onSignUpStart)]);
}
