import React from 'react'

const Item = () => {
    return (
        <div className="menu-item">
          <img src= "https://i0.wp.com/simshomekitchen.com/wp-content/uploads/2018/07/how-to-make-nigerian-beef-and-chicken-stew-1.jpg?resize=750%2C500&ssl=1" />
          <div className="flex details">
            <h5>Rice</h5>
            <p className="cost">{Naira}{ "200" }</p>
          </div>
          <div className="flex user">
            <p>Rice</p>
            <p>4/5</p>
          </div>
        </div>
      );
}

export default Item;