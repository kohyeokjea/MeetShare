package com.meetshare.service;

import java.time.LocalDate;
import java.time.YearMonth;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.meetshare.dao.TodoDAO;
import com.meetshare.dto.calendar.CalendarDTO;
import com.meetshare.dto.todo.TodoDTO;

@Service
public class TodoService {

  @Autowired
  TodoDAO todoDAO;

  // 일정 정보 select
  public List<TodoDTO> getTodoList(int no) {
    return todoDAO.getTodoList(no);
  }

  // 특정 일정 정보 select
  public TodoDTO getTodoByNo(int no) {
    return todoDAO.getTodoByNo(no);
  }

  // 일정 insert
  public void insertTodo(TodoDTO todoDTO) {
    todoDAO.insertTodo(todoDTO);
  }

  // 일정 modify
  public void updateTodo(TodoDTO todoDTO) {
    todoDAO.updateTodo(todoDTO);
  }

  // 일정 delete
  public void deleteTodo(int no) {
    todoDAO.deleteTodo(no);
  }

  // 일정 상단 고정/해제
  public void togglePin(int no) {
    TodoDTO todoDTO = todoDAO.getTodoByNo(no);

    if (todoDTO.getOrdr() > 0) {
      todoDAO.updateOrder(no, 0);
    } else {
      todoDAO.updateOrder(no, 1);
    }

  }

  // 이달의 일정 select
  // public List<TodoDTO> getMonthlyTodoList(int year, int month) {
  // LocalDate startDate = YearMonth.of(year, month).atDay(1); // 월의 시작일
  // LocalDate endDate = YearMonth.of(year, month).atEndOfMonth(); // 월의 종료일
  // return todoDAO.getMonthlyTodoList(startDate, endDate);
  // }

}
