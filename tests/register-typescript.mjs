// Run isolated server tests with the project's TypeScript, without another runner.
import { registerHooks, createRequire } from "node:module";
import { existsSync, readFileSync } from "node:fs";
import { fileURLToPath, pathToFileURL } from "node:url";
import ts from "typescript";

const require = createRequire(import.meta.url);
const nextServerUrl = pathToFileURL(require.resolve("next/server")).href;
registerHooks({
  resolve(specifier, context, nextResolve) {
    if (specifier === "server-only")
      return { url: "data:text/javascript,export{}", shortCircuit: true };
    if (specifier === "next/server") return { url: nextServerUrl, shortCircuit: true };
    if (specifier.startsWith("@/")) {
      const base = new URL(`../${specifier.slice(2)}`, import.meta.url);
      const url = [".ts", ".tsx", ".js"]
        .map((ext) => new URL(base.href + ext))
        .find((value) => existsSync(value));
      if (url) return { url: url.href, shortCircuit: true };
    }
    return nextResolve(specifier, context);
  },
  load(url, context, nextLoad) {
    if (/\.tsx?$/.test(url) && !url.includes("/node_modules/")) {
      const source = ts.transpileModule(readFileSync(fileURLToPath(url), "utf8"), {
        compilerOptions: {
          module: ts.ModuleKind.ESNext,
          target: ts.ScriptTarget.ES2022,
          jsx: ts.JsxEmit.ReactJSX,
        },
      }).outputText;
      return { format: "module", source, shortCircuit: true };
    }
    return nextLoad(url, context);
  },
});
