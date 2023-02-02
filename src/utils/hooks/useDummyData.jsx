import { useEffect } from "react";
import { useState } from "react";
import { getDummyData } from "../functions/getDummyData";

/**
 * Permet de récupérer les données de logements dans le fichier logements.json
 *
 * @param {Number} time Optionnel : permet d'ajouter un timeout pour simuler l'attente d'une réponse, comme si on faisait une requête à une Api
 * @returns
 */
export const useDummyData = (time) => {
  if (time === undefined) time = 0;
  const [data, setData] = useState();

  useEffect(() => {
    getDummyData(time).then((data) => {
      setData(data);
    });
  }, [time]);

  if (data) return data;
};
