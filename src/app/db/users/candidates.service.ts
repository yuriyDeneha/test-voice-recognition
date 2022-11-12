import { Candidate } from './candidate.model';
import { Injectable } from '@angular/core';
import { Firestore } from '@angular/fire/firestore';

import { CrudService } from '../shared/crud.service';

@Injectable({
  providedIn: 'root'
})
export class CandidatesService extends CrudService<Candidate>  {

  collectionName: string = 'candidates';

  constructor(public firestore: Firestore) {
    super(firestore)
  }
}
