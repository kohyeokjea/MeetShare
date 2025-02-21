package com.meetshare.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.meetshare.dao.CalendarDAO;
import com.meetshare.dao.FileDAO;
import com.meetshare.dto.calendar.CalendarDTO;
import com.meetshare.dto.common.FileDTO;

@Service
@Transactional
public class CalendarService {

  @Autowired
  CalendarDAO calendarDAO;

  @Autowired
  FileDAO fileDAO;

  // 새 캘린더 insert
  public void insertCalendar(CalendarDTO calendarDTO) {
    calendarDAO.insertCalendar(calendarDTO);
  }

  // 모든 캘린더 정보 select -> List
  public List<CalendarDTO> getCalendarList(String email) {
    return calendarDAO.getCalendarList(email); // DAO에서 데이터를 가져오는 로직
  }

  // 특정 캘린더 정보 select
  public CalendarDTO getCalendarByNo(int no) {
    return calendarDAO.getCalendarByNo(no);
  }

  // 캘린더 정보 modify
  public boolean updateCalendar(CalendarDTO calendarDTO) {
    int updatedRows = calendarDAO.updateCalendar(calendarDTO);
    return updatedRows > 0;
  }

  // 캘린더 정보 delete
  public String deleteCalendar(int no) {
    int result = calendarDAO.deleteCalendar(no);

    if (result > 0) {
      return "success";
    } else {
      return "fail";
    }
  }

  // 캘린더 상단 고정/해제
  @Transactional
  public int togglePin(int no) {
    CalendarDTO calendarDTO = calendarDAO.getCalendarByNo(no);

    if (calendarDTO.getOrdr() > 0) {
      calendarDAO.updateOrder(no, 0);
      return 0;
    } else {
      int maxOrder = calendarDAO.getMaxOrder();
      int newOrder = maxOrder != 0 ? maxOrder + 1 : 1;
      calendarDAO.updateOrder(no, newOrder);
      return newOrder;
    }
  }

  /*
   * 첨부파일
   */

  // 첨부파일정보 insert
  public int saveFile(FileDTO fileDTO) {
    fileDAO.insertFile(fileDTO);
    return fileDTO.getFileId();
  }

  // 첨부파일정보 select
  public FileDTO getFileInfoByCalNo(int no) {
    int fileId = calendarDAO.getFileIdByCalendarNo(no);
    return fileDAO.getFileById(fileId);
  }

  // 첨부파일정보 update
  public void updateFile(FileDTO fileDTO) {
    fileDAO.updateFile(fileDTO);
  }

}
