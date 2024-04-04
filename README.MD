

### FIRST

  vue2로 작성된 무료템플릿의 페이지 및 사이드바를 vue3 기반으로 옮기는 작업

  2024.04.01 git remote구성 시작

완료
* 사이드바, 탑네비바, 푸터
* 모듈 ( dayjs )
* 글로벌 컴포넌트
* 스토어 ( vuex -> pinia )
* 페이지추가 ( 디자인 일부 수정 )



변경사항 참고

### 클래스명
아이콘 : nc-icon + 아이콘명
버튼 : float-right -> float-end, float-left -> float-start
필드셋 : form-group -> form-group my-3 

### 기타
template slot="" -> slot class=""
/userlist -> /userlist
tableColumns : 컬럼명은 모두 소문자, 데이터명과 동일하게ㅔ