import AuthModule from '~/repository/modules/auth';
import { UserModule } from '~/repository/modules/user';
import { LinksModule } from '~/repository/modules/links';

export const useApi = () => {
  const config = useRuntimeConfig();
  const token = useCookie('accessToken');

  const apiFetcher = $fetch.create({
    baseURL: config.public.apiBaseUrl as string,
    headers: {
      Accept: 'application/json',
    },

    onRequest({ options }) {
      if (token.value) {
        options.headers = options.headers || {};
        // @ts-expect-error - headers type handling
        options.headers.Authorization = `Bearer ${token.value}`;
      }
    },
    onResponseError({ response }) {
      if (response.status === 401) {
        token.value = null;
        // Здесь можно добавить редирект на логин или очистку состояния пользователя
      }
    }
  });

  return {
    auth: new AuthModule(apiFetcher),
    user: new UserModule(apiFetcher),
    links: new LinksModule(apiFetcher),
  };
};
