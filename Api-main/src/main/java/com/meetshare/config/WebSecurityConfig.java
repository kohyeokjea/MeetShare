package com.meetshare.config;

import java.util.List;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.convert.converter.Converter;
import org.springframework.http.HttpHeaders;
import org.springframework.http.RequestEntity;
import org.springframework.lang.NonNull;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.oauth2.client.endpoint.DefaultAuthorizationCodeTokenResponseClient;
import org.springframework.security.oauth2.client.endpoint.OAuth2AuthorizationCodeGrantRequest;
import org.springframework.security.oauth2.client.endpoint.OAuth2AuthorizationCodeGrantRequestEntityConverter;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.filter.CorsFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import com.meetshare.security.JwtTokenFilter;
import com.meetshare.security.JwtTokenProvider;
import com.meetshare.service.CustomOAuth2UserService;

@Configuration
@EnableWebSecurity
public class WebSecurityConfig {

  /* 네이버 로그인 관련 키 */
  @Value("${spring.security.oauth2.client.registration.naver.client-id}")
  private String naverClientId;
  @Value("${spring.security.oauth2.client.registration.naver.client-secret}")
  private String naverClientSecret;

  /* 카카오 로그인 관련 키 */
  @Value("${spring.security.oauth2.client.registration.kakao.client-id}")
  private String kakaoClientId;
  @Value("${spring.security.oauth2.client.registration.kakao.client-secret}")
  private String kakaoClientSecret;

  /* jwt */
  private final JwtTokenFilter jwtTokenFilter;

  public WebSecurityConfig(JwtTokenFilter jwtTokenFilter) {
    this.jwtTokenFilter = jwtTokenFilter;
  }

  @Bean
  public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
    http
        .cors(cors -> cors.configurationSource(corsConfigurationSource())) // CORS 설정
        .csrf(csrf -> csrf.disable()) // CSRF 비활성화
        .authorizeHttpRequests(auth -> auth
            .requestMatchers("/").permitAll() // 인증이 필요없는 URL 설정
            .anyRequest().authenticated())
        .oauth2Login(oauth2 -> oauth2
            .loginPage("http://localhost:3000")
            .defaultSuccessUrl("/user/login", true) // 로그인 성공 후, 리다이렉트 URL 설정
            .failureUrl("/?error=true")
            .tokenEndpoint(tokenEndpoint -> tokenEndpoint
                .accessTokenResponseClient(customAccessTokenResponseClient()))
            .userInfoEndpoint(userInfo -> userInfo
                .userService(customOAuth2UserService())))
        .logout(logout -> logout.disable())
        // .logoutUrl("/logout") // 로그아웃 URL
        // .logoutSuccessUrl("/user/logout") // 로그아웃 성공 후, 리다이렉트 URL 설정
        // .invalidateHttpSession(true)
        // .deleteCookies("JSESSIONID"))
        .addFilterAfter(jwtTokenFilter, CorsFilter.class); // JwtTokenFilter 등록

    return http.build();
  }

  /*
   * Spring Security CORS 설정
   */
  @Bean
  public CorsConfigurationSource corsConfigurationSource() {
    CorsConfiguration configuration = new CorsConfiguration();

    configuration.setAllowCredentials(true);
    configuration.setAllowedOrigins(List.of("http://localhost:3000")); // React 앱의 URL
    configuration.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE", "OPTIONS"));
    configuration.setAllowedHeaders(List.of("*"));
    configuration.setExposedHeaders(List.of("*"));

    UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
    source.registerCorsConfiguration("/**", configuration);
    return source;
  }

  /**
   * OAuth2 로그인 시 사용자 정보 커스텀 서비스
   */
  @Bean
  public CustomOAuth2UserService customOAuth2UserService() {
    return new CustomOAuth2UserService();
  }

  /**
   * 엑세스 토큰 요청 시 필요한 헤더 정보 추가 메서드
   */
  private DefaultAuthorizationCodeTokenResponseClient customAccessTokenResponseClient() {
    DefaultAuthorizationCodeTokenResponseClient client = new DefaultAuthorizationCodeTokenResponseClient();

    client.setRequestEntityConverter(new Converter<OAuth2AuthorizationCodeGrantRequest, RequestEntity<?>>() {
      private final OAuth2AuthorizationCodeGrantRequestEntityConverter defaultConverter = new OAuth2AuthorizationCodeGrantRequestEntityConverter();

      @Override
      public RequestEntity<?> convert(@NonNull OAuth2AuthorizationCodeGrantRequest grantRequest) {
        RequestEntity<?> requestEntity = defaultConverter.convert(grantRequest);

        // 새로운 HttpHeaders 생성 후 인증 정보 추가
        HttpHeaders headers = new HttpHeaders();
        headers.putAll(requestEntity.getHeaders());

        // 네이버 로그인
        if (grantRequest.getClientRegistration().getRegistrationId().equals("naver")) {
          headers.setBasicAuth(naverClientId, naverClientSecret); // 네이버 client_id와 client_secret 설정
        }

        // 카카오 로그인
        if (grantRequest.getClientRegistration().getRegistrationId().equals("kakao")) {
          headers.setBasicAuth(kakaoClientId, kakaoClientSecret); // 카카오 client_id와 client_secret 설정
        }

        return new RequestEntity<>(requestEntity.getBody(), headers, requestEntity.getMethod(),
            requestEntity.getUrl());
      }
    });

    return client;
  }
}
