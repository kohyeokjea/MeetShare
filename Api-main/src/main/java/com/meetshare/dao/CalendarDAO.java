package com.meetshare.dao;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import com.meetshare.dto.calendar.CalendarDTO;

@Mapper
public interface CalendarDAO {

  // 새 캘린더 insert
  void insertCalendar(CalendarDTO calendarDTO);

  // 모든 캘린더 정보 select -> List
  List<CalendarDTO> getCalendarList(@Param("email") String email);

  // 특정 캘린더 정보 select
  CalendarDTO getCalendarByNo(int no);

  // 캘린더 정보 modify
  int updateCalendar(CalendarDTO calendarDTO);

  // 캘린더 정보 delete
  int deleteCalendar(int no);

  // 상단 고정 캘린더 중 최대 ORDR 값 구하기
  int getMaxOrder();

  // ORDR update
  void updateOrder(@Param("no") int no, @Param("order") int order);

  // 캘린더 -> 파일순번(고유순번) 가져오기
  int getFileIdByCalendarNo(int no);

  // 캘린더 입장 -> 정보 확인
  String checkInfo(@Param("no") int no, @Param("email") String email);

}
