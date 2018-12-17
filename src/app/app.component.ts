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

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  //service = new KubernetesMonitorMockService();

  domainConfig: any = [
    {
      name: "Projekt1",
      status: "warning",
      timestamp: "",
      url: "http://localhost:8080/rest/rest/Tapas",
      stages: [
        { 'name': 'Any', 'stages': ['DEV'] },
        { 'name': 'ECE', 'stages': ['INT', 'PREPROD', 'MAINT', 'PROD'] },
        { 'name': 'AMAP', 'stages': ['INT', 'PREPROD', 'MAINT', 'PROD'] },
        { 'name': 'CHINA', 'stages': ['INT', 'PREPROD', 'MAINT', 'PROD'] }
      ]
    }, {
      name: "Projekt2",
      status: "good",
      url: "http://localhost:8080/rest/rest/Vedoc",
      stages: [
        { 'name': 'Any', 'stages': ['DEV'] },
        { 'name': 'ECE', 'stages': ['INT', 'PREPROD', 'MAINT', 'PROD'] },
        { 'name': 'AMAP', 'stages': ['INT', 'PREPROD', 'MAINT', 'PROD'] },
        { 'name': 'CHINA', 'stages': ['INT', 'PREPROD', 'MAINT', 'PROD'] }
      ]
    },{
      name: "Projekt3",
      status: "danger",
      url: "http://localhost:8080/rest/rest/projekt3",
      stages: [
        { 'name': 'Any', 'stages': ['DEV'] },
        { 'name': 'ECE', 'stages': ['INT', 'PREPROD', 'MAINT', 'PROD'] },
        { 'name': 'AMAP', 'stages': ['INT', 'PREPROD', 'MAINT', 'PROD'] },
        { 'name': 'CHINA', 'stages': ['INT', 'PREPROD', 'MAINT', 'PROD'] }
      ]
    }
  ]
}
