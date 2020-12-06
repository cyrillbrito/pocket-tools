import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Storage } from '@ionic/storage';
import { Chain, Habit } from '../models';

@Component({
  selector: 'app-alert-habit',
  templateUrl: './alert-habit.page.html',
  styleUrls: ['./alert-habit.page.scss'],
})
export class AlertHabitPage implements OnInit {

  public chain: Chain;


  public habitIndex: number;
  public habit: Habit;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private storage: Storage,
  ) { }

  ngOnInit() {

    const chainId = Number(this.route.snapshot.params.chainId);
    const habitId = Number(this.route.snapshot.params.habitId);

    this.storage.get('chains').then((chains: Chain[]) => {
      this.chain = chains.find(c => c.id === chainId);

      this.habitIndex = this.chain.habits.findIndex(h => h.id === habitId);
      this.habit = this.chain.habits[this.habitIndex];

    });
  }

  public next(): void {
    const next = this.chain.habits[this.habitIndex + 1]
    if (next) {
      this.router.navigate(['/alert', this.chain.id, 'habit', next.id]).then(() => this.ngOnInit());
    } else {
      this.router.navigate(['/']);
    }
  }

}
