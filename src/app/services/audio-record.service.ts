import { Injectable } from '@angular/core';

declare var MediaRecorder: any;

@Injectable({
  providedIn: 'root'
})
export class AudioRecordService {

  mediaRecorder;
  audioChunks: Array<any>;

  constructor() {
  }

  init() {
    navigator.mediaDevices.getUserMedia({ audio: true })
      .then((stream) => {
        this.mediaRecorder = new MediaRecorder(stream);
        this.audioChunks = [];

        this.mediaRecorder.addEventListener("dataavailable", event => {
          this.audioChunks.push(event.data);
        });
      })
  }

  start() {
    this.audioChunks = [];
    return this.mediaRecorder.start();
  }

  stop(): Promise<{ audioBlob: Blob, audioUrl: string, play: any }> {
    return new Promise(resolve => {
      this.mediaRecorder.addEventListener("stop", () => {
        const audioBlob = new Blob([ ... this.audioChunks]);
        const audioUrl = URL.createObjectURL(audioBlob);

        const audio = new Audio(audioUrl);
        const play = () => audio.play();
        this.audioChunks = [];
        resolve({ audioBlob, audioUrl, play });
      });

      this.mediaRecorder.stop();
    });
  }
}
