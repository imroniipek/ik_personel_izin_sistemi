import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { PersonelInfoModel } from '../../core/models/personel';
import { getThePersonelInfo } from './personelinfo-action';
import { AuthService } from '../../core/services/auth-service';

@Component({
  selector: 'app-personelinfo',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './personelinfo-component.html',
  styleUrls: ['./personelinfo-component.css']
})
export class PersonelinfoComponent implements OnInit {

  personelId: number = 0;
  personel$: Observable<PersonelInfoModel | null>;

  constructor(private store: Store<any>, private authService: AuthService) {
    this.personel$ = this.store.select(state => state.personelInfo.personel);
  }

  ngOnInit(): void {
    this.personelId = this.authService.getPersonelId();
    this.store.dispatch
    (
      getThePersonelInfo({ personelId: this.personelId })
    );
  }
}
