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
import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { KubernetesMonitorComponent } from './kubernetesMonitor.component';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { KubernetesMonitorService } from './kubernetesMonitor.service';
import { ApplicationStateComponent } from './applicationState.component/applicationState.component';
import { ApplicationTableComponent } from './application-table/application-table.component';
import { OcticonDirective } from './octicons';
import { NGXLogger } from 'ngx-logger';
import { ConsoleLoggerService } from './ConsoleLoggerService';

@NgModule({
  imports: [
    CommonModule,
    HttpModule,
    FormsModule
  ],
  declarations: [
    KubernetesMonitorComponent,
    ApplicationStateComponent,
    ApplicationTableComponent,
    OcticonDirective
  ],
  providers: [
    {
      provide: NGXLogger,
      useClass: ConsoleLoggerService,
    }
  ],
  exports: [
    KubernetesMonitorComponent
  ]
})
export class KubernetesMonitorModule {
  static forRoot (): ModuleWithProviders {
  return {
    ngModule: KubernetesMonitorModule
  };
}
}
