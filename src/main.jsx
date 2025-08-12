// ===== 0) 전역 스타일 로드 =====
import './styles/portfolio.css'

// ===== 0-1) 배포/로컬 모두 안전한 이미지 경로용 상수 =====
const BASE = import.meta.env.BASE_URL || '/'   // 예: '/', '/vite-sample/'

// ===== 1) DOM 헬퍼 =====
function el(tag, attrs = {}, children = []) {
  const $e = document.createElement(tag)
  Object.entries(attrs).forEach(([k, v]) => {
    if (k === 'class') $e.className = v
    else if (k === 'html') $e.innerHTML = v
    else if (k.startsWith('on') && typeof v === 'function') $e.addEventListener(k.slice(2).toLowerCase(), v)
    else $e.setAttribute(k, v)
  })
  ;(Array.isArray(children) ? children : [children]).filter(Boolean).forEach(c => {
    $e.appendChild(typeof c === 'string' ? document.createTextNode(c) : c)
  })
  return $e
}

// ===== 2) 공통 UI =====
function NavBar(current) {
  const link = (hash, label) => el('a', { href: `#/${hash}` }, [
    el('button', { class: current === hash ? 'active' : '' }, label)
  ])
  return el('nav', { class: 'navbar' }, [
    el('button', {}, '메인아이콘'),
    link('main', 'Main'),
    link('project', 'Project'),
    link('me', 'Me'),
  ])
}
function Divider() { return el('div', { class: 'divider' }) }

// ===== 3) 페이지들 =====

// 3-1) Main
function renderMain() {
  const left = el('div', { class: 'left' }, [
    el('img', { src: `${BASE}pic/profile.png`, alt: '내 프로필', class: 'porfile-photo' })
  ])

  const right = el('div', { class: 'right' }, [
    el('div', { class: 'profile-item' }, [
      el('a', { href: 'https://www.instagram.com/moozi_dan_/', target: '_blank' }, 'Moozi_dan_')
    ]),
    el('div', { class: 'profile-item' }, [
      el('a', { href: 'mailto:wjdals410518@gmail.com' }, 'wjdals410518@gmail.com')
    ]),
    el('div', { class: 'profile-item' }, [
      el('a', { href: 'tel:01083552031' }, '010-8355-2031')
    ]),
    el('div', { class: 'profile-item' }, '안녕하세요 정민이에요'),
  ])

  const profileBox = el('div', { class: 'profile-box' }, [
    el('div', { class: 'info' }, [left, right])
  ])

  const tools = el('div', { class: 'tools' }, [
    el('img', { src: `${BASE}pic/figma.png`,  alt: '사용가능툴', class: 'tool-image' }),
    el('img', { src: `${BASE}pic/github.png`, alt: '사용가능툴', class: 'tool-image' }),
  ])

  const mainContent = el('main', { class: 'container' }, [
    profileBox,
    Divider(),
    el('h3', { class: 'tools-title' }, 'tools'),
    tools
  ])

  return el('div', { class: 'main-page' }, [
    NavBar('main'),
    Divider(),
    mainContent
  ])
}

// 3-2) Project (그리드 + 3번째는 카운터로 이동)
function renderProject() {
  const header = el('div', { class: 'project-header', html: 'Project' })

  const grid = el('div', { class: 'gallery-grid' }, [
    // 1: 프로필로 이동
    el('a', { href: '#/profile' }, [
      el('img', { src: `${BASE}pic/profile.png`, class: 'gallery-item' })
    ]),
    // 2: 갤러리로 이동
    el('a', { href: '#/gallery' }, [
      el('img', { src: 'https://cataas.com/cat?random=1', class: 'gallery-item' })
    ]),
    // 3: 카운터로 이동
    el('a', { href: '#/counter', title: '카운터로 이동' }, [
      el('img', { src: `${BASE}pic/막내3.jpg`, class: 'gallery-item' })
    ]),

    // 나머지 로컬 썸네일들(전부 BASE 사용)
    el('img', { src: `${BASE}pic/막내2.jpg`,  class: 'gallery-item' }),
    el('img', { src: `${BASE}pic/막내3.jpg`,  class: 'gallery-item' }),
    el('img', { src: `${BASE}pic/막내4.jpg`,  class: 'gallery-item' }),
    el('img', { src: `${BASE}pic/막내5.jpg`,  class: 'gallery-item' }),
    el('img', { src: `${BASE}pic/막내6.jpg`,  class: 'gallery-item' }),
    el('img', { src: `${BASE}pic/막내8.jpg`,  class: 'gallery-item' }),
    el('img', { src: `${BASE}pic/막내9.jpg`,  class: 'gallery-item' }),
    el('img', { src: `${BASE}pic/막내17.jpg`, class: 'gallery-item' }),
    el('img', { src: `${BASE}pic/막내16.jpg`, class: 'gallery-item' }),
    el('img', { src: `${BASE}pic/완벽히 이해.png`, class: 'gallery-item' }),
    el('img', { src: `${BASE}pic/완벽히 이해.png`, class: 'gallery-item' }),
    el('img', { src: `${BASE}pic/완벽히 이해.png`, class: 'gallery-item' }),
  ])

  const container = el('div', { class: 'gallery-container' }, [grid])

  return el('div', { class: 'project-page' }, [
    NavBar('project'),
    Divider(),
    header,
    container
  ])
}

