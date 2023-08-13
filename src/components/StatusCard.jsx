import React from "react";

const StatusCard = ({ cardText, cardColor, cardValue }) => {
  return (
    <div className="col xs-12 col-lg-3 col-md-6 my-1">
      <div
        className={`card cardItem shadow bg-${cardColor} text-dark bg-opacity-25 borders-b`}
        style={{ width: "15rem" }}
      >
        <div className="card-body">
          <h5 className="card-subtitle mb-2">
            <i className={`bi bi-pencil text-${cardColor} mx-2`}></i>
            {cardText}
          </h5>
          <hr />
          <div className="row">
            <div className="col">
              <h1 className="col text-dark mx-4">{cardValue}</h1>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatusCard;
