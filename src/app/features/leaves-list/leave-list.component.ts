import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import * as LeaveListActions from './leave-list.action';
import { Observable } from 'rxjs';
import {getLeaveStatusName, Leave} from '../../core/models/leave/leave';
import { AuthService } from '../../core/services/auth-service';

@Component({
  selector: 'app-leave-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './leave-list.component.html',
  styleUrls: ['./leaves-list.component.css']
})
export class LeaveListComponent implements OnInit {

  personelId = 0;
  getLeaveStatusName = getLeaveStatusName;
  leaves$: Observable<Leave[]>;
  error$: Observable<string | null>;
  count$: Observable<number>;

  constructor(private store: Store<any>, private authService: AuthService) {
    this.leaves$ = this.store.select(state => state.leaveList.data);
    this.error$ = this.store.select(state => state.leaveList.error);
    this.count$ = this.store.select(state => state.leaveList.totalCountList);
  }

  ngOnInit(): void {
    this.personelId = this.authService.getPersonelId();

    this.store.dispatch(
      LeaveListActions.GetTotalLeaveCountAction({
        personelId: this.personelId
      })
    );
  }

  getAcceptedLeaves(): void {
    this.store.dispatch(
      LeaveListActions.GetAcceptedLeaveListAction({
        personelId: this.personelId
      })
    );
  }

  getRejectedLeaves(): void {
    this.store.dispatch(
      LeaveListActions.GetRejectedLeaveListAction({
        personelId: this.personelId
      })
    );
  }

  getPendingLeaves(): void {
    this.store.dispatch(
      LeaveListActions.GetPendingLeaveListAction({
        personelId: this.personelId
      })
    );
  }
}
