package com.meetshare.dto.calendar;

import lombok.Data;

@Data
public class CalMberDTO {
  private int no; // 순번(고유번호)
  private int calNo; // 캘린더 고유번호
  private String nickName; // 닉네임
  private String email; // 이메일
  private String auth; // 권한(관리자/사용자)
  private int fileId; // 파일순번(고유번호)
  private String regidate; // 등록(가입)일자
  private String outDate; // 강퇴(탈퇴)여부
  private String isOut; // 강퇴(탈퇴)여부

  private String title; // 캘린더 제목 -> for 마이페이지 캘린더 제목 출력
}
