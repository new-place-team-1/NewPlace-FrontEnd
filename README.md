# NewPlace-FrontEnd

## How to set up this project

### 프론트엔드 뉴비라면 아래 링크 먼저

https://github.com/saySthAbout/NewPlace-Docs/blob/main/%ED%94%84%EB%A1%A0%ED%8A%B8%EC%97%94%EB%93%9C/%EA%B0%9C%EB%B0%9C%ED%99%98%EA%B2%BD%EC%84%B8%ED%8C%85.md (private)

### NewPlace-FrontEnd 프로젝트 로컬 세팅 CLI 명령어 순서

```
git clone https://github.com/saySthAbout/NewPlace-FrontEnd.git
cd newplace-frontend

yarn
yarn husky:install
```

### 환경변수 파일

https://github.com/saySthAbout/NewPlace-Docs/blob/main/%ED%94%84%EB%A1%A0%ED%8A%B8%EC%97%94%EB%93%9C/%ED%99%98%EA%B2%BD%EB%B3%80%EC%88%98.md (private)

## How to test

두 개의 터미널 창이 필요합니다. <br />
먼저 첫번째 창에서 로컬 서버를 열어주세요.

```
yarn start
```

두번째 창에서는 테스트를 실행할 수 있습니다.

```
yarn test
```

### E2E 테스트 디버깅 방법

브라우저를 오픈하여 E2E 테스트를 하는 방법입니다. <br />
브라우저를 오픈해서 하는 이유는 각 테스트 케이스별로 타임 트라블링과 디버깅을 미세한 단위로 할 수 있기 때문입니다.

마찬가지로 두 개의 터미널 창을 엽니다.

```
yarn start
yarn test:open
```

### 유닛 테스트 디버깅 방법

같은 이유로 브라우저를 열고 진행합니다. 유닛 테스트이므로 이번에는 로컬 서버를 열지 않아도 됩니다.

```
yarn test:unit:open
```
