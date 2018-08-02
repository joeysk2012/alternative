import {apiUrl} from '~/config';
import Base64 from 'Base64';


export const deleteNotification = (id, bool) => {
  return {
    type: 'DELETE_NOTIFICATION',
    payload: {
    	id,
        bool
    }
  };
};

export const addNotification = (id, data) => {
  return {
    type: 'ADD_NOTIFICATION',
    payload: {
    	id,
       	data
    }
  };
};

/*the types are 'read' and 'confirm'*/
export const updateNotification = (id, type, bool) => {
  return {
    type: 'UPDATE_NOTIFICATION',
    payload: {
    	id,
      type,
      bool
    }
  };
};