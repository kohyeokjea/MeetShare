package com.meetshare.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.meetshare.dto.calendar.CalMberDTO;
import com.meetshare.dto.todo.TodoDTO;
import com.meetshare.dto.user.UserDTO;
import com.meetshare.service.CalendarMberService;
import com.meetshare.service.TodoService;

import jakarta.servlet.http.HttpServletRequest;

@RestController
@RequestMapping("/todo")
public class TodoController {

  @Autowired
  CalendarMberService calendarMberService;

  @Autowired
  TodoService todoService;

  // 닉네임 불러오기 -> for 작성자 input 채움
  @GetMapping("/getWriter/{no}")
  public ResponseEntity<String> getWriter(@PathVariable("no") int no, HttpServletRequest request) {

    // 세션에 저장한 정보 가져오기
    UserDTO userDTO = (UserDTO) request.getSession().getAttribute("userInfo");

    CalMberDTO calMberDTO = calendarMberService.selectCalMberInfo(no, userDTO.getEmail());
    String nickName = calMberDTO.getNickName();

    return ResponseEntity.ok(nickName);
  }

  // 일정 insert
  @PostMapping("/insert/{no}")
  public ResponseEntity<String> insertTodo(@PathVariable("no") int no, @RequestBody TodoDTO todoDTO) {

    System.out.println("넘어온 값들 >>>>>>>>>> " + todoDTO);
    todoDTO.setCalNo(no);
    todoService.insertTodo(todoDTO);

    return ResponseEntity.ok("일정 등록 완료!!!");
  }

  // 일정 정보 select
  @GetMapping("/list/{no}")
  public ResponseEntity<List<TodoDTO>> getTodoList(@PathVariable("no") int no) {
    return ResponseEntity.ok(todoService.getTodoList(no));
  }

  // 특정 일정 정보 select
  @GetMapping("/getTodoByNo/{no}")
  public ResponseEntity<TodoDTO> getTodoByNo(@PathVariable("no") int no) {
    return ResponseEntity.ok(todoService.getTodoByNo(no));
  }

  // 일정 modify
  @PutMapping("/update/{no}")
  public void updateTodo(@PathVariable("no") int no, @RequestBody TodoDTO todoDTO) {
    todoDTO.setNo(no);
    todoService.updateTodo(todoDTO);
  }

  // 일정 delete
  @DeleteMapping("/delete/{no}")
  public void deleteTodo(@PathVariable("no") int no) {
    todoService.deleteTodo(no);
  }

  // 일정 상단 고정/해제
  @PutMapping("/togglePin/{no}")
  public void togglePin(@PathVariable("no") int no) {
    todoService.togglePin(no);
  }

  // 이달의 일정 select
  // @GetMapping("/monthly")
  // public List<TodoDTO> getMonthlyTodoList(@RequestParam int year, @RequestParam
  // int month) {
  // return todoService.getMonthlyTodoList(year, month);
  // }

}
