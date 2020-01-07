import React from "react";

const Choice = ({ no, food, loading, order, hasError }) => {
  const { id, name, category, price } = food;
  const [{ cost, error }, setCost] = React.useState({
    cost: food.price,
    error: false
  });

  React.useEffect(() => {
    hasError(error);
    order({ id, name, category, cost });
  }, [cost, error, hasError, order, id, name, category, price]);

  return (
    <tr className="foodName">
      <td style={{ width: "10%", textAlign: "center" }}>{no}.</td>
      <td style={{ width: "40%" }}>{name}</td>
      <td style={{ width: "50%" }}>
        <input
          disabled={loading}
          onChange={e => {
            setCost(key => ({
              error: Number(e.target.value) < price ? true : false,
              cost: Number(e.target.value)
            }));
          }}
          type="number"
          value={cost}
          className="validate"
        />
        {error ? (
          <span className="helper-text">
            You can't buy below the minimum cost
          </span>
        ) : (
          ""
        )}
      </td>
    </tr>
  );
};

export default Choice;
