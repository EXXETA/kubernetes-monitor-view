import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from "rxjs"
import { stat } from 'fs';


@Injectable({
  providedIn: 'root'
})
export class StatusServiceService {

  private statusList: any = [];
  public statusList_updated: EventEmitter<string> = new EventEmitter();
  private statusURL: string = "";

  constructor(private http: HttpClient) {}

  setStatusURL(statusURL: string) {
    this.statusURL = statusURL;
  }

  setStatus(domain_name: string, status: any) {

    if((this.statusList.findIndex(x => x.name === domain_name) !== -1)) {
      this.statusList[this.statusList.findIndex(x => x.name === domain_name)] = status;
      this.statusList_updated.emit(domain_name);
    } else {
      this.statusList.push(status);
      this.statusList_updated.emit(domain_name);
    }
  }

  getStatusList() {
    return this.statusList;
  }

  getStatusByDomain(domain_name: string) {
    return this.statusList[this.statusList.findIndex(x => x.name === domain_name)]
  }

  getStatusFromBackend(domain_name: string): any {
    return this.http.get(this.statusURL + domain_name).subscribe((result: any) => {
      this.setStatus(domain_name, result);
    },error => {
    console.log("Status konnte nicht abgefragt werden");
    } )
  }
}
