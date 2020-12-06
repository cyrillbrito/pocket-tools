import { Injectable } from '@angular/core';

export interface Timer {
  mins: string;
  secs: string;
  sTime: number;
  duration?: number;
}

@Injectable({
  providedIn: 'root'
})
export class TimerService {

  private timers: Timer[] = [];

  constructor() {
    setInterval(() => {
      for (const timer of this.timers) {
        this.updateTimer(timer);
      }
    }, 1000);
  }

  private updateTimer(timer: Timer): void {
    const diff = (Date.now() - timer.sTime) / 1000;
    const time = timer.duration ? timer.duration - diff : diff;
    timer.mins = this.numberFormat(Math.floor(time / 60));
    timer.secs = this.numberFormat(Math.floor(time % 60));
  }

  public addTimer(duration?: number): Timer {
    const timer = {
      mins: duration ? this.numberFormat(duration / 60) : '00',
      secs: duration ? this.numberFormat(duration % 60) : '00',
      sTime: Date.now(),
      duration,
    };
    this.timers.push(timer);
    return timer;
  }

  public removeTimer(timer: Timer): void {
    const index = this.timers.indexOf(timer);
    this.timers.splice(index, 1);
  }

  private numberFormat(n: number): string {
    return n < 10 ? '0' + n : n.toString();
  }

}
