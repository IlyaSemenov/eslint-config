import { expect, it } from "vitest"

import { defineConfig } from "./config"

it("generates something", () => {
  expect(defineConfig()).toBeTruthy()
})

it("has vue config if enabled", async () => {
  expect((await defineConfig()).find(c => c.name === "antfu/vue/rules")).toBeUndefined()
  expect((await defineConfig({ vue: true })).find(c => c.name === "antfu/vue/rules")).toBeTruthy()
})

it("has vue-pug config if enabled", async () => {
  expect((await defineConfig()).find(c => c.name === "vue-pug")).toBeUndefined()
  expect((await defineConfig({ vue: true })).find(c => c.rules?.["vue-pug/no-parsing-error"])).toBeUndefined()
  expect(() => defineConfig({ vuePug: true })).toThrowError()
  expect((await defineConfig({ vue: true, vuePug: true })).find(c => c.rules?.["vue-pug/no-parsing-error"])).toBeTruthy()
})
