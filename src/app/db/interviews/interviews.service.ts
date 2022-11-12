import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Firestore } from '@angular/fire/firestore';

import { CrudService } from '../shared/crud.service';
import { Observable } from 'rxjs';
import { Interview } from './interview.model';

@Injectable({
  providedIn: 'root'
})
export class InterviewsService extends CrudService<Interview>  {

  collectionName: string = 'interviews';

  constructor(public firestore: Firestore) {
    super(firestore)
  }

  getByList(listId: string): Observable<Interview[]> {
    return this.getAll({ field: 'createdAt', value: 'desc' }, { field: 'listId', value: listId })
      .pipe(
        map((tasks: Interview[]) => (tasks || []).map(t => {
          return new Interview({
            // status: t.status,
            // title: t.title,
            // description: t.description,
            // createdAt: t.createdAt,
            // id: t.id,
            // listId: t.listId,
            // timestampsPauseRun: t.timestampsPauseRun,
            // proove: t.proove,
            // prooveType: t.prooveType,
            // complexity: t.complexity,
            // focused: t.focused,
          });
        }))
      );
  }

}
