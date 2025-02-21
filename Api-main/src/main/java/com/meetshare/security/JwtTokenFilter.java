package com.meetshare.security;

import java.io.IOException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@Component
public class JwtTokenFilter extends OncePerRequestFilter {

  @Autowired
  JwtTokenProvider jwtTokenProvider;

  @Override
  protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
      throws ServletException, IOException {

    String token = getTokenFromRequest(request);

    if (token != null && jwtTokenProvider.validateToken(token)) {
      // 토큰에서 사용자 정보 추출
      String userId = jwtTokenProvider.getUserId(token);

      // 인증 객체 생성
      UsernamePasswordAuthenticationToken authentication = new UsernamePasswordAuthenticationToken(userId, null,
          AuthorityUtils.NO_AUTHORITIES);
      authentication.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));

      // SecurityContext에 인증 정보 설정
      SecurityContextHolder.getContext().setAuthentication(authentication);
    }

    filterChain.doFilter(request, response);
  }

  /**
   * HTTP 요청에서 Authorization 헤더로부터 JWT 토큰 추출
   */
  private String getTokenFromRequest(HttpServletRequest request) {
    String bearerToken = request.getHeader("Authorization");

    if (bearerToken != null && bearerToken.startsWith("Bearer ")) {
      return bearerToken.substring(7); // "Bearer " 부분을 제거하고 토큰 반환
    }

    return null;
  }
}
