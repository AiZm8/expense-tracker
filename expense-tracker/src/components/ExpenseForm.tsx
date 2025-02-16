import { useState, ChangeEvent, FormEvent } from 'react';

// define type for inputs
interface FormInputs {
    description?: string;
    amount?: number;
}

function ExpenseForm() {
    const [inputs, setInputs] = useState<FormInputs>({});
  
    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
      const name = event.target.name;
      const value = event.target.value;
      setInputs(values => ({...values, [name]: value}))
    }
  
    const handleSubmit = (event: ChangeEvent<HTMLFormElement>) => {
      event.preventDefault();
      // alert(inputs);
      console.log(inputs);
    }
  
    return (
      <form onSubmit={handleSubmit}>
        <label>Description:
        <input 
          type="text" 
          name="description" 
          value={inputs.description || ""} 
          onChange={handleChange}
        />
        </label>
        <label>Amount:
          <input 
            type="number" 
            name="amount" 
            value={inputs.amount || ""} 
            onChange={handleChange}
          />
          </label>
          <input type="submit" />
      </form>
    )
  }
  
export default ExpenseForm