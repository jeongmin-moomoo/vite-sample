// ====== 0) 스타일 불러오기 (항상 파일 맨 위) ======
import './styles/portfolio.css'; // Vite는 JS에서 CSS를 import하면 전체에 적용됨  // 언제: 전역 스타일을 적용할 때
// 한 줄 추가 — 모든 로컬 이미지 경로는 이 BASE로 시작하게!
const BASE = import.meta.env.BASE_URL || '/'; // 예) '/vite-sample/' 또는 '/'

// ====== 1) el 헬퍼: 태그 손쉽게 만들기 ======
function el(tag, attrs = {}, children = []) { // el: HTML 요소를 쉽게 만드는 작은 도우미  // 언제: DOM을 JS로 생성할 때
  const $e = document.createElement(tag);     // 실제 태그 생성

  // 전달 받은 속성(attr)을 요소에 붙이기
  Object.entries(attrs).forEach(([k, v]) => {
    if (k === 'class') $e.className = v;                     // class 속성은 className으로
    else if (k === 'html') $e.innerHTML = v;                 // html 키는 innerHTML로(문자열을 그대로 넣고 싶을 때)
    else if (k.startsWith('on') && typeof v === 'function')  // onClick/onSubmit 같은 이벤트 핸들러
      $e.addEventListener(k.slice(2).toLowerCase(), v);      // 예: onClick → click
    else $e.setAttribute(k, v);                               // 그 외 일반 속성 처리
  });

  // 자식 노드(children) 추가
  (Array.isArray(children) ? children : [children])
    .filter(Boolean)
    .forEach(c => $e.appendChild(typeof c === 'string' ? document.createTextNode(c) : c));

  return $e; // 완성된 요소 반환
}

// ====== 2) 공통 UI ======
function NavBar(current) { // current: 현재 활성 탭 이름('main','project','profile','gallery','me')  // 언제: 상단 메뉴 표시
  const link = (hash, label) =>
    el('a', { href: `#/${hash}` }, [
      el('button', { class: current === hash ? 'active' : '' }, label) // 현재 페이지면 버튼에 active 클래스
    ]);

  return el('nav', { class: 'navbar' }, [
    el('button', {}, '메인아이콘'), // 장식용 버튼(동작 없음)
    link('main', 'Main'),
    link('project', 'Project'),
    link('me', 'Me'),
  ]);
}

function Divider() {                     // 얇은 구분선(디자인용)
  return el('div', { class: 'divider' }); // 언제: 영역을 구분하고 싶을 때
}

// ====== 3) 페이지 렌더러들 ======

// 3-1) Main 페이지
function renderMain() {
  // 왼쪽: 프로필 사진
  const left = el('div', { class: 'left' }, [
    el('img', {
      src: `${BASE}pic/profile.png`, // ✅ BASE 변수 사용
      alt: '내 프로필',
      class: 'porfile-photo'
    })
  ]);


   // 오른쪽: 링크/소개 (원래 코드 유지)
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
    el('div', { class: 'profile-item' }, '안녕하세요 정민이에요')
  ]);

  // 프로필 카드
  const profileBox = el('div', { class: 'profile-box' }, [
    el('div', { class: 'info' }, [left, right])
  ]);

 // 툴 로고
  const tools = el('div', { class: 'tools' }, [
    el('img', { src: `${BASE}pic/figma.png`,  alt: '사용가능툴', class: 'tool-image' }),
    el('img', { src: `${BASE}pic/github.png`, alt: '사용가능툴', class: 'tool-image' }),
  ]);

  // 메인 콘텐츠(좌우, 툴 포함)
  const mainContent = el('main', { class: 'container' }, [
    profileBox,
    Divider(),
    el('h3', { class: 'tools-title' }, 'tools'),
    tools
  ]);

 return el('div', { class: 'main-page' }, [
    NavBar('main'),
    Divider(),
    el('main', { class: 'container' }, [
      el('div', { class: 'info' }, [left, right]),
      Divider(),
      el('h3', { class: 'tools-title' }, 'tools'),
      tools
    ])
  ]);
}

