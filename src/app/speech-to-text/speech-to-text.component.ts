import { Component, OnInit } from '@angular/core';
import { VoiceRecognitionService } from '../service/voice-recognition.service'

@Component({
  selector: 'app-speech-to-text',
  templateUrl: './speech-to-text.component.html',
  styleUrls: ['./speech-to-text.component.scss'],
  providers: [VoiceRecognitionService]
})
export class SpeechToTextComponent implements OnInit {

  text: string;

  isRecording: boolean;

  languages = [
    { label: 'Соловїна', value: 'uk' },
    { label: 'Анлійська', value: 'en-US' },
    { label: 'Мордорська', value: 'ru' },
  ];

  language = this.languages[0].value;

  result;

  constructor(
    public service : VoiceRecognitionService
  ) {
    this.service.init()
    this.result = this.service.state
   }

  ngOnInit(): void {
  }

  changeConfig(lang) {
    if (this.isRecording) {
      return
    }
    this.service.init()
  }

  startService(){
    this.isRecording = true;
    this.service.start()
  }

  stopService(){
    this.isRecording = false;
    this.service.stop()
  }

  toggle() {
    if (this.isRecording) {
      this.stopService();
    } else {
      this.startService()
    }
  }

}
