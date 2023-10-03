"use client";

import styles from "@/styles/AddExpenseStyle.module.scss";
import Button from "@/components/Button";
import { useSession } from "next-auth/react";
import { useForm } from "react-hook-form";
import { addExpenseThunk, getStatusSelector, setStatus } from "@/state/features/expense-slice";
import { useAppDispatch, useAppSelector } from "@/state/store";
import { useEffect } from "react";

export type Expense = {
    title: string;
    date?: string;
    amount: number | string;
    category?: string;
};

function AddExpanseForm() {
    const { data } = useSession()
    const status = useAppSelector(getStatusSelector)
    const { register, handleSubmit, formState: { errors } } = useForm<Expense>()
    const dispatch = useAppDispatch()

    const onSubmitHandler = async (formData: Expense) => {
        const id = data?.user.id
        const res = await dispatch(addExpenseThunk({ id, formData }))
    }

    let btnStatusStyle;
    let btnContent;

    switch (status) {
        case 'success':
            btnStatusStyle = styles.success
            btnContent = 'added'
            break
        case 'failed':
            btnStatusStyle = styles.failed
            btnContent = 'error'
            break
        default:
            btnStatusStyle = ""
            btnContent = 'add'

    }

    useEffect(() => {
        if (status === 'success' || status === 'failed') {
            setTimeout(() => {
                dispatch(setStatus('idle'))
            }, 3000)
        }
    }, [status])

    return (
        <div className={styles.addExpenseContainer}>
            <form className="flex flex-col gap-4"
                onSubmit={handleSubmit(onSubmitHandler)}
            >
                <input
                    type="text"
                    {...register('title', { minLength: 3, required: true })}
                    className="input_expense"
                    placeholder="Title"
                />
                {errors.title && <p className={'text-white'}>Title should be at least 3 symbols</p>}
                <input
                    type="number"
                    {...register('amount', { min: 1, required: true })}
                    className="input_expense"
                    placeholder="Amount"
                />
                {errors.amount && <p className={'text-white'}>Amount should be more than 0</p>}
                <select
                    id="category"
                    {...register('category')}
                    placeholder="Choose a category"
                    className="bg-white text-black border rounded-full focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                >
                    <option defaultValue="">Choose a category</option>
                    <option value="food">Food</option>
                    <option value="health">Health</option>
                    <option value="education">Education</option>
                    <option value="travel">Travel</option>
                </select>
                <input
                    type="date"
                    id="date"
                    {...register('date')}
                    className="input_expense"
                />
                <Button
                    type="submit"
                    className={`${styles.button} ${btnStatusStyle}`}
                    trigger={btnContent}
                    handler={() => {
                    }}
                />
            </form>
        </div>
    );
}

export default AddExpanseForm;
