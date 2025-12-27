import { UsersApi, type CreateUser, type User } from '@cliplink/backend-contracts';
import type { $Fetch, NitroFetchRequest } from 'nitropack';

export class UserModule extends UsersApi {
  private readonly fetcher: $Fetch<unknown, NitroFetchRequest>;

  constructor(fetcher: $Fetch<unknown, NitroFetchRequest>) {
    super();

    this.fetcher = fetcher;
  }

  async createUser(data: CreateUser): Promise<User> {
    return this.fetcher<User>(this.baseUrl, {
      method: 'POST',
      body: data,
    });
  }
}