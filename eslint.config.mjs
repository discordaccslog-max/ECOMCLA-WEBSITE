import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  {
    // Content is read through /src/lib accessors; the Stripe SDK only through lib/stripe.
    files: ["src/app/**", "src/components/**"],
    rules: {
      "no-restricted-imports": [
        "error",
        {
          patterns: [{ group: ["@/data/*", "**/data/*"], message: "Import content through a module in @/lib instead." }],
          paths: [{ name: "stripe", message: "Only src/lib/stripe.ts may use the Stripe SDK." }],
        },
      ],
    },
  },
  {
    files: ["src/lib/**"],
    ignores: ["src/lib/stripe.ts"],
    rules: {
      "no-restricted-imports": ["error", { paths: [{ name: "stripe", message: "Only src/lib/stripe.ts may use the Stripe SDK." }] }],
    },
  },
  globalIgnores([".next/**", "out/**", "build/**", "next-env.d.ts"]),
]);

export default eslintConfig;
