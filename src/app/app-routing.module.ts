import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AlertHabitPage } from './alert-habit/alert-habit.page';
import { AlertPage } from './alert/alert.page';
import { ChainPage } from './chain/chain.page';
import { ChainsPage } from './chains/chains.page';
import { HabitPage } from './habit/habit.page';

@NgModule({
  imports: [
    RouterModule.forRoot([
      {
        path: '',
        component: ChainsPage
      },
      {
        path: 'chain',
        component: ChainPage
      },
      {
        path: 'chain/:chainId',
        component: ChainPage
      },
      {
        path: 'chain/:chainId/habit',
        component: HabitPage
      },
      {
        path: 'chain/:chainId/habit/:habitId',
        component: HabitPage
      },
      {
        path: 'alert/:chainId',
        component: AlertPage
      },
      {
        path: 'alert/:chainId/habit/:habitId',
        component: AlertHabitPage
      },
    ])
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
