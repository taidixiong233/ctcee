import { BrowserWindow, App, ipcMain } from 'electron'
import { is } from '@electron-toolkit/utils'
import { join } from 'path'
import fs from 'fs'
import Windows from '../Windows'
import * as url from 'url'

export default class SettingsEvent {
  private Win: BrowserWindow

  private WindowsClass: Windows

  /**缓存数据根目录 */
  private Root: string

  private eventon(_: App) {
    this.Win.once('ready-to-show', () => {
      this.WindowsClass.getMainWindow().hide()
      this.Win.show()
    })

    ipcMain.once('close_settings_window', () => {
      this.Win.close()
      this.WindowsClass.removeWindows(this.Win.id)
      this.WindowsClass.getMainWindow().show()
    })
  }

  private loadURL() {
    if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
      this.Win.loadURL(process.env['ELECTRON_RENDERER_URL'] + '/#/Settings')
    } else {
      this.Win.loadURL(
        url.format({
          pathname: join(__dirname, '../renderer/index.html'),
          protocol: 'file:',
          slashes: true,
          hash: 'settings'
        })
      )
    }
  }

  constructor(window: Windows, app: App, winid: number) {
    this.WindowsClass = window
    this.Win = this.WindowsClass.getWindowById(winid) as BrowserWindow
    this.eventon(app)
    this.loadURL()
    ;(this.Root = join(app.getPath('appData'))), './高考倒计时'

    if (!fs.existsSync(this.Root)) {
      fs.mkdirSync(this.Root)
    }
  }
}
