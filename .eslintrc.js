module.exports = {
    "env": {
        "browser": true,
        "es2021": true
    },
    "extends": [
        "eslint:recommended",
        "plugin:react/recommended",
        "plugin:@typescript-eslint/recommended",
        "airbnb",
        "airbnb-typescript",
        "plugin:import/typescript",
        "plugin:prettier/recommended",
        "react-app",
    ],
    "overrides": [
       
    ],
    "parser": "@typescript-eslint/parser",
    "parserOptions": {
        "ecmaVersion": "latest",
        "sourceType": "module",
        "tsconfigRootDir":__dirname,
        "project": "./tsconfig.json"
    },
    "plugins": [
        "react",
        "@typescript-eslint",
        "prettier"
    ],
    "rules": {
        "react/jsx-props-no-spreading": "off",
        "import/prefer-default-export": "off",
        "react/jsx-boolean-value": "off",
        "react/prop-types": "off",
        "react/no-unescaped-entities": "off",
        "react/jsx-one-expression-per-line": "off",
        "react/jsx-wrap-multilines": "off",
        "react/destructuring-assignment": "off",
        "react/function-component-definition":"off",
        "@typescript-eslint/default-param-last":"off",
        "react/require-default-props":"off",
        "jsx-a11y/no-static-element-interactions":"off",
        "jsx-a11y/click-events-have-key-events":"off",
        "react/jsx-no-useless-fragment":"off",
        "react/jsx-closing-tag-location":"off",
        "jsx-a11y/mouse-events-have-key-events":"off",
        "max-len":"off",
        "quote-props":"off",
        "react-hooks/exhaustive-deps":"off",
        "react/no-array-index-key":"off",
        "no-continue":"off",
        "consistent-return":"off",
        "jsx-a11y/no-noninteractive-element-interactions":"off",
        "intreact/button-has-type":"off",
        "react/button-has-type":"off",
        "react-hooks/rules-of-hooks":"off",
        "@typescript-eslint/no-unused-expressions":"off",
        "prefer-promise-reject-errors":"off",
        "@typescript-eslint/no-explicit-any":"off",
        "@typescript-eslint/no-unused-vars":"error",
        "no-param-reassign":"off",
        "no-useless-return":"off",
        "no-nested-ternary":"off",
        "jsx-a11y/no-autofocus":"off",
        "@typescript-eslint/ban-types":"off",
        "import/no-cycle":"off",
        "jsx-a11y/label-has-associated-control":"off",
        "no-extra-boolean-cast":"off",
        "react/no-unstable-nested-components":"off",
        "import/no-extraneous-dependencies":"off"
    },
    "settings": {
        "import/resolver": {
          "typescript": {
            "alwaysTryTypes": true
          }
    }
    }
}

