import { render } from "@testing-library/react";
import RouterLayout from "../../components/Router";

describe("Router", () => {
  it("Should render without crash", () => {
    render(<RouterLayout />);
  });
});
