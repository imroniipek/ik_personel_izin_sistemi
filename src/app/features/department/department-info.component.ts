import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import {DepartmentService} from '../../core/services/department-service';
import {Department} from '../../core/models/department';

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

  constructor(private departmentService: DepartmentService, private cdr: ChangeDetectorRef) {}

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

  getAllDepartmentsWithNamesFromDb(): void
  {
    this.departmentService.getAllDepartment().subscribe(
      {
      next: (result) =>
      {
        this.departmentList = result;
        this.cdr.detectChanges();
      },
      error: (error) =>
      {
        console.error(error);
      }
    });
  }

  deleteTheManagerByDepartmentId(departmentId:number): void
  {
    this.departmentService
      .deleteTheManagerByDepartmentId(departmentId).subscribe({
        next: () => {
          this.getAllDepartmentsWithNamesFromDb();
          this.successMessage = "Yönetici kaldırıldı.";
        },

        error: (error) => {
          console.error(error);
          this.errorMessage = "Yönetici silinemedi.";
        }
      });
  }
}
