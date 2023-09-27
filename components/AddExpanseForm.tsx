"use client";

import { useState } from "react";
import styles from "@/styles/AddExpenseStyle.module.scss";
import Button from "@/components/Button";
import { ChangeEvent } from "react"
import { useSession } from "next-auth/react";


export type FormDataType = {
    title: string;
    date?: string;
    amount: number | string;
    category?: string;
};

type Event = ChangeEvent<HTMLInputElement | HTMLSelectElement>

const addExpenseToUserById = async (id: string, formData: FormDataType) => {
    const res = await fetch(`http://localhost:3000/api/users/${id}`, {
        method: 'POST',
        cache: "no-cache",
        body: JSON.stringify(formData)
    })
    if (!res.ok) {
        throw new Error('addExpenseToUserById error')
    }
    return res
}

function AddExpanseForm() {
    const { data } = useSession()
    const initialFormData = {
        title: "",
        date: "",
        amount: "",
        category: "",
    };

    const [formData, setFormData] = useState<FormDataType>(initialFormData);

    const onChangeHandler = (e: Event) => {
        const { name, value } = e.target;
        setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
    };
    const onSubmitHandler = async (e: any) => {
        e.preventDefault()
        const id = data?.user?.id
        const res = await addExpenseToUserById(id, formData)
    }

    return (
        <div className={styles.addExpenseContainer}>
            <form className="flex flex-col gap-4"
                onSubmit={onSubmitHandler}
            >
                <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={onChangeHandler}
                    className="input_expense"
                    placeholder="Title"
                />
                <input
                    type="number"
                    name="amount"
                    value={formData.amount}
                    onChange={onChangeHandler}
                    className="input_expense"
                    placeholder="Amount"
                />
                <select
                    id="category"
                    name="category"
                    value={formData.category}
                    onChange={onChangeHandler}
                    className="bg-white text-black border rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
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
                    name="date"
                    value={formData.date}
                    onChange={onChangeHandler}
                    className="input_expense"
                />
                <Button
                    type="submit"
                    className="btn-contained"
                    trigger="Add"
                    handler={() => { }}
                />
            </form>
        </div>
    );
}

export default AddExpanseForm;
