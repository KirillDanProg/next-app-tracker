import React from 'react';
import Input from "@/components/Input";
import Button from "@/components/Button";

const AddExpense = () => {
    const onClickHandler = () => {

    }
    return (
        <div>
            <Input />
            <Button handler={onClickHandler}/>
        </div>
    );
};

export default AddExpense;
