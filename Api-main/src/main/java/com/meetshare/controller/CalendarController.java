package com.meetshare.controller;

import com.meetshare.dto.calendar.CalendarDTO;
import com.meetshare.dto.calendar.CalMberDTO;
import com.meetshare.dto.common.FileDTO;
import com.meetshare.dto.user.UserDTO;
import com.meetshare.service.CalendarService;
import com.meetshare.service.CalendarMberService;

import jakarta.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.oauth2.client.authentication.OAuth2AuthenticationToken;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.security.Principal;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;

@RestController
@RequestMapping("/calendar")
public class CalendarController {

  // 첨부파일 업로드 경로 -> application.properties
  @Value("${file.upload-dir}")
  private String uploadDir;

  @Autowired
  CalendarService calendarService;

  @Autowired
  CalendarMberService calendarMberService;

  /*
   * 캘린더 생성
   */
  @PostMapping("/insert")
  public ResponseEntity<?> insertCalendar(
      @RequestParam("file") MultipartFile file,
      @RequestParam("title") String title,
      @RequestParam("password") String password, HttpServletRequest request) {

    // 세션에 저장한 정보 가져오기
    UserDTO userDTO = (UserDTO) request.getSession().getAttribute("userInfo");
    System.out.println(userDTO);

    CalendarDTO calendarDTO = new CalendarDTO();
    calendarDTO.setTitle(title);
    calendarDTO.setWriter(userDTO.getName());
    calendarDTO.setPasswd(password);

    // 파일 not empty -> 파일 insert
    if (!file.isEmpty()) {
      try {
        FileDTO fileDTO = new FileDTO();
        fileDTO.setFileName(file.getOriginalFilename()); // 파일 이름 저장

        String filePath = uploadDir + UUID.randomUUID().toString() + "_" + file.getOriginalFilename();
        file.transferTo(new File(filePath)); // 파일 -> 물리적 경로에 저장
        fileDTO.setFilePath(filePath); // 파일 경로 저장

        int fileId = calendarService.saveFile(fileDTO);
        calendarDTO.setFileId(fileId); // 캘린더 정보에 파일 순번 저장

      } catch (IOException e) {
        e.printStackTrace();
        return ResponseEntity.status(500).body("파일 업로드 실패");
      }
    }

    calendarService.insertCalendar(calendarDTO);

    // 캘린더 생성 시, 관리자를 멤버로 같이 생성
    CalMberDTO calMberDTO = new CalMberDTO();
    calMberDTO.setCalNo(calendarDTO.getNo());
    calMberDTO.setEmail(userDTO.getEmail());
    calMberDTO.setAuth("admin");
    calendarMberService.insertCalMberInfo(calMberDTO);
    return ResponseEntity.ok("캘린더 생성 성공!!!");
  }

  /*
   * 사용자 정보에 해당하는 캘린더 정보 가져오기
   */
  @GetMapping("/list")
  public ResponseEntity<List<CalendarDTO>> getCalendarList(HttpServletRequest request) {

    // 세션에 저장한 정보 가져오기
    UserDTO userDTO = (UserDTO) request.getSession().getAttribute("userInfo");
    System.out.println(userDTO);

    List<CalendarDTO> result = calendarService.getCalendarList(userDTO.getEmail());
    return ResponseEntity.ok(result);
  }

  /*
   * 특정 캘린더 가져오기
   */
  @GetMapping("/get/{no}")
  public CalendarDTO getCalendarByNo(@PathVariable int no) {
    return calendarService.getCalendarByNo(no);
  }

  /*
   * 캘린더 정보 수정
   */
  @PutMapping("/update/{no}")
  public ResponseEntity<?> updateCalendar(
      @PathVariable("no") int no,
      @RequestParam("title") String title,
      @RequestParam("password") String password,
      @RequestParam("file") MultipartFile file) {

    CalendarDTO calendarDTO = new CalendarDTO();
    calendarDTO.setNo(no);
    calendarDTO.setTitle(title);
    calendarDTO.setPasswd(password);

    // 파일 not empty -> 파일 insert
    if (file != null && !file.isEmpty()) {
      try {
        FileDTO fileDTO = calendarService.getFileInfoByCalNo(no); // 해당 no에 해당하는 파일정보 가져오기
        fileDTO.setFileName(file.getOriginalFilename());
        String filePath = uploadDir + UUID.randomUUID().toString() + "_" + file.getOriginalFilename();
        file.transferTo(new File(filePath)); // 파일 -> 물리적 경로에 저장
        fileDTO.setFilePath(filePath);

        calendarService.updateFile(fileDTO); // 기존 파일 update

        // 업데이트된 FILE_ID 설정
        calendarDTO.setFileId(fileDTO.getFileId());
      } catch (IOException e) {
        e.printStackTrace();
        return ResponseEntity.ok("파일 수정 실패");
      }
    }

    // 일정 업데이트 호출
    calendarService.updateCalendar(calendarDTO);

    return ResponseEntity.ok("캘린더 수정 성공!!!");
  }

  /*
   * 캘린더 항목 삭제
   */
  @DeleteMapping("/delete/{no}")
  public ResponseEntity<Map<String, String>> deleteCalendar(@PathVariable int no) {
    // 삭제 호출
    String msg = calendarService.deleteCalendar(no);

    // 리다이렉트 URL과 메시지 설정
    Map<String, String> response = new HashMap<>();
    response.put("message", msg);
    response.put("redirect", "/calendar/list");

    // 삭제 성공 여부에 따라 응답
    if ("success".equals(msg)) {
      return ResponseEntity.ok(response); // 200 OK
    } else {
      return ResponseEntity.status(400).body(response); // 400 Bad Request
    }
  }

  /*
   * 캘린더 상단 고정/해제
   */
  @PutMapping("/togglePin/{no}")
  public ResponseEntity<Map<String, Object>> togglePin(@PathVariable int no) {
    int newOrder = calendarService.togglePin(no);
    Map<String, Object> response = new HashMap<>();
    response.put("order", newOrder);
    response.put("message", newOrder == 0 ? "해제되었습니다." : "고정되었습니다.");
    return ResponseEntity.ok(response);
  }

  /*
   * 초대링크 -> 비밀번호 확인
   */
  @PostMapping("/join/{no}")
  public ResponseEntity<?> joinCalendar(@PathVariable("no") int no, @RequestBody Map<String, String> map,
      HttpServletRequest request) {

    CalendarDTO calendarDTO = calendarService.getCalendarByNo(no);
    String password = calendarDTO.getPasswd();
    System.out.println(password);
    String passwd = map.get("passwd");
    System.out.println(passwd);

    if (password.equals(passwd)) {
      // 세션에 저장한 정보 가져오기
      UserDTO userDTO = (UserDTO) request.getSession().getAttribute("userInfo");
      System.out.println("세션에서 가져온 정보 >>>>> " + userDTO);

      CalMberDTO calMberDTO = new CalMberDTO();
      calMberDTO.setCalNo(no);
      calMberDTO.setEmail(userDTO.getEmail());
      calMberDTO.setAuth("user");
      calendarMberService.insertCalMberInfo(calMberDTO);

      return ResponseEntity.ok("초대받아서 입장 성공!!!");

    } else {
      return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
    }
  }

}
