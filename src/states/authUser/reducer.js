import { ActionType } from './action';

/**
 * Reducer function for authUser state.
 *
 * @param {object | null} authUser - The current authenticated user state. Defaults to null.
 * @param {object} action - The Redux action object.
 * @returns {object | null} The new authUser state.
 */
function authUserReducer(authUser = null, action = {}) {
  switch (action.type) {
    case ActionType.SET_AUTH_USER:
      // Mengembalikan data pengguna dari payload saat login berhasil
      return action.payload.authUser;
    case ActionType.UNSET_AUTH_USER:
      // Mengembalikan null saat pengguna logout
      return null;
    default:
      // Mengembalikan state saat ini jika tidak ada aksi yang cocok
      return authUser;
  }
}

export default authUserReducer;