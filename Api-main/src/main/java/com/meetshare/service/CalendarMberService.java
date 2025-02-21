package com.meetshare.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.meetshare.dao.CalendarDAO;
import com.meetshare.dao.CalendarMberDAO;
import com.meetshare.dao.FileDAO;
import com.meetshare.dto.calendar.CalMberDTO;
import com.meetshare.dto.calendar.CalendarDTO;
import com.meetshare.dto.common.FileDTO;

@Service
@Transactional
public class CalendarMberService {

  @Autowired
  CalendarMberDAO calendarMberDAO;

  @Autowired
  FileDAO fileDAO;

  // 캘린더 멤버 정보 insert
  public void insertCalMberInfo(CalMberDTO calMberDTO) {
    calendarMberDAO.insertCalMberInfo(calMberDTO);
  }

  // 캘린더 멤버 정보 select
  public CalMberDTO selectCalMberInfo(int no, String email) {
    return calendarMberDAO.selectCalMberInfo(no, email);
  }

  // 캘린더 멤버 닉네임 update
  public void updateCalMberNickname(int no, String email, String nickName) {
    calendarMberDAO.updateCalMberNickname(no, email, nickName);
  }

  /*
   * ********** 마이페이지 관련 **********
   */

  // 프로필 정보 select
  public List<CalMberDTO> selectCalMberInfoByEmail(String email) {
    return calendarMberDAO.selectCalMberInfoByEmail(email);
  }

  // 프로필 정보 modify
  public void updateCalMberInfo(CalMberDTO calMberDTO) {
    calendarMberDAO.updateCalMberInfo(calMberDTO);
  }

  /*
   * ********** 첨부파일 관련 **********
   */

  // 첨부파일정보 insert
  public int saveFile(FileDTO fileDTO) {
    fileDAO.insertFile(fileDTO);
    return fileDTO.getFileId();
  }

  // 첨부파일정보 select
  public FileDTO getFileIdByCalMberNo(int no) {
    int fileId = calendarMberDAO.getFileIdByCalMberNo(no);
    return fileDAO.getFileById(fileId);
  }

  // 첨부파일정보 update
  public void updateFile(FileDTO fileDTO) {
    fileDAO.updateFile(fileDTO);
  }

}
