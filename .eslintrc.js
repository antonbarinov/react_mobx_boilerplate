module.exports = {
    parser: 'babel-eslint',
    extends: [],
    env: {
        es6: true,
        browser: true,
        node: true,
    },
    plugins: ['react'],
    parserOptions: {
        ecmaVersion: 9,
        sourceType: 'module',
        ecmaFeatures: {
            modules: true,
            jsx: true,
            legacyDecorators: true,
        },
    },
    rules: {
        // Prevent possible errors
        'for-direction': 'error', // enforce “for” loop update clause moving the counter in the right direction. - https://eslint.org/docs/rules/for-direction
        'getter-return': 'error', // enforce return statements in getters - https://eslint.org/docs/rules/getter-return
        'no-compare-neg-zero': 'error', // disallow comparing against -0 - https://eslint.org/docs/rules/no-compare-neg-zero
        'no-cond-assign': 'error', // disallow assignment operators in conditional expressions - https://eslint.org/docs/rules/no-cond-assign
        'no-constant-condition': 'warn', // disallow constant expressions in conditions - https://eslint.org/docs/rules/no-constant-condition
        'no-debugger': 'warn', // disallow the use of debugger - https://eslint.org/docs/rules/no-debugger
        'no-dupe-args': 'error', // disallow duplicate arguments in function definitions - https://eslint.org/docs/rules/no-dupe-args
        'no-dupe-keys': 'error', // disallow duplicate keys in object literals - https://eslint.org/docs/rules/no-dupe-keys
        'no-duplicate-case': 'error', // disallow duplicate case labels - https://eslint.org/docs/rules/no-duplicate-case
        'no-extra-boolean-cast': 'warn', // disallow unnecessary boolean casts - https://eslint.org/docs/rules/no-extra-boolean-cast
        'no-extra-semi': 'error', // disallow unnecessary semicolons - https://eslint.org/docs/rules/no-extra-semi
        'no-invalid-regexp': 'error', // disallow invalid regular expression strings in RegExp constructors - https://eslint.org/docs/rules/no-invalid-regexp
        'no-obj-calls': 'error', // disallow calling global object properties as functions - https://eslint.org/docs/rules/no-obj-calls
        'no-regex-spaces': 'error', // disallow multiple spaces in regular expression literals - https://eslint.org/docs/rules/no-regex-spaces
        'no-sparse-arrays': 'error', // disallow sparse arrays - https://eslint.org/docs/rules/no-sparse-arrays
        'no-unexpected-multiline': 'error', // disallow confusing multiline expressions - https://eslint.org/docs/rules/no-unexpected-multiline
        'no-unsafe-finally': 'error', // disallow control flow statements in finally blocks - https://eslint.org/docs/rules/no-unsafe-finally
        'no-unsafe-negation': 'error', // disallow negating the left operand of relational operators - https://eslint.org/docs/rules/no-unsafe-negation
        'use-isnan': 'error', // require calls to isNaN() when checking for NaN - https://eslint.org/docs/rules/use-isnan
        'valid-typeof': 'error', // enforce comparing typeof expressions against valid strings - https://eslint.org/docs/rules/valid-typeof

        // Best practice section
        'array-callback-return': 'error', // Enforces return statements in callbacks of array’s methods - https://eslint.org/docs/rules/array-callback-return
        'default-param-last': 'error', // enforce default parameters to be last - https://eslint.org/docs/rules/default-param-last
        'dot-location': ['error', 'property'], // Enforce newline before and after dot - https://eslint.org/docs/rules/dot-location
        'dot-notation': 'warn', // Require Dot Notation - https://eslint.org/docs/rules/dot-notation
        'no-case-declarations': 'error', // Disallow lexical declarations in case/default clauses - https://eslint.org/docs/rules/no-case-declarations
        'no-eq-null': 'error', // Disallow Null Comparisons - https://eslint.org/docs/rules/no-eq-null
        'no-floating-decimal': 'error', // Disallow Floating Decimals - https://eslint.org/docs/rules/no-floating-decimal
        'no-redeclare': 'error', // disallow variable redeclaration - https://eslint.org/docs/rules/no-redeclare

        // Code style
        'array-bracket-spacing': ['error', 'never'], // Disallow or enforce spaces inside of brackets - https://eslint.org/docs/rules/array-bracket-spacing
        'block-spacing': 'error', // Disallow or enforce spaces inside of blocks after opening block and before closing block - https://eslint.org/docs/rules/block-spacing
        'comma-dangle': ['error', 'always-multiline'], // require or disallow trailing commas - https://eslint.org/docs/rules/comma-dangle
        'comma-spacing': 'error', // Enforces spacing around commas - https://eslint.org/docs/rules/comma-spacing
        'computed-property-spacing': 'error', // Disallow or enforce spaces inside of computed properties - https://eslint.org/docs/rules/computed-property-spacing
        'func-call-spacing': 'error', // require or disallow spacing between function identifiers and their invocations - https://eslint.org/docs/rules/func-call-spacing
        'implicit-arrow-linebreak': 'error', // Enforce the location of arrow function bodies with implicit returns - https://eslint.org/docs/rules/implicit-arrow-linebreak
        'jsx-quotes': ['error', 'prefer-double'], // enforce the consistent use of either double or single quotes in JSX attributes - https://eslint.org/docs/rules/jsx-quotes
        'key-spacing': 'error', // enforce consistent spacing between keys and values in object literal properties - https://eslint.org/docs/rules/key-spacing
        'no-nested-ternary': 'error', // disallow nested ternary expressions - https://eslint.org/docs/rules/no-nested-ternary
        'no-unneeded-ternary': 'error', // disallow ternary operators when simpler alternatives exist - https://eslint.org/docs/rules/no-unneeded-ternary
        'no-whitespace-before-property': 'error', // disallow whitespace before properties - https://eslint.org/docs/rules/no-whitespace-before-property
        'object-curly-spacing': ['error', 'always'], // enforce consistent spacing inside braces - https://eslint.org/docs/rules/object-curly-spacing
        quotes: ['error', 'single', { allowTemplateLiterals: true }], // enforce the consistent use of either backticks, double, or single quotes - https://eslint.org/docs/rules/quotes
        'semi-spacing': ['error', { before: false, after: true }], // Enforce spacing before and after semicolons - https://eslint.org/docs/rules/semi-spacing
        'semi-style': ['error', 'last'], // Enforce location of semicolons - https://eslint.org/docs/rules/semi-style
        'space-in-parens': ['error', 'never'], // Disallow or enforce spaces inside of parentheses - https://eslint.org/docs/rules/space-in-parens
        'arrow-parens': 'warn', // Require parens in arrow function arguments (arrow-parens) - https://eslint.org/docs/rules/arrow-parens,
        'arrow-spacing': ['error', { before: true, after: true }], // Require space before/after arrow function’s arrow - https://eslint.org/docs/rules/arrow-spacing
        'constructor-super': 'error', // Verify calls of super() in constructors - https://eslint.org/docs/rules/constructor-super
        'no-duplicate-imports': 'warn', // Disallow duplicate imports - https://eslint.org/docs/rules/no-duplicate-imports
        'no-this-before-super': 'error', // Disallow use of this/super before calling super() in constructors. - https://eslint.org/docs/rules/no-this-before-super
        'rest-spread-spacing': ['error', 'never'], // Enforce spacing between rest and spread operators and their expressions - https://eslint.org/docs/rules/rest-spread-spacing
        'template-curly-spacing': ['error', 'never'], // Enforce Usage of Spacing in Template Strings - https://eslint.org/docs/rules/template-curly-spacing
        indent: ['error', 4], // enforce consistent indentation - https://eslint.org/docs/rules/indent
    },
};
