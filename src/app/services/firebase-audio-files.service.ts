import { Injectable } from '@angular/core';
import { Storage } from '@angular/fire/storage';
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

@Injectable({
  providedIn: 'root'
})
export class FirebaseAudioFilesService {

  audioStorageRef: any;
  storage: any;

  constructor(private _storage: Storage) {
    this.audioStorageRef = ref(this._storage, '/audio/');
  }

  upload(name: string, file: Blob) {
    // 'file' comes from the Blob or File API
    const metadata = {
      // contentType: 'audio/mp3'
      contentType: 'audio/mpeg'
    }
    uploadBytes(ref(this._storage, '/audio/' + name), file, metadata).then((snapshot) => {
      console.log(snapshot);
      console.log('Uploaded a blob or file!');
    });
  }

  download(fileName: string) {
    getDownloadURL(ref(this.audioStorageRef, fileName))
      .then((url) => {
        console.log(url);
      })
  }
}
