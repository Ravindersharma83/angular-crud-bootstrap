import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Injectable } from '@angular/core';

export interface StudentResponse {
  "id": number,
  "name": string,
  "course": string,
  "email": string,
  "phone": number | string
}

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  constructor(private httpClient : HttpClient) { }

  saveStudent(inputData : object){
    return this.httpClient.post(`http://localhost:3000/students`,inputData);
  }

  getStudents(){
    return this.httpClient.get<StudentResponse[]>(`http://localhost:3000/students`);
  }
}
