package com.meetshare.dto.todo;

import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.Data;

@Data
public class TodoDTO {
  private int no; // 순번(고유번호)
  private int calNo; // 캘린더 고유번호
  private String title; // 제목
  private String writer; // 작성자
  private String content; // 내용
  private String color; // 색상

  @JsonProperty("startDate") // JSON키 매핑
  private String sdate; // 시작일
  
  @JsonProperty("endDate")
  private String edate; // 종료일

  private String regidate; // 등록일자
  private String modidate; // 수정일자
  private int ordr; // 순서 -> for 상단고정
}
