import AddExpenseForm from "@/components/add-expense-form";

const Home = () => {
    return (
        <main>
            <h1 style={{
                WebkitTextStroke: "2px white",
                color: 'transparent',
                fontFamily: "sans-serif",
                wordSpacing: "20px",
                textTransform: "uppercase"
            }} className="head_text m-16">Expense tracker</h1>
            <AddExpenseForm/>
        </main>
    );
};

export default Home;
