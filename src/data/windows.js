export const TASKBAR_HEIGHT = 40
export const SIDEBAR_WIDTH = 168

const MENUS_FULL = ['File', 'Edit', 'View', 'Tools', 'Help']
const MENUS_BASIC = ['File', 'View', 'Help']

export const WINDOW_CATALOG = {
  about: {
    id: 'about',
    title: 'About Me',
    icon: 'about',
    menus: MENUS_FULL,
    status: 'Chan Hoi On — About',
    default: { x: 150, y: 80, w: 700, h: 540 },
  },
  resume: {
    id: 'resume',
    title: 'Experience',
    icon: 'resume',
    menus: MENUS_FULL,
    status: 'Resume overview',
    default: { x: 160, y: 36, w: 740, h: 620 },
  },
  linkedin: {
    id: 'linkedin',
    title: 'Contact',
    icon: 'linkedin',
    menus: [],
    status: 'Email and LinkedIn',
    default: { x: 200, y: 70, w: 540, h: 600 },
  },
  skills: {
    id: 'skills',
    title: 'Skills',
    icon: 'skills',
    menus: MENUS_BASIC,
    status: 'Programming, systems, and AI',
    default: { x: 170, y: 48, w: 700, h: 540 },
  },
  projects: {
    id: 'projects',
    title: 'Projects',
    icon: 'projects',
    menus: MENUS_BASIC,
    status: 'Robocon and graduation project',
    default: { x: 180, y: 56, w: 700, h: 500 },
  },
  computer: {
    id: 'computer',
    title: 'My Computer',
    icon: 'computer',
    menus: MENUS_FULL,
    status: 'Desktop shortcuts',
    default: { x: 150, y: 40, w: 680, h: 500 },
  },
  documents: {
    id: 'documents',
    title: 'My Documents',
    icon: 'folder',
    menus: ['File', 'Edit', 'View', 'Help'],
    status: 'Personal documents',
    default: { x: 160, y: 56, w: 640, h: 440 },
  },
  recycle: {
    id: 'recycle',
    title: 'Recycle Bin',
    icon: 'recycle',
    menus: MENUS_BASIC,
    status: 'The Recycle Bin is empty',
    default: { x: 200, y: 90, w: 520, h: 400 },
  },
  notes: {
    id: 'notes',
    title: 'Notes',
    icon: 'notes',
    menus: [],
    status: 'A note for visitors',
    default: { x: 200, y: 40, w: 560, h: 360 },
  },
  calendar: {
    id: 'calendar',
    title: 'Calendar',
    icon: 'calendar',
    menus: [],
    status: '',
    default: { x: 200, y: 16, w: 560, h: 230 },
  },
  help: {
    id: 'help',
    title: 'About This Website',
    icon: 'help',
    menus: ['Help'],
    status: 'A nostalgic homage',
    default: { x: 200, y: 70, w: 640, h: 420 },
  },
}

export const DESKTOP_ICONS = [
  { id: 'computer', label: 'My Computer', icon: 'computer', windowId: 'computer' },
  { id: 'documents', label: 'My Documents', icon: 'folder', windowId: 'documents' },
  { id: 'about', label: 'About Me', icon: 'about', windowId: 'about' },
  { id: 'resume', label: 'Experience', icon: 'resume', windowId: 'resume' },
  { id: 'linkedin', label: 'LinkedIn', icon: 'linkedin', windowId: 'linkedin' },
  { id: 'skills', label: 'Skills', icon: 'skills', windowId: 'skills' },
  { id: 'projects', label: 'Projects', icon: 'projects', windowId: 'projects' },
  { id: 'notes', label: 'Notes', icon: 'notes', windowId: 'notes' },
]

export const START_MENU_ITEMS = [
  { id: 'about', label: 'About Me', icon: 'about', windowId: 'about' },
  { id: 'resume', label: 'Experience', icon: 'resume', windowId: 'resume' },
  { id: 'linkedin', label: 'Contact / LinkedIn', icon: 'linkedin', windowId: 'linkedin' },
  { id: 'skills', label: 'Skills', icon: 'skills', windowId: 'skills' },
  { id: 'projects', label: 'Projects', icon: 'projects', windowId: 'projects' },
  { id: 'notes', label: 'Notes', icon: 'notes', windowId: 'notes' },
  { id: 'calendar', label: 'Calendar', icon: 'calendar', windowId: 'calendar' },
  { id: 'computer', label: 'My Computer', icon: 'computer', windowId: 'computer' },
  { id: 'documents', label: 'My Documents', icon: 'folder', windowId: 'documents' },
  { id: 'help', label: 'About This Website', icon: 'help', windowId: 'help' },
]

export const QUICK_LAUNCH = [
  { id: 'about', label: 'About Me', icon: 'about', windowId: 'about' },
  { id: 'resume', label: 'Experience', icon: 'resume', windowId: 'resume' },
  { id: 'linkedin', label: 'Contact', icon: 'linkedin', windowId: 'linkedin' },
  { id: 'notes', label: 'Notes', icon: 'notes', windowId: 'notes' },
]
