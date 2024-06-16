interface SessionsRepository {
  create(opts: { phoneNumber: string; password: string }): Promise<string>;
}

export default SessionsRepository;
