// needs to be adjusted to match our app

import React from "react";
import { useEffect } from "react";
import { useMutation } from "@apollo/client";
import Jumbotron from "../components/Jumbotron";
import { ADD_JEWELRY } from "../utils/mutations";
import { idbPromise } from "../utils/helpers";
import JewelryItem from "../components/JewelryItem";
import JewelryList from "../components/JewelryList";

function Success() {
  const [addJewelry] = useMutation(ADD_JEWELRY);

  useEffect(() => {
    async function saveJewelry() {
      const JewelryList = await idbPromise("jewelryList", "get");
      const jewelry = cart.map((item) => item._id);

      if (jewelry.length) {
        const { data } = await addJewelry({ variables: { jewelry } });
        const jewelryData = data.addJewelry.jewelry;

        jewelrytData.forEach((item) => {
          idbPromise("jewelryList", "delete", item);
        });

        setTimeout(() => {
          window.location.assign("/");
        }, 3000);
      }
    }

    saveJewelry();
  }, [addJewelry]);

  return (
    <div>
      <Jumbotron>
        <h1>Success!</h1>
        <h2>Thank you for trusting us with your sparkle!</h2>
        <h2>You will now be redirected to the homepage</h2>
      </Jumbotron>
    </div>
  );
}

export default Success;
