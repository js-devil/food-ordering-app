import React from "react";

const Order = ({ order, sendOrder }) => {
  const { completed, choices, total } = order;
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

  const pending = (
    <i
      className="material-icons"
      style={{ fontSize: "20px", color: "rgb(68, 60, 133)" }}
    >
      remove
    </i>
  );
  const status = completed == null ? pending : completed ? complete : cancel;

  return (
    <tr className="order-body" onClick={() => sendOrder(order)}>
      <td style={{ width: "70%" }}>{choices}</td>
      <td style={{ width: "10%" }}>
        <span>&#8358;</span>
        {total}
      </td>
      <td style={{ width: "20%", textAlign: "center" }}>{status}</td>
    </tr>
  );
};

export default Order;
