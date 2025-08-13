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
    // 4. 성류방송
    el('a', { href: '#/support', title: '방송 후원으로 이동' }, [
      el('img', { src: `${BASE}pic/막내4.jpg`, class: 'gallery-item' })
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
    case 'support': page = renderSupport(); break;  // ← 이 줄 추가

    default:        page = renderMain()
  }
  app.appendChild(page)
}
window.addEventListener('hashchange', router)
window.addEventListener('DOMContentLoaded', router)
// ====== 3-x) Support: 방송 후원하기 (코인 단위 + 메시지 풍선) ======
function renderSupport() {
  const BASE = import.meta.env.BASE_URL || '/';                         // 배포/로컬 모두 안전한 경로  // 언제: public 파일 접근

  // ① 코인 규칙(최소/단위)
  const MIN_COIN  = 100;                                                // 최소 100코인  // 언제: 유효성 검사 기준
  const COIN_STEP = 100;                                                // 100코인 단위  // 언제: 숫자 입력의 증가 단위

  // ② 총 코인(저장/표시)
  const fmt   = (n) => n.toLocaleString('ko-KR');                       // 1,234 형식  // 언제: 보기 좋게 표기
  let total   = Number(localStorage.getItem('support_total_coin') || 0);// 저장된 총합 불러오기  // 언제: 새로고침 후에도 유지
  const totalEl = el('div', { class: 'support-total' }, `총 후원: ${fmt(total)} 코인`); // 화면 표시 텍스트

  // === (NEW) 풍선들이 떠다닐 레이어(화면 전체 덮는 투명층) ===
  const balloonLayer = el('div', { class: 'balloon-layer' });           // 풍선 DOM을 모아두는 레이어  // 언제: 메시지 시각효과 올릴 때

  // === (NEW) 메시지 풍선 여러 개 띄우기 ===
  // text: 풍선 문구, count: 몇 개 만들지
  function spawnBalloons(text, count = 16) {                            // 후원할 때 메시지를 풍선처럼 여러 개 띄우기  // 언제: submit 클릭 직후
    const t = text.length > 30 ? text.slice(0, 30) + '…' : text;        // 너무 길면 잘라서 한 줄 처리

    for (let i = 0; i < count; i++) {
      const left  = Math.floor(Math.random() * 100);                    // 풍선 가로 시작 위치(0~100vw)
      const dur   = (6 + Math.random() * 6).toFixed(2) + 's';           // 떠오르는 시간 6~12초
      const delay = (Math.random() * 2).toFixed(2) + 's';               // 시작 지연 0~2초
      const scale = (0.8 + Math.random() * 0.8).toFixed(2);             // 크기 0.8~1.6배
      const hue   = Math.floor(Math.random() * 360);                    // 색상(HSL) 랜덤

      const balloon = el('div', {                                       // 풍선 하나
        class: 'balloon',
        style: `--left:${left}vw; --dur:${dur}; --delay:${delay}; --scale:${scale}; --hue:${hue};` // CSS 변수로 제어
      }, [
        el('div', { class: 'balloon-bubble' }, t)                        // 말풍선 모양 내부에 텍스트
      ]);

      balloonLayer.appendChild(balloon);                                 // 레이어에 추가

      // 애니메이션 끝나면 자동 제거(메모리 누수 방지)
      const totalMs = (parseFloat(dur) + parseFloat(delay)) * 1000;
      setTimeout(() => balloon.remove(), totalMs + 200);
    }
  }

  // ③ 상단: 호스트 이미지 + 제목
  const hostImg = el('img', {                                           // 후원받는 사람 사진
    class: 'support-host-photo',                                        // 크기/테두리 등 CSS 연결용 클래스
    src: `${BASE}pic/you.png`,                                          // public/pic/you.png 에 파일 두면 됨(파일명 맞춰서 수정)
    alt: '방송 주인장'
  });
  const hostWrap = el('div', { class: 'host-photo-wrapper' }, [hostImg]); // 이미지를 가운데 두는 래퍼
  const title    = el('div', { class: 'support-title' }, '김독자 후원하기'); // 큰 제목(한 줄)

  // ④ 입력 폼 요소들
  const nameInput = el('input', {                                       // 이름(닉네임) 입력
    class: 'support-input',
    placeholder: '이름(닉네임) *',
    value: localStorage.getItem('support_name') || ''                   // ✅ 한 번 입력하면 기억(자동 복원)
  });

  const lastAmount = localStorage.getItem('support_last_amount');       // ✅ 마지막으로 입력한 코인값 불러오기
  const amountInput = el('input', {                                     // 금액 입력
    class: 'support-input',
    type: 'number',
    min: String(MIN_COIN),
    step: String(COIN_STEP),
    value: lastAmount ? String(lastAmount) : String(MIN_COIN),          // ✅ 저장값이 있으면 그걸 기본값으로
    oninput: (e) => {                                                   // 사용자가 직접 수정해도 기억  // 언제: 입력 즉시 저장
      const n = Number(e.target.value || 0);
      localStorage.setItem('support_last_amount', String(n));
    }
  });

  // 프리셋(누적 방식)
  const PRESETS = [100, 500, 1000];                                     // 빠른 선택 버튼 숫자들
  const presetBtns = el('div', { class: 'coin-presets' },               // 버튼 묶음
    PRESETS.map(v =>
      el('button', {
        class: 'coin-btn',
        onclick: () => {                                                // 누르면 누적(+)
          const cur = Number(amountInput.value || 0);
          const next = cur + v;
          amountInput.value = String(next);
          localStorage.setItem('support_last_amount', String(next));    // ✅ 누적값도 저장
        }
      }, `${v.toLocaleString('ko-KR')} 코인`)
    )
  );

  const amountRow = el('div', {}, [                                     // 금액 라벨 + 프리셋 + 입력창 한 줄 묶음
    el('label', { class: 'support-label' }, '금액(코인) *'),
    presetBtns,
    el('div', { style: 'display:flex; gap:8px; align-items:center;' }, [
      amountInput,
      el('span', { style: 'color:#cfd4ff;' }, '코인')
    ])
  ]);

  const msgInput = el('textarea', {                                     // 하고 싶은 말
    class: 'support-textarea',
    placeholder: '하고 싶은 말을 적어주세요 (선택)'
  });

  // ⑤ 제출 버튼(후원 처리)
  const submitBtn = el('button', {
    class: 'support-submit',
    onclick: () => {                                                    // “후원하기” 클릭 시 동작
      const name  = nameInput.value.trim();                             // 입력 이름
      const coins = Number(amountInput.value);                          // 입력 코인

      if (!name) {                                                      // 이름 비었으면 경고
        alert('이름(닉네임)을 입력해주세요.');
        nameInput.focus();
        return;
      }
      if (!Number.isFinite(coins) || coins < MIN_COIN) {                // 최소 금액 미만이면 경고
        alert(`최소 ${MIN_COIN} 코인 이상부터 후원할 수 있어요.`);
        amountInput.focus();
        return;
      }

      total += coins;                                                   // 총합 갱신
      localStorage.setItem('support_total_coin', String(total));        // 총합 저장(유지)
      localStorage.setItem('support_name', name);                       // 이름 저장(유지)
      localStorage.setItem('support_last_amount', String(coins));       // 마지막 코인값 저장(유지)
      totalEl.textContent = `총 후원: ${fmt(total)} 코인`;              // 화면 텍스트 갱신

      const message = msgInput.value.trim();                            // 입력 메시지
      const say = message ? `\n메시지: ${message}` : '';                // 알림 표시용
      alert(`${name} 님이 ${fmt(coins)} 코인 후원!${say}`);

      // === (NEW) 메시지 풍선 쏘기 ===
      if (message) spawnBalloons(message, 18);                          // 메시지가 있으면 18개 띄우기

      // 코인값은 유지(리셋하지 않음) → 다음 후원 시에도 같은 값 남김
      // amountInput.value = String(MIN_COIN);  // ← 의도적으로 미사용
      // (기존 alert 다음)
const sayMsg = msgInput.value.trim();
spawnBalloons(sayMsg || `${name} 님 감사합니다!`, 16);

// 코인 값은 유지, 메시지만 비우기
msgInput.value = '';


      msgInput.value = '';                                              // 메시지만 비우기(원하면 유지해도 됨)
    }
  }, '후원하기');

  // ⑥ 좌측 카드(모든 입력요소는 카드 안에!)  ← 튀어나오지 않게 “support-card” 안으로 다 넣음
  const leftCol = el('div', {}, [
    hostWrap,                                                           // 사진
    title,                                                              // 제목
    totalEl,                                                            // 총합
    el('div', { class: 'support-card' }, [                              // 입력 카드(경계 안쪽에 전부 배치)
      el('label', { class: 'support-label' }, '이름(닉네임) *'),
      nameInput,
      amountRow,
      el('label', { class: 'support-label' }, '메시지 (선택)'),
      msgInput,
      submitBtn
    ])
  ]);

  // ⑦ 가운데 정렬(사이드 제거 버전)
  const wrap = el('div', { class: 'support-wrap single' }, [leftCol]);  // 가운데 1열 레이아웃

  // ⑧ 페이지 뼈대 (풍선 레이어를 내용 “뒤”로 둘 거면 wrap 앞에, 내용 “위”로 둘 거면 wrap 뒤에)
  return el('div', { class: 'support-page' }, [
    NavBar('project'),
    Divider(),
    wrap,                                                               // 본문
    balloonLayer                                                        // === 풍선 레이어(내용 위로 떠 있어야 하므로 마지막에 넣음)
  ]);
}

