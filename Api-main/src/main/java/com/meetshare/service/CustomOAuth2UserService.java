package com.meetshare.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.meetshare.dao.UserDAO;
import com.meetshare.dto.user.UserDTO;

import java.util.Map;

@Service
public class CustomOAuth2UserService extends DefaultOAuth2UserService {

  @Autowired
  private UserDAO userDAO;

  @Override
  @Transactional
  public OAuth2User loadUser(OAuth2UserRequest userRequest) {
    OAuth2User oAuth2User = super.loadUser(userRequest);

    String registrationId = userRequest.getClientRegistration().getRegistrationId();

    String name = null;
    String email = null;
    String phone = null;
    String year = null;
    String date = null;

    try {
      if ("naver".equals(registrationId)) { // 네이버 로그인
        @SuppressWarnings("unchecked")
        Map<String, Object> response = (Map<String, Object>) oAuth2User.getAttributes().get("response");
        name = (String) response.get("name");
        email = (String) response.get("email");
        phone = (String) response.get("mobile");
        year = (String) response.get("birthyear");
        date = (String) response.get("birthday");

      } else if ("kakao".equals(registrationId)) { // 카카오 로그인
        Map<String, Object> attributes = oAuth2User.getAttributes();

        @SuppressWarnings("unchecked")
        Map<String, Object> kakaoAccount = (Map<String, Object>) attributes.get("kakao_account");

        if (kakaoAccount != null) {
          email = (String) kakaoAccount.get("email");

          @SuppressWarnings("unchecked")
          Map<String, Object> profile = (Map<String, Object>) kakaoAccount.get("profile");

          if (profile != null) {
            name = (String) profile.get("nickname");
          }
          year = (String) kakaoAccount.get("birthyear");
          date = formatBirthday((String) kakaoAccount.get("birthday"));
          phone = formatPhoneNumber((String) kakaoAccount.get("phone_number"));
        }
      }

    } catch (ClassCastException e) {
      System.err.println("Error casting attributes in response: " + e.getMessage());
    } catch (Exception e) {
      System.err.println("General error processing OAuth2 user information: " + e.getMessage());
    }

    saveOrUpdateUser(name, email, phone, year, date);
    return oAuth2User;
  }

  /**
   * 사용자 정보를 DB에 저장/업데이트 하는 메서드
   */
  private void saveOrUpdateUser(String name, String email, String phone, String year, String date) {
    if (email == null)
      return;

    UserDTO userDTO = userDAO.selectUserInfoByEmail(email);
    if (userDTO == null) { // 회원가입
      userDTO = new UserDTO();
      userDTO.setName(name);
      userDTO.setEmail(email);
      userDTO.setPhone(phone);
      userDTO.setYear(year);
      userDTO.setDate(date);
      userDAO.insertUserInfo(userDTO);
    } else { // 로그인
      userDTO.setName(name);
      userDTO.setPhone(phone);
      userDTO.setYear(year);
      userDTO.setDate(date);
      userDAO.updateUserInfo(userDTO);
    }
  }

  /**
   * 휴대폰 번호 포맷 메서드
   */
  private String formatPhoneNumber(String phoneNumber) {
    if (phoneNumber != null && phoneNumber.startsWith("+82")) {
      phoneNumber = "0" + phoneNumber.substring(4).replaceAll(" ", "");
    }
    return phoneNumber;
  }

  /**
   * 생일 날짜 포맷 메서드
   */
  private String formatBirthday(String birthday) {
    if (birthday != null && birthday.length() == 4) {
      return birthday.substring(0, 2) + "-" + birthday.substring(2);
    }
    return birthday;
  }
}
