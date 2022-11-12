import { DbEntity } from '../shared/db-entity.model';

export class User extends DbEntity {
  avatar: string;
  email: string;
  name: string;
  surname: string;


  constructor({ id, avatar, email, name, surname }: Partial<User> = {}) {
    super();
    this.id = id || null;
    this.avatar = avatar || null;
    this.email = email || null;
    this.name = name || null;
    this.surname = surname || null;
  }
}
