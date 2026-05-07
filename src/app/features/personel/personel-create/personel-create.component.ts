import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { PersonelService } from '../../../core/services/personel-service';
import { DepartmentService } from '../../../core/services/department-service';
import { Department } from '../../../core/models/department';

@Component({
  selector: 'app-personel-create',
  standalone: true,
  templateUrl: './personel-create.component.html',
  styleUrl: './personel-create.component.css',
  imports: [FormsModule, CommonModule],
})
export class PersonelCreateComponent implements OnInit
{
  departmentList: Department[] = [];

  form =
    {
    firstName: '',
    lastName: '',
    email: '',
    departmentId: 0,
    hireDate: '',
  };

  successMessage = '';
  errorMessage = '';
  loading = false;

  showDialog = false;
  dialogMessage = '';
  dialogType: 'success' | 'error' = 'success';

  constructor(private personelService: PersonelService, private departmentService: DepartmentService) {}

  ngOnInit(): void
  {
    this.departmentService.getAllDepartment().subscribe(
      {
      next: (response) => {
        this.departmentList = response;
      },
      error: (err) =>
      {
        console.error('Departmanlar alınamadı:', err);
      }
    });
  }

  generateEmail(): void {
    const first = this.form.firstName.trim().toLowerCase();
    const last = this.form.lastName.trim().toLowerCase();

    if (first && last) {
      this.form.email = `${first}.${last}@halkbank.com.tr`;
    } else {
      this.form.email = '';
    }
  }

  openDialog(type: 'success' | 'error', message: string): void
  {
    this.dialogType = type;
    this.dialogMessage = message;
    this.showDialog = true;
  }

  closeDialog(): void
  {
    this.showDialog = false;
  }

  createPersonel(): void {
    this.successMessage = '';
    this.errorMessage = '';
    this.loading = true;

    this.personelService.createNewPersonel(this.form).subscribe({
      next: (response) => {
        this.loading = false;

        this.openDialog('success', `Personel başarıyla oluşturuldu. ID: ${response.id}`);

        this.form = {
          firstName: '',
          lastName: '',
          email: '',
          departmentId: 0,
          hireDate: '',
        };
      },
      error: (err: HttpErrorResponse) => {
        this.loading = false;

        let message = '';

        if (err.error.detail!=null)
        {
          message = err.error.detail;
        }
        else
        {
          message="Bilinmeyen Bir Hata Oluştu";
        }

        this.openDialog('error', message);
      }
    });
  }
}
