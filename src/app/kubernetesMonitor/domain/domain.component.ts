import {Component, OnInit, Input} from '@angular/core';
import {DatePipe} from '@angular/common';
import {registerLocaleData} from '@angular/common';
import localeDe from '@angular/common/locales/de';
import * as moment from 'moment';
import { BackgroundServiceRegistry, BackgroundService } from '../Backgroundservice';
import { StatusServiceService } from '../status-service.service';
import {NGXLogger} from 'ngx-logger';
import { Domain } from '../model/Domain';

@Component({
  selector: 'domain',
  templateUrl: './domain.component.html',
  styleUrls: ['./domain.component.scss']
})
export class DomainComponent implements OnInit {

  @Input() statusInterval = 60000;
  @Input() domain: Domain;

  private timeoutLimit = 60000; // Timeout in milliseconds
  public statusData: any = null;

  constructor(private statusService: StatusServiceService, private logger: NGXLogger) {}

  ngOnInit() {
    registerLocaleData(localeDe);
    this.statusService.statusList_updated.subscribe((domainName: string) => {

      if (domainName === this.domain.name) {
        this.statusData = this.statusService.getStatusByDomain(domainName);
      }
    });

    // validate status_interval value to avoid apps misbehaving
    if (this.statusInterval < 2500 || !this.statusInterval) {
      this.logger.warn('invalid statusInterval set for domain' + this.domain.name);
      this.statusInterval = 2500;
    }
    this.logger.info('statusInterval for updates: ' + this.statusInterval);
    this.statusData = this.statusService.getStatusByDomain(this.domain.name);
    BackgroundServiceRegistry.registerService(new BackgroundService(this.domain.name, this.getStatus.bind(this), this.statusInterval));
  }

  getClass() {

    if (typeof this.statusData !== 'undefined' && typeof this.statusData.status !== 'undefined') {
      return 'float-right background-' + this.statusData.status;
    } else {
      return 'float-right background-good';
    }
  }

  getStatus() {
    this.statusService.getStatusFromBackend(this.domain.name);
  }

  getLastUpdate() {

      const pipe = new DatePipe('de-DE');
      const date = new Date(this.statusData.timestamp);

      return pipe.transform(date, 'yyyy-MM-dd-hh:mm:ss');
  }

  lastUpdateWarning() {
    const date_overtime = (this.statusData.timestamp + this.timeoutLimit);
    return (date_overtime <= moment.now()) ? true : false;
  }
}
