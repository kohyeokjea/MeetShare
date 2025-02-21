package com.meetshare.dto.user;

import lombok.Data;

@Data
public class UserDTO {
  private int no; // 순번(고유번호)
  private String name; // 이름
  private String email; // 이메일
  private String phone; // 휴대폰 번호
  private String year; // 생년
  private String date; // 월일
  private int fileId; // 첨부파일 아이디
  private String regidate; // 등록일자
}