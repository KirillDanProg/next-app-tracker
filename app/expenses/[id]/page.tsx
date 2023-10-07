import { Expense } from "@/types/expense";
import { ExpensesPieHart } from "@/components/expenses-pie-сhart";

const Expenses = async ({ params }: { params: { id: string } }) => {
    const { id } = params
    const data = await getExpenses(id)

    if ("error" in data) {
        return <div>{data.error}</div>
    }
    return (
        <section className="flex flex-col gap=4 text-white">
            <ExpensesPieHart expenses={data.expenses}/>
            {
                data.expenses?.map(el => <div className={'flex flex-col'} key={el.title}>
                        <div className={"flex"}>
                            <h6>{el.title}</h6>
                            <p>{el.amount}</p>
                        </div>
                    </div>
                )
            }
        </section>
    )
}

export async function getExpenses(id: string): Promise<{ expenses: Expense[] } | { error: string }> {
    const res = await fetch(`http://localhost:3000/api/users/${id}/expenses`)
    if (!res.ok) {
        return {
            error: res.statusText
        }
    }
    return await res.json()
}

export default Expenses
