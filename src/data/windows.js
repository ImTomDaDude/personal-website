export const TASKBAR_HEIGHT = 34
export const SIDEBAR_WIDTH = 168

export const WINDOW_CATALOG = {
  about: {
    id: 'about',
    title: '關於我',
    icon: 'about',
    menus: ['檔案', '編輯', '檢視', '工具', '說明'],
    status: 'Chan Hoi On — 個人簡介',
    default: { x: 128, y: 200, w: 520, h: 420 },
  },
  resume: {
    id: 'resume',
    title: '履歷',
    icon: 'resume',
    menus: ['檔案', '編輯', '檢視', '工具', '說明'],
    status: '履歷一覽',
    default: { x: 168, y: 48, w: 560, h: 500 },
  },
  linkedin: {
    id: 'linkedin',
    title: '聯絡',
    icon: 'linkedin',
    menus: [],
    status: '電郵與 LinkedIn',
    default: { x: 620, y: 220, w: 380, h: 460 },
  },
  skills: {
    id: 'skills',
    title: '技能',
    icon: 'skills',
    menus: ['檔案', '檢視', '說明'],
    status: '程式、系統與人工智能',
    default: { x: 190, y: 70, w: 520, h: 420 },
  },
  projects: {
    id: 'projects',
    title: '專題與作品',
    icon: 'projects',
    menus: ['檔案', '檢視', '說明'],
    status: 'Robocon 與畢業專題',
    default: { x: 220, y: 88, w: 520, h: 380 },
  },
  computer: {
    id: 'computer',
    title: '我的電腦',
    icon: 'computer',
    menus: ['檔案', '編輯', '檢視', '工具', '說明'],
    status: '桌面捷徑',
    default: { x: 96, y: 40, w: 500, h: 380 },
  },
  documents: {
    id: 'documents',
    title: '我的文件',
    icon: 'folder',
    menus: ['檔案', '編輯', '檢視', '說明'],
    status: '個人文件',
    default: { x: 110, y: 70, w: 460, h: 320 },
  },
  recycle: {
    id: 'recycle',
    title: '回收筒',
    icon: 'recycle',
    menus: ['檔案', '檢視', '說明'],
    status: '回收筒是空的',
    default: { x: 260, y: 120, w: 380, h: 300 },
  },
  notes: {
    id: 'notes',
    title: '小筆記',
    icon: 'notes',
    menus: [],
    status: '給訪客的留言',
    default: { x: 420, y: 36, w: 360, h: 240 },
  },
  calendar: {
    id: 'calendar',
    title: '日曆',
    icon: 'calendar',
    menus: [],
    status: '',
    default: { x: 420, y: 16, w: 380, h: 168 },
  },
  help: {
    id: 'help',
    title: '關於本網站',
    icon: 'help',
    menus: ['說明'],
    status: '懷舊風格致敬',
    default: { x: 240, y: 110, w: 440, h: 320 },
  },
}

export const DESKTOP_ICONS = [
  { id: 'computer', label: '我的電腦', icon: 'computer', windowId: 'computer' },
  { id: 'documents', label: '我的文件', icon: 'folder', windowId: 'documents' },
  { id: 'about', label: '關於我', icon: 'about', windowId: 'about' },
  { id: 'resume', label: '履歷', icon: 'resume', windowId: 'resume' },
  { id: 'linkedin', label: 'LinkedIn', icon: 'linkedin', windowId: 'linkedin' },
  { id: 'skills', label: '技能', icon: 'skills', windowId: 'skills' },
  { id: 'projects', label: '專題', icon: 'projects', windowId: 'projects' },
  { id: 'notes', label: '小筆記', icon: 'notes', windowId: 'notes' },
]

export const START_MENU_ITEMS = [
  { id: 'about', label: '關於我', icon: 'about', windowId: 'about' },
  { id: 'resume', label: '履歷', icon: 'resume', windowId: 'resume' },
  { id: 'linkedin', label: '聯絡／LinkedIn', icon: 'linkedin', windowId: 'linkedin' },
  { id: 'skills', label: '技能', icon: 'skills', windowId: 'skills' },
  { id: 'projects', label: '專題與作品', icon: 'projects', windowId: 'projects' },
  { id: 'notes', label: '小筆記', icon: 'notes', windowId: 'notes' },
  { id: 'calendar', label: '日曆', icon: 'calendar', windowId: 'calendar' },
  { id: 'computer', label: '我的電腦', icon: 'computer', windowId: 'computer' },
  { id: 'documents', label: '我的文件', icon: 'folder', windowId: 'documents' },
  { id: 'help', label: '關於本網站', icon: 'help', windowId: 'help' },
]

export const QUICK_LAUNCH = [
  { id: 'about', label: '關於我', icon: 'about', windowId: 'about' },
  { id: 'resume', label: '履歷', icon: 'resume', windowId: 'resume' },
  { id: 'linkedin', label: '聯絡', icon: 'linkedin', windowId: 'linkedin' },
  { id: 'notes', label: '小筆記', icon: 'notes', windowId: 'notes' },
]
