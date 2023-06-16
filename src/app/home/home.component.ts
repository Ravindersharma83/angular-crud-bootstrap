import {
  AfterViewInit,
  Component,
  ChangeDetectorRef,
  OnInit,
} from '@angular/core';
import { StudentResponse, StudentService } from '../Service/student.service';
import { NgForm, FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, AfterViewInit {
  constructor(private studentService : StudentService, private cdr: ChangeDetectorRef){}

  // for pagination
  page: number = 1;
  count: number = 0;
  tableSize: number = 2;
  tableSizes: any = [3, 6, 9, 12];

  students !: StudentResponse[];
  isLoading : boolean = false;

  filteredStudents: any[] = [];

  formGroup: FormGroup = new FormGroup({
    search: new FormControl(''),
    course: new FormControl(''),
  });

  ngOnInit(){
    this.getStudentLists();
    this.formGroup.valueChanges.subscribe((changes) => {
      this.filterData()
      // this.cdr.detectChanges();
      // console.log(changes)
    })
  }

  // It gives output same as on OnInit function 

  ngAfterViewInit() {
    // this.studentService.getStudents().subscribe({
    //   next:(res) =>{
    //     this.students = res;
    //     this.filteredStudents = res;
    //     this.cdr.detectChanges();
    //   },
    //   error:(err:any)=>{
    //     console.log(err);
    //   }
    // });
  }

  filterData(){
    this.studentService.getStudents().subscribe({
      next:(res) =>{
        this.filteredStudents = res.filter((data)=>{
          let shouldReturnData = false;
          if(((data.name.toLowerCase().includes(this.formGroup.value.search) || !this.formGroup.value.search) || (data.email.toLowerCase().includes(this.formGroup.value.search) || !this.formGroup.value.search)) &&
          (data.course.toLowerCase() === this.formGroup.value.course || !this.formGroup.value.course))
          {
            shouldReturnData = true
          }
          return shouldReturnData;
        })
        this.students = this.filteredStudents;
        // this.cdr.detectChanges();
      },
      error:(err:any)=>{
        console.log(err);
      }
    });
  }

  getStudentLists(){
    this.isLoading = true;
    this.studentService.getStudents().subscribe({
      next:(res) =>{
        this.students = res;
        this.isLoading = false;
      },
      error:(err:any)=>{
        console.log(err);
      }
    });
  }

  // for pagination
  onTableDataChange(event: any) {
    this.page = event;
    this.filterData();
  }
  onTableSizeChange(event: any): void {
    this.tableSize = event.target.value;
    this.page = 1;
    this.filterData();
  }

  
  deleteStudent(event : any, studentId:number){
    if(confirm('Are you sure you want to delete this data ?'))
    {
      event.target.innerText = "Deleting...";

      this.studentService.destroyStudent(studentId).subscribe({
        next:(res) =>{
          this.getStudentLists();
          alert("Deleted");
        },
        error:(err:any)=>{
          console.log(err);
        }
      })
    }
  }
}
