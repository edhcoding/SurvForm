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
