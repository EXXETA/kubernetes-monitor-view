import {
  Injectable
} from '@angular/core';
import {
  environment
} from '../../environments/environment';
import { ProjectServiceRegistryService, ProjectService } from './project-service-registry.service';







@Injectable({
  providedIn: 'root'
})
export class ProjectServiceService {

  private update_intervall: number = 10000; //Milliseconds
 
  constructor() {
    console.log("ProjectService init");
  }

  public add(projects: any) {

    projects.forEach(project => {
      ProjectServiceRegistryService.registerService(new ProjectService(project.name, this.updateStatusReport.bind(this, project), 5000));
    });
  }

  public updateStatusReport(value: any){
    console.log("Update Status Report for:", value.name);
  }

  public setIntervall(intervall: number) {
    this.update_intervall = intervall;
    console.log("Kubernetes Monitor StatusReport Update Intervall changed:", intervall);
  }
 
}
