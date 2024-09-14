import { expect, it } from "vitest"

import { defineEslintConfig } from "./eslint"

it("generates something", () => {
  expect(defineEslintConfig()).toBeTruthy()
})

it("has vue config if enabled", async () => {
  expect((await defineEslintConfig()).find(c => c.name === "antfu/vue/rules")).toBeUndefined()
  expect((await defineEslintConfig({ vue: true })).find(c => c.name === "antfu/vue/rules")).toBeTruthy()
})

it("has vue-pug config if enabled", async () => {
  expect((await defineEslintConfig()).find(c => c.name === "vue-pug")).toBeUndefined()
  expect((await defineEslintConfig({ vue: true })).find(c => c.name === "vue-pug")).toBeUndefined()
  expect(() => defineEslintConfig({ vuePug: true })).toThrowError()
  expect((await defineEslintConfig({ vue: true, vuePug: true })).find(c => c.name === "vue-pug")).toBeTruthy()
})
