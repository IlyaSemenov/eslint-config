import { expect, it } from "bun:test"
import { Linter } from "eslint"

import { defineConfig } from "./config"

async function lintRuleIds(code: string, filename = "example.ts") {
  const messages = new Linter({ configType: "flat" }).verify(code, await defineConfig(), filename)
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

it("warns on console.log in source files", async () => {
  expect(await lintRuleIds("console.log(1)\n", "src/example.ts")).toContain("no-console")
})

it("allows console.log in scripts, CLI, config files, and documentation examples", async () => {
  for (const filename of ["scripts/run.ts", "cli/run.ts", "vite.config.ts"]) {
    expect(await lintRuleIds("console.log(1)\n", filename)).not.toContain("no-console")
  }
  expect(await lintRuleIds("# Example\n\n```ts\nconsole.log(1)\n```\n", "README.md")).not.toContain("no-console")
})

it("allows compact one-line items", async () => {
  const code = "export const merged = { ...[1, 2].map(n => n), ...{ a: 1 } }\nexport const value = merged.a ? merged.a + 1 : null\n"
  expect(await lintRuleIds(code)).not.toContain("antfu/reasonable-newline")
})

it("joins braces of a single-name import or export onto one line", async () => {
  const code = "import {\n  a,\n} from \"a\"\n\nexport {\n  a,\n}\n"
  expect((await lintRuleIds(code)).filter(ruleId => ruleId === "style/object-curly-newline")).toHaveLength(4)
})

it("keeps multiline imports and exports with names on separate lines", async () => {
  const code = "import {\n  a,\n  b,\n} from \"a\"\n\nexport {\n  a,\n  b,\n}\n"
  expect(await lintRuleIds(code)).not.toContain("style/object-curly-newline")
})

it("keeps Array.from with a value factory", async () => {
  const code = "export const zeros = Array.from({ length: 3 }, () => 0)\n"
  expect(await lintRuleIds(code)).not.toContain("e18e/prefer-array-fill")
})
