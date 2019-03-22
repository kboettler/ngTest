import { Injectable } from '@angular/core';
import { Employee } from './employee';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { MessageService } from './message.service';
import { catchError, map, tap } from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})

export class EmployeeService {
  private readonly employeeUrl = 'https://localhost:5001/api/employee'; // URL to web api

  constructor(
    private readonly http: HttpClient,
    private readonly messageService: MessageService) { }

  getEmployees(): Observable<Employee[]> {
    return this.http.get<Employee[]>(this.employeeUrl)
      .pipe(
        tap(_ => this.log('fetched employees')),
        catchError(this.handleError('getEmployee', []))
      );
  }

  getEmployee(id: string): Observable<Employee> {
    const url = `${this.employeeUrl}/${id}`;

    return this.http.get<Employee>(url).pipe(
      tap(_ => this.log(`fetched employee id=${id}`)),
      catchError(this.handleError<Employee>(`getEmployee id=${id}`))
    );
  }

  updateEmployee(employee: Employee): Observable<any> {
    return this.http.put(this.employeeUrl, employee, httpOptions).pipe(
        tap(_ => this.log(`updated employee id=${employee.id}`)),
        catchError(this.handleError<any>('updateEmployee'))
    );
  }

  addEmployee(employee: Employee): Observable<Employee> {

    return this.http.post<Employee>(this.employeeUrl, employee, httpOptions).pipe(
      tap((newEmployee: Employee) => this.log(`added employee with id=${newEmployee.id}`)),
      catchError(this.handleError<Employee>('addEmployee'))
    );
  }

  deleteEmployee(employee: Employee): Observable<Employee> {
    const id = employee.id;
    const url = `${this.employeeUrl}/${id}`;

    return this.http.delete<Employee>(url, httpOptions).pipe(
      tap(_ => this.log(`deleted employee id=${id}`)),
      catchError(this.handleError<Employee>('deleteEmployee'))
    );
  }

  searchEmployees(term: string): Observable<Employee[]> {
    if (!term.trim()) {
      return of([]);
    }

    const options = {params: new HttpParams().set('name', term)};

    return this.http.get<Employee[]>(this.employeeUrl, options).pipe(
      tap(_ => this.log(`found employees matching "${term}`)),
      catchError(this.handleError<Employee[]>('searchEmployees', []))
    );
  }

  private log(message: string): void {
    this.messageService.add(`EmployeeService: ${message}`);
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      console.error(error);
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
