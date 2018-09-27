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
import { Component, Input } from '@angular/core';
import { Logger } from '@nsalaun/ng-logger';
import { StatusReport } from '../model/StatusReport';
import { ApplicationState } from '../model/ApplicationState';
import { ApplicationInstanceState } from '../model/ApplicationInstanceState';
import { KubernetesMonitorService } from '../kubernetesMonitor.service';
import { Container } from '../model/Container';

@Component({
    selector: 'application-table',
    templateUrl: 'application-table.component.html',
    styleUrls: ['application-table.component.scss']
})
export class ApplicationTableComponent {
    @Input()
    status: StatusReport;

    regions = this.kubeMonitorService.getStages();

    withDetails: String[] = [];

    constructor(private logger: Logger, private kubeMonitorService: KubernetesMonitorService) {
    }

    public debug(): void {
        this.logger.info(this.status);
    }

    public getClass(appName: string, region, stage) {
        let application: ApplicationState = null;
        for (const app of this.status.applications) {
            if (app.name === appName) {
                application = app;
            }
        }
        if (application === null) {
            this.logger.warn('app not found');
            return 'tl_unknown';
        }
        let instance: ApplicationInstanceState = null;
        for (const inst of application.instances) {
            if (inst.region.toLowerCase() === region.toLowerCase() && inst.stage.toLowerCase() === stage.toLowerCase()) {
                instance = inst;
            }
        }
        if (instance === null) {
            return 'tl_unknown';
        }
        if (this.hasErrors(instance)) {
            return 'tl_error';
        }
        return 'tl_ok';
    }

    public isOk(appName: string, region, stage): boolean {
        let application: ApplicationState = null;
        for (const app of this.status.applications) {
            if (app.name === appName) {
                application = app;
            }
        }
        if (application === null) {
            this.logger.warn('app not found');
            return null;
        }
        let instance: ApplicationInstanceState = null;
        for (const inst of application.instances) {
            if (inst.region.toLowerCase() === region.toLowerCase() && inst.stage.toLowerCase() === stage.toLowerCase()) {
                instance = inst;
            }
        }
        if (instance === null) {
            return null;
        }
        if (this.hasErrors(instance)) {
            return false;
        }
        return true;
    }

    private hasErrors(instance: ApplicationInstanceState): boolean {
        for (const state of instance.objectStates) {
            if (state.actualNumber !== state.expectedNumber) {
                return true;
            }
            if (state.unexpectedObjects && state.unexpectedObjects.length > 0) {
                return true;
            }
        }
        return false;
    }


    public trackByFn(i, item) { return item.name; }

    public selectApplicationInstance(appName: string, region: string, stage: string) {
        this.kubeMonitorService.selectApplicationInstance(appName, region, stage);

    }

    public toggleDetails(app: ApplicationState) {
        const index = this.withDetails.indexOf(app.name, 0);
        if (index >= 0) {
            this.withDetails.splice(index, 1);
        } else {
            this.withDetails.push(app.name);
        }
    }

    public showDetails(app: ApplicationState): boolean {
        const result = this.withDetails.indexOf(app.name, 0) >= 0;
        return result;
    }

    public getContainers(app: ApplicationState): String[] {
        const result: String[] = [];

        for (const i of app.instances) {
            for (const c of i.containers) {
                if (result.indexOf(c.name) === -1) {
                    result.push(c.name);
                }
            }
        }

        return result;
    }

    getContainerVersion(app: ApplicationState, conatinerName: String, region: String, stage: String): String {
        for (const i of app.instances) {
            if (i.region.toUpperCase() === region.toUpperCase() && i.stage.toUpperCase() === stage.toUpperCase()) {
                for (const c of i.containers) {

                    if (c.name === conatinerName) {
                        return c.version;
                    }
                }
            }
        }
        return '';

    }
    getContainerClass(app: ApplicationState, conatinerName: String, region: String, stage: String): String {
        for (const i of app.instances) {
            if (i.region.toUpperCase() === region.toUpperCase() && i.stage.toLocaleUpperCase() === stage.toUpperCase()) {
                for (const c of i.containers) {
                    if (c.name === conatinerName) {
                        if (c.ready === undefined) {
                            return '';
                        } else {
                            if (!c.ready) {
                                return 'error';
                            } else if (c.version.indexOf('latest') >= 0 || c.version.indexOf('snapshot') >= 0) {
                                return 'warn';
                            } else {
                                return 'ok';
                            }
                        }
                    }
                }
            }
        }
        return '';

    }
    hasNoData(appName: string, region: string, stage: string): boolean {
        let application: ApplicationState = null;
        for (const app of this.status.applications) {
            if (app.name === appName) {
                application = app;
            }
        }
        if (application === null) {
            this.logger.warn('app not found');
            return true;
        }
        let instance: ApplicationInstanceState = null;
        for (const inst of application.instances) {
            if (inst.region.toLowerCase() === region.toLowerCase() && inst.stage.toLowerCase() === stage.toLowerCase()) {
                instance = inst;
            }
        }
        return instance === null;
    }

    relevantApplications(): ApplicationState[] {

        const result: ApplicationState[] = [];

        for (const app of this.status.applications) {
            let relevant = false;
            for (const instance of app.instances) {
                if (this.envExists(instance.region, instance.stage)) {
                    relevant = true;
                }
            }
            if (relevant) {
                result.push(app);
            }
        }

        return result;
    }

    envExists(regionName: string, stageName: string): boolean {
        for (const region of this.regions) {
            if (region.name === regionName) {
                for (const stage of region.stages) {
                    if (stage === stageName) {
                        return true;
                    }
                }
            }
        }
        return false;
    }
}
