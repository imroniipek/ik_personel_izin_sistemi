import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { PendingLeaveInfo } from '../../core/models/leave/pending-leaves-info';
import * as PendingLeavesListActions from './pending-leaves-list.action';
import { LeaveStatus } from '../../core/models/leave/leave';

@Component({
  selector: 'app-pending-leaves-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pending-leaves-list.component.html',
  styleUrls: ['./pending-leaves-list.component.css']
})
export class PendingLeavesListComponent implements OnInit {

  pendingLeaves$: Observable<PendingLeaveInfo[]>;
  loading$: Observable<boolean>;
  errorMessage$: Observable<string | null>;

  managerId: number = 11;

  constructor(private store: Store<any>) {
    this.pendingLeaves$ = this.store.select(state => state.pendingLeaveList.data);
    this.loading$ = this.store.select(state => state.pendingLeaveList.loading);
    this.errorMessage$ = this.store.select(state => state.pendingLeaveList.errorMessage);
  }

  ngOnInit(): void {
    this.store.dispatch(
      PendingLeavesListActions.getPendingLeavesList({
        managerId: this.managerId
      })
    );
  }

  approveLeave(leave: PendingLeaveInfo): void {
    this.store.dispatch(
      PendingLeavesListActions.updatePendingLeaveStatus({
        leaveId: leave.leaveId,
        request: {
          startedDate: leave.startedDate,
          endedDate: leave.endendDate,
          status: LeaveStatus.Approved
        },
        managerId: this.managerId
      })
    );
  }

  rejectLeave(leave: PendingLeaveInfo): void {
    this.store.dispatch(
      PendingLeavesListActions.updatePendingLeaveStatus({
        leaveId: leave.leaveId,
        request: {
          startedDate: leave.startedDate,
          endedDate: leave.endendDate,
          status: LeaveStatus.Rejected
        },
        managerId: this.managerId
      })
    );
  }
}
