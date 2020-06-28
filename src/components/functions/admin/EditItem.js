import React from "react";

export default ({ item }) => {
  const state = {
    category: item.category,
    name: item.name,
    price: item.price,
    quantity: item.quantity,
    status: item.status,
  };

  const [
    { category, name, price, quantity, status },
    changeState,
  ] = React.useState(state);

  const handleInput = ({ id, value }) => {
    changeState((key) => ({
      ...key,
      [id]: value,
    }));

    console.log(id, value);
  };

  return (
    <form className="col s12 form">
      <div className="row">
        {Object.keys({
          category: item.category,
          name: item.name,
          price: item.price,
        }).map((key) => (
          <div className="input-field col s12" key={key}>
            <input
              placeholder={key}
              id={key}
              type="text"
              onChange={(e) => handleInput(e.target)}
              style={{ textTransform: "capitalize" }}
              defaultValue={item[key]}
              className="validate"
            />
            {/* <label htmlFor={key} style={{ textTransform: "capitalize" }}>
              {key}
            </label> */}
          </div>
        ))}

        <div className="input-field col s12">
          <p>Status</p>
          <div className="switch">
            <label>
              Unavailable
              <input
                onChange={(e) => handleInput(e.target)}
                type="checkbox"
                id="status"
              />
              <span className="lever"></span>
              Available
            </label>
          </div>
        </div>

        <div className="input-field col s12">
          <p>Quantity ({quantity})</p>
          <p className="range-field">
            <input
              type="range"
              onChange={(e) => handleInput(e.target)}
              id="quantity"
              defaultValue={item.quantity}
              min="0"
              max="100"
            />
          </p>
        </div>
      </div>
    </form>
  );
};
