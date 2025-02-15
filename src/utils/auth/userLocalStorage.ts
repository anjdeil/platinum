import { AppDispatch } from '@/store';
import { setUser } from '@/store/slices/userSlice';
import type { WooCustomerReqType } from '@/types/services';

export const saveUserToLocalStorage = (user: WooCustomerReqType | object) => {
  if (typeof window !== 'undefined') {
    const userJSON = JSON.stringify(user);
    localStorage.setItem('user', userJSON);
  }
};

export const getUserFromLocalStorage = (): WooCustomerReqType | undefined => {
  if (typeof window !== 'undefined') {
    const userJSON = localStorage.getItem('user');

    if (!userJSON) return undefined;

    const user = JSON.parse(userJSON);
    return user;
  }

  return undefined;
};

export const updateUserData = (dispatch: AppDispatch, userData: any) => {
  saveUserToLocalStorage(userData);
  dispatch(setUser(userData));
};

export const removeUserFromLocalStorage = () => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('user');
  }
};
