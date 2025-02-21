package com.meetshare.dao;

import org.apache.ibatis.annotations.Mapper;

import com.meetshare.dto.common.FileDTO;

@Mapper
public interface FileDAO {

  // 첨부파일정보 insert
  int insertFile(FileDTO fileDTO);

  // 첨부파일정보 select
  FileDTO getFileById(int fileId);

  // 첨부파일정보 update
  int updateFile(FileDTO fileDTO);

}
