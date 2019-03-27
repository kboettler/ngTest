import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { MessageService } from './message.service';
import { UtoRequest } from 'src/uto-request';
import { tap, catchError } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})

export class UtoRequestService {

  private readonly requestUrl = 'https://localhost:5001/api/utorequest'; // URL to web api

  constructor(
    private readonly http: HttpClient,
    private readonly messageService: MessageService) { }

  getRequestsForEmployee(employeeId: number): Observable<UtoRequest[]> {
    const options = {params: new HttpParams().set('employeeId', employeeId.toString())};

    return this.http.get<UtoRequest[]>(this.requestUrl, options)
      .pipe(
        tap(_ => this.log(`fetched requests for employee id=${employeeId}`)),
        catchError(this.handleError<UtoRequest[]>('getRequestsForEmployee', []))
      );
  }

  private log(message: string): void {
    this.messageService.add(`UtoRequestService: ${message}`);
  }

  // TODO move this to shared class
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      console.error(error);
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
