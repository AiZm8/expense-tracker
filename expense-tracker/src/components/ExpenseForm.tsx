import { useState, ChangeEvent, FormEvent} from 'react';

// define type for inputs
interface FormInputs {
    description?: string;
    amount?: number;
}

interface Expense {
    id: number;
    description: string;
    amount: number;
}

function ExpenseForm() {
    const [inputs, setInputs] = useState<FormInputs>({});
    const [expenses, setExpenses] = useState<Expense[]>([]);
  
    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
      const name = event.target.name;
      const value = event.target.value;
      setInputs(values => ({...values, [name]: value}))
    }
  
    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();

      // only add if both fields have values
      if (inputs.description && inputs.amount) {
        const newExpense = {
            id: Date.now(), // unique ID for each expense
            description: inputs.description,
            amount: Number(inputs.amount)
        };

        setExpenses([...expenses, newExpense]);
        setInputs({}); // clear the form
      }
    }
  
    return (
        <div>
            <form onSubmit = {handleSubmit}>
                <label>Description:
                    <input
                    type = "text"
                    name = "description"
                    value = {inputs.description || ""}
                    onChange={handleChange}
                    />
                </label>
                <label>Amount:
                    <input
                    type = "number"
                    name = "amount"
                    value = {inputs.amount || ""}
                    onChange = {handleChange}
                    />
                </label>
                <input type = "submit" />
            </form>

            {/* display expenses */}
            <div>
                <h2>Expenses:</h2>
                <ul>
                    {expenses.map(expense => (
                        <li key={expense.id}>
                            {expense.description}: ${expense.amount}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
  }
  
export default ExpenseForm