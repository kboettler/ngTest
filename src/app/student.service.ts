import { Injectable } from '@angular/core';
import { Student } from './student';
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

export class StudentService {
  private readonly studentUrl = 'https://localhost:5001/api/student'; // URL to web api

  constructor(
    private readonly http: HttpClient,
    private readonly messageService: MessageService) { }

  getStudents(): Observable<Student[]> {
    return this.http.get<Student[]>(this.studentUrl)
      .pipe(
        tap(_ => this.log('fetched students')),
        catchError(this.handleError('getStudent', []))
      );
  }

  getStudent(id: string): Observable<Student> {
    const url = `${this.studentUrl}/${id}`;

    return this.http.get<Student>(url).pipe(
      tap(_ => this.log(`fetched student id=${id}`)),
      catchError(this.handleError<Student>(`getStudent id=${id}`))
    );
  }

  updateStudent(student: Student): Observable<any> {
    return this.http.put(this.studentUrl, student, httpOptions).pipe(
        tap(_ => this.log(`updated student id=${student.id}`)),
        catchError(this.handleError<any>('updateStudent'))
    );
  }

  addStudent(student: Student): Observable<Student> {
    const s = new Student();
    s.id = '00000000-0000-0000-0000-000000000000';
    s.name = student.name;

    return this.http.post<Student>(this.studentUrl, s, httpOptions).pipe(
      tap((newStudent: Student) => this.log(`added student with id=${newStudent.id}`)),
      catchError(this.handleError<Student>('addStudent'))
    );
  }

  deleteStudent(student: Student): Observable<Student> {
    const id = student.id;
    const url = `${this.studentUrl}/${id}`;

    return this.http.delete<Student>(url, httpOptions).pipe(
      tap(_ => this.log(`deleted student id=${id}`)),
      catchError(this.handleError<Student>('deleteStudent'))
    );
  }

  searchStudents(term: string): Observable<Student[]> {
    if (!term.trim()) {
      return of([]);
    }

    const options = {params: new HttpParams().set('name', term)};

    return this.http.get<Student[]>(this.studentUrl, options).pipe(
      tap(_ => this.log(`found students matching "${term}`)),
      catchError(this.handleError<Student[]>('searchStudents', []))
    );
  }

  private log(message: string): void {
    this.messageService.add(`StudentService: ${message}`);
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
