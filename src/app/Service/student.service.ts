import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  constructor(private httpClient : HttpClient) { }

  saveStudent(inputData : object){
    return this.httpClient.post(`http://localhost:3000/students`,inputData);
  }
}
