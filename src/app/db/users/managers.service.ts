import { Manager } from './manager.model';
import { Injectable } from '@angular/core';
import { Firestore } from '@angular/fire/firestore';

import { CrudService } from '../shared/crud.service';

@Injectable({
  providedIn: 'root'
})
export class ManagersService extends CrudService<Manager>  {

  collectionName: string = 'managers';

  constructor(public firestore: Firestore) {
    super(firestore)
  }
}
