import React from "react";

const Order = ({order, sendOrder}) => {
    const { choices, total, time_of_order, completed, username } = order
    const complete = (
        <i
          className="material-icons"
          style={{ fontSize: "20px", color: "#52c41a" }}
        >
          done
        </i>
      );

      const cancel = (
        <i
          className="material-icons"
          style={{ fontSize: "20px", color: "#eb2f96" }}
        >
          do_not_disturb
        </i>
      );
      const icon = completed == null ?  "" : completed ? complete : cancel
      const status = completed == null ? "PENDING" : completed ? " COMPLETED" : " CANCELLED";

  const Naira = <span>&#8358;</span>;
  return (
    <div className="order" onClick={ e => sendOrder(order) }>
      <span className="date">{ time_of_order }</span>
      <div className="flex details">
        <p>{ choices }</p>
        <p className="cost">{Naira}{ total }</p>
      </div>
      <div className="flex user">
        <p>Ordered by <span className="name">{ username }</span></p>
        <p>{ icon } { status }</p>
      </div>
    </div>
  );
};

export default Order;
