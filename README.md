# 현대백화점 면세점 개선

## node version - 18.16.0
## gulp 가동 명령어 - gulp

## html
+ 주문서 기본 마크업 - html 폴더 내
+ 모바일은 파일명에 m_ 추가
+ m_order.html, order.html 파일의 \<!-- 2023 개선 내용--> 안에 작성
+ layer는 layer 폴더에 저장, order_layer.html 에 전체 저장
+ 파일 추가시 m_base.html, pc_base.html 을 기본으로 작업

## css
+ 주문서 css(mobile) - front/scss/_mo_order.scss 
+ 주문서 css(pc) - front/scss/_pc_order.scss

## image
+ 제플린에서 svg 파일 다운로드
+ front/images/**/common/n 에 저장 - 3개의 폴더에 저장
+ 모바일은 M_**, pc는 **

## js
+ 레이어 추가는 버튼에 data-role="open__열려고 하는 파일 명"
  - 모바일의 경우 data-role="open__option_change" -> layer_mo/layer_option_change.html 파일 연결
  - pc의 경우 data-role="open__option_change" -> layer/layer_option_change.html 파일 연결
  - 각각의 레이어 활성화 class는 active
    * \<div class="wrap-download-coupon box-float-layer">의 경우 \<div class="wrap-download-coupon box-float-layer active"> active는 display: block로 처리