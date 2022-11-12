import { map } from 'rxjs/operators';
import { Check } from './../../db/checks/check.model';
import { Injectable } from '@angular/core';
import { Firestore } from '@angular/fire/firestore';

import { CrudService } from '../shared/crud.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChecksService extends CrudService<Check>  {

  collectionName: string = 'checks';

  constructor(public firestore: Firestore) {
    super(firestore)
  }

  getByList(listId: string): Observable<Check[]> {
    return this.getAll({ field: 'createdAt', value: 'desc' }, { field: 'listId', value: listId })
      .pipe(
        map((tasks: Check[]) => (tasks || []).map(t => {
          return new Check({
            status: t.status,
            title: t.title,
            description: t.description,
            createdAt: t.createdAt,
            id: t.id,
            listId: t.listId,
            timestampsPauseRun: t.timestampsPauseRun,
            proove: t.proove,
            prooveType: t.prooveType,
            complexity: t.complexity,
            focused: t.focused,
          });
        }))
      );
  }

}
