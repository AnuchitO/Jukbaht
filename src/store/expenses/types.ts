export type MemberID = number
export interface Member {
  id: MemberID
  name: string
}

export type RecordID = string
export interface Record {
  id: RecordID
  amount: number
  payer: Member
  owes: Member[]
  note: string
}

export interface ExpenseState {
  amount: number | string
  members: Member[]
  note: string
  notes: string[]
  owes: Member[]
  payer: Member
  records: Record[]
}

export const UPDATE_AMOUNT = "UPDATE_AMOUNT"
export const UPDATE_NOTE = "UPDATE_NOTE"
export const UPDATE_OWES = "UPDATE_OWES"
export const ADD_EXPENSE = "ADD_EXPENSE"
export const CHANGE_PAYER = "CHANGE_PAYER"

interface UpdateAmountAction {
  type: typeof UPDATE_AMOUNT
  payload: number
}

interface UpdateNoteAction {
  type: typeof UPDATE_NOTE
  payload: string
}

interface UpdateOwes {
  type: typeof UPDATE_OWES
  payload: Member[]
}

interface AddExpense {
  type: typeof ADD_EXPENSE
  payload: Record
}

interface ChangePayer {
  type: typeof CHANGE_PAYER
  payload: Member
}

export type ExpenseActionsTypes = UpdateAmountAction | UpdateNoteAction | UpdateOwes | AddExpense | ChangePayer