// 3-3) Profile
function renderProfile() {
  const previewName  = el('h1',  { class: 'name',            id: 'previewName'  }, 'Moozi_dan_')
  const previewEmail = el('span',{ class: 'contact-email',   id: 'previewEmail' }, 'example@example.com')
  const previewPhone = el('span',{ class: 'contact-phone',   id: 'previewPhone' }, '010-0000-0000')
  const previewMsg   = el('div', { class: 'message-preview', id: 'previewMessage' },
                         'This is the designated area for writing introductions')

  const left = el('div', { class: 'left' }, [
    el('img', { src: `${BASE}pic/profile.png`, alt: 'Profile Photo', class: 'profile-pic' }),
    previewName,
    el('div', { class: 'contact' }, [
      el('span', { class: 'contact-title' }, 'Contact me at:'),
      previewEmail,
      previewPhone,
      previewMsg
    ])
  ])

  const nameInput    = el('input',   { type: 'text',  id: 'name',    maxlength: '30', placeholder: 'Enter your name',    required: '' })
  const emailInput   = el('input',   { type: 'email', id: 'email',   maxlength: '50', placeholder: 'Enter your email',   required: '' })
  const phoneInput   = el('input',   { type: 'tel',   id: 'phone',   maxlength: '20', placeholder: 'Enter your phone number', required: '' })
  const messageInput = el('textarea',{ id: 'message', maxlength: '200', placeholder: 'Feel free to write your message', required: '' })

  const form = el('form', { id: 'profileForm', onsubmit: (e) => {
    e.preventDefault()
    if (!nameInput.value.trim())  return nameInput.reportValidity()
    if (!emailInput.value.trim()) return emailInput.reportValidity()
    if (!phoneInput.value.trim()) return phoneInput.reportValidity()
    if (!messageInput.value.trim()) return messageInput.reportValidity()

    previewName.textContent  = nameInput.value.trim()
    previewEmail.textContent = emailInput.value.trim()
    previewPhone.textContent = phoneInput.value.trim()
    previewMsg.innerHTML     = messageInput.value.trim().replace(/\n/g, '<br>')
    form.reset()
  } }, [
    el('label', { for: 'name'    }, 'Name'),    nameInput,
    el('label', { for: 'email'   }, 'Email'),   emailInput,
    el('label', { for: 'phone'   }, 'Phone'),   phoneInput,
    el('label', { for: 'message' }, 'Message'), messageInput,
    el('button', { type: 'submit', id: 'submitBtn' }, 'Apply')
  ])

  const right = el('div', { class: 'right' }, [form])

  const card = el('div', { class: 'card' }, [ left, right ])

  return el('div', { class: 'profile-page' }, [
    NavBar('profile'), Divider(),
    el('div', { class: 'profile-header' }, 'Profile'),
    el('main', {}, [card])
  ])
}

// 3-4) Gallery
function renderGallery() {
  const header = el('div', { class: 'gallery-header' }, 'Gallery')
  const cards = [1,2,3,4,5,6,7,8,9,10,11,12].map(n =>
    el('div', { class: 'gallery-card' }, [
      el('img', { src: `https://cataas.com/cat?random=${n}`, alt: `pic${n}` })
    ])
  )
  const box = el('div', { class: 'gallery-box' }, cards)
  return el('div', { class: 'gallery-page' }, [
    NavBar('gallery'), Divider(), header, box
  ])
}

// 3-5) Counter (카운터)
function renderCounter() {
  let count = Number(localStorage.getItem('count') || 0)
  const value = el('div', { class: 'counter-value' }, String(count))
  const update = () => {
    value.textContent = String(count)
    localStorage.setItem('count', String(count))
  }
  const btnDec   = el('button', { class: 'btn',        onclick: () => { count--; update() } }, '−')
  const btnReset = el('button', { class: 'btn reset',  onclick: () => { count = 0; update() } }, 'Reset')
  const btnInc   = el('button', { class: 'btn',        onclick: () => { count++; update() } }, '+')
  const actions  = el('div', { class: 'counter-actions' }, [btnDec, btnReset, btnInc])
  const card     = el('div', { class: 'counter-card' }, [
    el('h2', { class: 'counter-title' }, 'Counter'),
    value, actions
  ])
  return el('div', { class: 'counter-page' }, [
    NavBar('project'), Divider(),
    el('main', { class: 'container' }, [card])
  ])
}

// 3-6) Me (임시)
function renderMe() {
  return el('div', {}, [ NavBar('me'), Divider(), el('main', {}, []) ])
}

// ===== 4) 라우터 =====
function router() {
  const app = document.getElementById('app')
  app.innerHTML = ''
  const path = location.hash.replace('#/', '') || 'main'
  let page
  switch (path) {
    case 'main':    page = renderMain();    break
    case 'project': page = renderProject(); break
    case 'profile': page = renderProfile(); break
    case 'gallery': page = renderGallery(); break
    case 'counter': page = renderCounter(); break   // ✅ 카운터 라우트
    case 'me':      page = renderMe();      break
    default:        page = renderMain()
  }
  app.appendChild(page)
}
window.addEventListener('hashchange', router)
window.addEventListener('DOMContentLoaded', router)
