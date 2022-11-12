import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: 'interviews',
    loadChildren: () => import('./interviews/interviews.module').then((m) => m.InterviewsModule),
  },
  {
    path: '**',
    redirectTo: 'interviews/player',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
