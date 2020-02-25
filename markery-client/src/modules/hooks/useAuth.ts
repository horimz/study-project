import { useSelector, useDispatch } from 'react-redux';
import {
  RootState,
  fetchUser,
  login,
  logout,
  addUser,
  editUser,
  deleteUser,
  IUser
} from '../redux';
import { useCallback } from 'react';

export const useAuth = () => {
  // Applied "any" type because type gaurds not working
  const auth: any = useSelector((state: RootState) => state.auth);

  const dispatch = useDispatch();

  const fetchCurrentUser = useCallback(() => dispatch(fetchUser()), [dispatch]);

  const onLogin = useCallback(
    (userCredentials: IUser) => dispatch(login(userCredentials)),
    [dispatch]
  );

  const onLogout = useCallback(() => dispatch(logout()), [dispatch]);

  const addNewUser = useCallback(
    (newUser: IUser) => dispatch(addUser(newUser)),
    [dispatch]
  );

  const editCurrentUser = useCallback(
    (currentUser: IUser, updatedUser: IUser) =>
      dispatch(editUser(currentUser, updatedUser)),
    [dispatch]
  );

  const deleteCurrentUser = useCallback(() => dispatch(deleteUser()), [
    dispatch
  ]);

  return {
    auth,
    fetchCurrentUser,
    onLogin,
    onLogout,
    addNewUser,
    editCurrentUser,
    deleteCurrentUser
  };
};
