package com.meetshare.security;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import java.security.Key;
import java.util.Date;
import org.springframework.stereotype.Component;

@Component
public class JwtTokenProvider {

  private final Key key = Keys.secretKeyFor(SignatureAlgorithm.HS256); // Secret 키 생성
  private final long validityInMilliseconds = 3600000; // 1시간 유효 기간

  // JWT 토큰 생성
  public String createToken(String userId) {
    Date now = new Date();
    Date validity = new Date(now.getTime() + validityInMilliseconds);

    return Jwts.builder()
        .setSubject(userId)
        .setIssuedAt(now)
        .setExpiration(validity)
        .signWith(key)
        .compact();
  }

  // JWT 토큰 검증
  public boolean validateToken(String token) {
    try {
      Jwts.parserBuilder().setSigningKey(key).build().parseClaimsJws(token);
      return true;
    } catch (Exception e) {
      return false;
    }
  }

  // JWT에서 사용자 ID 추출
  public String getUserId(String token) {
    return Jwts.parserBuilder().setSigningKey(key).build().parseClaimsJws(token).getBody().getSubject();
  }
}
