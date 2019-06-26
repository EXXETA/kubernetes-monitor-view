import {Injectable, EventEmitter} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class StatusServiceService {

  private statusList: any = [];
  public statusList_updated: EventEmitter<string> = new EventEmitter();
  private statusURL = '';

  constructor(private http: HttpClient) {
  }

  setStatusURL(statusURL: string) {
    this.statusURL = statusURL;
  }

  setStatus(domainName: string, status: any) {

    if ((this.statusList.findIndex(x => x.name === domainName) !== -1)) {
      this.statusList[this.statusList.findIndex(x => x.name === domainName)] = status;
      this.statusList_updated.emit(domainName);
    } else {
      this.statusList.push(status);
      this.statusList_updated.emit(domainName);
    }
  }

  getStatusList() {
    return this.statusList;
  }

  getStatusByDomain(domainName: string) {
    return this.statusList[this.statusList.findIndex(x => x.name === domainName)];
  }

  getStatusFromBackend(domainName: string): any {
    return this.http.get(this.statusURL + domainName).subscribe((result: any) => {
      this.setStatus(domainName, result);
    }, error => {
      console.log('Status konnte nicht abgefragt werden');
    });
  }
}
