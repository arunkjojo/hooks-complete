import React, { useState } from 'react';
import Card from '../UI/Card';
import './IngredientForm.css';
import LoadingIndicator from '../UI/LoadingIndicator';

const IngredientForm = React.memo(props => {
  const [ingredientName, setIngredientName] = useState('');
  const [ingredientAmount, setIngredientAmount] = useState('');
  
  const ingredientNameHandler = e => {
    setIngredientName(e.target.value)
  }
  const ingredientAmountHandler = (e) => {
    setIngredientAmount(e.target.value);
  };
  // const [ingredientInput,setIngredientInput] = useState({
  //   title: "",
  //   amount: "",
  // });
  
  const submitHandler = event => {
    event.preventDefault();
    if (ingredientName.length > 0 && ingredientAmount !== '')
      props.onAddIngredient({
        title: ingredientName,
        amount: ingredientAmount,
      });
    
    setIngredientName('');
    setIngredientAmount('');
    
  };
  return (
    <section className="ingredient-form">
      <Card>
        <form onSubmit={submitHandler}>
          <div className="form-control">
            <label htmlFor="title">Name</label>
            <input
              type="text"
              id="title"
              value={ingredientName}
              onChange={ingredientNameHandler}
              // value={ingredientInput.title}
              // onChange={(e) => {
              //   const newTitle = e.target.value;
              //   setIngredientInput((prevIngredientInput) => ({
              //     title: newTitle,
              //     amount: prevIngredientInput.amount,
              //   }));
              // }}
            />
          </div>
          <div className="form-control">
            <label htmlFor="amount">Amount</label>
            <input
              type="number"
              id="amount"
              value={ingredientAmount}
              onChange={ingredientAmountHandler}
              // value={ingredientInput.amount}
              // onChange={(e) =>
              //   setIngredientInput({
              //     amount: e.target.value,
              //     title: ingredientInput.title,
              //   })
              // }
            />
          </div>
          <div className="ingredient-form__actions">
            <button type="submit">Add Ingredient</button>
            {props.loading && <LoadingIndicator />}
          </div>
        </form>
      </Card>
    </section>
  );
});

export default IngredientForm;
