import { Component } from '@angular/core';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent {
  name!:string;
  course!:string;
  email!:string;
  phone!:number;

  saveStudent(){
    var inputData = {
      name:this.name,
      course:this.course,
      email:this.email,
      phone:this.phone,
    }
  }
}
