import type { NitroFetchRequest, $Fetch } from 'nitropack';

interface LoginPayload {
  email: string;
  password?: string;
}

interface AuthResponse {
  token: string;
  user: any;
}

export default class AuthModule {
  private fetcher: $Fetch<unknown, NitroFetchRequest>;

  constructor(fetcher: $Fetch<unknown, NitroFetchRequest>) {
    this.fetcher = fetcher;
  }

  async login(payload: LoginPayload): Promise<AuthResponse> {
    return this.fetcher<AuthResponse>('/auth', {
      method: 'POST',
      body: payload,
    });
  }
}
