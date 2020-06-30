import React from "react";
import Toast from "../Toast";
import { categories } from "../../navigation/Navbar";

export default ({ item, submit }) => {
  const state = {
    category: item.category || null,
    name: item.name || null,
    price: item.price || null,
    quantity: Object.values(item).length ? item.quantity : 50,
    status: Object.values(item).length ? item.status : "Available",
  };

  const [
    { category, name, price, quantity, status },
    changeState,
  ] = React.useState(state);

  const handleInput = ({ id, value }) => {
    if (id === "status")
      return changeState((key) => ({
        ...key,
        [id]: status === "Unavailable" ? "Available" : "Unavailable",
      }));

    changeState((key) => ({
      ...key,
      [id]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = { category, name, price, quantity, status };

    let count = 0;
    for (let value in payload)
      if (!payload[value] || !String(payload[value]).length) count++;

    if (count) return Toast("error", "Please fill in all the required info");

    submit(payload, item.id);
  };

  const EditForm = (
    <form className="col s12 form" onSubmit={(e) => handleSubmit(e)}>
      <div className="row">
        {Object.keys({
          name: item.name,
          price: item.price,
        }).map((key) => (
          <div className="input-field col s12" key={key}>
            <input
              placeholder={key}
              id={key}
              type={key === "price" ? "number" : "text"}
              onChange={(e) => handleInput(e.target)}
              style={{ textTransform: "capitalize" }}
              defaultValue={item[key]}
              autoComplete="off"
              className="validate"
            />
            {/* <label htmlFor={key} style={{ textTransform: "capitalize" }}>
              {key}
            </label> */}
          </div>
        ))}

        <div className="input-field col s12">
          <p>Category</p>
          <div className="row">
            {categories
              .filter((key) => key !== "All")
              .map((key) => (
                <p className="col s6 category-item" key={key}>
                  <label>
                    <input
                      name="category"
                      onChange={(e) =>
                        handleInput({ id: "category", value: key })
                      }
                      type="radio"
                      defaultChecked={
                        item.category &&
                        key.toLowerCase() === item.category.toLowerCase()
                      }
                    />
                    <span>{key}</span>
                  </label>
                </p>
              ))}
          </div>
        </div>

        {Object.values(item).length ? (
          <div className="input-field col s12">
            <p>Status</p>
            <div className="switch">
              <label>
                Unavailable
                <input
                  onChange={(e) => handleInput(e.target)}
                  type="checkbox"
                  id="status"
                  defaultChecked={item.status === "Available"}
                />
                <span className="lever"></span>
                Available
              </label>
            </div>
          </div>
        ) : (
          ""
        )}
        <div className="input-field col s12">
          <p>Quantity ({quantity + " persons"})</p>
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

  return (
    <>
      <div className="modal-content">{EditForm}</div>
      <div className="modal-footer">
        <button
          onClick={(e) => handleSubmit(e)}
          className="waves-effect btn-flat"
        >
          {Object.values(item).length ? "Update" : "Add"}
        </button>
      </div>
    </>
  );
};
