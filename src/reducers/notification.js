import {cloneDeep, forEach} from 'lodash';

const INITIAL_STATE = [] 

//get messages, then add properties read, deleted, confirmed.
const getNotifications = (state, {payload}) => {
  const notifications = payload.data[0].notifications;
  const newState = notifications.map(note => {
    note.confirmed = false;
    note.read = false;
    note.deleted = false;
    return note;
  })
  console.log("notification.js - getNote", newState);
  return newState
};

const deleteMessage = (state, {payload}) => {
    id = payload.id;
    console.log("notification.js - updateMessages", state);
    return state.filter((note) => note._id !== id);
};

const addMessage = (state, {payload}) => {
    const note = payload.data;
    return state.concat(note)
};

const updateMessage = (state, {payload}) => {
    let newState = cloneDeep(state)
    let id = payload.id;
    let type = payload.type;
    let bool = payload.bool;
    forEach(newState, note => {
      if (note._id === id) {
        if(type === 'read'){
            note['read'] = bool;
        }else if(type === 'confirm'){
            note['confirmed'] = bool;
        }else{
          note = note;
        }; 
      }
    }
  );
  console.log("notification.js - updateMessages", newState);
  return newState;
  };

export const notification = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'LOGIN_SUCCESS':
      return getNotifications(state, action);
    case 'DELETE_NOTIFICATION':
      return deleteMessage(state, action)
    case 'ADD_NOTIFICATION':
      return addMessage(state, action)
    case 'UPDATE_NOTIFICATION':
      return updateMessage(state, action)
    default:
      return state;
  }
};
