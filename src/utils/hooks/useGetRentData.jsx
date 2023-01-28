import { useEffect } from "react";
import { useState } from "react";
import { getDummyData } from "../functions/getDummyData";

export const useGetRentData = ({ id, timeout }) => {
  const [data, setData] = useState();

  useEffect(() => {
    getDummyData(timeout).then((data) => {
      if (
        data.data[
          data.data.findIndex((e) => {
            return e.id === id;
          })
        ] === undefined
      ) {
        setData("Not Found");
      } else {
        setData(
          data.data[
            data.data.findIndex((e) => {
              return e.id === id;
            })
          ]
        );
      }
    });
  }, [id, timeout]);

  return { data };
};
