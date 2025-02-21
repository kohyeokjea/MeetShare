package com.meetshare.dto.calendar;

import lombok.Data;

@Data
public class CalendarDTO {
  private int no; // 순번(고유번호)
  private String title; // 제목
  private String content; // 내용
  private String writer; // 작성자
  private String passwd; // 비밀번호
  private int fileId; // 파일순번(고유번호)
  private String filePath; // 파일 경로
  private String regidate; // 등록일자
  private String modidate; // 수정일자
  private int ordr; // 순서
  private String isUse; // 사용여부
}
