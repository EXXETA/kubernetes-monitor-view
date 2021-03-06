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
import {Component, OnInit, ViewChild, Input} from '@angular/core';

import {KubernetesMonitorService} from './kubernetesMonitor.service';
import {NGXLogger} from 'ngx-logger';
import {StatusReport} from './model/StatusReport';
import * as moment from 'moment';
import {ApplicationInstanceState} from './model/ApplicationInstanceState';
import {ApplicationTableComponent} from './application-table/application-table.component';
import {Domain} from './model/Domain';
import {StatusServiceService} from './status-service.service';
import {environment} from '../../environments/environment';
import {DomainConfig} from './model/DomainConfig';


@Component({
  selector: 'app-kubernetes-monitor',
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
  @Input() domainConfig: DomainConfig;
  // inject callable to e.g. for loading spinner integration
  @Input() loadStartCallback: any;
  @Input() loadFinishCallback: any;

  tableView = false;

  constructor(private logger: NGXLogger,
              public kubernetesMonitorService: KubernetesMonitorService,
              private statusService: StatusServiceService) {
  }

  ngOnInit() {
    this.statusService.setStatusURL(environment.basePath);

    this.logger.log('from KubernetesMonitorComponent');
    this.logger.log(this.kubernetesMonitorService);
    this.loadStates();
  }

  public loadStates(): void {
    this.logger.log('Loading report');
    if (this.timer != null) {
      clearTimeout(this.timer);
      this.timer = null;
    }
    if (this.table != null) {
      this.table.reloadStages();
    }
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
      || this.kubernetesMonitorService.selectedApplicationRegionName === null
      || this.kubernetesMonitorService.selectedApplicationRegionName === undefined) {
      return null;
    }

    for (const app of this.statusReport.applications) {
      if (app.name === this.kubernetesMonitorService.selectedApplicationName) {
        for (const inst of app.instances) {
          if (inst.region.toLowerCase() === this.kubernetesMonitorService.selectedApplicationRegionName.toLowerCase()
            && inst.stage.toLowerCase() === this.kubernetesMonitorService.selectedApplicationStageName.toLowerCase()) {
            return inst;
          }
        }
      }

    }
    return null;
  }

  getSelectedDomain() {
    return this.kubernetesMonitorService.getSelectedDomain();
  }

  selectDomain(domain: Domain) {
    if (typeof this.loadStartCallback === 'function') {
      this.loadStartCallback();
    }

    this.kubernetesMonitorService.selectDomain(domain);
    this.kubernetesMonitorService.getCurrentStatus(domain).subscribe(
      result => {
        const lastTimestamp = this.statusReport == null ? 0 : this.statusReport.timestamp.getTime();
        this.newReport(result);
        this.oldTimestamp = (lastTimestamp === this.statusReport.timestamp.getTime());
        this.tableView = true;
        if (typeof this.loadFinishCallback === 'function') {
          this.loadFinishCallback();
        }
      },
      () => {
        this.setTimerForNextLoad();
        this.oldTimestamp = true;
        if (typeof this.loadFinishCallback === 'function') {
          this.loadFinishCallback();
        }
      }
    );
  }

}
