import DUMMY_DATA from "../Datas/logements.json";

/**
 * Charge le fichier  logements.json et le renvoie avec un timeout
 * @param {Number} timeout
 * @returns
 */
export const getDummyData = (timeout) =>
  new Promise((res) => setTimeout(() => res({ data: DUMMY_DATA }), timeout || 0));