// 3-2) Project 페이지 (썸네일 그리드)
function renderProject() {
  const base = import.meta.env.BASE_URL || '/';             // 배포 경로 대응용  // 언제: 서브폴더 배포 시 안전

  const header = el('div', { class: 'project-header', html: 'Project' }); // 상단 제목  // 언제: 프로젝트 화면 제목

  const grid = el('div', { class: 'gallery-grid' }, [       // 카드 그리드 래퍼  // 언제: 썸네일 격자 배치
    el('a', { href: '#/profile' }, [                        // 프로필로 이동 링크  // 언제: 첫 카드 클릭 시
      el('img', { src: '/pic/profile.png', class: 'gallery-item' })
    ]),
    el('a', { href: '#/gallery' }, [                        // 갤러리로 이동 링크
      el('img', { src: 'https://cataas.com/cat?random=1', class: 'gallery-item' })
    ]),

    // ✅ 세 번째 카드: 카운터로 이동 (href는 반드시 '#/counter')
    el('a', { href: '#/counter', title: '카운터로 이동' }, [
      el('img', { src: `${base}pic/막내3.jpg`, class: 'gallery-item' })
    ]),

    // 나머지 카드들 (그대로 유지)
    el('img', { src: '/pic/막내2.jpg',  class: 'gallery-item' }),
    el('img', { src: '/pic/막내3.jpg',  class: 'gallery-item' }),
    el('img', { src: '/pic/막내4.jpg',  class: 'gallery-item' }),
    el('img', { src: '/pic/막내5.jpg',  class: 'gallery-item' }),
    el('img', { src: '/pic/막내6.jpg',  class: 'gallery-item' }),
    el('img', { src: '/pic/막내8.jpg',  class: 'gallery-item' }),
    el('img', { src: '/pic/막내9.jpg',  class: 'gallery-item' }),
    el('img', { src: '/pic/막내17.jpg', class: 'gallery-item' }),
    el('img', { src: '/pic/막내16.jpg', class: 'gallery-item' }),
    el('img', { src: '/pic/완벽히 이해.png', class: 'gallery-item' }),
    el('img', { src: '/pic/완벽히 이해.png', class: 'gallery-item' }),
    el('img', { src: '/pic/완벽히 이해.png', class: 'gallery-item' }),
  ]);

  const container = el('div', { class: 'gallery-container' }, [grid]); // 그리드 감싸는 박스

  return el('div', {class: 'project-page'}, [
    NavBar('project'),                                      // 상단 네비 (project 활성)  // 언제: 현재 탭 표시
    Divider(),                                              // 구분선
    header,                                                 // 제목
    container                                               // 그리드
  ]);
}

  function renderCounter() {                                                     // ✅ 카운터 화면을 만드는 함수  // 언제: #/counter 경로로 왔을 때
  let count = Number(localStorage.getItem('count') || 0);                      // 새로고침해도 유지하고 싶으면 사용 (원치 않으면 지워도 됨)

  const value = el('div', { class: 'counter-value' }, String(count));          // 숫자 표시 박스  // 언제: 현재 값을 보여줄 때
  const update = () => {                                                       // 숫자 바뀔 때 화면/저장 저장소 동기화  // 언제: 버튼 클릭 후
    value.textContent = String(count);
    localStorage.setItem('count', String(count));
  };

  const btnDec   = el('button', { class: 'btn',   onclick: () => { count--; update(); } }, '−'); // 1 감소  // 언제: 줄일 때
  const btnReset = el('button', { class: 'btn reset', onclick: () => { count = 0; update(); } }, 'Reset'); // 0으로  // 언제: 초기화할 때
  const btnInc   = el('button', { class: 'btn',   onclick: () => { count++; update(); } }, '+'); // 1 증가  // 언제: 늘릴 때

  const actions = el('div', { class: 'counter-actions' }, [btnDec, btnReset, btnInc]);          // 버튼 묶음  // 언제: 보기 좋게 배치

  const card = el('div', { class: 'counter-card' }, [                                            // 카드 박스  // 언제: UI를 깔끔하게
    el('h2', { class: 'counter-title' }, 'Counter'),
    value,
    actions
  ]);

  return el('div', {class: 'counter-page'}, [
    NavBar('project'),     // ← 프로젝트 내부 기능 느낌이면 'project'를 active로 유지  // 언제: 상단 메뉴 유지
    Divider(),
    el('main', { class: 'container' }, [card])                                                  // 본문에 카드 넣기
  ]);

  
}

