import { DbEntity } from '../shared/db-entity.model';

export class User extends DbEntity {
  // ----------------------------
  avatar: string;
  email: string;
  fullName: string;
  profileId: string;
  level: UserLevel;
  salary: number;


  constructor({ id, avatar, fullName, email, profileId, level, salary }: Partial<User> = {}) {
    super();
    this.id = id || null;
    this.avatar = avatar || null;
    this.email = email || null;
    this.profileId = profileId || null;
    this.fullName = fullName || null;
    this.level = level || UserLevel.Junior;
    this.salary = salary || 0;
  }
}

export enum UserLevel {
  Trainee = 'Trainee',
  JuniorLow = 'Junior Low',
  Junior = 'Junior',
  JuniorStrong = 'Junior Strong',
  MiddleLow = 'Middle Low',
  Middle = 'Middle',
  MiddleStrong = 'Middle Strong',
  SeniorLow = 'Senior Low',
  Senior = 'Senior',
  SeniorStrong = 'Senior Strong'
}
