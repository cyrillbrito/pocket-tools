


export interface Chain {

  id: number;
  name: string;
  icon: string;

  trigger: Trigger;
  time: Date;

  habits: Habit[];
}

export enum Trigger {
  alarm = 'alarm',
  notification = 'notification',
}

export interface Habit {
  id: number;
  name: string;
  icon: string;
  duration: number;
}

