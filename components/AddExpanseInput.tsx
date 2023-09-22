"use client"

import {useState} from "react";
import styles from "@/styles/AddExpenseStyle.module.scss"
import Button from "@/components/Button";

type AddExpanseProps = {
    initValue?: string
}

function AddExpanseInput({initValue}: AddExpanseProps) {
    const [value, setValue] = useState(initValue)

    const onChangeHandler = (e) => {
        setValue(e.target.value)
    }

    return (
        <div className={styles.addExpenseContainer}>
            <input value={value} onChange={onChangeHandler} className={"rounded-full px-6"}/>
            <Button
                className='btn-contained'
                trigger={"Add"}
                handler={() => {
                }}/>
        </div>
    );
}

export default AddExpanseInput;
