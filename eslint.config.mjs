import globals from "globals";
import pluginJs from "@eslint/js";
import pluginReact from "eslint-plugin-react";
import pluginImport from "eslint-plugin-import";
import pluginJsxA11y from "eslint-plugin-jsx-a11y";
import pluginReactHooks from "eslint-plugin-react-hooks";

export default [
    { files: ["**/*.{js,mjs,cjs,jsx}"] },
    { languageOptions: { globals: globals.browser } },
    pluginJs.configs.recommended,
    pluginReact.configs.flat.recommended,
    {
        rules: {
            // Airbnb Base Rules (just a small sample)
            "import/no-unresolved": "error",
            "import/named": "error",
            "import/default": "error",
            "import/namespace": "error",
            "import/export": "error",
            "react/jsx-filename-extension": ["warn", { extensions: [".jsx", ".js"] }],
            "react/prop-types": "off",
            "jsx-a11y/anchor-is-valid": ["warn", { aspects: ["noHref", "invalidHref"] }],
        },
        plugins: {
            import: pluginImport,
            react: pluginReact,
            "jsx-a11y": pluginJsxA11y,
            "react-hooks": pluginReactHooks,
        },
    },
];
