import { expect, it } from "vitest"

import { defineStylelintConfig } from "./stylelint"

it("generates something", () => {
  expect(defineStylelintConfig()).toBeTruthy()
})
