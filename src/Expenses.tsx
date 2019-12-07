import React, { Fragment } from 'react'
import { withRouter } from 'react-router-dom'
import uuid from 'uuid/v4'
import ExpensesHistory from './ExpensesHistory'
import { connect } from 'react-redux'
import { AppState } from './store'
import { updateAmount, updateNote, updateMemberChecked, addExpense } from './store/expenses/actions'
import { Member, ExpenseState } from './store/expenses/types'

type AmountProps = {
  updateAmount: typeof updateAmount
}
const amount: React.FC<AmountProps> = (props) => (
  < input type="number" onChange={(e) => props.updateAmount(+e.target.value)} placeholder="0 bath" />
)

const Amount = connect((state: AppState) => ({}), { updateAmount })(amount)


type NoteProps = {
  notes: string[],
  note: string,
  updateNote: typeof updateNote
}
const note: React.FC<NoteProps> = (props) => (
  <Fragment>
    <label htmlFor="note" >Note</label >
    <select name="note" id="note"
      value={props.note}
      onChange={(e) => props.updateNote(e.target.value)}>
      {props.notes.map((n) => <option key={n} value={n}>{n}</option>)}
    </select>
  </Fragment>
)

const Note = connect(
  (state: AppState) => ({ notes: state.expenses.notes, note: state.expenses.note }),
  { updateNote })(note)


type MembersProps = {
  members: Member[],
  updateMemberChecked: typeof updateMemberChecked
}

const members: React.FC<MembersProps> = ({ members, updateMemberChecked }) => (
  <Fragment>
    <fieldset>
      <legend>My friends</legend>
      {
        members.map((member) =>
          <div key={member.id.toString()}>
            <input type="checkbox" id={member.id.toString()}
              name="members"
              checked={member.checked}
              onChange={(e) => { updateMemberChecked(member.id) }} />
            <label htmlFor="1">{member.name}</label>
          </div>)
      }
    </fieldset>
  </Fragment>
)

const Members = connect((state: AppState) => ({ members: state.expenses.members }), { updateMemberChecked })(members)

type Props = {
  expenses: ExpenseState
  addExpense: typeof addExpense
  history: any
}

class Expenses extends React.Component<Props, {}> {

  save({ amount, members, note, payer }: ExpenseState) {
    const record = {
      id: uuid(),
      amount: amount,
      payer: payer,
      owes: members.filter(m => m.checked),
      note: note
    }

    this.props.addExpense(record)
    this.props.history.push("/summary")
  }


  render() {
    return (
      <Fragment>
        <ExpensesHistory records={this.props.expenses.records} />
        <Amount />
        <Members />
        <Note />
        <button type="button" onClick={() => this.save(this.props.expenses)}>Save</button>
      </Fragment >
    )
  }
}

export default withRouter(connect(
  (state: AppState) => ({ expenses: state.expenses }),
  {
    addExpense
  })(Expenses));