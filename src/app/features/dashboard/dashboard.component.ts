import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { PersonelService } from '../../core/services/personel-service';
import { DepartmentService } from '../../core/services/department-service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {
  toplamPersonelSayisi = 0;
  toplamYoneticiSayisi = 0;
  toplamDepartmentSayisi = 0;

  constructor(
    private personelService: PersonelService,
    private departmentService: DepartmentService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.getTheAllPersonelsCountFromDb();
    this.getTheAllDepartmentCountFromDb();
    this.getTheManagerCountFromDb();
  }

  getTheAllPersonelsCountFromDb(): void {
    this.personelService.getAllOfPersonelCount().subscribe({
      next: (response: number) => {
        this.toplamPersonelSayisi = Number(response);
        this.cdr.detectChanges();
      },
      error: (error) => {
        console.error('Personel sayısı alınırken hata oluştu:', error);
      }
    });
  }

  getTheAllDepartmentCountFromDb(): void {
    this.departmentService.getAllOfDepartmentCount().subscribe({
      next: (response: number) => {
        this.toplamDepartmentSayisi = Number(response);
        this.cdr.detectChanges();
      },
      error: (error) => {
        console.error('Departman sayısı alınırken hata oluştu:', error);
      }
    });
  }
  getTheManagerCountFromDb():void
  {
    this.personelService.getManagerCount().subscribe(
      {
        next:(response:number)=>{
          this.toplamYoneticiSayisi=Number(response);
          this.cdr.detectChanges();
        },
        error:(error)=>
        {
          console.error('Manager sayısı alınırken hata oluştu:', error);
        }
      }
    )
  }
}
