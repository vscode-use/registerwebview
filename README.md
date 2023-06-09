<p align="center">
<img src="./assets/kv.png" alt="vscode-use/treeprovider">
</p>
<p align="center"> English | <a href="./README_zh.md">简体中文</a></p>

> WIP: This library is designed to quickly open the sidebar using webview in the vscode plugin, making it easier to use

## Usage

```code
import { RegisterWebview } from '@vscode-use/registerwebview'
 // function activate
 const provider = new RegisterWebview(
  context.extensionUri,
    `<div>hello,world</div>`, // html
    ['main.css'], // css，The local css must be configured in the media directory
    [], // js，The local js must be configured in the media directory
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

Previously, the script used the string method to insert the bad experience, now exposed the defer script uri method to pass the.ts or.js path under the media, so you can write js, and you need to pass the set props method in advance. js can then get the parameters via webview this, webview this will be replaced with the parameters of set props in the final render

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

- provider.postMessage **_Push messages to the js layer_**
- provider.deferScript **_Load the script at the end of the js load_**

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
			"view/title": [ // Button in the top right corner
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
