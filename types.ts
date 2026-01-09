export interface UserInfo {
  name: string;
  id: string;
  department: string;
}

export enum TabType {
  SUBMITTED = "SUBMITTED",
  TO_APPROVE = "TO_APPROVE",
  RECENT_COMMENTS = "RECENT_COMMENTS",
}

export interface StatusCount {
  submitted: number;
  rejected: number;
  pending: number;
  received: number;
  public: number;
}

export interface DraftItem {
  type: string;
  title: string;
  submittedAt: string;
  approver: string;
  updatedAt: string;
}

export interface DraftForm {
  id: string;
  title: string;
  description: string;
}
export interface NavItem {
  id: string;
  label: string;
  icon?: string;
  isOpen?: boolean;
  subItems?: SubNavItem[];
}
export interface SubNavItem {
  id: string;
  label: string;
  active?: boolean;
}
export enum PublicStatus {
  DEPARTMENT = '부서공개',
  PRIVATE = '비공개',
  COMPANY = '전사공개'
}