# markery server
## 작업상황

gradle 빌드 방법
MAC 기준
```
jar 파일 실행
참고자료
https://waspro.tistory.com/504

$ brew update
$ brew install gradle
$ gradle build
$ java -jar 실행할파일.jar
```

### 2020/03/11 추가
```$xslt
gradlew로 빌드 및 실행
루트 프로젝트에서
1. gradlew build --exclude-task test
2. gradlew bootrun
```
