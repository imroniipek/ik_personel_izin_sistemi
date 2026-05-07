import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import { PersonelService } from '../../../core/services/personel-service';
import { Personel } from '../../../core/models/personel';

@Component({
  selector: 'personel-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './personel-list.component.html',
  styleUrl: './personel-list.component.css'
})
export class PersonelListComponent implements OnInit {
  PersonelList: Personel[] = [];

  constructor(private personelService: PersonelService,private cdr:ChangeDetectorRef) {}

  ngOnInit(): void
  {
    this.getAllPersonelsFromDb();
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
}
