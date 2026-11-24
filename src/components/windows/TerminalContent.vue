<script setup>
import { nextTick, onMounted, ref } from 'vue'
import {
  aboutSummary,
  certificates,
  education,
  experience,
  profile,
  projects,
  skills,
} from '../../data/content.js'

const PROMPT = 'hoion@desktop ~ %'
const screen = ref(null)
const inputEl = ref(null)
const draft = ref('')
const blocks = ref([])
const history = ref([])
let histIndex = 0

const files = {
  'about.txt': 'about',
  'experience.txt': 'experience',
  'education.txt': 'education',
  'skills.txt': 'skills',
  'projects.txt': 'projects',
  'contact.txt': 'contact',
}

function pushBlock(block) {
  blocks.value.push(block)
}

function scrollDown() {
  nextTick(() => {
    if (screen.value) screen.value.scrollTop = screen.value.scrollHeight
  })
}

function textBlock(lines, tone = '') {
  return { kind: 'text', tone, lines }
}

function linkLines(items) {
  return { kind: 'links', items }
}

function aboutLines() {
  return textBlock([aboutSummary])
}

function experienceLines() {
  const lines = []
  for (const job of experience) {
    lines.push(`${job.period} — ${job.title}, ${job.org}`)
    lines.push(job.description)
    lines.push('')
  }
  return textBlock(lines)
}

function educationLines() {
  const lines = education.map((item) =>
    item.detail ? `${item.period} — ${item.school}, ${item.detail}` : `${item.period} — ${item.school}`,
  )
  lines.push('')
  for (const cert of certificates) lines.push(`${cert.year} — ${cert.name}`)
  return textBlock(lines)
}

function skillsLines() {
  const lines = []
  for (const [group, items] of Object.entries(skills)) {
    lines.push(group)
    lines.push(items.join(', '))
    lines.push('')
  }
  return textBlock(lines)
}

function projectsLines() {
  const lines = []
  for (const project of projects) {
    lines.push(project.title)
    lines.push(project.description)
    lines.push('')
  }
  return textBlock(lines)
}

function contactBlock() {
  return linkLines([
    { label: profile.email, href: `mailto:${profile.email}` },
    { label: profile.linkedinLabel, href: profile.linkedin },
    { label: profile.instagramLabel, href: profile.instagram },
  ])
}

function helpBlock() {
  return textBlock([
    'help          list these commands',
    'about         who I am',
    'experience    where I have worked',
    'education     school and certificates',
    'skills        what I use',
    'projects      things I built',
    'contact       email, LinkedIn, Instagram',
    'ls            list the files here',
    'cat <file>    read one of them',
    'clear         wipe the screen',
    '',
    'Arrow keys walk your history. Tab completes.',
  ])
}

const commands = {
  help: helpBlock,
  about: aboutLines,
  who: aboutLines,
  whoami() {
    return textBlock(['a guest on Chan Hoi On\'s desktop.'])
  },
  experience: experienceLines,
  work: experienceLines,
  education: educationLines,
  edu: educationLines,
  skills: skillsLines,
  projects: projectsLines,
  contact: contactBlock,
  ls() {
    return { kind: 'files', names: Object.keys(files) }
  },
  cat(args) {
    const name = (args[0] || '').toLowerCase()
    if (!name) return textBlock(['cat: missing file'], 'err')
    const key = files[name] ? name : files[`${name}.txt`] ? `${name}.txt` : ''
    if (!key) return textBlock([`cat: ${args[0]}: no such file`], 'err')
    return commands[files[key]]()
  },
  echo(args) {
    return textBlock([args.join(' ')])
  },
  pwd() {
    return textBlock(['/home/hoion'])
  },
  date() {
    return textBlock([new Date().toString()])
  },
  history() {
    if (!history.value.length) return textBlock(['nothing yet.'], 'dim')
    return textBlock(history.value.map((line, i) => `${i + 1}  ${line}`))
  },
  clear() {
    blocks.value = []
    return null
  },
}

const names = [...Object.keys(commands), ...Object.keys(files)]

function run(raw) {
  const trimmed = raw.trim()
  if (!trimmed) return
  pushBlock({ kind: 'cmd', text: trimmed })
  history.value.push(trimmed)
  histIndex = history.value.length

  const parts = trimmed.split(/\s+/)
  const name = parts[0].toLowerCase()
  const fn = commands[name]
  if (!fn) {
    pushBlock(textBlock([`${name}: command not found`, 'try help'], 'err'))
    scrollDown()
    return
  }
  const out = fn(parts.slice(1))
  if (out) pushBlock(out)
  scrollDown()
}

function complete() {
  const parts = draft.value.split(/\s+/)
  const last = parts[parts.length - 1].toLowerCase()
  if (!last) return
  const hits = names.filter((name) => name.startsWith(last))
  if (!hits.length) return
  const prefix = hits.reduce((shared, name) => {
    let i = 0
    while (i < shared.length && i < name.length && shared[i] === name[i]) i += 1
    return shared.slice(0, i)
  })
  if (prefix.length > last.length) {
    parts[parts.length - 1] = prefix
    draft.value = parts.join(' ')
  }
  if (hits.length > 1 && prefix.length === last.length) {
    pushBlock({ kind: 'cmd', text: draft.value })
    pushBlock({ kind: 'files', names: hits })
    scrollDown()
  }
}

function onKey(event) {
  if (event.key === 'ArrowUp') {
    event.preventDefault()
    if (histIndex > 0) {
      histIndex -= 1
      draft.value = history.value[histIndex] || ''
    }
  } else if (event.key === 'ArrowDown') {
    event.preventDefault()
    if (histIndex < history.value.length - 1) {
      histIndex += 1
      draft.value = history.value[histIndex] || ''
    } else {
      histIndex = history.value.length
      draft.value = ''
    }
  } else if (event.key === 'Tab') {
    event.preventDefault()
    complete()
  } else if (event.key === 'l' && event.ctrlKey) {
    event.preventDefault()
    blocks.value = []
  }
}

function submit() {
  const value = draft.value
  draft.value = ''
  run(value)
}

function focusInput() {
  inputEl.value?.focus()
}

onMounted(() => {
  pushBlock(textBlock([
    'hoion@desktop',
    profile.name,
    profile.tagline,
  ]))
  pushBlock(textBlock(['start with help, or try ls and cat contact.txt.'], 'dim'))
})
</script>

<template>
  <div class="term" @click="focusInput">
    <div ref="screen" class="term-screen">
      <div v-for="(block, i) in blocks" :key="i" class="term-block" :class="block.tone">
        <p v-if="block.kind === 'cmd'" class="term-cmd">
          <span class="term-prompt">{{ PROMPT }}</span> {{ block.text }}
        </p>
        <template v-else-if="block.kind === 'text'">
          <p v-for="(line, n) in block.lines" :key="n">{{ line }}</p>
        </template>
        <template v-else-if="block.kind === 'links'">
          <p v-for="item in block.items" :key="item.href">
            <a :href="item.href" target="_blank" rel="noopener noreferrer">{{ item.label }}</a>
          </p>
        </template>
        <p v-else-if="block.kind === 'files'" class="term-files">
          <span v-for="name in block.names" :key="name">{{ name }}</span>
        </p>
      </div>
    </div>
    <form class="term-input" @submit.prevent="submit">
      <span class="term-prompt">{{ PROMPT }}</span>
      <input
        ref="inputEl"
        v-model="draft"
        aria-label="Terminal command"
        autocomplete="off"
        spellcheck="false"
        @keydown="onKey"
        @keydown.enter.prevent="submit"
        @click.stop
      />
    </form>
  </div>
</template>
