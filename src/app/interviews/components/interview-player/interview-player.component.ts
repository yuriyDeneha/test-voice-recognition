import { wait } from './../../../utils/wait-time';
import { Question, QuestionType } from './../../../db/questions/question.model';
import { Interview } from './../../../db/interviews/interview.model';
import { Component, OnInit, ɵɵsetComponentScope } from '@angular/core';
import { interval } from 'rxjs';

@Component({
  selector: 'app-interview-player',
  templateUrl: './interview-player.component.html',
  styleUrls: ['./interview-player.component.scss']
})
export class InterviewPlayerComponent implements OnInit {

  interview = new Interview({
    title: 'Middle Angular engineer',
    description: 'WE\'re looking for a motivated engineer to join our team of professional',
    managerId: 'yurii-deneha'
  });
  questions = [
    new Question({
      answerType: QuestionType.Audio,
      description: 'What\'s your name?',
      timerSeconds: 10
    }),
    new Question({
      answerType: QuestionType.Audio,
      description: 'What\'s your experience?',
      timerSeconds: 30
    }),
    new Question({
      answerType: QuestionType.Audio,
      description: 'How old are you?',
      timerSeconds: 5
    }),
  ];

  timer: number;
  activeQuestion: Question;

  constructor() { }

  ngOnInit(): void {
    setTimeout(() => this.play(), 2000);
  }

  async play() {
    console.log('----PLAY----')


    for await (const question of this.questions) {
      this.activeQuestion = question;
      console.log('-#q', question.description)

      this.timer = question.timerSeconds;

      const subscription = interval(1000).subscribe(() => {
        this.timer --;
      })


      await wait(this.activeQuestion.timerSeconds * 1000);
      console.log('-#end', question.description)
      subscription.unsubscribe();
    }
  }

}
