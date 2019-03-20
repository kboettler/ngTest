import { Component, OnInit } from '@angular/core';
import { Student } from '../student';
import { StudentService } from '../student.service';

@Component({
  selector: 'app-students',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css']
})
export class StudentsComponent implements OnInit {

  students: Student[];

  constructor(private studentService: StudentService) { }

  ngOnInit() {
    this.getStudents();
  }

  getStudents(): void {
    this.studentService.getStudents()
      .subscribe(heroes => this.students = heroes);
  }

  add(name: string): void {
    name = name.trim();
    if (!name) { return; }

    this.studentService.addStudent({ name } as Student)
      .subscribe(hero => {
        this.students.push(hero);
      });
  }

  delete(hero: Student): void {
    this.students = this.students.filter(h => h !== hero);
    this.studentService.deleteStudent(hero).subscribe();
  }

}
