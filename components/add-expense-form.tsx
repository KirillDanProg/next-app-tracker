"use client";

import styles from "@/styles/AddExpenseStyle.module.scss";
import { useSession } from "next-auth/react";
import { useForm } from "react-hook-form";
import { selectError, selectStatus, setStatus } from "@/state/features/expenses/expense-slice";
import { useAppDispatch, useAppSelector } from "@/state/store";
import { useEffect } from "react";
import { Expense } from "@/types/expense";
import Button from "./button";
import { addExpenseThunk } from "@/state/features/expenses/expense-slice";


function AddExpenseForm() {
    const { data } = useSession()
    const status = useAppSelector(selectStatus)
    const error = useAppSelector(selectError)
    const { register, handleSubmit, formState: { errors, isSubmitSuccessful }, reset } = useForm<Expense>()
    const dispatch = useAppDispatch()

    const onSubmitHandler = async (formData: Expense) => {
        const userId = data?.user?.id
        if (!formData.category || formData.category === "Choose a category") {
            formData.category = "other"
        }
        const res = await dispatch(addExpenseThunk({ userId, formData }))
        if (res.meta.requestStatus === "fulfilled") {
            reset({ title: "", amount: "", date: "", category: "" })
        }
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
    }, [status, dispatch])

    return (
        <div className={'flex flex-col flex-center '}>
            <p className={'text-white'}>{error}</p>
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
                <div className={'flex gap-1'}>
                    <input
                        type="number"
                        {...register('amount', { min: 1, required: true })}
                        className="input_expense"
                        placeholder="Amount"
                    />
                    <select
                        className={'input_expense'}
                        {...register('currency')}>
                        <option value={'RUB'}>RUB</option>
                        <option value={'USD'}>USD</option>
                        <option value={'EUR'}>EUR</option>
                    </select>
                </div>
                {errors.amount && <p className={'text-white'}>Amount should be more than 0</p>}
                <select
                    id="category"
                    {...register('category')}
                    placeholder="Choose a category"
                    className="bg-white text-black border rounded-full focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                >
                    <option defaultValue="other">Choose a category</option>
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

export default AddExpenseForm;