// 3-3) Profile 페이지 (우측 폼 → 좌측 미리보기 갱신)
function renderProfile() {
  // ----- 좌측: 미리보기에 들어갈 요소들 만들기 -----
  const previewName  = el('h1',  { class: 'name',            id: 'previewName'  }, 'UserName');
  const previewEmail = el('span',{ class: 'contact-email',   id: 'previewEmail' }, 'example@example.com');
  const previewPhone = el('span',{ class: 'contact-phone',   id: 'previewPhone' }, '010-0000-0000');
  const previewMsg   = el('div', { class: 'message-preview', id: 'previewMessage' },
                         'This is the designated area for writing introductions');

  const left = el('div', { class: 'left' }, [
    el('img', { src: '/pic/profile.png', alt: 'Profile Photo', class: 'profile-pic' }),
    previewName,
    el('div', { class: 'contact' }, [
      el('span', { class: 'contact-title' }, 'Contact me at:'),
      previewEmail,
      previewPhone,
      previewMsg
    ])
  ]);

  // ----- 우측: 입력 폼 만들기 -----
  const nameInput    = el('input',   { type: 'text',  id: 'name',    maxlength: '30', placeholder: 'Enter your name',    required: '' });
  const emailInput   = el('input',   { type: 'email', id: 'email',   maxlength: '50', placeholder: 'Enter your email',   required: '' });
  const phoneInput   = el('input',   { type: 'tel',   id: 'phone',   maxlength: '20', placeholder: 'Enter your phone number', required: '' });
  const messageInput = el('textarea',{ id: 'message', maxlength: '200', placeholder: 'Feel free to write your message', required: '' });

  const form = el('form', { id: 'profileForm', onsubmit: (e) => {
    e.preventDefault();                                   // 새로고침 막기

    // 값 비었는지 간단 체크
    if (!nameInput.value.trim())  return nameInput.reportValidity();
    if (!emailInput.value.trim()) return emailInput.reportValidity();
    if (!phoneInput.value.trim()) return phoneInput.reportValidity();
    if (!messageInput.value.trim()) return messageInput.reportValidity();

    // ----- 좌측 미리보기 갱신 -----
    previewName.textContent  = nameInput.value.trim();
    previewEmail.textContent = emailInput.value.trim();
    previewPhone.textContent = phoneInput.value.trim();
    previewMsg.innerHTML     = messageInput.value.trim().replace(/\n/g, '<br>');

    form.reset();                                         // 입력값 초기화(선택)
  } }, [
    el('label', { for: 'name'    }, 'Name'),    nameInput,
    el('label', { for: 'email'   }, 'Email'),   emailInput,
    el('label', { for: 'phone'   }, 'Phone'),   phoneInput,
    el('label', { for: 'message' }, 'Message'), messageInput,
    el('button', { type: 'submit', id: 'submitBtn' }, 'Apply')
  ]);

  const right = el('div', { class: 'right' }, [ form ]);

  // ----- 카드 레이아웃: left/right 그대로 넣기(중요!) -----
  const card = el('div', { class: 'card' }, [
    left,   // ✅ 이미 완성된 left 요소를 그대로 넣기
    right   // ✅ 우측 폼
  ]);

  // ----- 페이지 조립 -----
   return el('div', { class: 'profile-page' }, [
   NavBar('profile'), Divider(),
   el('div', { class: 'profile-header' }, 'Profile'),
   el('main', {}, [card])
]);
}

// 3-4) Gallery 페이지 (외부 이미지)
function renderGallery() {
  const header = el('div', { class: 'gallery-header' }, 'Gallery'); // 상단 제목

  // 카드 목록 (외부 고양이 API 사용)
  const cards = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map(n =>
    el('div', { class: 'gallery-card' }, [
      el('img', {
        src: `https://cataas.com/cat?random=${n}`, // 랜덤 고양이 사진
        alt: `pic${n}`
      })
    ])
  );

  // 카드 박스를 묶는 컨테이너
  const box = el('div', { class: 'gallery-box' }, cards);

  // 전체 페이지 조립
return el('div', { class: 'gallery-page' }, [
  NavBar('gallery'), Divider(), header, box
]);
}


// 3-5) Me 페이지(임시 빈 화면)
function renderMe() {
  return el('div', {}, [ NavBar('me'), Divider(), el('main', {}, []) ]);
}

// ====== 4) 라우터: 주소에 따라 페이지 교체 ======
function router() {                                  // 언제: hash(#/...)가 바뀔 때 화면을 갈아끼우기
  const app = document.getElementById('app');        // 우리가 화면을 붙일 자리
  app.innerHTML = '';                                // 기존 내용 제거

  const path = location.hash.replace('#/', '') || 'main'; // 기본 경로는 main
  let page;
  switch (path) {
    case 'main':    page = renderMain();    break;
    case 'project': page = renderProject(); break;
    case 'profile': page = renderProfile(); break;
    case 'gallery': page = renderGallery(); break;
    case 'counter':  page = renderCounter(); break;
    case 'me':      page = renderMe();      break;
    default:        page = renderMain();
  }
  app.appendChild(page);                             // 새 페이지 DOM을 화면에 부착
}

// 초기 실행 + 주소 변경 감지
window.addEventListener('hashchange', router);       // 주소(#)가 바뀌면 라우터 실행
window.addEventListener('DOMContentLoaded', router); // 처음 로드될 때 한 번 실행
