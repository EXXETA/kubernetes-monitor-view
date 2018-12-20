import Timer = NodeJS.Timer;


export class BackgroundService {
  private _id: string;
  private _timer: any;
  private _callback: any;
  private _updateIntervalMS: number;

  constructor(id: string, cbk: any, msInterval: number) {
    this._id = id;
    this._callback = cbk;
    this._updateIntervalMS = msInterval;
    this._timer = null;
  }

  get id(): string {
    return this._id;
  }

  get timer() {
    return this._timer;
  }

  set timer(value) {
    this._timer = value;
  }

  get updateIntervalMS(): number {
    return this._updateIntervalMS;
  }

  get callback(): Function {
    return this._callback;
  }
}

export class BackgroundServiceRegistry {
  static serviceList: BackgroundService[] = [];

  static registerService(service: BackgroundService): void {
    if (this.serviceList.length !== 0) {
      this.serviceList.forEach(svc => {
        if (svc !== undefined && svc.id !== undefined && svc.id === service.id) {
          // avoid duplicates
          return;
        }
      });
    }
    /*
    if (!environment.production) {
      console.log('registering service "' + service.id + '", executing every: ' + service.updateIntervalMS + ' ms');
    }
    */
    service.timer = setInterval(service.callback, service.updateIntervalMS);
    this.serviceList.push(service);
  }

  static unregisterService(key: string): void {
    let i = 0;
    let foundIndex: number = null;
    this.serviceList.forEach(svc => {
      if (svc !== undefined && svc.id !== undefined && svc.id === key) {
       /*
        if (!environment.production) {
          console.log('unregistering service "' + svc.id + '"');
        }
        */
        clearInterval(svc.timer as Timer);
        foundIndex = i;
      }
      i++;
    });
    if (foundIndex != null && i > 0) {
      // we found and unregistered sth
      this.serviceList[foundIndex] = undefined;
    }
  }
}
