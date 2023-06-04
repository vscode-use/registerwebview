## vscode-registerwebview

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
```

## Api

- postMessage 推送消息给 js 层
- deferScript 在 js 加载的最后去加载这部分的 script

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

## :coffee:

[buy me a cup of coffee](https://github.com/Simon-He95/sponsor)

## License

[MIT](./LICENSE) License © 2022 [Simon He](https://github.com/Simon-He95)

<a href="https://github.com/Simon-He95/sponsor" target="_blank"><img src="https://cdn.buymeacoffee.com/buttons/default-orange.png" alt="Buy Me A Coffee" style="height: 51px !important;width: 217px !important;" ></a>
