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
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplicationTableComponent } from './application-table.component';
import { Logger } from '@nsalaun/ng-logger';

import { KubernetesMonitorService } from '../kubernetesMonitor.service';
import { OcticonDirective } from '../octicons';

class LoggerMock { }
class KubernetesMonitorServiceMock { }

describe('ApplicationTableComponent', () => {
  let component: ApplicationTableComponent;
  let fixture: ComponentFixture<ApplicationTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ApplicationTableComponent, OcticonDirective],
      providers: [{ provide: Logger, useClass: LoggerMock },
        { provide: KubernetesMonitorService, useClass: KubernetesMonitorServiceMock}]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApplicationTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
