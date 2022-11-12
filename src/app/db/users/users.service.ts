import { Injectable } from '@angular/core';
import { Firestore } from '@angular/fire/firestore';

import { CrudService } from '../shared/crud.service';
import { User } from './user.model';

@Injectable({
  providedIn: 'root'
})
export class UsersService extends CrudService<User>  {

  collectionName: string = 'users';

  constructor(public firestore: Firestore) {
    super(firestore)
  }
}
