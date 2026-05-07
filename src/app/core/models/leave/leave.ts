export enum LeaveStatus {
  Pending = 1,
  Approved = 2,
  Rejected = 3
}

export interface Leave {
  id: number;
  personelId: number;
  startedDate: string;
  endedDate: string;
  status: LeaveStatus;
}
export const getLeaveStatusName = (status: LeaveStatus): string => {
  switch (status) {
    case LeaveStatus.Approved:
      return 'Onaylanmış';

    case LeaveStatus.Rejected:
      return 'Reddedilmiş';

    case LeaveStatus.Pending:
      return 'Cevap Bekleniyor';

    default:
      return 'Bilinmiyor';
  }
}
export interface CreateLeaveRequest {
  personelId: number;
  startedDate: string;
  endedDate: string;
}

export interface LeaveListResponse {
  countList: number;
  leavesList: Leave[];
}

export interface UpdateLeaveRequest {
  startedDate: string;
  endedDate: string;
  status: LeaveStatus;
}
