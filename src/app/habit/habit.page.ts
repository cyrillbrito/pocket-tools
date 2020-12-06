import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Storage } from '@ionic/storage';
import { Chain, Habit } from '../models';

@Component({
  selector: 'app-habit',
  templateUrl: 'habit.page.html',
  styleUrls: ['habit.page.scss']
})
export class HabitPage implements OnInit {

  public isCreate: boolean;
  public chains: Chain[];
  public chain: Chain;
  public habit: Habit;

  public duration = new Date(300000).toString();

  public iconSelect: boolean;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private storage: Storage,
  ) { }

  ngOnInit(): void {

    const chainId = Number(this.route.snapshot.params.chainId);
    const habitId = Number(this.route.snapshot.params.habitId);

    this.storage.get('chains').then((chains: Chain[]) => {
      this.chains = chains;
      this.chain = chains.find(c => c.id === chainId);
      this.habit = this.chain.habits.find(h => h.id === habitId);

      if (!this.habit) {
        this.isCreate = true;
        const rId = Math.floor(Math.random() * 1000000);
        this.habit = { id: rId, name: 'Habit ' + rId } as Habit;
      } else {
        this.duration = new Date(this.habit.duration * 1000).toString();
      }
    });
  }


  public save(): void {

    this.habit.duration = new Date(this.duration).getTime() / 1000;

    if (this.isCreate) {
      this.chain.habits.push(this.habit);
      this.storage.set('chains', this.chains);
      this.router.navigate(['..'], { relativeTo: this.route });
    } else {
      const index = this.chain.habits.findIndex(h => h.id === this.habit.id);
      this.chain.habits[index] = this.habit;
      this.storage.set('chains', this.chains);
      this.router.navigate(['../..'], { relativeTo: this.route });
    }
  }

}
