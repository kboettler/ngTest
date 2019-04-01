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
  selectedDate: Date = new Date();
  selectedHours = 8;

  readonly minimumDate: Date = new Date();

  constructor(private requestService: UtoRequestService) { }

  ngOnInit() {
    this.getRequests();
  }

  getRequests(): void {
    this.requestService.getRequestsForEmployee(this.employee.id)
      .subscribe(requests => this.requests = requests);
  }

  createRequest(): void {
    const request = new UtoRequest(this.employee.id, this.selectedDate, this.selectedHours);
    this.requestService.createNewRequest(request)
      .subscribe(r => {
        this.requests.push(r);
      });
  }

  deleteRequest(request: UtoRequest): void {
    this.requests = this.requests.filter(r => r.id !== request.id);
    this.requestService.removeRequest(request.id).subscribe();
  }

}
