import React from "react";
import Toast from "../functions/Toast";

const Choice = ({ no, food, order, hasError }) => {
  const { id, name, category, price, quantity } = food;
  const [{ cost, error, user_quantity }, setCost] = React.useState({
    cost: food.price,
    error: false,
    user_quantity: 1,
  });

  React.useEffect(() => {
    hasError(error);
    order({ id, name, category, cost, user_quantity });

    if (error && user_quantity === quantity) {
      Toast("info", `This is the maximum quantity of ${name} you can order`);
    }
  }, [
    cost,
    error,
    hasError,
    order,
    id,
    name,
    category,
    price,
    user_quantity,
    quantity,
  ]);

  return (
    <tr className="foodName">
      <td style={{ width: "5%", textAlign: "center" }}>{no}.</td>
      <td style={{ width: "50%" }}>{name}</td>
      <td style={{ width: "5%", textAlign: "center" }}>
        <span className="selected_quantity"> x{user_quantity} </span>
      </td>
      <td style={{ width: "40%" }}>
        <span
          onClick={(e) => {
            setCost((key) => ({
              cost: cost > price ? Number(cost - price) : cost,
              user_quantity: cost > price ? user_quantity - 1 : user_quantity,
              error: cost < price || user_quantity > quantity ? true : false,
            }));
          }}
          className="decrement"
        >
          -
        </span>
        <div className="food-cost">{parseFloat(cost).toLocaleString("en")}</div>
        <span
          onClick={(e) => {
            setCost((key) => ({
              cost: cost < price * quantity ? Number(cost + price) : cost,
              user_quantity:
                cost < price * quantity ? user_quantity + 1 : user_quantity,
              error: cost < price || user_quantity > quantity ? true : false,
            }));
          }}
          className="increment"
        >
          +
        </span>

        {/* <span className="cancelItem">
          <i className="material-icons"></i>
        </span> */}
      </td>
    </tr>
  );
};

export default Choice;
