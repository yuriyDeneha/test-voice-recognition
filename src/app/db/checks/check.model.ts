import { DbEntity } from '../shared/db-entity.model';
export class Check extends DbEntity {
  // ----------------------------
  status: TaskStatus;
  title: string;
  description: string;
  listId: string;
  timestampsPauseRun?: number[];
  proove: string;
  prooveType: ProoveType;
  complexity: TaskComplexity;

  // ----------------------------
  // ----------------------------
  assigneeId?: string;
  deadline?: Date;
  order?: number;
  focused?: boolean;
  // ----------------------------

  constructor({ id, status, title, description, listId, timestampsPauseRun, proove, prooveType, complexity, focused, assigneeId, deadline, order }: Partial<Check> = {}) {
    super();
    this.status = status || TaskStatus.ToDo;
    this.title = title || '';
    this.description = description || '';
    this.id = id || null;
    this.listId = listId || null;
    this.timestampsPauseRun = timestampsPauseRun || [];
    this.proove = proove || '';
    this.prooveType = prooveType || ProoveType.CommitLink;
    this.complexity = complexity || TaskComplexity.Task;
    this.focused = focused || false;
    // ----------------------------
    // ----------------------------
    // this.assigneeId = assigneeId || null;
    // this.deadline = deadline || null;
    // this.order = order || null;
  }

  get done() {
    return this.status === TaskStatus.Completed
  }

  get isPaused() {
    return !(this.timestampsPauseRun.length % 2);
  }

  public get durationMs () {
    const history = [ ... this.timestampsPauseRun || [] ];
    if (history.length % 2) {
      history.push(new Date().getTime());
    }
    const ms = history.reduce(
      (sum, value, index) => {
        const isOdd = !(index % 2);
        if (isOdd) {
          return sum;
        }
        const previousValue = history[index - 1];
        const delta = Math.abs(previousValue - value);
        return sum + delta;
      }, 0);
    return ms;
  }

  logActivityChange() {
    const now = new Date().getTime();
    this.timestampsPauseRun.push(now);
  }

  complete() {
    const now = new Date().getTime();
    if (!this.isPaused){
      this.timestampsPauseRun.push(now);
    }
    this.status = TaskStatus.Completed;
  }
}

export enum TaskStatus {
  ToDo = 'to_do',
  InProgress = 'in_progress',
  Paused = 'paused',
  Completed = 'completed'
}

export enum TaskComplexity {
  QuickFix = 'Quick-fix',
  Task = 'Task',
  Medium = 'Medium',
  Feature = 'Feature',
  Refactoring = 'Refactoring',
  Learning = 'Learning',
}

export enum ProoveType {
  YoutubeScreenRecord = 'youtube_screen_record',
  Screenshot = 'screenshot',
  CommitLink = 'commit_link',
  PullRequestLink = 'pull_request_link',
  Other = 'other',
}

export const status2emojii = {
  [TaskStatus.ToDo]: '❌',
  [TaskStatus.InProgress]: '🔥',
  [TaskStatus.Paused]: '⏸️',
  [TaskStatus.Completed]: '✅',
}
