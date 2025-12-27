import type { NitroFetchRequest, $Fetch } from 'nitropack';
import { AuthApi, type BodyLogin, type Login } from '@cliplink/backend-contracts';

export default class AuthModule extends AuthApi {
  private readonly fetcher: $Fetch<unknown, NitroFetchRequest>;

  constructor(fetcher: $Fetch<unknown, NitroFetchRequest>) {
    super();

    this.fetcher = fetcher;
  }

  async login(data: BodyLogin): Promise<Login> {
    return this.fetcher<Login>(`${this.baseUrl}/login`, {
      method: 'POST',
      body: data,
    });
  }
}
