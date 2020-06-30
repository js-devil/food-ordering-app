import React from "react";
import Toast from "../Toast";

export default (props) => {
  let [{ amount, number_of_tokens }, changeState] = React.useState({
    amount: 0,
    number_of_tokens: 1,
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    let payload = { amount, number_of_tokens };

    let count = 0;
    for (let value in payload)
      if (!payload[value] || !String(payload[value]).length) count++;

    if (count) return Toast("error", "Please fill in all the required info");

    if (String(amount).length !== 4) return Toast("error", "Lowest is N1000");
    props.submit(payload);
  };

  const handleInput = ({ id, value }) => {
    changeState((key) => ({
      ...key,
      [id]: value,
    }));
  };

  return (
    <form className="col s12 form add-token">
      <div className="row">
        <div className="input-field col s12">
          <p>Enter Amount</p>
          <input
            placeholder="Amount"
            id="amount"
            type="number"
            onChange={(e) => handleInput(e.target)}
            autoComplete="off"
            className="validate"
          />
        </div>

        <div className="input-field col s12">
          <p>Enter Number of Tokens</p>
          <div className="flex">
            <button
              disabled={number_of_tokens === 0}
              onClick={(e) => {
                e.preventDefault();
                changeState((key) => ({
                  ...key,
                  number_of_tokens: number_of_tokens - 1,
                }));
              }}
            >
              -
            </button>

            <span>{number_of_tokens}</span>

            <button
              onClick={(e) => {
                e.preventDefault();
                changeState((key) => ({
                  ...key,
                  number_of_tokens: number_of_tokens + 1,
                }));
              }}
            >
              +
            </button>
          </div>
        </div>

        <div className="input-field col s12">
          <button
            onClick={(e) => handleSubmit(e)}
            className="btn waves-effect btn-flat btn-block"
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
