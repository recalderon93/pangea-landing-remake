import { experimental_AstroContainer as AstroContainer } from "astro/container";
import { test, expect } from "vitest";
import SocialIcon from "./SocialIcons.astro";

describe("@Components/Icons/SocialIcons", () => {
  test("Should render the Instagram icon with correct data-testid", async () => {
    const container = await AstroContainer.create();
    const result = await container.renderToString(SocialIcon, {
      props: { type: "instagram" },
    });

    expect(result).toContain('data-testid="instagram-icon"');
  });

  test("Should render the LinkedIn icon with correct data-testid", async () => {
    const container = await AstroContainer.create();
    const result = await container.renderToString(SocialIcon, {
      props: { type: "linkedin" },
    });

    expect(result).toContain('data-testid="linkedin-icon"');
  });
});
