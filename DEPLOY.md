# 🚀 GitHub Pages 빠른 배포 가이드

## 5분 안에 배포하기

### 1단계: GitHub 저장소 생성 (1분)

1. https://github.com/new 접속
2. Repository name 입력 (예: `rms-file-upload`)
3. **Public** 선택
4. `Create repository` 클릭

### 2단계: 코드 푸시 (2분)

터미널을 열고 다음 명령어 실행:

```bash
# rms_test 디렉토리로 이동
cd /Users/jongho.jung/Desktop/jongho_project/PoC/real_poc/rms_test

# GitHub 저장소 주소를 복사하여 아래에 붙여넣기
# 예: git remote add origin https://github.com/username/rms-file-upload.git
git remote add origin [여기에 저장소 URL 붙여넣기]

# 브랜치 이름을 main으로 설정
git branch -M main

# 모든 파일 추가
git add .

# 커밋
git commit -m "Initial commit"

# GitHub에 푸시
git push -u origin main
```

### 3단계: GitHub Pages 활성화 (1분)

1. GitHub 저장소 페이지로 이동
2. `Settings` 탭 클릭
3. 왼쪽 메뉴에서 `Pages` 클릭
4. Source 섹션:
   - Branch: `main` 선택
   - Folder: `/ (root)` 선택
5. `Save` 버튼 클릭

### 4단계: 배포 확인 (1분)

- Settings > Pages 페이지 상단에 배포 URL 표시
- 1~2분 후 해당 URL 접속
- **완료!** 🎉

---

## 📋 체크리스트

배포 전 확인사항:

- [ ] GitHub 계정 준비됨
- [ ] 저장소 이름 결정됨
- [ ] 터미널에서 `git` 명령어 사용 가능

배포 후 확인사항:

- [ ] 페이지가 정상적으로 로드됨
- [ ] 파일 업로드 기능 작동
- [ ] 드래그 앤 드롭 작동
- [ ] 테이블 정렬 작동

---

## 🔄 코드 업데이트 시

```bash
cd /Users/jongho.jung/Desktop/jongho_project/PoC/real_poc/rms_test

git add .
git commit -m "업데이트 내용"
git push

# 1~2분 후 자동 반영
```

---

## ❓ 문제 해결

### "fatal: remote origin already exists"

```bash
git remote remove origin
git remote add origin [새 URL]
```

### 페이지가 404 오류

- Settings > Pages에서 브랜치가 `main`으로 설정되었는지 확인
- `index.html` 파일이 루트에 있는지 확인

### 푸시가 안 될 때

```bash
# 인증 확인
git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"

# Personal Access Token 사용 (비밀번호 대신)
```

Personal Access Token 생성:
1. GitHub Settings > Developer settings > Personal access tokens
2. Generate new token (classic)
3. `repo` 권한 선택
4. 생성된 토큰을 비밀번호로 사용

---

## 📞 추가 도움말

더 자세한 내용은 `README.md` 파일을 참조하세요.
