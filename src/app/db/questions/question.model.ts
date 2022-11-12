import { DbEntity } from '../shared/db-entity.model';

export class Question extends DbEntity {
  // ----------------------------
  status: QuestionStatus;
  description: string;
  interviewId: string;
  answerType: QuestionType;
  timerSeconds: number;

  // ----------------------------

  constructor({ id, status, answerType, description, interviewId, timerSeconds }: Partial<Question> = {}) {
    super();
    this.status = status || QuestionStatus.ToDo;
    this.answerType = answerType || QuestionType.Audio;
    this.description = description || '';
    this.id = id || null;
    this.interviewId = interviewId || null;
    this.timerSeconds = timerSeconds || null;
  }

  get done() {
    return this.status === QuestionStatus.Completed
  }
}

export enum QuestionStatus {
  ToDo = 'to_do',
  InProgress = 'in_progress',
  Paused = 'paused',
  Completed = 'completed'
}

export enum QuestionType {
  Audio = 'Audio',
  Input = 'Input',
  Datepicker = 'Datepicker',
  RadioButtons = 'Radio buttons',
  Checkbox = 'Checkbox',
}
