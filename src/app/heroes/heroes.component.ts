import { Component, OnInit } from '@angular/core';
import { Student } from '../student';
import { StudentService } from '../student.service';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {

  heroes: Student[];

  constructor(private heroService: StudentService) { }

  ngOnInit() {
    this.getHeroes();
  }

  getHeroes(): void {
    this.heroService.getStudents()
      .subscribe(heroes => this.heroes = heroes);
  }

  add(name: string): void {
    name = name.trim();
    if (!name) { return; }

    this.heroService.addStudent({ name } as Student)
      .subscribe(hero => {
        this.heroes.push(hero);
      });
  }

  delete(hero: Student): void {
    this.heroes = this.heroes.filter(h => h !== hero);
    this.heroService.deleteStudent(hero).subscribe();
  }

}
