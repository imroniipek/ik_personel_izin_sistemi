import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { DepartmentService } from '../../core/services/department-service';
import { Department } from '../../core/models/department';
import { PersonelService } from '../../core/services/personel-service';
import { Personel } from '../../core/models/personel';
@Component({
  selector: 'department-info',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './department-info.component.html',
  styleUrl: './department-info.component.css'
})
export class DepartmentInfoComponent implements OnInit {

  departmentName = '';
  successMessage = '';
  errorMessage = '';
  loading = false;
  departmentList: Department[] = [];
  selectedDepartmentIdForEdit: number = 0;
  selectedManagerId: number = 0;
  personelListByDepartment: Personel[] = [];

  constructor(private departmentService: DepartmentService, private personelService: PersonelService, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void
  {
    this.getAllDepartmentsWithNamesFromDb();
  }

  createDepartment(): void {
    this.successMessage = '';
    this.errorMessage = '';
    this.loading = true;

    this.departmentService.createDepartment({ name: this.departmentName }).subscribe({
      next: () => {
        this.successMessage = 'Departman başarıyla oluşturuldu.';
        this.departmentName = '';
        this.loading = false;
        this.getAllDepartmentsWithNamesFromDb();
      },
      error: (err) => {
        console.log('Gerçek hata:', err);
        this.errorMessage = 'Departman oluşturulurken hata oluştu.';
        this.loading = false;
      }
    });
  }

  getAllDepartmentsWithNamesFromDb(): void {
    this.departmentService.getAllDepartment().subscribe({
      next: (result) => {
        this.departmentList = result;
        this.cdr.detectChanges();
      },
      error: (error) => {
        console.error(error);
      }
    });
  }

  deleteTheManagerByDepartmentId(departmentId: number): void {
    this.departmentService.deleteTheManagerByDepartmentId(departmentId).subscribe({
      next: () => {
        this.getAllDepartmentsWithNamesFromDb();
        this.successMessage = 'Yönetici kaldırıldı.';
      },
      error: (error) => {
        console.error(error);
        this.errorMessage = 'Yönetici silinemedi.';
      }
    });
  }

  openManagerEdit(departmentId: number): void {
    this.successMessage = '';
    this.errorMessage = '';

    this.selectedDepartmentIdForEdit = departmentId;
    this.selectedManagerId = 0;
    this.personelListByDepartment = [];

    this.personelService.getAllPersonelByDepartmentId(departmentId).subscribe({
      next: (result) => {
        this.personelListByDepartment = result;
      },
      error: (error) => {
        console.error(error);
        this.errorMessage = 'Bu departmandaki personeller getirilemedi.';
      }
    });
  }

  updateTheManager(): void {
    this.successMessage = '';
    this.errorMessage = '';

    if (this.selectedDepartmentIdForEdit === 0) {
      this.errorMessage = 'Departman seçilmedi.';
      return;
    }

    if (this.selectedManagerId === 0) {
      this.errorMessage = 'Lütfen yeni yönetici seçiniz.';
      return;
    }

    this.personelService.updateTheManager(this.selectedManagerId, this.selectedDepartmentIdForEdit).subscribe({
      next: () => {
        this.successMessage = 'Yönetici başarıyla güncellendi.';
        this.selectedDepartmentIdForEdit = 0;
        this.selectedManagerId = 0;
        this.personelListByDepartment = [];
        this.getAllDepartmentsWithNamesFromDb();
      },
      error: (error) => {
        console.error(error);
        this.errorMessage = 'Yönetici güncellenirken hata oluştu.';
      }
    });
  }

  cancelManagerEdit(): void
  {
    this.selectedDepartmentIdForEdit = 0;
    this.selectedManagerId = 0;
    this.personelListByDepartment = [];
  }
}
