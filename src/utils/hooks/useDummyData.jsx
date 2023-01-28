import { useEffect } from "react";
import { useState } from "react";
import { getDummyData } from "../functions/getDummyData";

export const useDummyData = (time) => {
  if (time === undefined) time = 0;
  const [data, setData] = useState();

  useEffect(() => {
    getDummyData(time).then((data) => {
      setData(data);
    });
  }, [time]);

  return { data };
};
