import { DbEntity } from '../shared/db-entity.model';

export class Interview extends DbEntity {

  managerId: string;
  title: string;
  description: string;
  status: InterviewStatus;
  deadline?: Date;
  // ----------------------------

  constructor({ id, managerId, status, title, description }: Partial<Interview> = {}) {
    super();
    this.status = status || InterviewStatus.Planned;
    this.title = title || '';
    this.description = description || '';
    this.id = id || null;
    this.managerId = managerId || null;
    // ----------------------------
    // ----------------------------
    // this.assigneeId = assigneeId || null;
    // this.deadline = deadline || null;
    // this.order = order || null;
  }
}

export enum InterviewStatus {
  Planned = 'planned',
  InProgress = 'in_progress',
  Paused = 'paused',
  Completed = 'completed'
}

export const status2emojii = {
  [InterviewStatus.Planned]: '📅',
  [InterviewStatus.InProgress]: '🔥',
  [InterviewStatus.Paused]: '⏸️',
  [InterviewStatus.Completed]: '✅',
}
