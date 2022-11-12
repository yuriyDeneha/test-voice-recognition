import { FirebaseAudioFilesService } from './../services/firebase-audio-files.service';
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

  candidate = {
    fullName: "Yurii Deneha",
    age: 26
  }
  interview = {
    title: 'Angular developer',
  }
  question = {
    id: '142'
  }
  now = new Date();

  result;
  audio;

  constructor(
    public voiceRecognitionService: VoiceRecognitionService,
    public firebaseAudioFilesService: FirebaseAudioFilesService,
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


        const audioName = `${this.candidate.fullName.toLocaleLowerCase().replace(/ /g, '_')}-${this.interview.title.toLocaleLowerCase().replace(/ /g, '_')}-q-${this.question.id}.mp3`;
        this.firebaseAudioFilesService.upload(audioName, audio.audioBlob)

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
