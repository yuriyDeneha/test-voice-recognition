import { AudioRecordService } from './../services/audio-record.service';
import { Component, OnInit } from '@angular/core';
import { VoiceRecognitionService } from '../services/voice-recognition.service'

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
  audio;

  constructor(
    public voiceRecognitionService: VoiceRecognitionService,
    public audioRecordService: AudioRecordService
  ) {
    this.voiceRecognitionService.init();
    this.audioRecordService.init();

    this.result = this.voiceRecognitionService.state;
   }

  ngOnInit(): void {
  }

  changeConfig(lang) {
    if (this.isRecording) {
      return
    }
    this.voiceRecognitionService.init()
  }

  startRecording(){
    this.isRecording = true;
    this.voiceRecognitionService.start();
    this.audioRecordService.start();
  }

  stopRecording(){
    this.isRecording = false;

    this.voiceRecognitionService.stop();

    this.audioRecordService.stop()
      .then((audio) => {
        this.audio = audio;
      })

  }

  toggle() {
    if (this.isRecording) {
      this.stopRecording();
    } else {
      this.startRecording()
    }
  }

}
