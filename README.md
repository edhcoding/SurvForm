# SurvForm - 설문 조사 플랫폼

온라인 설문지 생성, 수정, 공유가 가능하고 실시간으로 수집된 데이터를 차트와 데이터를 통해 확인 가능한 플랫폼입니다.

## 주요 기능

- 📝 **설문 폼 생성 및 수정, 공유**
- 📊 **실시간 응답 수집 및 통계**
- 📈 **데이터 시각화 (차트)**
- 🔄 **실시간 데이터 동기화**
- 🔐 **사용자 인증 시스템**

## 🛠 기술 스택

### Frontend

- React
- React Router
- TypeScript
- Tailwind CSS
- MobX (상태 관리)
- Recharts (차트)
- React Hook Form (폼 관리)
- [1차] Webpack -> [2차] Vite 마이그레이션

### Backend

- [1차] Express.js 기반 Restful API -> [2차] Firebase 마이그레이션

### Deployment
- Vercel

## 📁 프로젝트 구조

```
src/
├── components/ # 재사용 가능한 컴포넌트
├── hooks/  # 커스텀 훅
├── pages/  # 페이지 컴포넌트
├── models/ # MobX 스토어 및 데이터 모델
├── types/  # TypeScript 타입 정의
└── utils/  # 유틸리티 함수
```

## 기술 선택 배경

### MobX 선택 이유 (Vanilla JS 능력 향상)
- Class 기반의 객체지향적 설계
- 간단하고 직관적인 상태 관리 방식
- observable로 선언된 상태 변화를 자동으로 감지하여 리렌더링
- 작은 규모의 프로젝트에 적합한 러닝커브

### Webpack에서 Vite로 마이그레이션 [[🔗](https://edongdong.tistory.com/388)]
이전 협업 프로젝트에서 Webpack 사용 시 경험했던 성능 이슈 해결을 위해 Vite 도입 및 경험
- 개발 서버 구동 시간 개선 (12초 → 110ms, 약 99% 성능 향상)
- 빌드 시간 단축 (10초 → 3.5초, 약 65% 성능 향상)
- ES modules을 활용한 더 효율적인 개발 환경
- 간단한 설정과 빠른 HMR(Hot Module Replacement)

### Express.js에서 Firebase로 마이그레이션 [[🔗](https://edongdong.tistory.com/391)]

#### [1차] 백엔드 학습 목적 Express.js를 선택
- JavaScript 기반으로 진입 장벽이 낮은 Express.js 선택
- RESTful API 설계와 구현 경험
- 백엔드 서버 아키텍처에 대한 이해도 향상

#### Express.js 한계점
- 프론트엔드 개발에 집중이 어려움
- 파일 시스템 기반 데이터 저장 (추가적인 DB 학습 비용 부담)
- 실시간 데이터 동기화 어려움 (WebSocket 추가 구현 필요)
- 서버 구축 및 유지보수 부담

#### Firebase 마이그레이션
- 인증, 실시간 데이터 동기화
- 서버리스 아키텍처의 장점 활용
- 백엔드 관리 부담 감소

## 주요 학습 성과
1. Compound Component Pattern 도입해 재사용 가능한 컴포넌트 구현
2. MobX를 활용한 복잡한 상태 관리 패턴 구현
3. React Hook Form을 활용한 효율적인 폼 상태 관리
4. Vite 마이그레이션을 통한 빌드 도구 최적화 경험
5. Express.js를 통한 RESTful API 설계 및 구현
6. Firebase 서버리스 아키텍처 전환으로 실시간 데이터 처리 구현
