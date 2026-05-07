import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import * as LeaveActions from './leave-action';
import {selectLeaveSummary, selectLeaveLoading, selectLeaveError, selectLeaveSuccessMessage} from './leave-selectors';
import { AuthService } from '../../core/services/auth-service';
@Component({
  selector: 'app-leave-page',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './leave-page.component.html',
  styleUrls:['./leave-page.component.css']
})
export class LeavePageComponent implements OnInit {

  private store = inject(Store);
  private authService = inject(AuthService);

  personelId: number = 0;
  startedDate: string = '';
  endedDate: string = '';

  summary$ = this.store.select(selectLeaveSummary);
  loading$ = this.store.select(selectLeaveLoading);
  error$ = this.store.select(selectLeaveError);
  successMessage$ = this.store.select(selectLeaveSuccessMessage);

  ngOnInit(): void {
    this.personelId = this.authService.getPersonelId();
    this.loadSummary();
  }

  loadSummary(): void {
    this.store.dispatch(
      LeaveActions.loadLeaveSummary({
        personelId: this.personelId
      })
    );
  }

  createLeave(): void {
    this.store.dispatch(
      LeaveActions.createLeave({
        request: {
          personelId: this.personelId,
          startedDate: this.startedDate,
          endedDate: this.endedDate
        }
      })
    );
  }
}
