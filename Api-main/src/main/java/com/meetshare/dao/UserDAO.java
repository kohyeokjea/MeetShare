package com.meetshare.dao;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import com.meetshare.dto.user.UserDTO;

@Mapper
public interface UserDAO {

  // 전체 사용자 정보 목록
  List<UserDTO> selectUserInfo();

  // 이메일로 사용자 정보 select
  UserDTO selectUserInfoByEmail(@Param("email") String email);

  // 사용자 정보 insert
  void insertUserInfo(UserDTO user);

  // 사용자 정보 update
  void updateUserInfo(UserDTO user);

  // 사용자 delete
  void deleteUser(@Param("no") Integer no);

  // 이메일로 사용자 정보 delete
  void deleteUserByEmail(String email);

}