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
import { Injectable } from '@angular/core';
import { StatusReport } from './kubernetesMonitor/model/StatusReport';
import { KubernetesMonitorService } from './kubernetesMonitor/kubernetesMonitor.service';
import { UnknownNamespace } from './kubernetesMonitor/model/UnknownNamespace';
import { ApplicationState } from './kubernetesMonitor/model/ApplicationState';
import { ApplicationInstanceState } from './kubernetesMonitor/model/ApplicationInstanceState';
import { Observable, of } from 'rxjs';
import { ObjectClassState } from './kubernetesMonitor/model/ObjectClassState';
import { Container } from './kubernetesMonitor/model/Container';

@Injectable()
export class KubernetesMonitorMockService extends KubernetesMonitorService {


  public getProjects() {

    return [
      {
          name: "Tapas",
          restAPI: "Tapas"
      }, {
          name: "Vedoc",
          restAPI: "Vedoc"
      }
    ]
  }


  public getCurrentStatus(): Observable<StatusReport> {
    return of(new StatusReport(
      new Date(),
      [
        new ApplicationState('Name', [
          new ApplicationInstanceState('INT', 'ECE',
            [new ObjectClassState('pod', 0, 1, ['sample'], ['example'], false)],
            [], [
              new Container('container', '0.0.1', true),
              new Container('container2', 'latest', false)
            ])]),
        new ApplicationState('Name3', [
          new ApplicationInstanceState('INT', 'ECE',
            [new ObjectClassState('pod', 0, 1, ['sample'], ['example'], false)],
            [], [])]),
        new ApplicationState('Name4', [
          new ApplicationInstanceState('INT', 'ECE',
            [new ObjectClassState('pod', 0, 1, ['sample'], ['example'], false)],
            [], [])]),
        new ApplicationState('Name5', [
          new ApplicationInstanceState('INT', 'ECE',
            [new ObjectClassState('pod', 0, 1, ['sample'], ['example'], false)],
            [], [])]),
        new ApplicationState('Name6', [
          new ApplicationInstanceState('INT', 'ECE',
            [new ObjectClassState('pod', 0, 1, ['sample'], ['example'], false)],
            [], [])]),
        new ApplicationState('Name7', [
          new ApplicationInstanceState('INT', 'ECE',
            [new ObjectClassState('pod', 0, 1, ['sample'], ['example'], false)],
            [], [])]),
        new ApplicationState('Name2',
          [new ApplicationInstanceState('INT2', 'ECE2',
            [new ObjectClassState('pod', 0, 1, ['sample'], ['example'], false)],
            [], [])])
      ],
      [new UnknownNamespace('a', 'cluster')])
    );
  }

  public alarm(): void {

  }

  public getStages(): { name: string, stages: string[] }[] {
    // return [
    //   { 'name': 'Any', 'stages': ['DEV'] },
    //   { 'name': 'EUROPE', 'stages': ['INT', 'PROD'] },
    //   { 'name': 'AMERICA', 'stages': ['INT', 'PROD'] },
    //   { 'name': 'CHINA', 'stages': ['INT', 'PROD'] }
    // ];
    return [
      { 'name': 'ECE', 'stages': ['INT', 'PREPROD', 'MAINT', 'PROD'] },
      { 'name': 'AMAP', 'stages': ['INT', 'PREPROD', 'MAINT', 'PROD'] },
      { 'name': 'CHINA', 'stages': ['INT', 'PREPROD', 'MAINT', 'PROD'] }
    ];
  }
}