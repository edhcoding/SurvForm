# 📊 SurvForm - 설문 조사 제작 및 응답 수집 플랫폼

실시간으로 설문을 생성하고 응답을 수집할 수 있는 웹 기반 설문조사 플랫폼입니다.

## 🌟 주요 기능

- 📝 **동적 설문 폼 생성 및 수정**
- 📊 **실시간 응답 수집 및 통계**
- 📈 **데이터 시각화 (차트)**
- 🔄 **실시간 데이터 동기화**
- 🎨 **반응형 디자인**


## 🛠 기술 스택

### Frontend

- React
- React Router
- TypeScript
- Tailwind CSS
- MobX (상태관리)
- [1차] Webpack -> [2차] Vite 마이그레이션

### Backend

- [1차] Express.js 기반 Restful API -> [2차] Firebase 마이그레이션

### Deployment
- Vercel

## 📈프로젝트 발전 과정

#### 1차 개발 (Express.js)
- RESTful API 설계 및 구현
- 파일 시스템 기반 데이터 저장
- API 라우팅 및 미들웨어 구현
- 기본적인 CRUD 작업 구현

#### 2차 개발 (Firebase 마이그레이션)
- 서버리스 아키텍처 도입
- Firestore를 활용한 실시간 데이터베이스 구현
- 클라우드 기반 안정적인 데이터 저장소 구축
- 실시간 데이터 동기화 기능 추가

## 🎯 기술적 도전 및 해결 과정

#### 1. 서버 아키텍처 전환
도전: 로컬 파일 시스템 기반 데이터 저장의 한계
해결: Firebase로의 마이그레이션을 통한 확장성 확보
학습: 다양한 백엔드 아키텍처의 장단점 이해

#### 2. 실시간 데이터 처리
도전: 설문 응답의 실시간 반영 필요성
해결: Firebase Realtime Database 활용
결과: 즉각적인 데이터 동기화 구현

## 주요 구현 사항
```
// 설문 생성
const createSurvey = async (data: SurveyData) => {
  const response = await surveyService.createSurvey(data);
  return response.id;
};

// 응답 수집
const submitResponse = async (surveyId: string, response: SurveyResponse) => {
  await surveyService.addResponse(surveyId, response);
};

// 통계 데이터 처리
const getStatistics = (responses: SurveyResponse[]) => {
  // 데이터 분석 및 시각화 로직
};
```

## 📁 프로젝트 구조

```
src/
├── components/
│   ├── common/
│   ├── form/
│   └── statistics/
├── pages/
├── store/
├── utils/
└── types/
```

📝 회고 및 배운 점
이 프로젝트를 통해 전통적인 서버 개발(Express.js)에서 현대적인 서버리스 아키텍처(Firebase)로의 전환을 경험했습니다. 이 과정에서:
다양한 백엔드 아키텍처의 장단점 이해
실제 서비스 배포 시 고려해야 할 사항들 학습
확장 가능한 아키텍처 설계의 중요성 체득


🔜 향후 계획
[ ] 사용자 인증 시스템 도입
[ ] 설문 템플릿 기능
[ ] 고급 통계 분석 기능
[ ] 설문 공유 기능

🔗 링크
배포된 서비스
기술 블로그 포스팅

















## 🎯 주요 특징

### 실시간 인터랙션

- Supabase Realtime을 활용한 실시간 데이터 동기화
- 내부 animationQueue를 활용한 자연스러운 조건부 애니메이션 구현
- WebRTC 기반 QR 코드 스캔
- 원격 조작을 통한 트리 제어기능 구현

### 보안

- Row Level Security (RLS) 적용
- 욕설 필터링 (Aho-Corasick 알고리즘 사용)
- router 레벨의 session 검증

### 사용자 경험 (UX)

- 직관적이고 부드러운 애니메이션
- 로딩/에러 상태 처리
- 토스트 메시지를 통한 사용자 피드백
- CSS transform을 활용한 성능 최적화

### 개발자 도구 및 단축키

- QR 코드 생성 및 다운로드
- 공유 링크 복사
- 더미 UI 삽입 기능
- 전체화면, 별, 눈, 카운트 등의 UI 조작 기능 단축키 지원

### 효율적인 기술 선택
- Tanstack-query, Nextjs 등을 고려했으나, 실시간 인터렉션 지원을 위해 React + jotai로 가볍게 진행
- api는 네임스페이스 분리를 위해 class로 감싸 활용
- chakraUI v3를 활용하여 필요한 컴포넌트를 받아 사용


## 🪄 애니메이션 로직

![Christmas Tree 로직](https://github.com/user-attachments/assets/27c8423f-6c77-4618-ac84-60fde2630416)

## 📁 프로젝트 구조

```
src/
├── api/ # API 통신 로직
├── components/ # 재사용 가능한 컴포넌트
├── hooks/ # 커스텀 훅
├── pages/ # 페이지 컴포넌트
├── store/ # 전역 상태 관리
├── theme/ # UI 테마 설정
├── types/ # TypeScript 타입 정의
└── utils/ # 유틸리티 함수
```

## 🚀 시작하기

### 설치

```bash
yarn install
```

### 개발 서버 실행

```bash
yarn dev
```

### 빌드

```bash
yarn build
```

### 타입 생성

```bash
yarn typegen:db # supabase-cli
yarn typegen:theme # chakra-cli
```

### 배포

```bash
yarn deploy
```

## 🔑 환경 변수 설정

`.env` 파일을 생성하고 다음 변수들을 설정해주세요:

```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_KEY=your_supabase_anon_key
```

## 📱 사용 방법

1. 대형 스크린 등에 트리 화면을 띄웁니다 (`/tree/:treeId`)
2. 내부 메뉴에서 QR생성 / url 복사를 하여 링크를 참가자들에게 공유합니다
3. 참여자는 QR코드를 스캔하여 접속합니다 (`/send/:treeId`)
4. 원하는 장식을 선택하여 트리에 추가합니다
5. 필요시, `내 트리 관리` > `트리 원격 조작` 에서 원격 옵션 조작이 가능합니다 (`/remote/:treeID`)

## 👨‍💻 개발자

- **Kyungbae Min** - [GitHub](https://github.com/minr2kb)
- Email: kbmin1129@gmail.com

## 🔗 링크

- 배포 주소: [https://christmas-tree-decor.web.app/](https://christmas-tree-decor.web.app/)
- 이슈 트래커: [GitHub Issues](https://github.com/minr2kb/christmas-tree-decor/issues)

## TO-DO

- 거리계산으로 서로 최대한 겹치지 않게 배치