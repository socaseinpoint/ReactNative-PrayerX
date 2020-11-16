import {all, call, takeLatest, put} from 'redux-saga/effects';
import {PayloadAction} from '@reduxjs/toolkit';

import {
  addColumnStart,
  deleteColumn,
  setColumn,
  getColumnsStart,
} from './columnsSlice';

import {
  addColumnApi,
  deleteColumnApi,
  getColumnsApi,
} from '../../services/apiServices';

export function* addColumnRequest(action: PayloadAction<string>) {
  try {
    yield addColumnApi(action.payload);
    yield put(getColumnsStart());
  } catch (e) {
    console.log(e);
  }
}

export function* deleteColumnRequest(action: PayloadAction<string>) {
  try {
    yield deleteColumnApi(action.payload);
    yield put(getColumnsStart());
  } catch (e) {
    console.log(e);
  }
}

export function* getColumnData() {
  try {
    const response = yield getColumnsApi();
    yield setColumn(response.data);
  } catch (e) {
    console.log(e);
  }
}

export function* onGetColumnData() {
  yield takeLatest(getColumnsStart, getColumnData);
}

export function* onAddColumn() {
  yield takeLatest(addColumnStart, addColumnRequest);
}

export function* onDeleteColumn() {
  yield takeLatest(deleteColumn, deleteColumnRequest);
}

export function* columnsSagas() {
  yield all([call(onAddColumn), call(onDeleteColumn), call(onGetColumnData)]);
}
