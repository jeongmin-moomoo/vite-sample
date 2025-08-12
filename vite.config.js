function renderMain() {
  const base = import.meta.env.BASE_URL || '/';                 // ✅ 배포 경로 대응: / 또는 /vite-sample/  // 언제: 이미지 경로 앞에 항상 붙여서 배포 시 안 깨지게

  // 왼쪽: 프로필 사진
  const left = el('div', { class: 'left' }, [                   // 왼쪽 영역 래퍼  // 언제: 프로필 사진을 왼쪽에 배치
    el('img', {
      src: `${base}pic/profile.png`,                            // ✅ public/pic/profile.png  // 언제: 정적 이미지(배포 포함)
      alt: '내 프로필',                                         // 이미지 대체 텍스트  // 언제: 접근성/이미지 로드 실패 대비
      class: 'porfile-photo'                                    // ✅ 네 CSS에 맞춘 클래스명(오타 유지)  // 언제: 기존 스타일과 정확히 매칭
    })
  ]);

  // 오른쪽: 링크/소개
  const right = el('div', { class: 'right' }, [                 // 오른쪽 영역 래퍼  // 언제: 링크/소개 배치
    el('div', { class: 'profile-item' }, [
      el('a', { href: 'https://www.instagram.com/moozi_dan_/', target: '_blank' }, 'Moozi_dan_') // 새 탭 열기
    ]),
    el('div', { class: 'profile-item' }, [
      el('a', { href: 'mailto:wjdals410518@gmail.com' }, 'wjdals410518@gmail.com')               // 메일 링크
    ]),
    el('div', { class: 'profile-item' }, [
      el('a', { href: 'tel:01083552031' }, '010-8355-2031')                                      // 전화 링크(모바일)
    ]),
    el('div', { class: 'profile-item' }, '안녕하세요 정민이에요')                                   // 소개 문구
  ]);

  // 프로필 카드(좌/우 묶음)
  const profileBox = el('div', { class: 'profile-box' }, [      // 사진+정보 한 덩어리  // 언제: 레이아웃 정렬
    el('div', { class: 'info' }, [left, right])                 // info 안에 left/right 배치
  ]);

  // 하단 tools(툴 로고)
  const tools = el('div', { class: 'tools' }, [                 // 툴 아이콘 컨테이너
    el('img', { src: `${base}pic/figma.png`,  alt: '사용가능툴', class: 'tool-image' }), // ✅ base 적용
    el('img', { src: `${base}pic/github.png`, alt: '사용가능툴', class: 'tool-image' }), // ✅ base 적용
  ]);

  // 메인 페이지 전체 조립
  return el('div', { class: 'main-page' }, [                    // ✅ 페이지 스코프: .main-page  // 언제: 메인 전용 CSS만 적용되도록
    NavBar('main'),                                             // 상단 네비(메인 활성)
    Divider(),                                                  // 구분선
    el('main', { class: 'container' }, [                        // 본문 컨테이너(가로폭/패딩)
      profileBox,                                               // 프로필 카드
      Divider(),                                                // 구분선
      el('h3', { class: 'tools-title' }, 'tools'),              // 섹션 제목
      tools                                                     // 툴 아이콘들
    ])
  ]);
}
