# Contributing to The Ticker is ETH

The Ticker is ETH에 기여해주셔서 감사합니다!
이 문서는 프로젝트에 기여하기 위한 가이드를 제공합니다.

## 개발 환경 세팅

### 요구 사항

- Node.js 22+
- npm 10+

### 설치 및 실행

```bash
git clone https://github.com/sumsun-dev/The-Ticker-is-ETH.git
cd The-Ticker-is-ETH
npm install
npm run dev
```

> Telegram 데이터 수집(`fetch:telegram`)은 별도의 API 크레덴셜이 필요합니다.
> 프론트엔드 개발만 하는 경우 이미 커밋된 JSON 데이터로 충분합니다.

### 주요 스크립트

| 명령어 | 설명 |
|--------|------|
| `npm run dev` | 개발 서버 (Vite) |
| `npm run build` | TypeScript 체크 + 프로덕션 빌드 |
| `npm run lint` | ESLint 검사 |
| `npm run preview` | 빌드 결과 로컬 미리보기 |

## 기여 프로세스

### 1. Issue 확인

- 작업 전에 관련 Issue가 있는지 확인하세요.
- 없다면 새 Issue를 먼저 생성하여 논의해주세요.
- `good first issue` 라벨이 붙은 이슈는 처음 기여하기 좋은 작업입니다.

### 2. 브랜치 생성

```bash
git checkout -b feature/기능-이름    # 새 기능
git checkout -b fix/버그-설명        # 버그 수정
```

### 3. 개발

- 코드 스타일은 아래 **코드 컨벤션** 섹션을 참고하세요.
- 작업 후 반드시 아래 검증을 통과하는지 확인하세요:

```bash
npm run build   # TypeScript + 빌드 통과
npm run lint    # ESLint 에러 0개
```

### 4. 커밋

[Conventional Commits](https://www.conventionalcommits.org/) 형식을 사용합니다.

```
feat(scope): 새 기능 추가
fix(scope): 버그 수정
refactor(scope): 코드 리팩토링
docs(scope): 문서 수정
test(scope): 테스트 추가/수정
chore(scope): 빌드, 설정 등 기타 변경
```

예시:
```
feat(research): add article search functionality
fix(i18n): correct Korean translation for events page
docs(readme): update development setup instructions
```

### 5. Pull Request

- `main` 브랜치를 대상으로 PR을 생성하세요.
- PR 템플릿의 체크리스트를 작성해주세요.
- 리뷰어가 코멘트를 남기면 반영 후 다시 요청해주세요.

## 코드 컨벤션

### 네이밍

| 대상 | 규칙 | 예시 |
|------|------|------|
| 변수, 함수 | camelCase | `loadResearchContent` |
| 컴포넌트, 타입 | PascalCase | `ResearchDetail`, `TeamMember` |
| 상수 | SCREAMING_SNAKE_CASE | `LAUNCH_DATE` |
| 파일 | kebab-case | `data-loader.ts` |

### 코드 스타일

- 함수: 최대 50줄, 깊은 중첩(4단계+) 대신 early return 사용
- 파일: 최대 800줄, 초과 시 분리
- 상태 업데이트: spread operator 사용 (mutation 금지)
- `console.log`는 커밋 전에 제거

### 프로젝트 구조

```
src/
├── components/     # 재사용 가능한 UI 컴포넌트
├── pages/          # 라우트별 페이지 컴포넌트
├── data/           # JSON 데이터 및 데이터 로직
├── i18n/           # 다국어 번역 파일 (ko/, en/)
├── layouts/        # 레이아웃 컴포넌트
├── types/          # TypeScript 타입 정의
└── utils/          # 공유 유틸리티 함수
api/                # Vercel Serverless Functions
```

### 다국어(i18n)

UI 텍스트를 추가/수정할 때는 반드시 `src/i18n/ko/`와 `src/i18n/en/` 양쪽을 업데이트하세요.

## 기여 영역

현재 특히 기여가 필요한 영역:

- **리서치 콘텐츠**: 이더리움 생태계 관련 리서치 작성
- **번역**: i18n 번역 품질 개선
- **접근성(a11y)**: 스크린 리더, 키보드 내비게이션 개선
- **테스트**: 테스트 커버리지 확대
- **버그 수정**: Issues 탭의 bug 라벨 확인

## 질문이 있다면

- GitHub Issues에 질문을 남겨주세요.
- [Telegram 채널](https://t.me/thetickeriseth)에서도 논의할 수 있습니다.
