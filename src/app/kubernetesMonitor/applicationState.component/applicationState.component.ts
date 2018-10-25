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
import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { KubernetesMonitorService } from '../kubernetesMonitor.service';
import { ApplicationInstanceState } from '../model/ApplicationInstanceState';
import { NGXLogger } from 'ngx-logger';
import { ObjectClassState } from '../model/ObjectClassState';

@Component({
    selector: 'application-state',
    templateUrl: './applicationState.component.html',
    styleUrls: ['./applicationState.component.scss']
})
export class ApplicationStateComponent {

    @Input() application: ApplicationInstanceState;

    constructor(public kubeMonitorService: KubernetesMonitorService, private logger: NGXLogger) {
    }

    public debug(): void {
        this.logger.info(this.application);
    }

    public hasError(): boolean {
        for (const state of this.application.objectStates) {
            if (state.actualNumber !== state.expectedNumber) {
                return true;
            }
            if (state.unexpectedObjects && state.unexpectedObjects.length > 0) {
                return true;
            }
        }
        return false;
    }

    public getAppName(): string {
        return this.kubeMonitorService.selectedApplicationName;
    }

    public getRegion(): string {
        return this.kubeMonitorService.selectedApplicationRegionName;
    }
    public getStage(): string {
        return this.kubeMonitorService.selectedApplicationStageName;
    }
    public getTrackBy(objectState: ObjectClassState): String {
        return objectState.objectClass;
    }
}
