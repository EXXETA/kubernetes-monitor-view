import {Component,OnInit,Input} from '@angular/core';
import {DatePipe} from '@angular/common';
import {registerLocaleData} from '@angular/common';
import localeDe from '@angular/common/locales/de';
import * as moment from 'moment';

@Component({
  selector: 'app-domain',
  templateUrl: './domain.component.html',
  styleUrls: ['./domain.component.css']
})
export class DomainComponent implements OnInit {

  timeout_limit: number = 5; // Minutes

  @Input() domain: any;

  constructor() {}

  ngOnInit() {
    registerLocaleData(localeDe);
  }

  getClass() {
    return "domain-container background-" + this.domain.status;
  }

  getLastUpdate() {

    var pipe = new DatePipe('de-DE');
    var date = new Date(this.domain.timestamp);
  
    return pipe.transform(date, "yyyy-MM-dd-hh:mm:ss");
  }

  lastUpdateWarning() {
    var date_overtime = this.domain.timestamp + (this.timeout_limit * 60000);

    return (date_overtime <= moment.now()) ? true: false;
  }
}
