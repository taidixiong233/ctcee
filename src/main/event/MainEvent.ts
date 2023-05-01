import { BrowserWindow, ipcMain, App } from 'electron'
import { is } from '@electron-toolkit/utils'
import { join } from 'path'
import fs from 'fs'
import Windows from '../Windows'
import Config from '../../renderer/src/config'

export default class MainEvent {
  private MainWin: BrowserWindow

  private WindowsClass: Windows

  /**缓存数据根目录 */
  private Root: string

  private eventon(app: App) {
    this.MainWin.on('ready-to-show', () => {
      this.MainWin.show()
    })

    ipcMain.on('close', () => app.exit())

    ipcMain.on('read_config_file', (e, data = 'config_file') => {
      if (fs.existsSync(join(this.Root, './config.cfg'))) {
        e.sender.send(data, fs.readFileSync(join(this.Root, './config.cfg')).toString())
      } else {
        e.sender.send(data, undefined)
      }
    })

    ipcMain.on('write_config_file', (e, data = { res: 'config_file_write_result', data: '{}' }) => {
      try {
        if (fs.existsSync(join(this.Root, './config.cfg')))
          fs.unlinkSync(join(this.Root, './config.cfg'))
        fs.writeFileSync(
          join(this.Root, './config.cfg'),
          JSON.stringify(new Config(JSON.stringify(data.data)).read())
        )
        e.sender.send(data.res, { suceess: true, error: undefined })
      } catch (err) {
        e.sender.send(data.res, { suceess: false, error: err })
        console.log(err)
      }
    })

    ipcMain.on('open_settings_win', () => {
      this.WindowsClass.createSettingsWindows()
    })

    ipcMain.on('updata_config_file', () => {
      console.log(1)
      this.MainWin.webContents.send('config_init')
    })
  }

  private loadURL() {
    if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
      this.MainWin.loadURL(process.env['ELECTRON_RENDERER_URL'])
    } else {
      this.MainWin.loadURL(join(__dirname, '../renderer/index.html'))
    }
  }

  constructor(window: Windows, app: App) {
    this.WindowsClass = window
    this.MainWin = this.WindowsClass.getMainWindow()
    this.eventon(app)
    this.loadURL()
    if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
      this.Root = join(app.getPath('exe').replace(/electron.exe/g, ''), './config')
    } else {
      this.Root = join(app.getPath('exe').replace(/ctcee.exe/g, ''), './config')
    }

    console.log(this.Root)

    if (!fs.existsSync(this.Root)) {
      fs.mkdirSync(this.Root)
    }
  }
}
