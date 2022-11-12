import { User } from './user.model';

export class Candidate extends User {
  interviewId: string

  constructor(candidate: Partial<Candidate> = {}) {
    super(candidate);
    this.interviewId = candidate.interviewId || null
  }
}
