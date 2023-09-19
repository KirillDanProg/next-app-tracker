type ButtonProps = {
    handler: () => void
}
const Button = ({handler}: ButtonProps) => {
    return (
        <button onClick={handler}>
            Добавить
        </button>
    );
}

export default Button;
