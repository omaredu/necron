import SessionsRepository from "@services/domain/repositories/sessions.repository";

import Client from "@services/infrastructure/client";

class SessionsImpl implements SessionsRepository {
  constructor(private readonly client: Client) {}

  async create(opts: {
    phoneNumber: string;
    password: string;
  }): Promise<string> {
    const client = this.client.getClient("REST");

    const { data } = await client.post("/auth/sign-in", {
      user: {
        phone_number: opts.phoneNumber,
        password: opts.password,
      },
    });
    const token = data.token;
    this.client.setToken(token);

    return token;
  }
}

export default SessionsImpl;
