import { DbEntity } from '../shared/db-entity.model';
import { User } from './user.model';

export class Manager extends User {
  companyId: string

  constructor(manager: Partial<Manager> = {}) {
    super(manager);
    this.companyId = manager.companyId || null
  }
}
