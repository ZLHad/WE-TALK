**注意点**

1. 使用yarn开发，使用 `yarn` 命令就安装依赖, `yarn bootstrap` 命令软连接
2. 项目使用`lerna`管理，`client`是前端，`backend`是后端，`common`是公共模块，存放公共类型和方法
3. 项目前端使用`create react app`构建，使用`tailwind` `twin.macro` `styled-component`管理样式
4. 开发使用vscode，因为tailwind的插件只有vscode支持最好，idea党真的泪目
5. 开发建议安装插件 `tailwindcss` 与 `styled-component` 【应该都是最多安装人数直接搜排最上面的插件】
6. 使用 `yarn commit` 命令 commit
7. 分支管理暂定在develop分支上开发，更细的分支我认为可以再议，但是main分支应该暂时留着之后持续集成

**非常非常有用的vscode配置文件**

```json
  "scss.validate": false,
  "editor.quickSuggestions": {
    "strings": true
  },
  "editor.autoClosingQuotes": "always",
  "tailwindCSS.experimental.classRegex": [
    "tw`([^`]*)", // tw`...`
    "tw=\"([^\"]*)", // <div tw="..." />
    "tw={\"([^\"}]*)", // <div tw={"..."} />
    "tw\\.\\w+`([^`]*)", // tw.xxx`...`
    "tw\\(.*?\\)`([^`]*)" // tw(Component)`...`
  ],
  "tailwindCSS.includeLanguages": {
    "typescript": "javascript",
    "typescriptreact": "javascript"
  }
```

将以上配置复制到vscode的配置文件里

`ctrl + shift + p` 输入 `open setting json` 可以看到