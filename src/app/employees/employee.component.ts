import { Component, OnInit } from '@angular/core';
import { Employee } from '../employee';
import { EmployeeService } from '../employee.service';

@Component({
  selector: 'app-employees',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeesComponent implements OnInit {

  employees: Employee[];

  constructor(private employeeService: EmployeeService) { }

  ngOnInit() {
    this.getEmployees();
  }

  getEmployees(): void {
    this.employeeService.getEmployees()
      .subscribe(heroes => this.employees = heroes);
  }

  add(name: string): void {
    name = name.trim();
    if (!name) { return; }

    this.employeeService.addEmployee({ name } as Employee)
      .subscribe(hero => {
        this.employees.push(hero);
      });
  }

  delete(hero: Employee): void {
    this.employees = this.employees.filter(h => h !== hero);
    this.employeeService.deleteEmployee(hero).subscribe();
  }

}
