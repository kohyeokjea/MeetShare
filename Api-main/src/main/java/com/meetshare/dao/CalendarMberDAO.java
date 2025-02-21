package com.meetshare.dao;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.meetshare.dto.calendar.CalMberDTO;

@Mapper
public interface CalendarMberDAO {

  // 캘린더 멤버 insert
  void insertCalMberInfo(CalMberDTO calMberDTO);

  // 캘린더 멤버 정보 select
  CalMberDTO selectCalMberInfo(int no, String email);

  // 캘린더 멤버 닉네임 update
  void updateCalMberNickname(int no, String email, String nickName);

  /*
   * ********** 마이페이지 관련 **********
   */

  // 프로필 정보 select
  List<CalMberDTO> selectCalMberInfoByEmail(String email);

  // 프로필 정보 modify
  void updateCalMberInfo(CalMberDTO calMberDTO);

  // 파일 순번(고유 순번) select
  int getFileIdByCalMberNo(int no);
}
