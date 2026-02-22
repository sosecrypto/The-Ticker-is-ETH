# The Ticker is ETH

한국 이더리움 커뮤니티 비영리 단체 웹사이트.

## Tech Stack

- **Framework**: React 19 + TypeScript + Vite
- **Styling**: Tailwind CSS 3 + Framer Motion
- **3D**: Three.js + React Three Fiber
- **Routing**: React Router DOM 7
- **Data**: Telegram API 기반 실데이터 매핑

## Features

- Hero 섹션 (멤버 아바타 애니메이션)
- Core Team / Contributors 프로필 (소셜 링크, 기여 히트맵)
- Research 블로그 (작성/열람, 패스프레이즈 인증, Telegram 카테고리)
- Events 페이지
- 이더리움 다이아몬드 커스텀 커서 + Trail 효과 (데스크탑)
- Telegram 채널 메시지 기반 기여도 분석
- Route 기반 Code-Splitting (React.lazy + Suspense)

## Project Structure

```
src/
├── components/
│   ├── cursor/          # 커스텀 커서 (ETH 다이아몬드 + trail)
│   ├── home/            # Hero, KoreanFlagFlow, MemberAvatarFlow
│   └── team/            # MemberCard, ContributionGraph
├── data/                # mockData, researchData, telegram JSON
├── layouts/             # MainLayout
├── pages/               # Home, About, Team, Contributors, Research, Events
└── types/               # TypeScript 타입 정의
```

## Getting Started

```bash
npm install
npm run dev
```

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | 개발 서버 실행 |
| `npm run build` | 프로덕션 빌드 |
| `npm run preview` | 빌드 결과 미리보기 |
| `npm run lint` | ESLint 실행 |
| `npm run fetch:telegram` | Telegram 채널 데이터 수집 |

## Deployment

Vercel을 통한 자동 배포 (main 브랜치 push 시).
