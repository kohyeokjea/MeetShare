package com.meetshare.dto.common;

import lombok.Data;

@Data
public class FileDTO {
  private int fileId; // 순번(고유번호)
  private String fileName; // 파일이름
  private String filePath; // 파일경로
  private String createdAt; // 생성일자
}
