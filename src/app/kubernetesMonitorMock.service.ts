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

@Injectable()
export class KubernetesMonitorMockService extends KubernetesMonitorService {


  public getCurrentStatus(): Observable<StatusReport> {
    return of(new StatusReport(
      new Date(),
      [new ApplicationState('Name',
        [new ApplicationInstanceState('INT', 'EUROPE',
          [new ObjectClassState('pod', 0, 1, ['sample'], ['example'], false)],
          [], [])])],
      [new UnknownNamespace('a', 'cluster')])
    );
  }

  public alarm(): void {

  }

  public getStages(): { name: string, stages: string[] }[] {
    return [
      { 'name': 'Any', 'stages': ['DEV'] },
      { 'name': 'EUROPE', 'stages': ['INT', 'PROD'] },
      { 'name': 'AMERICA', 'stages': ['INT', 'PROD'] },
      { 'name': 'CHINA', 'stages': ['INT', 'PROD'] }
    ];

  }


}
