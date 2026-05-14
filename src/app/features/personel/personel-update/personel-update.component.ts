import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PersonelService} from '../../../core/services/personel-service';
import {PersonelForUpdate} from '../../../core/models/personel';
import {FormsModule} from '@angular/forms';
import {Department} from '../../../core/models/department';
import {DepartmentService} from '../../../core/services/department-service';
import { ActivatedRoute } from '@angular/router';
@Component(
  {
    selector: 'personel-list',
    standalone: true,
    imports: [CommonModule,FormsModule],
    templateUrl: './personel-update.component.html',
    styleUrl: './personel-update.component.css'
  }
)
export class PersonelUpdateComponent implements OnInit
{
  personelId:number=0;

  departmentList:Department[]=[];

  thePersonel: PersonelForUpdate = {
  id: 0,
  firstName: '',
  lastName: '',
  email: '',
  hireDate: '',
  departmentId: 0,
};

  successMessage:string=" ";
  errorMessage:string=" ";

  constructor(private personelService:PersonelService,private departmentService:DepartmentService,private cdr:ChangeDetectorRef,  private route: ActivatedRoute) {}

  ngOnInit()
  {
    this.personelId = Number(this.route.snapshot.paramMap.get('id'));

    this.personelService.getThePersonelByPersonelId(this.personelId).subscribe(
      {
        next:(response)=>
        {
          this.thePersonel=response;
          this.cdr.detectChanges();
        },
        error:(err)=>
        {
          this.errorMessage=err.description;
          this.cdr.detectChanges();
        }
      }
    );

    this.departmentService.getAllDepartment().subscribe(
      {
        next:(response)=>{
          this.departmentList=response;
        },
        error:(err)=>
        {
          this.errorMessage=err.description;
        }
      }
    );
  }
  updateThePersonel()
  {
    this.personelService.updateThePersonel(this.thePersonel.id,this.thePersonel).subscribe
    (
      {
        next:()=>
        {
          this.successMessage="Personel Başarılı Bir Şekilde Güncellendi."
        },
        error:(err:any)=>
        {
          this.errorMessage=`Personel Güncellenemedi Hata Detayı: ${err.description}`;
        }
      }
    )
  }
}
