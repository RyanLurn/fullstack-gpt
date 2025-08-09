import js from "@eslint/js";
import eslintPluginNext from "@next/eslint-plugin-next";
import eslintConfigPrettier from "eslint-config-prettier";
import eslintPluginReactHooks from "eslint-plugin-react-hooks";
import eslintPluginReactRefresh from "eslint-plugin-react-refresh";
import { globalIgnores } from "eslint/config";
import globals from "globals";
import tseslint from "typescript-eslint";

export default tseslint.config(
  globalIgnores(["**/*.d.ts", "**/dist/"]),
  js.configs.recommended,
  tseslint.configs.recommendedTypeChecked,
  {
    languageOptions: {
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname
      },
      globals: { ...globals.browser, ...globals.serviceworker }
    }
  },
  eslintPluginReactHooks.configs["recommended-latest"],
  {
    plugins: {
      "react-refresh": eslintPluginReactRefresh
    },
    rules: {
      "react-refresh/only-export-components": [
        "error",
        {
          allowExportNames: [
            "experimental_ppr",
            "dynamic",
            "dynamicParams",
            "revalidate",
            "fetchCache",
            "preferredRegion",
            "maxDuration",
            "generateStaticParams",
            "generateImageMetadata",
            "metadata",
            "generateMetadata",
            "generateSitemaps",
            "viewport",
            "generateViewport"
          ]
        }
      ]
    }
  },
  {
    plugins: {
      "@next/next": eslintPluginNext
    },
    /** @type {any} */
    rules: {
      ...eslintPluginNext.configs.recommended.rules,
      ...eslintPluginNext.configs["core-web-vitals"].rules
    }
    // Used type assertion because the Severity level specified in the plugin for nextjs
    // is not compatible with the one expected by typescript-eslint
    // typescript-eslint expects literal "error" | "warn" | "off"
    // @next/eslint-plugin-next uses the strings "error", "warn"
  },
  eslintConfigPrettier
);
