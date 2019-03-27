import { Component, OnInit, Input } from '@angular/core';
import { Employee } from '../employee';
import { UtoRequest } from 'src/uto-request';
import { UtoRequestService } from '../uto-request.service';

@Component({
  selector: 'app-uto-requests',
  templateUrl: './uto-requests.component.html',
  styleUrls: ['./uto-requests.component.css']
})
export class UtoRequestsComponent implements OnInit {

  @Input() employee: Employee;

  requests: UtoRequest[];

  constructor(private requestService: UtoRequestService) { }

  ngOnInit() {
    this.getRequests();
  }

  getRequests(): void {
    this.requestService.getRequestsForEmployee(this.employee.id)
      .subscribe(requests => this.requests = requests);
  }

}
