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
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { StatusReport } from './model/StatusReport';

@Injectable()
export abstract class KubernetesMonitorService {



  public selectedApplicationName: string;
  public selectedApplicationStageName: string;
  public selectedApplicationRegionName: string;

  abstract getCurrentStatus(): Observable<StatusReport>;

  abstract alarm(): void;

  protected extractDate(res: StatusReport): StatusReport {
    res.timestamp = new Date(res.timestamp);
    return res;
  }

  public selectApplicationInstance(appName: string, region: string, stage: string) {
    this.selectedApplicationName = appName;
    this.selectedApplicationStageName = stage;
    this.selectedApplicationRegionName = region;
  }

  abstract getStages(): { name: string, stages: string[] }[];




}
