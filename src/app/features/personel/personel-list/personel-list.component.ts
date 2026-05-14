import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import { PersonelService } from '../../../core/services/personel-service';
import { Personel } from '../../../core/models/personel';
import {Department} from '../../../core/models/department';
import {DepartmentService} from '../../../core/services/department-service';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'personel-list',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './personel-list.component.html',
  styleUrl: './personel-list.component.css'
})
export class PersonelListComponent implements OnInit {

  DepartmentId:number=0;
  PersonelList: Personel[] = [];
  DepartmentList:Department[]=[]

  constructor(private personelService: PersonelService,private departmentService:DepartmentService,private cdr:ChangeDetectorRef) {}

  ngOnInit(): void
  {
    this.getAllPersonelsFromDb();
    this.getAllDepartmentFromDb();

  }

  getAllPersonelsFromDb(): void {
    this.personelService.getAllPersonel().subscribe({
      next: (response) => {
        this.PersonelList = response;
        this.cdr.detectChanges()
      },
      error: (err) => {
        console.error('Personeller alınırken hata oluştu:', err);
      },
    });
  }

  getAllDepartmentFromDb():void
  {
    this.departmentService.getAllDepartment().subscribe(
      {
        next: (response) => {
          this.DepartmentList = response;
        },
        error: (err) => {
          console.error('Departmentlar alınırken hata oluştu:', err);
        },
      });
  }

  onDepartmentSelected(event: Event): void
  {
    this.DepartmentId = Number((event.target as HTMLSelectElement).value);

    if (this.DepartmentId === 0)
    {this.getAllPersonelsFromDb();return;}

    this.personelService.getAllPersonelByDepartmentId(this.DepartmentId).subscribe({
      next: (response) => {
        this.PersonelList = response;
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Personeller alınırken hata oluştu', err);
      }
    });
  }

  deleteThePersonel(personelId:number):void
  {
    this.personelService.deleteThePersonel(personelId).subscribe(
      {
        next:()=>{
          this.getAllPersonelsFromDb();
        },
        error:(err)=>
        {
          console.log(err);
        }
      }
    )
  }
}
