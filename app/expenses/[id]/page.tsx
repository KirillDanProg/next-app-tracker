import type { InferGetStaticPropsType, GetStaticProps } from 'next'
import type { Expense } from '@/types/expense'
import expenses from '../../../state/features/expense-slice';

export const getExpenses = async (id: string) => {
  console.log(id)
  const res = await fetch(`http://localhost:3000/api/users/${id}/expenses`)
  if (!res.ok) {
    throw new Error('Failed to fetch data')
  }
  return res.json()
}

const Expenses = async ({ params }: { params: { id: string } }) => {
  const { id } = params
  const expenses = await getExpenses(id)
  console.log(expenses)
  return (
    <div>
      rweqrqwe
    </div>
  )
}

export default Expenses