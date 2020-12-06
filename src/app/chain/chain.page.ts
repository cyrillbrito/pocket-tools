import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { ItemReorderEventDetail } from '@ionic/core';
import { Storage } from '@ionic/storage';
import { Chain, Habit } from '../models';

@Component({
  selector: 'app-chain',
  templateUrl: 'chain.page.html',
  styleUrls: ['chain.page.scss']
})
export class ChainPage implements OnInit {

  public isCreate: boolean;
  public chains: Chain[];
  public chain: Chain = {} as Chain;
  public iconSelect: boolean;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private storage: Storage,
    public alertController: AlertController
  ) { }

  ngOnInit(): void {

    const id = Number(this.route.snapshot.params.chainId);
    this.storage.get('chains').then((chains: Chain[]) => {
      this.chains = chains;
      this.chain = chains.find(c => c.id === id);
      if (!this.chain) {
        this.isCreate = true;
        const rId = Math.floor(Math.random() * 1000000);
        this.chain = { id: rId, name: 'Chain ' + rId, habits: [] } as Chain;
      }
    });
  }


  public save(): void {
    if (this.isCreate) {
      this.chains.push(this.chain);
      this.storage.set('chains', this.chains);
    } else {
      const index = this.chains.findIndex(c => c.id === this.chain.id);
      this.chains[index] = this.chain;
      this.storage.set('chains', this.chains);
    }

    this.router.navigate(['/'], { relativeTo: this.route });
  }

  public createHabit(): void {

    this.router.navigate(['habit'], { relativeTo: this.route });
  }

  public editHabit(habit: Habit): void {

    this.router.navigate(['habit', habit.id], { relativeTo: this.route });
  }

  public trigger(): void {
    this.router.navigate(['alert', this.chain.id]);
  }

  public doReorder(ev: any): void {

    const temp = this.chain.habits[ev.detail.from];
    this.chain.habits[ev.detail.from] = this.chain.habits[ev.detail.to];
    this.chain.habits[ev.detail.to] = temp;

    ev.detail.complete();
  }

  public async trashHabit(habit: Habit, event: MouseEvent): Promise<void> {
    event.stopPropagation();

    const alert = await this.alertController.create({
      header: 'Delete Habit ?',
      subHeader: habit.name,
      // message: 'This is an alert message.',
      buttons: [{
        text: 'No',
      }, {
        text: 'Yes',
        handler: () => this.chain.habits.splice(this.chain.habits.indexOf(habit), 1),
      }]
    });

    await alert.present();
  }
}
