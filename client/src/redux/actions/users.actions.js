import usersService from "../../services/users.service";

export const SET_USERS = '[users] SET_USERS';
export const SET_CURRENT_USER = '[users] SET_CURRENT_USER';

export function setUsers (users) {
    return {
        type: SET_USERS,
        payload: users
    }
}

export function setUsers (userID) {
    return {
        type: SET_CURRENT_USER,
        payload: userID
    }
}
export function fetchUsers () {
    debugger;
    return async (dispatch) => {
        const users =  await usersService.fetchUsers();
        dispatch(setUsers(users));
    }
}