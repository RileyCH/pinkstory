import { formatTime } from "./formatTime";

describe("formatTime()", () => {
  it("should format time correctly", () => {
    const result = formatTime(946684800, 500000000); // 2000-01-01T00:00:00.500Z in UNIX time

    expect(result).toEqual({
      year: 2000,
      month: 1,
      day: 1,
      hour: "08",
      minute: "00",
    });
  });

  it("should handle cases where hour or minute is less than 10", () => {
    const result = formatTime(1628136261, 0); // 2021-08-05T03:31:01.000Z in UNIX time

    expect(result).toEqual({
      year: 2021,
      month: 8,
      day: 5,
      hour: 12,
      minute: "04",
    });
  });
});
