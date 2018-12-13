import { Component, OnInit, Input, Output, EventEmitter, OnDestroy } from '@angular/core';

import { NGXLogger } from 'ngx-logger';
import { StatusReport } from './../model/StatusReport';
import * as moment from 'moment';
import { ApplicationInstanceState } from './../model/ApplicationInstanceState';
import { KubernetesMonitorService } from '../kubernetesMonitor.service';

@Component({
  selector: 'kubernetes-project',
  templateUrl: './kubernetes-project.component.html',
  styleUrls: ['./kubernetes-project.component.css']
})
export class KubernetesProjectComponent implements OnInit, OnDestroy {



  @Input() project: any; // Project Modell....
  @Output() onSelect: EventEmitter<any> = new EventEmitter();
  @Output() onWarning: EventEmitter<any> = new EventEmitter();

  statusReport: StatusReport;
  interval: number = 1; //minutes
  loading: boolean = true;
  timer: any;

  constructor(private kubeMonitorService: KubernetesMonitorService, private logger: NGXLogger) { }

  ngOnInit() {
    console.log("Loading Project: ", this.project.name);
    this.loadStates();
  }

  ngOnDestroy() {
    console.log("Destroy Project:", this.project.name);
  }

  private loadStates(): void {
    this.logger.log('Loading report');
    this.kubeMonitorService.getCurrentStatus(this.project.restAPI).subscribe(
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



  
  onSelectProject() {

    var project_data = {
      project_info: this.project,
      project_status: this.statusReport
    }

    this.onSelect.emit(project_data);
  }
}
