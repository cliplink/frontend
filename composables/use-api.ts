import AuthModule from '~/repository/modules/auth';
import { UserModule } from '~/repository/modules/user';

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
      }
    }
  });

  return {
    auth: new AuthModule(apiFetcher),
    user: new UserModule(apiFetcher),
  };
};
