import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { PersonelInfoModel } from '../../core/models/personel';
import { getManagerInfo } from './managerinfo-action';
import { AuthService } from '../../core/services/auth-service';

@Component({
  selector: 'app-managerinfo',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './managerinfo-component.html',
  styleUrls: ['./managerinfo-component.css']
})
export class ManagerinfoComponent implements OnInit {

  personelId: number = 0;
  personel$: Observable<PersonelInfoModel | null>;

  constructor(private store: Store<any>, private authService: AuthService) {
    this.personel$ = this.store.select(state => state.managerInfo.personel);
  }

  ngOnInit(): void
  {
    this.personelId = this.authService.getPersonelId();
    this.store.dispatch(
      getManagerInfo({ personelId: this.personelId })
    );
  }
}
