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
import { Component, OnInit, ViewChild, Input } from '@angular/core';

import { KubernetesMonitorService } from './kubernetesMonitor.service';
import { NGXLogger } from 'ngx-logger';
import { StatusReport } from './model/StatusReport';
import * as moment from 'moment';
import { ApplicationInstanceState } from './model/ApplicationInstanceState';
import { ApplicationTableComponent } from './application-table/application-table.component';


@Component({
  selector: 'kubernetesMonitor',
  templateUrl: './kubernetesMonitor.component.html',
  styleUrls: ['./kubernetesMonitor.component.scss']
})
export class KubernetesMonitorComponent implements OnInit {

  statusReport: StatusReport;
  interval = 5; // minutes
  loading = true;
  timer: any;
  oldTimestamp = false;
  @ViewChild('table') table: ApplicationTableComponent;
  @Input() kubeMonitorService: KubernetesMonitorService;
  @Input() hideRegions;

  constructor(private logger: NGXLogger) {

  }

  ngOnInit() {
    this.logger.log('from KubernetesMonitorComponent');
    this.logger.log(this.kubeMonitorService);
    this.loadStates();
  }
  public loadStates(): void {
    this.logger.log('Loading report');
    if (this.timer != null) {
      this.logger.log(this.timer);
      clearTimeout(this.timer);
      this.timer = null;
    }
    if (this.table != null) {
      this.table.reloadStages();
    }

    this.kubeMonitorService.getCurrentStatus().subscribe(
      result => {
        const lastTimestamp = this.statusReport == null ? 0 : this.statusReport.timestamp.getTime();
        this.logger.log(lastTimestamp);
        this.newReport(result);
        this.oldTimestamp = (lastTimestamp === this.statusReport.timestamp.getTime());
      },
      () => {
        this.setTimerForNextLoad();
        this.oldTimestamp = true;
      }
    );
  }

  private newReport(report: StatusReport): void {
    this.statusReport = report;
    this.loading = false;

    this.setTimerForNextLoad();
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
  public isOldTimestamp(timestamp: Date): boolean {
    return (timestamp.getTime() + this.interval * 10 < moment.now());
  }

}

