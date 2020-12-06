import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Media, MediaObject } from '@ionic-native/media/ngx';
import { Storage } from '@ionic/storage';
import { Chain, Habit } from '../models';
import { Timer, TimerService } from '../services/timer.service';


interface AlertHabit {
  habit: Habit;
  timerUp?: Timer;
  timerDown?: Timer;
  isDone?: boolean;
  // isCurrent: boolean;
}

declare var window: any;

@Component({
  selector: 'app-alert',
  templateUrl: './alert.page.html',
  styleUrls: ['./alert.page.scss'],
})
export class AlertPage implements OnInit {

  public chain: Chain;

  public sTime: number;

  public timer: Timer;
  public timer2: Timer;

  public timers: Timer[];

  public habits: AlertHabit[] = [];

  public alertMediaObject: MediaObject;

  public alertInterval: any;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private storage: Storage,
    private timerService: TimerService,
    private media: Media,
  ) { }

  ngOnInit() {

    const id = Number(this.route.snapshot.params.chainId);

    this.storage.get('chains').then((chains: Chain[]) => {
      this.chain = chains.find(c => c.id === id);

      for (const habit of this.chain.habits) {
        this.habits.push({
          habit
        });
      }

      this.habits[0].timerUp = this.timerService.addTimer();
      this.habits[0].timerDown = this.habits[0].habit.duration ? this.timerService.addTimer(this.habits[0].habit.duration) : null;

    });

    this.timer = this.timerService.addTimer();
    this.timer2 = this.timerService.addTimer(60);


    this.alertMediaObject = this.media.create('/android_asset/public/assets/clack.mp3');

    this.alertInterval = setInterval(() => {
      this.alertMediaObject.play();
    }, 3000);
  }

  public stopAlert(): void {
    clearInterval(this.alertInterval);
    this.alertInterval = null;
    this.alertMediaObject.pause();
    this.alertMediaObject.stop();
    this.alertMediaObject.release();

  }

  public next(): void {

    for (let i = 0; i < this.habits.length; i++) {

      const habitAlert = this.habits[i];

      if (!habitAlert.isDone) {
        this.timerService.removeTimer(habitAlert.timerUp);
        this.timerService.removeTimer(habitAlert.timerDown);
        habitAlert.isDone = true;

        const next = this.habits[i + 1];

        if (next) {
          next.timerUp = this.timerService.addTimer();
          next.timerDown = next.habit.duration ? this.timerService.addTimer(next.habit.duration) : null;
        }
        break;
      }
    }


    // Create a Media instance.  Expects path to file or url as argument
    // We can optionally pass a second argument to track the status of the media

    const file: MediaObject = this.media.create('/android_asset/public/assets/blob.mp3');

    // to listen to plugin events:

    file.onStatusUpdate.subscribe(status => {
      console.log(status);
    }); // fires when file status changes

    file.onSuccess.subscribe(() => {
      console.log('Action is successful');


    });

    file.onError.subscribe(error => {
      console.log('Error!', error);
    });



    // play the file
    file.play();


    // if (window.plugins && window.plugins.NativeAudio) {


    //   window.plugins.NativeAudio.preloadSimple('click', 'assets/blob.mp3', (a: any) => console.log(a), (a: any) => console.log(a));

    //   // Play
    //   window.plugins.NativeAudio.play('click');


    //   // Stop multichannel clip after 60 seconds
    //   window.setTimeout(() => {


    //     window.plugins.NativeAudio.unload('click');

    //   }, 1000 * 60);
    // }


  }

  public home(): void {
    this.router.navigate(['../..'], { relativeTo: this.route });
  }


}
