import { AppDispatch } from '@/store';
import { setUser } from '@/store/slices/userSlice';
import { getCookieValue } from '@/utils/auth/getCookieValue';
import {
    getUserFromLocalStorage,
    saveUserToLocalStorage,
} from '@/utils/auth/userLocalStorage';
import axios from 'axios';

export const fetchUser = async (dispatch: AppDispatch) => {
    const cookies = document.cookie;
    const authToken = getCookieValue(cookies || '', 'authToken');

    if (!authToken) {
        console.warn('Auth token is missing');
        return;
    }

    const user = getUserFromLocalStorage();
    if (user) {
        dispatch(setUser(user));
    } else {
        try {
            const response = await axios.get(`/api/wooAuth/customers`, {
                headers: {
                    Cookie: `authToken=${authToken}`,
                },
            });

            if (response.data) {
                saveUserToLocalStorage(response.data);
                dispatch(setUser(response.data));
            }
        } catch (error) {
            console.error('Failed to fetch user data:', error);
        }
    }
};
