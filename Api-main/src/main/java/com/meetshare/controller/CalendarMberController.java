package com.meetshare.controller;

import java.io.File;
import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.meetshare.dao.CalendarMberDAO;
import com.meetshare.dto.calendar.CalMberDTO;
import com.meetshare.dto.common.FileDTO;
import com.meetshare.dto.user.UserDTO;
import com.meetshare.service.CalendarMberService;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@RestController
@RequestMapping("/calendarMber")
public class CalendarMberController {

  // 첨부파일 업로드 경로 -> application.properties
  @Value("${file.upload-dir}")
  private String uploadDir;

  @Autowired
  CalendarMberService calendarMberService;

  @Autowired
  CalendarMberDAO calendarMberDAO;

  /*
   * 캘린더 입장 -> 정보 확인
   */
  @GetMapping("/checkCalMberInfo/{no}")
  public ResponseEntity<Map<String, String>> checkCalMberInfo(@PathVariable int no, HttpServletRequest request,
      HttpServletResponse response) {

    Map<String, String> map = new HashMap<>();

    // 세션에 저장한 정보 가져오기
    UserDTO userDTO = (UserDTO) request.getSession().getAttribute("userInfo");
    System.out.println("캘린더 입장 세션 정보 >>>>>>>>>> " + userDTO);

    // 닉네임 설정 여부 확인
    CalMberDTO calMberDTO = calendarMberService.selectCalMberInfo(no, userDTO.getEmail());
    String nickName = calMberDTO.getNickName();
    System.out.println("닉네임 >>>>>>>>>> " + nickName);

    if (nickName == null || nickName.equals("")) {
      map.put("url", "/nickName?calNo=" + no); // 닉네임 입력 화면 URL
    } else {
      map.put("url", "/todoMain?calNo=" + no); // 메인 화면 URL
    }

    return ResponseEntity.ok(map);
  }

  /*
   * 로그인 한 사용자의 해당 캘린더 멤버 정보 가져오기
   */
  @GetMapping("/getCalMberInfo/{no}")
  public ResponseEntity<Map<String, Object>> getCalMberInfo(@PathVariable int no, HttpServletRequest request) {

    Map<String, Object> map = new HashMap<>();

    // 세션에 저장한 정보 가져오기
    UserDTO userDTO = (UserDTO) request.getSession().getAttribute("userInfo");

    // 사용자 정보 map에 담아서 클라이언트로~
    CalMberDTO calMberDTO = calendarMberService.selectCalMberInfo(no, userDTO.getEmail());
    map.put("calMberInfo", calMberDTO);

    return ResponseEntity.ok(map);
  }

  /*
   * 캘린더 멤버 닉네임 update
   */
  @PutMapping("/updateCalMberNickname/{no}")
  public ResponseEntity<?> updateCalMberNickname(@PathVariable("no") int no,
      @RequestBody Map<String, String> requestBody,
      HttpServletRequest request) {

    // 세션에 저장한 정보 가져오기
    UserDTO userDTO = (UserDTO) request.getSession().getAttribute("userInfo");

    // React에서 가져온 값
    String nickName = requestBody.get("nickname");

    calendarMberService.updateCalMberNickname(no, userDTO.getEmail(), nickName);

    return ResponseEntity.ok("캘린더 멤버 닉네임 업데이트 성공!!!");
  }

  /*
   * ********** 마이페이지 관련 **********
   */

  /*
   * 프로필 정보 select
   */
  @GetMapping("/getProfiles")
  public ResponseEntity<List<CalMberDTO>> getProfiles(HttpServletRequest request) {
    // 세션에 저장한 정보 가져오기
    UserDTO userDTO = (UserDTO) request.getSession().getAttribute("userInfo");
    System.out.println("세션에서 가져온 정보 >>>>> " + userDTO);

    List<CalMberDTO> result = calendarMberService.selectCalMberInfoByEmail(userDTO.getEmail());

    return ResponseEntity.ok(result);
  }

  /*
   * 프로필 정보 modify
   */
  @PutMapping("/modifyProfile/{no}")
  public ResponseEntity<?> modifyProfile(@PathVariable("no") int no,
      @RequestParam("nickName") String nickName,
      @RequestParam("file") MultipartFile file) {

    CalMberDTO calMberDTO = new CalMberDTO();
    calMberDTO.setNo(no);
    calMberDTO.setNickName(nickName);

    int atchFileId = calendarMberDAO.getFileIdByCalMberNo(no);

    if (atchFileId == 0) { // 첨부파일이 없으면~
      // 파일 not empty -> 파일 insert
      if (!file.isEmpty()) {
        try {
          FileDTO fileDTO = new FileDTO();
          fileDTO.setFileName(file.getOriginalFilename()); // 파일 이름 저장

          String filePath = uploadDir + UUID.randomUUID().toString() + "_" + file.getOriginalFilename();
          file.transferTo(new File(filePath)); // 파일 -> 물리적 경로에 저장
          fileDTO.setFilePath(filePath); // 파일 경로 저장

          int fileId = calendarMberService.saveFile(fileDTO);
          calMberDTO.setFileId(fileId); // 캘린더 멤버 정보에 파일 순번 저장

        } catch (IOException e) {
          e.printStackTrace();
          return ResponseEntity.status(500).body("파일 업로드 실패");
        }
      }
    } else { // 첨부파일이 있으면~
      // 파일 not empty -> 파일 insert
      if (file != null && !file.isEmpty()) {
        try {
          FileDTO fileDTO = new FileDTO();
          fileDTO = calendarMberService.getFileIdByCalMberNo(no); // 해당 no에 해당하는 파일정보 가져오기
          fileDTO.setFileName(file.getOriginalFilename());
          String filePath = uploadDir + UUID.randomUUID().toString() + "_" + file.getOriginalFilename();
          file.transferTo(new File(filePath)); // 파일 -> 물리적 경로에 저장
          fileDTO.setFilePath(filePath);

          calendarMberService.updateFile(fileDTO); // 기존 파일 update

          // 업데이트된 FILE_ID 설정
          calMberDTO.setFileId(fileDTO.getFileId());
        } catch (IOException e) {
          e.printStackTrace();
          return ResponseEntity.ok("파일 수정 실패");
        }
      }
    }

    calendarMberService.updateCalMberInfo(calMberDTO);

    return ResponseEntity.ok().body("프로필 수정 성공!!!");
  }

}
