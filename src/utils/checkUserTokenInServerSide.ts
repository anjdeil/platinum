import { GetServerSidePropsContext } from "next";
import axios, { isAxiosError } from 'axios';
import parseCookies from './parseCookies';

export type CookieRowsType = {
  [key: string]: string;
};

interface UserData {
  id: number;
  // Другие поля данных пользователя, если необходимо
}

export async function checkUserTokenInServerSide(
  destination: string,
  context: GetServerSidePropsContext,
  cookieName: string
) {
  const redirect = {
    destination: destination,
    permanent: false,
  };

  const cookies = context.req.headers.cookie;
  if (!cookies) return { redirect: redirect };

  const cookieRows = parseCookies(cookies);
  if (!(cookieName in cookieRows)) return { redirect: redirect };

  try {
    const userResponse = await axios.get(
      `${process.env.SITE_URL}/wp-json/wp/v2/users/me`,
      {
        headers: {
          Authorization: `Bearer ${cookieRows[cookieName]}`,
        },
      }
    );

    const userData: UserData = userResponse.data as UserData;

    if (userData && userData.id) {
      return userData;
    } else {
      // Если токен невалидный, удаляем куку и перенаправляем
      context.res.setHeader(
        'Set-Cookie',
        `${cookieName}=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT`
      );
      return { redirect: redirect };
    }
  } catch (err) {
    // Преобразуем err в правильный тип для проверки ошибки Axios
    if (isAxiosError(err)) {
      const response = err.response;
      if (response?.data?.code === 'jwt_auth_invalid_token') {
        // Если токен невалидный, удаляем куку и перенаправляем
        context.res.setHeader(
          'Set-Cookie',
          `${cookieName}=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT`
        );
      }
    }
    // В случае других ошибок также удаляем куку и перенаправляем
    context.res.setHeader(
      'Set-Cookie',
      `${cookieName}=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT`
    );
    return { redirect: redirect };
  }
}
