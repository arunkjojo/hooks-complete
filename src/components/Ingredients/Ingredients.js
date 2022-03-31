import React, {
  useCallback,
  useEffect,
  useReducer,
  useMemo,
  // useState
} from "react";
import IngredientForm from './IngredientForm';
import IngredientList from './IngredientList';
import Search from './Search';
import ErrorModal from '../UI/ErrorModal';
import useHttp from '../../hooks/http';

const ingredientReducer = (currentIngredients, action) => {
  switch (action.type) {
    case "SET":
      return action.ingredients;
    case "ADD":
      return [...currentIngredients, action.ingredient];
    case "DELETE":
      return currentIngredients.filter((ing) => ing.id !== action.id);
    default:
      throw new Error("Should not get there!");
  }
}

// const httpReducer = (curHttpState, action) => {
//   switch (action.type) {
//     case "SEND":
//       return { loading: true, error: null };
//     case "RESPONSE":
//       return { ...curHttpState, loading: false };
//     case "ERROR":
//       return { loading: false, error: action.errorMessage };
//     case "CLEAR":
//       return { ...curHttpState, error: null };
//     default:
//       throw new Error("Should not be reached!");
//   }
// };

function Ingredients() {
  const [ingredientData, dispatch] = useReducer(ingredientReducer, []);
  // const [httpState, dispatchHttp] = useReducer(httpReducer, {
  //   loading: false,
  //   error: null,
  // });
  const { isLoading, error, data, sendRequest, reqExtra, reqIdentifer } = useHttp();
  // const [ingredientData, setIngredientData] = useState([]);
  // const [isLoading, setIsLoading] = useState(false);
  // const [error, setError] = useState();

  useEffect(() => {
    if (!isLoading && !error && reqIdentifer === "REMOVE_INGREDIENT") {
      dispatch({ type: "DELETE", id: reqExtra });
    } else if (!isLoading && !error && reqIdentifer === "ADD_INGREDIENT") {
      dispatch({
        type: "ADD",
        ingredient: { id: data.name, ...reqExtra },
      });
    }
  }, [data, reqExtra, reqIdentifer, isLoading, error]);

  const filteredIngredientsHandler = useCallback((filteredIngredients) => {
    // setIngredientData(filteredIngredients);
    dispatch({
      type: 'SET',
      ingredients: filteredIngredients
    })
  }, []);

  const addIngredientHandler = useCallback(
    (ingredient) => {
      // setIsLoading(true);

      // dispatchHttp({ type: "SEND" });
      // fetch(
      //   "https://react-udemy-app-6145d-default-rtdb.firebaseio.com/ingredients.json",
      //   {
      //     method: "POST",
      //     body: JSON.stringify(ingredient),
      //     headers: {
      //       "Content-Type": "application/json",
      //     },
      //   }
      // )
      //   .then((res) => {
      //     // setIsLoading(false);
      //     dispatchHttp({ type: "RESPONSE" });
      //     return res.json();
      //   })
      //   .then((data) => {
      //     // setIngredientData((prevIngredientData) => [
      //     //   ...prevIngredientData,
      //     //   {
      //     //     id: data.name,
      //     //     ...ingredient,
      //     //   },
      //     // ]);
      //     dispatch({
      //       type: "ADD",
      //       ingredient: { id: data.name, ...ingredient },
      //     });
      //   });

      sendRequest(
        "https://react-udemy-app-6145d-default-rtdb.firebaseio.com/ingredients.json",
        "POST",
        JSON.stringify(ingredient),
        ingredient,
        "ADD_INGREDIENT"
      );
    },
    [sendRequest]
  );

  const removeIngredientHandler = useCallback(
    (ingredientId) => {
      // setIsLoading(true);

      // dispatchHttp({ type: "SEND" });
      // fetch(
      //   `https://react-udemy-app-6145d-default-rtdb.firebaseio.com/ingredients/${ingredientId}.json`,
      //   {
      //     method: "DELETE",
      //   }
      // )
      //   .then((res) => {
      //     // setIsLoading(false);
      //     dispatchHttp({ type: "RESPONSE" });
      //     // setIngredientData((prevIngredientData) =>
      //     //   prevIngredientData.filter(
      //     //     (ingredient) => ingredient.id !== ingredientId
      //     //   )
      //     // );
      //     dispatch({
      //       type: "DELETE",
      //       id: ingredientId,
      //     });
      //   })
      //   .catch((error) => {
      //     // setError("Something went wrong!");
      //     // setIsLoading(false);
      //     dispatchHttp({
      //       type: "ERROR",
      //       errorMessage: "Something went wrong!",
      //     });
      //   });
      sendRequest(
        `https://react-hooks-update.firebaseio.com/ingredients/${ingredientId}.json`,
        "DELETE",
        null,
        ingredientId,
        "REMOVE_INGREDIENT"
      );
    },
    [sendRequest]
  );

  const clearError = useCallback(() => {
    // setError(null);
    // dispatchHttp({ type: "CLEAR" });
  }, []);
  
  const ingredientList = useMemo(() => {
    return (
      <IngredientList
        ingredients={ingredientData}
        onRemoveItem={removeIngredientHandler}
      />
    );
  }, [ingredientData, removeIngredientHandler]);


  return (
    <div className="App">
      {error && (
        // httpState.error && (
        <ErrorModal onClose={clearError}>{error}</ErrorModal>
      )}

      <IngredientForm
        onAddIngredient={addIngredientHandler}
        loading={
          //isLoading
          // httpState.loading
          isLoading
        }
      />

      <section>
        <Search onLoadIngredients={filteredIngredientsHandler} />

        {ingredientList}
      </section>
    </div>
  );
}

export default Ingredients;
