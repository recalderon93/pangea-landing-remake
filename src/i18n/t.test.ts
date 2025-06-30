import { t } from "./t";

describe("i18n/t", () => {
  it("should return the key when no translation is found", () => {
    // @ts-expect-error testing invalid key
    const result = t("en", "non.existent.key");
    expect(result).toBe("non.existent.key");
  });

  it("should return the correct translation for a valid key", () => {
    const result = t("en", "greeting", { name: "John" });
    expect(result).toBe("Hello, John!");
  });
});
