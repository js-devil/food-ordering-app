import React from "react";

const Choice = ({ no, food, loading, order, hasError }) => {
  const { id, name, category, price, quantity } = food;
  const [{ cost, error, user_quantity }, setCost] = React.useState({
    cost: food.price,
    error: false,
    user_quantity: 1
  });

  React.useEffect(() => {
    hasError(error);
    order({ id, name, category, cost, user_quantity });
  }, [cost, error, hasError, order, id, name, category, price, user_quantity]);

  return (
    <tr className="foodName">
      <td style={{ width: "5%", textAlign: "center" }}>{no}.</td>
      <td style={{ width: "50%" }}>{name}</td>
      <td style={{ width: "45%" }}>
        <span
          onClick={e => {
            setCost(key => ({
              cost: cost > price ? Number(cost - price) : cost,
              user_quantity: cost / price,
              error: cost < price || user_quantity > quantity ? true : false
            }));
          }}
          className="decrement"
        >
          -
        </span>
        <input
          disabled={true}
          style={{ textAlign: "center" }}
          type="number"
          value={cost}
          maxLength="4"
          className="validate"
        />
        <span
          onClick={e => {
            setCost(key => ({
              cost: cost < price * quantity ? Number(cost + price) : cost,
              user_quantity: cost / price,
              error: cost < price || user_quantity > quantity ? true : false
            }));
          }}
          className="increment"
        >
          +
        </span>

        {
          user_quantity == quantity  ? (
          <span className="helper-text">
            {`This is the maximum quantity you can order`}
          </span>) 
          : cost-price < price ? (
          <span className="helper-text">
            You can't buy below the minimum cost
          </span>) : ""
        }
      </td>
    </tr>
  );
};

export default Choice;
