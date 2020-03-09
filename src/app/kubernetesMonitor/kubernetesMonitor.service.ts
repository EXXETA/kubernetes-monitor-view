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
import { StatusReport } from './model/StatusReport';
import { map } from 'rxjs/operators';
import Domain from './model/Domain';
import { HttpClient } from '@angular/common/http';
import {Observable} from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export abstract class KubernetesMonitorService {

  constructor(private http: HttpClient) {
  }

  public selectedApplicationName: string;
  public selectedApplicationStageName: string;
  public selectedApplicationRegionName: string;

  public selectedDomain: Domain;

  public selectApplicationInstance(appName: string, region: string, stage: string) {
    console.log('Set Application Instance ', appName, region, stage);
    this.selectedApplicationName = appName;
    this.selectedApplicationStageName = stage;
    this.selectedApplicationRegionName = region;
  }

  getCurrentStatus(domain: Domain): Observable<StatusReport> {
    return this.http.get<StatusReport>(domain.url).pipe(
      map((res) => { res.timestamp = new Date(res.timestamp); return res; })
    );
  }

  public selectDomain(domain: Domain) {
    this.selectedDomain = domain;
  }

  public getSelectedDomain(): Domain {
    return this.selectedDomain;
  }

  public getStages(): { name: string, stages: string[] }[] {
      return this.selectedDomain.stages;
  }
}
