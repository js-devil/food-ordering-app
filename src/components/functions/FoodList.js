import React from "react";
import jollof from "../../assets/img/jollof.png";

const List = ({ food, pickFood }) => {
  const Naira = <span style={{ fontSize: "20px" }}>&#8358;{food.price}</span>;

  const check = (
    <span className="checked">
      <i className="material-icons" style={{ fontSize: "28px" }}>
        check_circle
      </i>
    </span>
  );

  const pickedRef = React.useRef();
  const [{ picked }, setPicked] = React.useState({
    picked: false
  });

  return (
    <div
      className="col s6 m6 l3"
      ref={pickedRef}
      onClick={() => {
        if (!food.status.includes("Un")) {
          pickFood(food);
          setPicked(key => ({ picked: !key.picked }));
          pickedRef.current.style.opacity = picked ? 1 : 0.6;
        }
      }}
    >
      <div className="card-panel food-card">
        <div className="food-price">
          {Naira} { picked ? check : "" }
        </div>
        {/* <img src={process.env.PUBLIC_URL + "/food/fried-rice.jpg"} /> */}
        <img src={jollof} alt="food" />
        <p>
          <span> {food.quantity}x </span> {food.name}
        </p>
        <span className="white-text">{/* {food} */}</span>
      </div>
    </div>
  );
};

export default List;
