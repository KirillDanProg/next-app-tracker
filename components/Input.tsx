"use client"

import {useState} from "react";

type InputProps = {
    initValue?: string
}

function Input ({initValue}: InputProps) {
    const [value, setValue] = useState(initValue)

    const onChangeHandler = (e) => {
        setValue(e.target.value)
    }

    return (
        <input value={value} onChange={onChangeHandler}/>
    );
}

export default Input;
