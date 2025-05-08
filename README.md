<a href="https://thejulge1.netlify.app/signin/" target="_blank">
<img src="https://github.com/user-attachments/assets/9d3a07d3-32c0-43a8-aeba-622a1c560e55" alt="배너" width="100%"/>
</a>

<br/>
<br/>

# 0. Getting Started (시작하기)
```bash
$ npm install
$ npm run dev
```
[배포된 서비스 링크](https://thejulge1.netlify.app/)

<br/>
<br/>

# 1. Project Overview (프로젝트 개요)

### 프로젝트 이름: **TheJulge | 더줄게**
- 프로젝트 한줄요약: 알바생과 사장님을 연결해주는 **일자리 매칭 플랫폼**
- 서비스 소개
  - **사장님**은 가게 정보와 구인 공고를 등록
  - **알바생**은 원하는 조건에 맞는 공고를 검색해 쉽게 지원
  - 공고에 제시된 시급이 기본시급보다 얼마나 높은지 표시되어, 알바생은 **더 나은 조건의 일자리 합리적으로 선택 가능**
  - 매칭 결과는 알림으로 빠르게 받아볼 수 있어, **구직과 채용 과정 모두 간편하게 진행**


<br/>
<br/>

# 2. Technology Stack (기술 스택)
## 2.1 프론트엔드
<div align=center> 
  <img src="https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=HTML5&logoColor=white">
  <img src="https://img.shields.io/badge/CSS-663399?style=for-the-badge&logo=CSS&logoColor=white">
  <img src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=TypeScript&logoColor=white">
<br/>
  <img src="https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=React&logoColor=white">
  <img src="https://img.shields.io/badge/ReactRouter-CA4245?style=for-the-badge&logo=ReactRouter&logoColor=white">
  <img src="https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=Vite&logoColor=white">
  <img src="https://img.shields.io/badge/TailwindCSS-06B6D4?style=for-the-badge&logo=TailwindCSS&logoColor=white">
</div>

<br/>

## 2.2 API 및 상태 관리
<div align=center> 
  <img src="https://img.shields.io/badge/Axios-5A29E4?style=for-the-badge&logo=Axios&logoColor=white">
  <img src="https://img.shields.io/badge/Zustand-F3DF49?style=for-the-badge&logo=Zustand&logoColor=white">
</div>

<br/>

## 2.3 협업
<div align=center> 
  <img src="https://img.shields.io/badge/Git-F05032?style=for-the-badge&logo=Git&logoColor=white">
  <img src="https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=GitHub&logoColor=white">
  <img src="https://img.shields.io/badge/GitHubActions-2088FF?style=for-the-badge&logo=GitHubActions&logoColor=white">
  <img src="https://img.shields.io/badge/Notion-000000?style=for-the-badge&logo=Notion&logoColor=white">
  <img src="https://img.shields.io/badge/Discord-5865F2?style=for-the-badge&logo=Discord&logoColor=white">
</div>

<br/>

# 3. Project Structure (프로젝트 구조)
```plaintext
project/
├── .github/                     # 이슈·PR 템플릿·워크플로
│   ├── ISSUE_TEMPLATE/
│   ├── scripts/
│   └── workflows/
├── .husky/                      # Git 훅 스크립트
├── public/                      # 정적 리소스 루트
│   ├── _redirects               # Netlify 리다이렉트 규칙
│   ├── default-image.png        # 가게 기본 이미지
│   └── tjg_favicon.png          # 파비콘
├── scripts/                     # 배포·빌드 자동화 스크립트
├── src/                         # 애플리케이션 소스
│   ├── apis/                    # API 래퍼
│   ├── assets/                  # 이미지·폰트 등
│   ├── components/              # 재사용 UI 컴포넌트
│   ├── constants/               # 상수 정의
│   ├── hooks/                   # 커스텀 훅
│   ├── layouts/                 # 공통 레이아웃
│   ├── pages/                   # 페이지 컴포넌트
│   ├── store/                   # Zustand 등 전역 상태
│   ├── styles/                  # 전역·공통 스타일
│   ├── types/                   # TypeScript 타입
│   ├── utils/                   # 유틸리티 함수
│   ├── App.tsx                  # 루트 컴포넌트
│   ├── main.tsx                 # 엔트리 포인트
│   └── Router.tsx               # 라우터 설정
├── package.json                 # 의존성·스크립트 정의
├── .gitignore                   # Git 무시 목록
├── .prettierrc                  # Prettier 코드 스타일
├── eslint.config.js             # ESLint 설정
├── index.html                   # SPA 루트 HTML
├── netlify.toml                 # Netlify 배포 설정
├── tailwind.config.js           # TailwindCSS 설정
├── tsconfig.json                # TypeScript 기본 설정
├── vite.config.ts               # Vite 번들러 설정
└── README.md                    # 프로젝트 개요
```

<br/>
<br/>

# 4. Pages and Key Features (페이지 및 주요 기능)

### 1. 회원가입
  - 회원가입 시 DB에 유저정보가 등록됩니다.
  - 사장님 또는 알바생 계정을 선택해 회원가입을 진행합니다.
    
![image](https://github.com/user-attachments/assets/870cb3ea-6386-4677-b75f-8f3e276b7a83)

### 2. 로그인
  - 사용자 인증 정보를 통해 로그인합니다.
    
![image](https://github.com/user-attachments/assets/b7a5d6c6-48b4-48e0-8a14-90f17a2e3485)

### 3. 공고 리스트
  - 작성된 공고 리스트를 띄웁니다.
  - 프로필이 등록된 알바생 계정으로 로그인하면 맞춤 공고가 지역 기준으로 뜹니다.
  - 마감임박순, 시급많은순, 시간적은순, 가나다순 정렬이 가능합니다.
  - 지역, 시급, 일자의 상세필터를 사용할 수 있습니다.
  - 페이지네이션을 이용해 공고 리스트를 넘길 수 있습니다.
    
![thejulge1 netlify app_ (2)](https://github.com/user-attachments/assets/6051203d-4382-42fa-ab61-d4ae4ca670cc)


### 4. 공고 검색
  - 헤더 검색창에 검색어를 입력하면 해당 검색어를 포함한 공고가 보입니다.
  - 마감임박순, 시급많은순, 시간적은순, 가나다순 정렬이 가능합니다.
  - 지역, 시급, 일자의 상세필터를 사용할 수 있습니다.
  - 페이지네이션을 이용해 공고 리스트를 넘길 수 있습니다.

![thejulge1 netlify app_ (3)](https://github.com/user-attachments/assets/cb081924-afd2-4833-a7de-883010b9ea10)

### 5. 가게 정보 등록 및 편집
  - 사장님 계정으로 로그인하면 내 가게 정보를 등록 및 편집할 수 있습니다.
  - 필수 영역이 알맞게 채워졌다면 가게 정보가 등록 및 편집됩니다.

![thejulge1 netlify app_shop (1)](https://github.com/user-attachments/assets/61627579-a0e7-4bc7-a5f0-ef1bed49f323)


### 6. 내 가게
  - 내 가게가 등록되어 있지 않다면 등록하기 버튼을 통해 가게 정보 등록 페이지로 이동할 수 있습니다.
  - 내 가게의 정보와 공고 리스트를 볼 수 있습니다.
  - 가게 정보를 편집하거나 공고를 등록하는 페이지로 버튼을 통해 이동할 수 있습니다.
  - 공고 리스트는 무한스크롤됩니다.

![thejulge1 netlify app_shop](https://github.com/user-attachments/assets/24702979-81fd-40ff-b060-c6f33039437f)

### 7. 공고 등록 및 편집
  - 내 가게의 공고를 등록 및 편집할 수 있습니다.
  - 필수 영역이 알맞게 채워졌다면 공고가 등록 및 편집됩니다.

![thejulge1 netlify app_shop (3)](https://github.com/user-attachments/assets/229e4d45-5afe-4d71-a586-48a70a1262a6)

### 8. 공고 상세 - 사장님
  - 등록한 공고의 정보와 지원자를 확인할 수 있습니다.
  - 지원자의 거절/승인 상태를 결정할 수 있습니다.
  - 공고 편집 페이지로 버튼을 통해 이동할 수 있으나, 내 가게가 아니거나 지난 공고이거나 지원자가 있다면 버튼이 비활성화됩니다.

![thejulge1 netlify app_shop (2)](https://github.com/user-attachments/assets/79659672-0d7f-4923-abb0-2c995afcce4c)

### 9. 프로필 등록 및 편집
  - 알바생 계정으로 로그인하면 내 프로필을 등록 및 편집할 수 있습니다.
  - 필수 영역이 알맞게 채워졌다면 프로필이 등록 및 편집됩니다.

![thejulge1 netlify app_shop (5)](https://github.com/user-attachments/assets/35e026ce-5114-4277-9e77-3584c1833bdf)

### 10. 내 프로필
  - 내 프로필이 등록되어 있지 않다면 등록하기 버튼을 통해 프로필 등록 페이지로 이동할 수 있습니다.
  - 내 프로필 정보와 지원 리스트를 확인할 수 있습니다.
  - 프로필 편집 페이지로 버튼을 통해 이동할 수 있습니다.
  - 지원 리스트는 페이지네이션으로 넘길 수 있습니다.

![thejulge1 netlify app_shop (4)](https://github.com/user-attachments/assets/17c2bd80-a279-4d6b-b922-a2b256c0c017)

### 11. 공고 상세 - 알바생
  - 지원하기 버튼을 통해 공고에 지원할 수 있습니다.
  - 지원을 한 공고에 대해서는 취소하기 버튼을 통해 지원 취소가 가능합니다.
  - 최근에 본 공고가 최대 6개 띄워집니다.

![thejulge1 netlify app_shop (6)](https://github.com/user-attachments/assets/74ab4bb6-b490-4b01-b025-e62cc09baeb4)

<br/>
<br/>

# 5. Team Members (팀원 및 팀 소개)
| 오수빈 | 지정환 | 진성진 | 홍수민 |
|:------:|:------:|:------:|:------:|
| TL, FE | FE | FE | FE |
| [GitHub](https://github.com/almighty55555) | [GitHub](https://github.com/jeonghwanJay) | [GitHub](https://github.com/cozy-ito) | [GitHub](https://github.com/ghdtnals) |

<br/>
<br/>

# 6. Tasks & Responsibilities (작업 및 역할 분담)
| 이름 | 작업 |
|:------:|--------|
| 오수빈   | <ul><li>디자인 Assets 다운로드</li><li>GitHub 레포지토리 설정</li><li>배포 (Netlify)</li><li>README.md 작성</li><li>공통 로직 (API 요청 로직)</li><li>공통 컴포넌트 (Button, Select)</li><li>페이지 작업 (가게 정보 등록/수정, 공고 등록/수정, 프로필 등록/수정, 404 페이지)</li></ul>     |
| 지정환   | <ul><li>페이지 레이아웃 (헤더, 푸터 포함)</li><li>공통 컴포넌트 (Modal, Dropdown, Alert)</li><li>페이지 작업 (메인 공고 목록, 공고 검색)</li></ul>     |
| 진성진   | <ul><li>프로젝트 초기 설정(패키지 설치, 정적 검사 설정 등)</li><li>페이지 라우팅 설정</li><li>디스코드 커스텀 메시지 웹훅 연동</li><li>공통 컴포넌트 (Table, Pagination, TextField)</li><li>페이지 작업 (내 프로필, 공고 상세 사장님/알바생)</li></ul>     |
| 홍수민   | <ul><li>글로벌 스타일 초기화</li><li>폰트 및 컬러 시스템 설정</li><li>공통 로직 (날짜 커스텀 로직)</li><li>공통 컴포넌트 (Post, PostList, PostCard, Toast)</li><li>페이지 작업 (로그인, 회원가입, 내 가게)</li></ul>     |

<br/>
<br/>

# 7. Development Workflow (개발 워크플로우)
## 브랜치 전략 (Branch Strategy)
우리의 브랜치 전략은 Git Flow를 기반으로 하며, 다음과 같은 브랜치를 사용합니다.

- Dev Branch
  - 배포 가능한 상태의 코드를 유지합니다.
  - 모든 배포는 이 브랜치에서 이루어집니다.
  
- {domain}-{issueNum}-{name} Branch
  - Ex. `SHOP-1-OH`
  - GitHub 이슈당 하나의 브랜치를 생성합니다.
  - 모든 기능 개발은 이 브랜치에서 이루어집니다.
  - Domain
    - 세부 태스크 관련 도메인
      - BASIC - 프로젝트 구현 전 해야할 활동 들
      - LAYOUT - 레이아웃
      - LOGIC - 공통 로직
      - COMPONENT - 공통 컴포넌트
      - DOCS - 문서 관련
  - 페이지 구현 도메인
      - AUTH - 로그인 / 회원가입
      - SHOP - 내 가게 / 가게 정보 등록 / 가게 정보 편집
      - NOTICE - 공고 등록 / 공고 편집 / 공고 리스트 / 공고 검색 / 공고 상세 - 사장님 / 공고 상세 - 알바생
      - PROFILE - 내 프로필 (미등록 상태/등록 상태) / 내 프로필 등록 / 내 프로필 편집
  - 버그 픽스 관련
      - FIX + 페이지 구현 도메인
      - Ex. `FIX-SHOP-2-OH`
   
## GitHub Label
이슈, PR의 항목이 많아졌을 때, 필요한 내용만 필터링할 수 있게 하기 위해 라벨 사용
- 라벨 리스트
  
![image](https://github.com/user-attachments/assets/ea25704f-8f54-464f-93ad-9c2b13cd06bb)

## GitHub Wiki
공통 컴포넌트에 대한 사용법 기재

![image](https://github.com/user-attachments/assets/43a85cc5-de22-4fb3-b772-4b76ad33cbeb)

- 팀원이 쉽게 접근하고, 수정하기 용이
- 팀원 간의 컴포넌트 사용 방식 통일
- 처음 본 컴포넌트도 빠르게 이해 가능

## PR Rule
- 콘솔
    - PR 생성 전 `console.log`을 모두 삭제하기
- 주석
    - 다른 팀원이 꼭 알아야 하는 주석을 제외하고 제거하기
- 컨플릭트 해결하기

## PR 프로세스

1. 구현 전에 이슈를 생성합니다.
2. 작업 전 dev 브랜치에서 새로운 브랜치를 파생, 생성합니다.
3. 이슈에 대한 작업을 합니다.
4. PR 생성 전 dev 브랜치에서 가져올 코드가 있는 지 확인합니다.
5. 있다면, 가져와서 충돌 발생 시 해결 후 PR을 생성합니다. (git push)
6. PR 템플릿을 이용해서 PR 내용을 작성합니다.
7. 코드 리뷰를 받고 요청 받는 내용을 해결한 뒤 다시 push 합니다.
    - PR을 하기위한 승인 개수
        - 2개
    - 코드리뷰 담당자
        - [수빈님, 정환님, 성진님, 수민님]
            - 수빈님: [정환님, 성진님]
            - 정환님: [성진님, 수민님]
            - 성진님: [수민님, 수빈님]
            - 수민님: [수빈님, 정환님]
        - 주말에도 코드 리뷰
    - 중요도가 낮은 건, PR 등록 당일에 코드 리뷰 진행
    - 중요도가 높은 것은 팀 회의 시간에 얘기를 해서 특정 시간 내에 리뷰 후 병합 완료
    - 리뷰 반영 후 병합 관련
        - 리뷰 후 수정 사항 반영을 완료하면, 디스코드 메시지로 리뷰를 다시 한번 요청하기
8. 모든 comment가 해결 된 경우, Approve (승인) 합니다.
9. 최종적으로 PR 병합하기 전, dev 브랜치로부터 코드를 한번 가져와 봅니다.
10. dev 브랜치로 PR 병합을 합니다. (이슈 Close)
    - PR 병합 방식
        - merge commit

<br/>
<br/>

# 8. Coding Convention
## 네이밍 컨벤션

1. 변수 & 함수: camelCase 사용

```jsx
let userName = "Jay";
const getUserProfile = () => {};
```

2. 상수(Constant): UPPER_SNAKE_CASE

```jsx
const API_BASE_URL = "https://api.example.com";
```

3. 클래스/컴포넌트: PascalCase

```jsx
class UserProfile {}
function UserCard() {}
```

4. 파일명
    - 컴포넌트 및 스타일 파일명은 PascalCase
    - 그 외는 camelCase
      
5. 비동기 요청 로직 함수명
    - HTTP 메서드 접두사 사용
    - ex) `getPost`, `postPost`, `deletePost`
      
6. 이벤트 핸들러 함수명
    - 이벤트 핸들러 함수 - `handle` 접두사 사용
        - ex) `handleClick`, `handleChange-`
    - props로 전달되는 이벤트 핸들러 이름은 `on{이벤트 유형}{동작명}`
        - ex) `onClick`, `onChange-`

## 코드 컨벤션

### ESLint

- **함수 정의**
    - 화살표 함수: `() => { ... }`
- **함수형 컴포넌트 정의**
    - function 키워드 사용 함수: `function () { ... }`
- 컴포넌트 코드 아래로 컴포넌트 외의 다른 코드를 배치하지 않기

```tsx
import '' from '...';

const data = { name: "이름" }; // ✅ 컴포넌트 위에 위치시키기 

function ExampleComponent () { 
	return (
		<div>{data.name}</div>
	);
}

const data = { name: "이름" }; // ❌ 컴포넌트 아래에 베치하지 않기
```

### Prettier

- 행 바꿈 브라켓 적용
    
    ```jsx
    <input
    	type="text"
    	name="email"
    /> // 브라켓 내리기
    ```
    
- JSX 태그 속성, 문자열 따옴표
    - 쌍따옴표
- 들여쓰기
    - 2칸
- 객체 마지막 속성 콤마
    
    ```jsx
    const obj = {
    	foo: "bar",
    	baz: "baz",
    };
    ```
    

### 그 외

- 약어
    - 이벤트 파라미터명
        - **`e`**
    - previous State
        - **`setCount((prev) => { ... })`**
- props는 반드시 구조분해할당을 사용

<br/>
<br/>

# 9. 커밋 컨벤션
## 기본 구조
```
type : subject
```

<br/>

## type 종류
```
feat : 새로운 기능 추가
fix : 버그 수정
docs : 문서 수정
style : 코드 포맷팅, 세미콜론 누락, 코드 변경이 없는 경우
refactor : 코드 리펙토링
test : 테스트 코드, 리펙토링 테스트 코드 추가
chore : 빌드 업무 수정, 패키지 매니저 수정
rename : 파일명/폴드명 수정정
```

<br/>

# 10. PR 템플릿
## 기본 구조
```
[type] title
```
- type은 커밋 타입과 동일합니다.

## PR 템플릿
```
## #️⃣연관된 이슈

> ex) #이슈번호, #이슈번호

## 📝 PR 유형

> 해당하는 유형에 'x'로 체크해주세요.

- [ ] 기능 추가 (Feature)
- [ ] 버그 수정 (Bug Fix)
- [ ] 코드 개선 (Refactoring)
- [ ] 스타일 변경 (UI/UX)
- [ ] 문서 작업 (Documentation)
- [ ] 환경 설정 (Configuration)
- [ ] 기타 (Other)

## 📝작업 내용

> 이번 PR에서 작업한 내용을 간략히 설명해주세요(이미지 첨부 가능)

### 스크린샷 (선택)

## 💬리뷰 요구사항(선택)

> 리뷰어가 특별히 봐주었으면 하는 부분이 있다면 작성해주세요
>
> ex) 메서드 XXX의 이름을 더 잘 짓고 싶은데 혹시 좋은 명칭이 있을까요?
```

## 이슈 템플릿
```
## 📝 이슈 유형

> 해당하는 유형에 'x'로 체크해주세요.

- [ ] API 연동 (feat)
- [ ] 컴포넌트 개발 (feat)
- [ ] Hook 개발 (feat)
- [ ] 페이지 구현 (feat)
- [ ] 문서 작업 (doc)
- [ ] 환경 설정 (chore)
- [ ] 버그 픽스 (fix)
- [ ] 기타 (etc.)

## 어떤 기능인가요?

> 추가하려는 기능에 대해 간결하게 설명해주세요

## 작업 상세 내용

- [ ] TODO
- [ ] TODO
- [ ] TODO

## 참고할만한 자료(선택)
```

<br/>
<br/>
