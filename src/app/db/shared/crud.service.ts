import {
  CollectionReference,
  Firestore,
  Query,
  addDoc,
  collection,
  deleteDoc,
  doc,
  orderBy,
  query,
  updateDoc,
  where,
  docData,
} from '@angular/fire/firestore';
import { DocumentData } from 'rxfire/firestore/interfaces';
import { DocumentReference } from 'firebase/firestore';

import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';
import { collectionData } from 'rxfire/firestore';
import { DbEntity } from './../../db/shared/db-entity.model';

@Injectable({
  providedIn: 'root'
})
export abstract class CrudService<T extends DbEntity> {

  abstract collectionName: string;

  constructor(public firestore: Firestore) {}

  protected get collectionRef(): CollectionReference {
    return collection(this.firestore, this.collectionName);
  }

  create(doc: T): Promise<DocumentReference<DocumentData>> {
    return addDoc(this.collectionRef, { ... doc } );
  }

  // public read(): Observable<any[] | null> {
  //   const clientRef = query(this.collectionRef);
  //   return collectionData(clientRef, { idField: 'id' })
  //     .pipe(map((lists: any[]) => lists.length ? lists : null));
  // }

  update(id: string, entity: T): Promise<void> {
    const docRef = doc(this.firestore, this.collectionName, id);
    const newObject: any = { ... entity };
    return updateDoc(docRef, newObject);
  }

  delete(id: string): Promise<void> {
    const docRef = doc(this.firestore, this.collectionName, id);
    return deleteDoc(docRef);
  }

  getAll(
      order = { field: 'createdAt', value: 'desc' as any},
      search = null,
    ): Observable<DocumentData[]> {

    const allQuery: Query<DocumentData> = !search ?
      query(this.collectionRef) :
      query(this.collectionRef, where(search.field, '==', search.value));

    return collectionData(allQuery, { idField: 'id' }).pipe(
      map((data: T[]) => {
        const newData = data.map((item: T) => {
          return {
            ... item,
            createdAt: (item.createdAt as any)?.toDate() || new Date()
          }
        });
        const koef = order.value === 'desc' ? 1 : -1;
        newData.sort((a, b) => {
          return a.createdAt.getTime() > b.createdAt.getTime() ? koef * 1 : koef * -1;
        })
        return newData;
      })
    );
  }

  getById(id: string): Observable<T> {
    const docRef = doc(this.firestore, `${this.collectionName}/${id}`);
    return docData(docRef, { idField: 'id' }).pipe(
      mergeMap((list: T) => {
        if (list) {
          return of(list);
        }
        return this.getBySlug(id);
      })
    );
  }

  getBySlug(slug: string): Observable<T> {
    if (!slug) {
      return of(undefined);
    }
    return this.getByField('slug', slug, true) as Observable<T>;
  }

  getByField(field: string, value: any, first: boolean = false): Observable<T | T[]> {
    if (!field) {
      return of(undefined);
    }
    const docsRef = query(this.collectionRef, where(field, '==', value));
    return collectionData(docsRef, { idField: 'id' }).pipe(
      map((lists: T[]) => {
        if (first) {
          return lists.length ? lists[0] : null;
        }
        return lists || undefined;
      })
    );
  }
}
