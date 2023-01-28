import DUMMY_DATA from "../../logements.json";

export const getDummyData = (timeout) => new Promise((res) => setTimeout(() => res({ data: DUMMY_DATA }), timeout));
