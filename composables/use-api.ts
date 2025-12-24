import AuthModule from '~/repository/modules/auth';

export const useApi = () => {
  const config = useRuntimeConfig();

  const apiFetcher = $fetch.create({
    baseURL: config.public.apiBaseUrl as string,
    headers: {
      Accept: 'application/json',
    },

    onRequest({ request, options }) {
    },
    onResponseError({ response }) {
    }
  });

  return {
    auth: new AuthModule(apiFetcher),
  };
};
