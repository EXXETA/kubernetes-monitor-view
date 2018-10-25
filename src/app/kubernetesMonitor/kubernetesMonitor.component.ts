/*
 * kubernetes-monitor-view
 * Copyright (C) 2018 Thomas Pohl and EXXETA AG
 * http://www.exxeta.com
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 * 
 *     http://www.apache.org/licenses/LICENSE-2.0
 * 
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import { Component, OnInit } from '@angular/core';

import { KubernetesMonitorService } from './kubernetesMonitor.service';
import { NGXLogger } from 'ngx-logger';
import { StatusReport } from './model/StatusReport';
import * as moment from 'moment';
import { ApplicationInstanceState } from './model/ApplicationInstanceState';


@Component({
  selector: 'kubernetesMonitor',
  templateUrl: './kubernetesMonitor.component.html',
  styleUrls: ['./kubernetesMonitor.component.scss']
})
export class KubernetesMonitorComponent implements OnInit {

  statusReport: StatusReport;
  interval: number = 5; //minutes
  loading: boolean = true;
  timer: any;


  constructor(private kubeMonitorService: KubernetesMonitorService, private logger: NGXLogger) {
  }

  ngOnInit() {
    this.loadStates();
  }
  private loadStates(): void {
    this.logger.log('Loading report');
    this.kubeMonitorService.getCurrentStatus().subscribe(
      result => this.newReport(result),
      () => this.setTimerForNextLoad()
    );
  }

  private newReport(report: StatusReport): void {
    //let prevErrors: number = 0;
    if (this.statusReport !== null) {
      //prevErrors = this.getErrorCount();
    }

    this.statusReport = report;
    this.loading = false;

    this.setTimerForNextLoad();

    /*const newErrorCount: number = this.getErrorCount();
    if (newErrorCount > prevErrors) {
      this.logger.warn('Number of issues has increased.');
      //this.kubeMonitorService.alarm();
    }*/
  }

  private setTimerForNextLoad() {
    let nextCollection: number = moment.now() + this.interval * 60 * 1000;
    if (this.statusReport !== undefined) {
      const lastCollection: number = this.statusReport.timestamp.getTime();
      // let collector 20 seconds for collection and upload
      nextCollection = lastCollection + this.interval * 60 * 1000 + 20000;
    }
    if (moment.now() > nextCollection) {
      nextCollection = moment.now() + this.interval * 60 * 1000;
    }
    this.logger.log('next collection in ' + (nextCollection - moment.now()) + ' ms');
    this.timer = setTimeout(() => this.loadStates(), nextCollection - moment.now());
  }

  public selectedApplication(): ApplicationInstanceState {
    if (this.statusReport === undefined
      || this.kubeMonitorService.selectedApplicationRegionName === null
      || this.kubeMonitorService.selectedApplicationRegionName === undefined) {
      return null;
    }

    for (const app of this.statusReport.applications) {
      if (app.name === this.kubeMonitorService.selectedApplicationName) {
        for (const inst of app.instances) {
          if (inst.region.toLowerCase() === this.kubeMonitorService.selectedApplicationRegionName.toLowerCase()
            && inst.stage.toLowerCase() === this.kubeMonitorService.selectedApplicationStageName.toLowerCase()) {
            return inst;
          }
        }
      }

    }
    this.logger.warn('selectedAppNotFound '
      + this.kubeMonitorService.selectedApplicationRegionName + ' '
      + this.kubeMonitorService.selectedApplicationStageName);
    return null;
  }

}

