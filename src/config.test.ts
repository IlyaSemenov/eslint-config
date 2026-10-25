import { expect, it } from "bun:test"
import { Linter } from "eslint"

import { defineConfig } from "./config"

async function lintRuleIds(code: string) {
  const messages = new Linter({ configType: "flat" }).verify(code, await defineConfig(), "example.ts")
  return messages.map(message => message.ruleId)
}

it("generates something", () => {
  expect(defineConfig()).toBeTruthy()
})

it("has vue config if enabled", async () => {
  expect((await defineConfig()).find(c => c.name === "antfu/vue/rules")).toBeUndefined()
  expect((await defineConfig({ vue: true })).find(c => c.name === "antfu/vue/rules")).toBeTruthy()
})

it("passes environment to import sorting", async () => {
  const findSortImportsRule = async (environment?: "node" | "bun") => (await defineConfig({ environment })).findLast(c => c.rules?.["perfectionist/sort-imports"])?.rules?.["perfectionist/sort-imports"]
  expect(await findSortImportsRule()).toMatchObject([
    expect.anything(),
    { environment: "node" },
  ])
  expect(await findSortImportsRule("bun")).toMatchObject([
    expect.anything(),
    { environment: "bun" },
  ])
})

it("has vue-pug config if enabled", async () => {
  expect((await defineConfig()).find(c => c.name === "vue-pug")).toBeUndefined()
  expect((await defineConfig({ vue: true })).find(c => c.rules?.["vue-pug/no-parsing-error"])).toBeUndefined()
  expect(() => defineConfig({ vuePug: true })).toThrowError()
  expect((await defineConfig({ vue: true, vuePug: true })).find(c => c.rules?.["vue-pug/no-parsing-error"])).toBeTruthy()
})

it("allows compact one-line items", async () => {
  const code = "export const merged = { ...[1, 2].map(n => n), ...{ a: 1 } }\nexport const value = merged.a ? merged.a + 1 : null\n"
  expect(await lintRuleIds(code)).not.toContain("antfu/reasonable-newline")
})
