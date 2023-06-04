import * as vscode from 'vscode'

export class RegisterWebview implements vscode.WebviewViewProvider {
  private _view?: vscode.WebviewView
  private _deferScript = ''
  constructor(
    private readonly _extensionUri: vscode.Uri,
    private readonly _html: string,
    private readonly _scripts: string | string[],
    private readonly _styles: string | string[],
    private readonly _callback: (data: any) => void,
  ) {
    this._extensionUri = _extensionUri
    this._html = _html
    this._scripts = _scripts
    this._styles = _styles
    this._callback = _callback
  }

  public resolveWebviewView(webviewView: vscode.WebviewView) {
    this._view = webviewView

    webviewView.webview.options = {
      // Allow scripts in the webview
      enableScripts: true,

      localResourceRoots: [this._extensionUri],
    }

    webviewView.webview.html = this._getHtmlForWebview(webviewView.webview)

    webviewView.webview.onDidReceiveMessage(this._callback)
  }

  public postMessage(data: any) {
    if (this._view)
      this._view.webview.postMessage(data)
  }

  deferScript(scripts: string | string[]) {
    this._deferScript
      = typeof scripts === 'string' ? scripts : scripts.join('\n')
  }

  private _getHtmlForWebview(webview: vscode.Webview) {
    const outerUriReg = /^http[s]:\/\//
    const styles = this._styles
      ? (Array.isArray(this._styles) ? this._styles : [this._styles])
          .map((style) => {
            const styleUri = outerUriReg.test(style)
              ? style
              : webview.asWebviewUri(
                vscode.Uri.joinPath(this._extensionUri, 'media', style),
              )
            return `<link href="${styleUri}" rel="stylesheet">`
          })
          .join('\n')
      : ''
    const scripts = (
      Array.isArray(this._scripts) ? this._scripts : [this._scripts]
    )
      .map((script) => {
        const scriptUri = outerUriReg.test(script)
          ? script
          : webview.asWebviewUri(
            vscode.Uri.joinPath(this._extensionUri, 'media', script),
          )
        return script.startsWith('<script')
          ? script
          : `<script src="${scriptUri}"></script>`
      })
      .join('\n')

    return `<!DOCTYPE html>
			<html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          ${styles}
          <title>registerwebview</title>
        </head>
        <body>
          ${this._html}
        </body>
        ${scripts}
        ${this._deferScript}
			</html>`
  }
}
