import { Action, ActionCreator, Dispatch } from 'redux';
import { ThunkAction } from 'redux-thunk';

import { RootState } from '../store';

export const ADD_TASK = 'ADD_TASK';
export const REMOVE_TASK = 'REMOVE_TASK';
export const TASK_DONE = 'TASK_DONE';

export interface TaskActionAddTask extends Action<'ADD_TASK'> {
  newId: string,
  newDate: string,
  newDescription: string
};

export interface TaskActionRemoveTask extends Action<'REMOVE_TASK'> {
  id: string
};

export interface TaskActionTaskDone extends Action<'TASK_DONE'> {
  id: string
};

export type TaskAction = TaskActionAddTask | TaskActionRemoveTask | TaskActionTaskDone

type ThunkResult = ThunkAction<void, RootState, undefined, TaskAction>;

export const addTask: ActionCreator<ThunkResult> = (newDescription: string) => (dispatch: Dispatch) => {
  const descTime = newDescription + Math.round((new Date()).getTime() / 1000);
  const newDate = new Date().toISOString();
  
  digestMessage(descTime).then(buffer => {
    const action: TaskActionAddTask = {
      type: ADD_TASK,
      newId: hexString(buffer),
      newDate: newDate,
      newDescription: newDescription
    };
    
    dispatch(action);
  })
};

export const taskDone: ActionCreator<ThunkResult> = (id: string) => (dispatch: Dispatch) => {
    const action: TaskActionTaskDone = {
      type: TASK_DONE,
      id
    };
    
    dispatch(action);
};

export const removeTask: ActionCreator<ThunkResult> = (id: string) => (dispatch: Dispatch) => {
  const action: TaskActionRemoveTask = {
    type: REMOVE_TASK,
    id
  };
  
  dispatch(action);
};

const digestMessage = (message: string) => {
  const encoder = new TextEncoder();
  const data = encoder.encode(message);
  return window.crypto.subtle.digest('SHA-256', data);
}

const hexString = (buffer: ArrayBuffer) => {
  const byteArray = new Uint8Array(buffer);

  const hexCodes = [...byteArray].map(value => {
    const hexCode = value.toString(16);
    const paddedHexCode = hexCode.padStart(2, '0');
    return paddedHexCode;
  });

  return hexCodes.join('');
}