import { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getDummyData } from "../functions/getDummyData";

/**
 * Permet de récupérer les données d'une location spécifique
 * Le timeout sert à simuler l'attente d'une réponse de la part d'une Api
 * @param {{String, Number}} param0 id : l'id de la location, timeout : temps de réponse de la fonction
 * @param {Number} param0 
 */
export const useGetRentData = ({ id, timeout }) => {
  const [data, setData] = useState();
  const nav = useNavigate()

  useEffect(() => {
    getDummyData(timeout).then((data) => {
      if (
        data.data[
          data.data.findIndex((e) => {
            return e.id === id;
          })
        ] === undefined
      ) {
        nav("/404")
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

  return data;
};
