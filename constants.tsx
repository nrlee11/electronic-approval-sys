import { DraftForm, NavItem } from "./types";

export const DRAFT_FORMS: DraftForm[] = [
  { id: "1", title: "업무기안", description: "업무기안입니다." },
  { id: "2", title: "업무협조", description: "업무협조입니다." },
  { id: "3", title: "지출결의서(기본형)", description: "지출결의서입니다." },
  { id: "4", title: "지출결의서(엑셀업로드형)", description: "지출결의서2" },
  {
    id: "5",
    title: "지출결의서(엑셀업로드형, 부가세)",
    description: "지출결의서(엑셀업로드형, 부가세)",
  },
  { id: "6", title: "사무용품 신청서", description: "사무용품 신청서입니다." },
  { id: "7", title: "회의록", description: "회의록입니다." },
  { id: "8", title: "업무보고", description: "업무보고입니다." },
  { id: "9", title: "경조금 신청서", description: "경조금 신청서입니다." },
  {
    id: "10",
    title: "증명서 신청(기본형)",
    description: "증명서 신청서입니다.",
  },
  { id: "11", title: "인사명령", description: "인사명령입니다." },
  { id: "12", title: "출장계획서", description: "출장계획서입니다." },
  { id: "13", title: "채용계획서", description: "채용계획서입니다." },
  {
    id: "14",
    title: "증명서 신청(확장형)",
    description: "증명서 신청(확장형)",
  },
];

export const INITIAL_NAV_ITEMS: NavItem[] = [
  {
    id: "draft",
    label: "기안함",
    icon: "expand_less",
    isOpen: true,
    subItems: [
      { id: "s1", label: "상신한", active: true },
      { id: "s2", label: "완료된" },
      { id: "s3", label: "저장된" },
      { id: "s4", label: "반려된" },
      { id: "s5", label: "반송된" },
      { id: "s6", label: "회수된" },
    ],
  },
  { id: "approval", label: "결재함", icon: "expand_more" },
  { id: "inbox", label: "수신함", icon: "expand_more" },
  { id: "public", label: "공람함" },
  { id: "reference", label: "참조함" },
  { id: "dept", label: "부서문서함", icon: "expand_more" },
  { id: "register", label: "문서대장" },
];
