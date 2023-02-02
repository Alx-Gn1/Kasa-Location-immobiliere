import { useDummyData } from "../../utils/hooks/useDummyData";
import DUMMY_DATA from "../../utils/Datas/logements.json";
import { renderHook, waitFor } from "@testing-library/react";

it("should return a object with Dummy datas in it", async () => {
  const { result } = renderHook(() => useDummyData());
  await waitFor(() => expect(result.current).toEqual({ data: DUMMY_DATA }));
});
