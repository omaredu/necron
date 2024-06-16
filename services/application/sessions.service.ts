import SessionsRepository from "@services/domain/repositories/sessions.repository";

class SessionsService {
  constructor(private sessionsRepository: SessionsRepository) {}

  create(opts: { phoneNumber: string; password: string }): Promise<string> {
    return this.sessionsRepository.create(opts);
  }
}

export default SessionsService;
