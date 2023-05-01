import { BrowserWindow, screen, App } from 'electron'
import { join } from 'path'
import MainEvent from './event/MainEvent'
import SettingsEvent from './event/SettingsEvent'

export default class Windows {
  /**窗口实例 */
  private windows: Map<number, BrowserWindow>

  /**获取相应窗口 */
  private getWindows(id: number): BrowserWindow | undefined {
    return this.windows.get(Number(id))
  }

  /**添加相应窗口 */
  private addWindows(win: BrowserWindow): number {
    this.windows.set(win.id, win)
    return win.id
  }

  /**删除相应窗口 */
  private delWindows(id: number) {
    this.windows.delete(id)
  }

  /**主窗口id */
  private MainWinid: number

  /**app实例 */
  private app: App

  /**创建主窗口 */
  private createMainWindows(): BrowserWindow {
    return new BrowserWindow({
      width: 160,
      height: 100,
      show: false,
      alwaysOnTop: true,
      autoHideMenuBar: true,
      skipTaskbar: false,
      frame: false,
      resizable: false,
      transparent: true,
      type: 'toolbar',
      x: screen.getPrimaryDisplay().workAreaSize.width - 160,
      y: screen.getPrimaryDisplay().workAreaSize.height - 100,
      useContentSize: true,
      webPreferences: {
        devTools: false,
        preload: join(__dirname, '../preload/index.js'),
        sandbox: false
      }
    })
  }

  public getWindowById(id: number): BrowserWindow | undefined {
    return this.getWindows(id)
  }

  public getMainWindow(): BrowserWindow {
    return this.getWindows(this.MainWinid) as BrowserWindow
  }

  constructor(app: App) {
    this.windows = new Map()
    this.MainWinid = this.addWindows(this.createMainWindows())
    new MainEvent(this, app)
    this.app = app
  }

  private createWindows(
    options?: Electron.BrowserWindowConstructorOptions | undefined
  ): BrowserWindow {
    let win = new BrowserWindow(options)
    this.addWindows(win)
    return win
  }

  public createSettingsWindows() {
    let win = this.createWindows({
      width: 800,
      height: 600,
      show: false,
      skipTaskbar: false,
      resizable: false,
      frame: false,
      useContentSize: true,
      transparent: true,
      webPreferences: {
        devTools: false,
        preload: join(__dirname, '../preload/index.js'),
        sandbox: false
      }
    })
    this.addWindows(win)
    new SettingsEvent(this, this.app, win.id)
    return win
  }

  public removeWindows(id: number): void
  public removeWindows(id: BrowserWindow): void
  public removeWindows(id: number | BrowserWindow): void {
    if (typeof id === 'number') {
      this.delWindows(id)
    } else {
      this.delWindows(id.id)
    }
  }
}
