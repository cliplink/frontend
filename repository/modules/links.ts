import { LinksApi, type CreateLink, type Link } from '@cliplink/backend-contracts';
import type { $Fetch, NitroFetchRequest } from 'nitropack';

export class LinksModule extends LinksApi {
  private readonly fetcher: $Fetch<unknown, NitroFetchRequest>;

  constructor(fetcher: $Fetch<unknown, NitroFetchRequest>) {
    super();

    this.fetcher = fetcher;
  }

  async createLink(data: CreateLink): Promise<Link> {
    return this.fetcher<Link>(this.baseUrl, {
      method: 'POST',
      body: data,
    });
  }
}