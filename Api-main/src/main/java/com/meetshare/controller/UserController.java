package com.meetshare.controller;

import java.io.File;
import java.io.IOException;
import java.security.Principal;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.client.authentication.OAuth2AuthenticationToken;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.meetshare.dto.calendar.CalMberDTO;
import com.meetshare.dto.common.FileDTO;
import com.meetshare.dto.user.UserDTO;
import com.meetshare.security.JwtTokenProvider;
import com.meetshare.service.CalendarMberService;
import com.meetshare.dao.UserDAO;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.PathVariable;

/**
 * 로그인, 마이페이지, 참여자 목록 관련 컨트롤러
 */
@RestController
@RequestMapping("/user")
public class UserController {

  @Autowired
  JwtTokenProvider jwtTokenProvider;

  @Autowired
  UserDAO userDAO;

  @Autowired
  CalendarMberService calendarMberService;

  /*
   * 로그인 처리
   */
  @GetMapping("/login")
  public ResponseEntity<?> login(Authentication authentication, Principal principal, HttpServletRequest request,
      HttpServletResponse httpServletResponse) {

    String email = "";

    if (principal instanceof OAuth2AuthenticationToken authToken) {
      Map<String, Object> attributes = authToken.getPrincipal().getAttributes();

      // 네이버 사용자 정보 처리
      Object responseObj = attributes.get("response");
      if (responseObj instanceof Map) {
        @SuppressWarnings("unchecked")
        Map<String, Object> response = (Map<String, Object>) responseObj;
        email = (String) response.get("email");
        System.out.println("네이버 이메일 >>>>>>>>>> " + email);
      }

      // 카카오 사용자 정보 처리
      Object kakaoAccountObj = attributes.get("kakao_account");
      if (kakaoAccountObj instanceof Map) {
        @SuppressWarnings("unchecked")
        Map<String, Object> kakaoAccount = (Map<String, Object>) kakaoAccountObj;
        email = (String) kakaoAccount.get("email");
        System.out.println("카카오 이메일 >>>>>>>>>> " + email);
      }
    }

    if (email == null) {
      return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
    }

    UserDTO userDTO = userDAO.selectUserInfoByEmail(email);

    // 세션에 정보 저장
    // !!! 서버 재시작 시, 세션 날라감 주의 !!!
    request.getSession().setAttribute("userInfo", userDTO);
    System.out.println("세션에 저장한 값 >>>>>>>>>> " + request.getSession().getAttribute("userInfo"));

    // JWT 토큰 생성
    String jwtToken = jwtTokenProvider.createToken(email);

    try {
      httpServletResponse.sendRedirect("http://localhost:3000/process?token=" + jwtToken);
    } catch (IOException e) {
      e.printStackTrace();
      return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
    }

    return ResponseEntity.ok("Logged in successfully");
  }

  /*
   * 로그아웃 처리 -> Security에서 로그아웃 처리가 잘 되지 않아 따로 만듬...
   */
  @PostMapping("/logout")
  public ResponseEntity<?> logout(HttpServletRequest request, HttpServletResponse response) {

    // 세션 무효화
    request.getSession().invalidate();

    // 응답에 CORS 설정 추가
    // response.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
    // response.setHeader("Access-Control-Allow-Credentials", "true");

    return ResponseEntity.ok().body("Logged out successfully");
  }

  /*
   * 회원 탈퇴
   */
  @GetMapping("/withdraw")
  public ResponseEntity<?> withdraw(HttpServletRequest request) {    
    // 세션 정보 가져오기
    UserDTO userDTO = (UserDTO) request.getSession().getAttribute("userInfo");

    List<CalMberDTO> result = calendarMberService.selectCalMberInfoByEmail(userDTO.getEmail());

    Map<String, String> map = new HashMap<>();

    if (result == null || result.isEmpty()) { // 가입되어있는 캘린더가 없으면~ 회원탈퇴 진행
      try {
        userDAO.deleteUserByEmail(userDTO.getEmail());
        map.put("msg", "회원탈퇴가 성공적으로 이루어졌습니다.");
      } catch (Exception e) {
        e.printStackTrace();
        map.put("msg", "회원탈퇴중 오류가 발생하였습니다.");
      }
    } else {
      map.put("msg", "가입되어있는 캘린더에서 나가신 후, 회원탈퇴를 진행할 수 있습니다.");
    }

    return ResponseEntity.ok().body(map);
  }

}
