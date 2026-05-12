import { Component, OnInit,ChangeDetectorRef } from '@angular/core';
import { DepartmentService } from '../../../core/services/department-service';
import { PersonelService } from '../../../core/services/personel-service';
import { Personel } from '../../../core/models/personel';
import { HttpErrorResponse } from '@angular/common/http';
import { Department } from '../../../core/models/department';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'manager-create',
  templateUrl: './manager-create-component.html',
  styleUrls: ['./manager-create-component.css'],
  imports:[CommonModule]
})
export class ManagerCreateComponent implements OnInit {

  PersonelsListQueryByDepartmentId: Personel[] = [];
  DepartmentList: Department[] = [];
  ErrorMessage: string = '';
  DepartmentId: number = 0;
  SuccessMessage:string='';

  constructor(private departmentService: DepartmentService, private personelService: PersonelService,private cdr:ChangeDetectorRef) {}

  ngOnInit(): void {this.getAllDepartmentListFromDb()}

  getAllPersonelByDepartmentIdFromDb(departmentId: number): void {
    this.personelService.getAllPersonelByDepartmentId(departmentId).subscribe({
      next: (response) => {
        this.PersonelsListQueryByDepartmentId = response;

        this.cdr.detectChanges();
      },
      error: (err: HttpErrorResponse) =>
      {
        this.ErrorMessage = err.error.detail;
      }
    });
  }

  getAllDepartmentListFromDb(): void {
    this.departmentService.getAllDepartment().subscribe({
      next: (response) =>
      {
        this.DepartmentList = response;
        this.cdr.detectChanges();
      },
      error: (err: HttpErrorResponse) =>
      {
        this.ErrorMessage = 'Department bulunamadı ' + (err.error.title);
      }
    });
  }

  onDepartmentSelected(event:Event)
  {
    this.DepartmentId=Number((event.target as HTMLSelectElement).value);

     if(!this.HasAnyManagerThisDepartment(this.DepartmentId))
     {
       this.getAllPersonelByDepartmentIdFromDb(this.DepartmentId);
       this.ErrorMessage='';
       this.cdr.detectChanges();
     }
     else
     {
       this.ErrorMessage="Bu departmentte zaten Manager bulunuyor....";
       this.PersonelsListQueryByDepartmentId=[];
       this.cdr.detectChanges();
     }
  }
  createNewManagerByDepartmentId(personelId: number): void {
    this.SuccessMessage = '';
    this.ErrorMessage = '';

    this.personelService.assignManagerToDepartment(personelId, this.DepartmentId).subscribe({
      next: () => {
        this.SuccessMessage = `Başarılı bir şekilde manager atandı.`;
        this.ErrorMessage = '';
        this.PersonelsListQueryByDepartmentId = [];
        this.DepartmentId = 0;
        this.getAllPersonelByDepartmentIdFromDb(this.DepartmentId);
      },
      error: (err: HttpErrorResponse) => {
        this.SuccessMessage = '';
        this.ErrorMessage = err.error.detail ?? 'Manager atanırken hata oluştu.';
      }
    });
  }

  private HasAnyManagerThisDepartment(departmentId: number): boolean
  {
    const department = this.DepartmentList.find(x => x.departmentId === departmentId);
    return department!.managerName != null && department!.managerName.trim() != '-';
  }
}
