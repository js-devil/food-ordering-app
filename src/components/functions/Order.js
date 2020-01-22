import React from "react";

const Order = ({ no, order }) => {
  const { answered, cancelled, choices, total, time_of_order } = order;
  const check = (
    <i className="material-icons" style={{ fontSize: "20px" }}>
      check_circle
    </i>
  );
  const status = !answered && !cancelled ? check : "ld";
  //  "PENDING" : answered ? "COMPLETED" : "CANCELLED";
  // const Naira = <span>&#8358;</span>;
  return (
    <tr className="order-body">
      <td style={{ width: "45%" }}>{choices}</td>
      <td style={{ width: "10%" }}>
        <span>&#8358;</span>
        {total}
      </td>
      <td style={{ width: "20%" }}>{status}</td>
      <td style={{ width: "25%" }}>{time_of_order}</td>
    </tr>
  );
};

export default Order;
