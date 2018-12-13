import { TestBed } from '@angular/core/testing';

import { ProjectServiceRegistryService } from './project-service-registry.service';

describe('ProjectServiceRegistryService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ProjectServiceRegistryService = TestBed.get(ProjectServiceRegistryService);
    expect(service).toBeTruthy();
  });
});
