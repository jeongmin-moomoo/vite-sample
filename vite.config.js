function renderMain() {
  // ✅ 항상 마지막에 /가 있도록 보장
  const base = import.meta.env.BASE_URL.endsWith('/')
    ? import.meta.env.BASE_URL
    : import.meta.env.BASE_URL + '/';

  // 왼쪽: 프로필 사진
  const left = el('div', { class: 'left' }, [
    el('img', {
      src: `${base}pic/profile.png`,   // ← 이제 이중 슬래시 안 생김
      alt: '내 프로필',
      class: 'profile-photo'           // ← CSS 클래스명 실제와 일치시켜야 함
    })
  ]);

  // 오른쪽: 링크/소개
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

  // 하단 tools
  const tools = el('div', { class: 'tools' }, [
    el('img', { src: `${base}pic/figma.png`,  alt: '사용가능툴', class: 'tool-image' }),
    el('img', { src: `${base}pic/github.png`, alt: '사용가능툴', class: 'tool-image' }),
  ]);

  // 페이지 전체
  return el('div', { class: 'main-page' }, [
    NavBar('main'),
    Divider(),
    el('main', { class: 'container' }, [
      profileBox,
      Divider(),
      el('h3', { class: 'tools-title' }, 'tools'),
      tools
    ])
  ]);
}

// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: '/vite-sample/', // GitHub Pages 배포 시
  plugins: [react()],
  build: { outDir: 'dist' },
});
