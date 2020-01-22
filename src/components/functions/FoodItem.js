import React from "react";
import Toast from "./Toast";

const FoodItem = ({ food, pickFood, choices }) => {
  const Naira = <span>&#8358;</span>;
  const img = food.image_url
    ? food.image_url
    : "https://i0.wp.com/simshomekitchen.com/wp-content/uploads/2018/07/how-to-make-nigerian-beef-and-chicken-stew-1.jpg?resize=750%2C500&ssl=1";

  const check = (
    <span className="checked">
      <i className="material-icons">check_circle</i>
    </span>
  );
  const pickedRef = React.useRef();
  const [{ picked }, setPicked] = React.useState({
    picked: false
  });
  // React.useEffect(() => {
  //   let obj = choices.find(key => key.id === food.id);
  //   if (obj) {
  //     setPicked(key => ({ picked: !key.picked }));
  //     pickedRef.current.style.opacity = picked ? 1 : 0.6;
  //   }
  // }, [choices.length]);

  return (
    <div
      className="food-item"
      ref={pickedRef}
      style={{ backgroundImage: "url(" + img + ")" }}
      onClick={() => {
        if (!food.status.includes("Un")) {
          pickFood(food);
          setPicked(key => ({ picked: !key.picked }));
          pickedRef.current.style.opacity = picked ? 1 : 0.6;
        } else {
          Toast("info", "This food item is unavailable");
        }
      }}
    >
      <div className="food-content">
        <span className="qty">{food.quantity} x&nbsp;</span>
        <h5>{food.name}</h5>

        <p>
          {" "}
          {Naira} {food.price}{" "}
        </p>
      </div>
      {picked ? check : ""}
    </div>
  );
};

export default FoodItem;
