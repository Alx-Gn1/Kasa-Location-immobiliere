import DUMMY_DATA from "../../utils/Datas/logements.json";
import { getDummyData } from "../../utils/functions/getDummyData";

test("Fonction pour simuler un fetch", async () => {
  const resultWithoutTimeout = await getDummyData();
  const resultWithTimeout = await getDummyData(1000);

  expect(resultWithoutTimeout).toStrictEqual(resultWithTimeout);
  expect(resultWithoutTimeout).toStrictEqual({ data: DUMMY_DATA });
});
