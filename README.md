# RMS 파일 업로드 일괄 처리 시스템

파일을 품목에 매핑하여 일괄 업로드하는 웹 애플리케이션입니다.

## 🚀 데모

GitHub Pages에서 라이브 데모를 확인할 수 있습니다:
**https://[your-username].github.io/[repository-name]/**

## ✨ 주요 기능

- **드래그 앤 드롭 파일 업로드**: 파일을 드래그하여 쉽게 업로드
- **파일-품목 매핑**: Ctrl/Shift 클릭으로 여러 파일 선택 후 품목 행에 드래그
- **테이블 정렬**: 각 열 헤더 클릭으로 오름차순/내림차순 정렬
- **다중 필드 지원**:
  - 상태, 일련번호, 품목코드, 품목명
  - 서류종류, 주의사항, 수출국, 담당자
  - Comment, 첨부 파일
- **주의사항 하이라이트**: 중요 사항은 빨간색 배지로 표시
- **반응형 UI**: Tailwind CSS 기반의 깔끔한 인터페이스

## 📁 파일 구조

```
rms_test/
├── index.html                  # 메인 페이지 (GitHub Pages 진입점)
├── prototype-optimized.html    # 원본 HTML 파일
├── prototype-optimized.js      # JavaScript 로직
├── temp_data/                  # 임시 데이터 (선택사항)
├── .gitignore                  # Git 제외 파일
└── README.md                   # 이 문서
```

## 🌐 GitHub Pages 배포 방법

### 1. GitHub 저장소 생성

1. GitHub에 로그인
2. 우측 상단의 `+` 버튼 클릭 → `New repository` 선택
3. 저장소 이름 입력 (예: `rms-file-upload`)
4. Public으로 설정
5. `Create repository` 클릭

### 2. 로컬 저장소와 연결

```bash
cd /Users/jongho.jung/Desktop/jongho_project/PoC/real_poc/rms_test

# 이미 git init이 되어 있으므로 생략
# git init (이미 완료됨)

# 원격 저장소 연결
git remote add origin https://github.com/[your-username]/[repository-name].git

# 현재 브랜치 이름 확인 (main 또는 master)
git branch -M main
```

### 3. 파일 커밋 및 푸시

```bash
# 파일 스테이징
git add .

# 커밋
git commit -m "Initial commit: RMS 파일 업로드 시스템"

# GitHub에 푸시
git push -u origin main
```

### 4. GitHub Pages 활성화

1. GitHub 저장소 페이지에서 `Settings` 탭 클릭
2. 왼쪽 메뉴에서 `Pages` 선택
3. **Source** 섹션에서:
   - Branch: `main` 선택
   - Folder: `/ (root)` 선택
4. `Save` 버튼 클릭
5. 1~2분 후 페이지 상단에 배포 URL이 표시됩니다
   - 예: `https://[your-username].github.io/[repository-name]/`

### 5. 배포 확인

- 배포 URL을 브라우저에서 열어 정상 작동 확인
- index.html이 자동으로 로드됩니다

## 🔄 코드 업데이트 방법

파일을 수정한 후 변경사항을 배포하려면:

```bash
# 변경사항 확인
git status

# 파일 스테이징
git add .

# 커밋
git commit -m "업데이트 내용 설명"

# 푸시
git push

# 1~2분 후 자동으로 GitHub Pages에 반영됨
```

## 🛠 로컬 실행 방법

### 방법 1: 직접 열기
```bash
open index.html
```

### 방법 2: HTTP 서버 실행 (권장)
```bash
# Python 3 내장 서버 사용
python3 -m http.server 8000

# 브라우저에서 접속
# http://localhost:8000
```

### 방법 3: VS Code Live Server
1. VS Code 설치
2. Live Server 확장 프로그램 설치
3. index.html 우클릭 → `Open with Live Server`

## 📖 사용 방법

1. **파일 업로드**
   - 오른쪽 패널의 업로드 영역에 파일 드래그 & 드롭
   - 또는 클릭하여 파일 선택

2. **파일 선택**
   - Ctrl 클릭: 개별 파일 선택/해제
   - Shift 클릭: 범위 선택

3. **품목에 매핑**
   - 선택한 파일을 왼쪽 테이블의 원하는 행으로 드래그
   - 하나의 파일을 여러 행에 매핑 가능

4. **테이블 정렬**
   - 열 헤더 클릭으로 정렬
   - 한 번 클릭: 오름차순 ▲
   - 두 번 클릭: 내림차순 ▼

5. **파일 제거**
   - 각 파일 우측의 ✕ 버튼 클릭

## 🎨 기술 스택

- **HTML5**: 시맨틱 마크업
- **Tailwind CSS**: 유틸리티 기반 스타일링
- **Alpine.js**: 경량 반응형 프레임워크
- **Vanilla JavaScript**: 드래그 앤 드롭 및 파일 처리

## 🔧 커스터마이징

### 색상 변경

`index.html`의 Tailwind 설정에서 primary 색상 수정:

```javascript
tailwind.config = {
    theme: {
        extend: {
            colors: {
                primary: '#5c9ccc',        // 변경
                'primary-dark': '#4a7ba5'  // 변경
            }
        }
    }
}
```

### 테이블 데이터 수정

`prototype-optimized.js`의 `tableData` 배열 수정:

```javascript
tableData: [
    {
        id: 1,
        status: '처리완료',
        seqno: '20241028008001',
        code: '9MAD0002310',
        name: '제품명',
        docType: '성분표',
        note: '',
        exportCountry: '미국',
        docManager: '김담당',
        comment: ''
    },
    // ... 추가 데이터
]
```

## 📝 브라우저 지원

- Chrome (최신 버전)
- Edge (최신 버전)
- Firefox (최신 버전)
- Safari (최신 버전)

## 🐛 트러블슈팅

### GitHub Pages에서 페이지가 안 보일 때

1. **404 오류**
   - Settings > Pages에서 올바른 브랜치 선택 확인
   - index.html 파일이 루트 디렉토리에 있는지 확인

2. **스타일이 깨질 때**
   - 브라우저 개발자 도구(F12) → Console 탭에서 오류 확인
   - CDN 링크 확인 (Tailwind, Alpine.js)

3. **JavaScript 오류**
   - 브라우저 콘솔에서 오류 메시지 확인
   - prototype-optimized.js 파일 경로 확인

### 로컬에서 파일이 로드되지 않을 때

- HTTP 서버를 통해 실행 (보안 정책상 직접 열기는 제한될 수 있음)
- `python3 -m http.server` 사용

## 📄 라이선스

내부 프로젝트 / PoC

## 👥 기여

프로젝트 관련 문의사항이나 개선 제안은 이슈로 등록해주세요.

---

**마지막 업데이트**: 2025-11-10
**버전**: 1.0.0
