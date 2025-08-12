function renderMain() {
  // ✅ 배포 시 경로 깨짐 방지를 위해 base 경로 변수 설정
  const base = import.meta.env.BASE_URL;

  // 왼쪽: 프로필 사진
  const left = el('div', { class: 'left' }, [
    el('img', {
      src: `${base}pic/profile.png`,   // ← base + pic/파일명
      alt: '내 프로필',
      class: 'profile-photo'
    })
  ]);

  // 오른쪽: 프로필 정보 및 설명
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

  // 툴 로고 영역
  const tools = el('div', { class: 'tools' }, [
    el('img', { src: `${base}pic/figma.png`, alt: '사용가능툴', class: 'tool-image' }),
    el('img', { src: `${base}pic/github.png`, alt: '사용가능툴', class: 'tool-image' }),
  ]);

  // 메인 페이지 전체 조립
  return el('div', { class: 'main-page' }, [
    NavBar('main'),      // 네비게이션 바
    Divider(),           // 구분선
    el('main', { class: 'container' }, [
      profileBox,
      Divider(),
      el('h3', { class: 'tools-title' }, 'tools'),
      tools
    ])
  ]);
}
