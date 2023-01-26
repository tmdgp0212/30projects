1. 개발환경셋팅(webpack)

```shell
$ npm init -y

# webpack설치
$ npm i -D webpack webpack-cli webpack-dev-server

$ npm i -D terser-webpack-plugin

# html관련모듈
$ npm i -D html-webpack-plugin

# css관련모듈
$ npm i -D mini-css-extract-plugin css-loader css-minimizer-webpack-plugin
```

2. 최상위경로에
   `src`폴더를 생성하여 css, js 폴더와 내부 main파일 생성,

3. 최상위경로에
   `webpack.config.js`파일 생성,
   아래와 같이 내용 채우기

```js
//webpack.config.js

const path = require("path");
const TerserWebpackPlugin = require("terser-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");

module.exports = {
  entry: "./src/js/main.js", // js진입점
  output: {
    // build시 bundle파일 관련 속성
    filename: "bundle.js", // 번들 될 파일이름
    path: path.resolve(__dirname, "./dist"), // 번들 될 파일의 생성경로
    clean: true, //번들파일이 생성 된 경로에 기존파일이 있다면 다 지우고 새로 생성
  },
  devtool: "source-map",
  mode: "development",
  plugins: [
    new HtmlWebpackPlugin({
      //html webpack설정
      title: "VIRTUAL KEYBOARD",
      template: "./index.html",
      inject: "body",
      favicon: "./favicon.ico",
    }),
    new MiniCssExtractPlugin({
      filename: "style.css",
    }),
  ],
  module: {
    reles: [
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },
    ],
  },
  optimization: {
    minimizer: [new TerserWebpackPlugin(), new CssMinimizerPlugin()],
  },
};
```

5. `main.js` 파일에서 css파일을 `import`

```js
import "../css/style.css";
```

6. `package.json`의 script속성으로 build삽입

```json
  ...

  "scripts": {
    "dev": "webpack-dev-server",
    "build": "webpack"
  },

  ...
```

6. 작업 후 webpack으로 라이브 서버렌더

```shell
$ npm run dev
```

---

1. eslint, prettier 설치

```shell
  $ npm i -D eslint
  $ npm i -D --save-exact prettier

  $ npm i -D eslint-plugin-prettier
  $ npm i -D eslint-config-prettier
```

2. eslint init

```shell
  $ npx eslint --init
```

3. `.eslintrc.json`파일 수정

```json
  ...

  "extends": ["eslint:recommended", "plugin:prettier/recommended"],

  ...

  "rules": {
    "prettier/prettier": "error"
  }
```

4. `.eslintignore`파일생성

```
/node_modules
/dist
webpack.config.js
```

5. `.prettierrc.json`파일생성

```json
{
  "arrowParens": "always",
  "bracketSameLine": false,
  "bracketSpacing": true,
  "embeddedLanguageFormatting": "auto",
  "htmlWhitespaceSensitivity": "css",
  "insertPragma": false,
  "jsxSingleQuote": false,
  "printWidth": 80,
  "proseWrap": "preserve",
  "quoteProps": "as-needed",
  "requirePragma": false,
  "semi": true,
  "singleQuote": false,
  "tabWidth": 2,
  "trailingComma": "es5",
  "useTabs": false,
  "vueIndentScriptAndStyle": false
}
```

6. `.prettierignore`파일생성

```
/node_modules
/dist
webpack.config.js
```

7. ctrl+shift+p 에서 `settings`검색하여 나오는 `Preferences:Open Workspace Settings (JSON)`
   클릭하여 setting.json파일 오픈

```json
{
  "editor.formatOnSave": true,
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  }
}
```
