import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReversiComponent } from './reversi/reversi.component';
import { OnlineReversiComponent } from './online-reversi/online-reversi.component';

const routes: Routes = [
  {path: 'reversi', component: ReversiComponent},
  {path: 'reversiOnline', component: OnlineReversiComponent}
]

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}