import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Person } from '../types/public.types';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
class PersonService {
  constructor(private readonly http: HttpClient) {}

  getAll(): Observable<Person[]> {
    return this.http.get<Person[]>('/persons');
  }
}
export { PersonService };
