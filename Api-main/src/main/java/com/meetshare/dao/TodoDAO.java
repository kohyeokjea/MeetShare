package com.meetshare.dao;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import com.meetshare.dto.todo.TodoDTO;

@Mapper
public interface TodoDAO {

  // 일정 정보 select
  List<TodoDTO> getTodoList(int no);

  // 특정 일정 정보 select
  TodoDTO getTodoByNo(int no);

  // 일정 insert
  void insertTodo(TodoDTO todoDTO);

  // 일정 modify
  void updateTodo(TodoDTO todoDTO);

  // 일정 delete
  void deleteTodo(int no);

  // ORDR update
  void updateOrder(@Param("no") int no, @Param("order") int order);
  
  // 상단 고정 캘린더 중 최대 ORDR 값 구하기
  int getMaxOrder();

  // 이달의 일정 select
  List<TodoDTO> getMonthlyTodoList(@Param("startDate") String startDate, @Param("endDate") String endDate);
  
}
