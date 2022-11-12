import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InterviewsRoutingModule } from './interviews-routing.module';
import { InterviewPlayerComponent } from './components/interview-player/interview-player.component';


@NgModule({
  declarations: [
    InterviewPlayerComponent
  ],
  imports: [
    CommonModule,
    InterviewsRoutingModule
  ]
})
export class InterviewsModule { }
