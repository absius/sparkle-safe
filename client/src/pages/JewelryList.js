import React from "react";
import { Link } from "react-router-dom";

import { useQuery } from "@apollo/client";
import { QUERY_USER } from "../utils/queries";

function JewelryList() {
  const { data } = useQuery(QUERY_USER);
  let user;

  if (data) {
    user = data.user;
  }

  return (
    <>
      <div className="container my-1">
        <Link to="/">← Back to add-jewelry</Link>

        {user ? (
          <>
            <h2>
              List of Jewelry for {user.firstName} {user.lastName}
            </h2>
            {user.jewelry.map((jewelry) => (
              <div key={jewelry._id} className="my-2">
                <h3>
                  {new Date(parseInt(jewelry.dateAdded)).toLocaleDateString()}
                </h3>
                <div className="flex-row">
                  {order.jewelry.map(
                    ({ _id, image, name, purchasePrice }, index) => (
                      <div key={index} className="card px-1 py-1">
                        <Link to={`/jewelry/${_id}`}>
                          <img alt={name} src={`/images/${image}`} />
                          <p>{name}</p>
                        </Link>
                        <div>
                          <span>purchase price: ${purchasePrice}</span>
                        </div>
                      </div>
                    )
                  )}
                </div>
              </div>
            ))}
          </>
        ) : null}
      </div>
    </>
  );
}

export default JewelryList;
