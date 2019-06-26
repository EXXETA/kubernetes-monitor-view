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
import { Component } from '@angular/core';
import { KubernetesMonitorMockService } from './kubernetesMonitorMock.service';
import {DomainConfig} from './kubernetesMonitor/model/DomainConfig';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  // service = new KubernetesMonitorMockService();

  domainConfig: DomainConfig = {
    domains: [
      {
        name: 'Tapas',
        url: 'http://localhost:8080/kube/rest/Tapas',
        stages: [
          { 'name': 'Any', 'stages': ['DEV'] },
          { 'name': 'ECE', 'stages': ['INT', 'PREPROD', 'MAINT', 'PROD'] },
          { 'name': 'AMAP', 'stages': ['INT', 'PREPROD', 'MAINT', 'PROD'] },
          { 'name': 'CHINA', 'stages': ['INT', 'PREPROD', 'MAINT', 'PROD'] }
        ],
        timestamp: 1545137175017
      }, {
        name: 'Vedoc',
        url: 'http://localhost:8080/kube/rest/Vedoc',
        stages: [
          { 'name': 'ECE', 'stages': ['DEV', 'INT', 'PROD'] }
        ],
        timestamp: 1545137175017
      }
    ],
    statusInterval: 60000
  };
}

