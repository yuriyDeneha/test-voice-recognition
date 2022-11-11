import { Injectable } from '@angular/core';


declare var webkitSpeechRecognition: any;

@Injectable({
  providedIn: 'root'
})
export class VoiceRecognitionService {

  recognition =  new webkitSpeechRecognition();
  isStoppedSpeechRecog = false;

  public state = {
    text: '',
    progress: '',
  }
  recorder;
  audio;


  constructor() {
  }

  init(language = 'uk') {

    this.recognition.interimResults = true;
    this.recognition.lang = language;

    this.recognition.addEventListener('result', (e) => {
      const transcript = Array.from(e.results)
        .map((result) => result[0])
        .map((result) => result.transcript)
        .join('');
      this.state.progress = transcript;
    });
  }

  start() {
    this.isStoppedSpeechRecog = false;
    this.recognition.start();
    console.log("Speech recognition started")
    this.recognition.addEventListener('end', (condition) => {
      if (this.isStoppedSpeechRecog) {
        this.recognition.stop();
        console.log("End speech recognition")
      } else {
        this.wordConcat()
        this.recognition.start();
      }
    });
  }

  stop() {
    this.isStoppedSpeechRecog = true;
    this.wordConcat()
    return this.recognition.stop();
  }

  wordConcat() {
    this.state.text += (' ' + this.state.progress + '.');
    this.state.progress = '';
  }
}
