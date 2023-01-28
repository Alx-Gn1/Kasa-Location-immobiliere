import { useEffect } from "react";
import { useState } from "react";
import { getDummyData } from "../functions/getDummyData";

/**
 * Permet de récupérer les données d'une location spécifique
 * Le timeout sert à simuler l'attente d'une réponse de la part d'une Api
 * @param {String} param0 id : l'id de la location
 * @param {Number} param0 timeout : temps de réponse de la fonction
 * @returns
 */
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
