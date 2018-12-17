import { Component, OnInit, Input } from '@angular/core';


@Component({
  selector: 'app-domain',
  templateUrl: './domain.component.html',
  styleUrls: ['./domain.component.css']
})
export class DomainComponent implements OnInit {

  @Input() domain: any;

  constructor() { }

  ngOnInit() {
  }

  getClass() {
    return "domain-container background-" + this.domain.status;
  }
}
