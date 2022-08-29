const OFF = 0;
const WARN = 1;
const ERROR = 2;

module.exports = {
    root: true,
    parserOptions: {
        parser: 'babel-eslint',
        sourceType: 'module'
    },
    env: {
        browser: true,
        node: true,
        es6: true,
    },
    extends: ['plugin:vue/recommended', 'eslint:recommended'],

    // add your custom rules here
    //it is base on https://github.com/vuejs/eslint-config-vue
    rules: {
        'semi': [ERROR, 'always'], //禁止语句后面没有分号
        'no-unused-vars': [ERROR, { argsIgnorePattern: '^_|event' }], //禁止有没用的变量，除event和_标记
        'no-debugger': process.env.NODE_ENV === 'production' ? ERROR : WARN, //生产环境禁止有debugger，测试环境警告
        "no-catch-shadow": ERROR,//禁止catch子句参数与外部作用域变量同名
        "no-dupe-keys": ERROR,//在创建对象字面量时不允许键重复 {a:1,a:1}
        "no-dupe-args": ERROR,//函数参数不能重复
        "no-duplicate-case": ERROR,//switch中的case标签不能重复
        "no-extra-parens": ERROR,//禁止非必要的括号
        "no-extra-semi": ERROR,//禁止多余的冒号
        "no-invalid-regexp": ERROR,//禁止无效的正则表达式
        "no-mixed-spaces-and-tabs": [ERROR, false],//禁止混用tab和空格
        "no-trailing-spaces": ERROR,//一行结束后面不要有空格
        "no-spaced-func": ERROR,//函数调用时 函数名与()之间不能有空格
        "no-var": OFF,//禁用var，用let和const代替
        "vue/html-self-closing": [ERROR, { // 自闭合设置
            "html": {
                "void": "always",
                "normal": "never",
                "component": "always"
            },
            "svg": "always",
            "math": "always"
        }],
        "vue/max-attributes-per-line": [ERROR, { //单行最大限制
            "singleline": 3,
            "multiline": {
                "max": 4,
            }
        }],
        "indent": [ERROR, 4], //js代码缩进
        'new-cap': [ERROR, { //首字母大小写
            'newIsCap': true,
            'capIsNew': false
        }],
        "vue/no-v-html": OFF, //不检测是否有v-html
        "vue/require-prop-types": OFF, //不检测prop是否给类型
        // "vue/first-attribute-linebreak": [ERROR, {
        //   "singleline": "beside",
        //   "multiline": "below"
        // }]
    }
};
