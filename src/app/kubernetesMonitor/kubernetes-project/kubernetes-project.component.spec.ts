import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KubernetesProjectComponent } from './kubernetes-project.component';

describe('KubernetesProjectComponent', () => {
  let component: KubernetesProjectComponent;
  let fixture: ComponentFixture<KubernetesProjectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KubernetesProjectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KubernetesProjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
