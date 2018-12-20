import {Component,OnInit,Input} from '@angular/core';
import {DatePipe} from '@angular/common';
import {registerLocaleData} from '@angular/common';
import localeDe from '@angular/common/locales/de';
import * as moment from 'moment';
import { BackgroundServiceRegistry, BackgroundService } from '../Backgroundservice';
import { HttpClient } from '@angular/common/http';
import { StatusServiceService } from '../status-service.service';

@Component({
  selector: 'app-domain',
  templateUrl: './domain.component.html',
  styleUrls: ['./domain.component.css']
})
export class DomainComponent implements OnInit {

  @Input() status_interval: number = 1;
  @Input() domain: any;

  private timeout_limit: number = 6; // Minutes
  public status_data: any = null;

  constructor(private http: HttpClient, private statusService: StatusServiceService) {}

  ngOnInit() {
    registerLocaleData(localeDe);
    this.statusService.statusList_updated.subscribe((domain_name: string) => {
      
      if(domain_name === this.domain.name) {
        this.status_data = this.statusService.getStatusByDomain(domain_name);
      }
    })

    this.status_data = this.statusService.getStatusByDomain(this.domain.name);
    BackgroundServiceRegistry.registerService(new BackgroundService(this.domain.name, this.getStatus.bind(this), (60000 * this.status_interval)));
  }

  getClass() {

    if(typeof this.status_data !== 'undefined' && typeof this.status_data.status !== 'undefined'){
      return "pull-right background-" + this.status_data.status;
    } else {
      return "pull-right background-good";
    }
  }

  getStatus() {
    this.statusService.getStatusFromBackend(this.domain.name);
  }

  getLastUpdate() {

      var pipe = new DatePipe('de-DE');
      var date = new Date(this.status_data.timestamp);
    
      return pipe.transform(date, "yyyy-MM-dd-hh:mm:ss");
  }

  lastUpdateWarning() {
    var date_overtime = this.status_data.timestamp + (this.timeout_limit * 60000);

    return (date_overtime <= moment.now()) ? true: false;
  }
}
