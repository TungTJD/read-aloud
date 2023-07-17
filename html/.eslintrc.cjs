module.exports = {
    "env": {
        "browser": true,
        "es2021": true,
        "node": true
    },
    "globals": {
        defineExpose: 'readonly'
    },
    "extends": ["eslint:recommended", "plugin:vue/essential"],
    "parserOptions": {
        ecmaVersion: 6,
        sourceType: 'module',
        ecmaFeatures: {
            modules: true,
            jsx : false, // 非 react 项目关闭 jsx 语法校验,默认为 true
        },
        requireConfigFile: false,
        parser: '@babel/eslint-parser',
    },
    "plugins": [
        "vue",
    ],
    "rules": {
        "no-undef": "off",
        'vue/define-expose': 'off',
        "no-console": "off",
        "no-debugger": "off",
        "no-unused-vars": "off",
        "vue/no-unused-components": "warn",
        "vue/valid-v-slot": [
            "error",
            {
                "allowModifiers": true
            }
        ],
        "comma-dangle": [0, "always-multiline"],
        "object-curly-spacing": ["error", "always"],
        "array-bracket-spacing": ["error", "never"],
        "indent": ["error", 2],
        "vue/html-indent": ["error", 2],
        "vue/max-attributes-per-line": "off",
        "vue/multiline-html-element-content-newline": "off",
        "vue/html-closing-bracket-newline": [
            "error",
            {
                "singleline": "never",
                "multiline": "always"
            }
        ],
        'vue/no-v-model-argument': 'off',
        'vue/multi-word-component-names': 'off',
        'vue/no-v-for-template-key': 'off',
        "vue/max-len": [
            "error",
            {
                "code": 120,
                "ignoreUrls": true,
                "ignoreStrings": true,
                "ignoreTemplateLiterals": true,
                "ignoreRegExpLiterals": true
            }],
        'no-octal-escape': 0,
        semi: [0, 'never'], // 禁止尾部使用分号“ ; ”
        'no-var': 'error', // 禁止使用 var
        // indent: ['error', 0], // 缩进2格
        'no-mixed-spaces-and-tabs': 'error', // 不能空格与tab混用
        quotes: [0, 'single'], // 使用单引号
        'vue/singleline-html-element-content-newline': 'off', // 不强制换行
    }
};
