<p align="center">
<img src="./assets/kv.png" alt="vscode-use/treeprovider">
</p>
<p align="center"> <a href="./README.md">English</a> | 简体中文</p>

> WIP: 这个库是为了快速在 vscode 插件中使用 webview 打开侧边栏，让使用上更加简单

## Usage

```code
import { RegisterWebview } from '@vscode-use/registerwebview'
 // function activate
 const provider = new RegisterWebview(
  context.extensionUri,
    `<div>hello,world</div>`, // html
    ['main.css'], // css，本地css需要配置在media目录下
    [], // js，本地js需要配置在media目录下
    (data) => { // callback

    }
  )
  vscode.window.registerWebviewViewProvider('calicoColors.colorsView', provider)

  /** 绑定自定义icon
    "viewsContainers": {
      "activitybar": [
        {
          "id": "todoList",
          "title": "Daily Planner",
          "icon": "icon.png"
        }
      ]
    },
    "views": {
      "todoList": [
        {
          "type": "webview",
          "id": "calicoColors.colorsView",
          "name": "Calico Colors"
        }
      ]
    },
   */
```

## Feature

之前脚本使用字符串的方式插入体验不好,现在暴露了 deferScriptUri 的方式传入 media 下的.ts 或者.js 路径，就可以写 js 了，传惨需要提前通过 setProps 的方式，然后 js 中可以通过 webviewThis 获取到参数, webviewThis 会在最终 render 被替换成 setProps 的参数

```code
const vscode = acquireVsCodeApi()
const { name, age } = webviewThis
const App = {
  data() {
    return {
      name,
      age,
    }
  },
}
new Vue(App).$mount('#app')

```

## Api

- provider.postMessage **_推送消息给 js 层_**
- provider.deferScript **_在 js 加载的最后去加载这部分的 script_**

## Menu Settings

```code
  // package.json
  "contributes": {
    "views": {
      "explorer": [
        {
          "type": "webview",
          "id": "calicoColors.colorsView",
          "name": "Calico Colors"
        }
      ]
    },
    "commands": [
			{
				"command": "calicoColors.clearColors",
				"category": "Calico Colors",
				"title": "Clear Colors"
			}
		],
		"menus": {
			"view/title": [ // 顶部右上角的按钮
				{
					"command": "calicoColors.clearColors",
					"group": "navigation",
					"when": "view == calicoColors.colorsView"
				}
			]
		}
  },
```

## License

[MIT](./LICENSE) License © 2022 [Simon He](https://github.com/Simon-He95)

<a href="https://github.com/Simon-He95/sponsor" target="_blank"><img src="https://cdn.buymeacoffee.com/buttons/default-orange.png" alt="Buy Me A Coffee" style="height: 51px !important;width: 217px !important;" ></a>
