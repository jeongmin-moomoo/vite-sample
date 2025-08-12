import { defineConfig } from 'vite'
export default defineConfig({
  base: '/',              // ← 일단 루트로 단순화
  build: { outDir: 'dist' }
})


function renderMain() {
  const base = import.meta.env.BASE_URL;

  const left = el('div', { class: 'left' }, [
    el('img', { src: `${base}pic/profile.png`, alt: '내 프로필', class: 'profile-photo' })
  ]);

  const tools = el('div', { class: 'tools' }, [
    el('img', { src: `${base}pic/figma.png`, alt: '사용가능툴', class: 'tool-image' }),
    el('img', { src: `${base}pic/github.png`, alt: '사용가능툴', class: 'tool-image' }),
  ]);

  return el('main', { class: 'container' }, [
    left,
    tools
  ]);
}
