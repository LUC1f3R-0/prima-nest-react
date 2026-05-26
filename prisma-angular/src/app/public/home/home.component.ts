import { Component, OnInit } from '@angular/core';
import { PersonService } from './home.service';

@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  constructor(private readonly personService: PersonService) {}

  ngOnInit(): void {
    console.log();
    this.personService.getAll().subscribe({
      next: (data) => {
        console.log(data);
      },
    });
  }

  clicked() {
    console.log('ghureigheruig');
  }
}
