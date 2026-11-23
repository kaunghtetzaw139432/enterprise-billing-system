package freelance.billingsoftware.util;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.function.Function;

@Component
public class JwtUtil {

    // လုံခြုံရေးအတွက် Secret Key (မိမိစိတ်ကြိုက် ရှည်ရှည်လျားလျားနှင့် ခန့်မှန်းရခက်သော စာသားကို ပြောင်းလဲအသုံးပြုနိုင်ပါသည်)
    private final String SECRET_KEY = "FreelanceBillingSoftwareSecretKeyForJwtAuthentication";

    // Token ၏ သက်တမ်းကို သတ်မှတ်ခြင်း (ဥပမာ - ၁၀ နာရီ)
    private final long EXPIRATION_TIME = 1000 * 60 * 60 * 10;

    // ၁။ Token ထဲမှ Username (Email) ကို ဆွဲထုတ်ခြင်း
    public String extractUsername(String token) {
        return extractClaim(token, Claims::getSubject);
    }

    // ၂။ Token ၏ သက်တမ်းကုန်ဆုံးမည့် အချိန်ကို ဆွဲထုတ်ခြင်း
    public Date extractExpiration(String token) {
        return extractClaim(token, Claims::getExpiration);
    }

    public <T> T extractClaim(String token, Function<Claims, T> claimsResolver) {
        final Claims claims = extractAllClaims(token);
        return claimsResolver.apply(claims);
    }

    // ၃။ Secret Key ကို အသုံးပြု၍ Token ကို ဖတ်ယူခြင်း
    private Claims extractAllClaims(String token) {
        return Jwts.parser()
                .setSigningKey(SECRET_KEY)
                .parseClaimsJws(token)
                .getBody();
    }

    // ၄။ Token သက်တမ်း ကုန်/မကုန် စစ်ဆေးခြင်း
    private Boolean isTokenExpired(String token) {
        return extractExpiration(token).before(new Date());
    }

    // ၅။ UserDetails (Username) ကို အခြေခံ၍ Token အသစ် ဖန်တီးပေးခြင်း
    public String generateToken(UserDetails userDetails) {
        Map<String, Object> claims = new HashMap<>();
        // လိုအပ်ပါက claims ထဲတွင် User ၏ Role သို့မဟုတ် အခြား အချက်အလက်များ ထပ်ထည့်နိုင်ပါသည်
        return createToken(claims, userDetails.getUsername());
    }

    // ၆။ တကယ်တမ်း JWT Token စာတန်းရှည်ကြီးကို တည်ဆောက်သည့်နေရာ
    private String createToken(Map<String, Object> claims, String subject) {
        return Jwts.builder()
                .setClaims(claims)
                .setSubject(subject)
                .setIssuedAt(new Date(System.currentTimeMillis())) // စတင်ထုတ်ပေးသည့်အချိန်
                .setExpiration(new Date(System.currentTimeMillis() + EXPIRATION_TIME)) // သက်တမ်းကုန်မည့်အချိန်
                .signWith(SignatureAlgorithm.HS256, SECRET_KEY) // HS256 နှင့် Secret Key အသုံးပြု၍ စာဝှက်ခြင်း
                .compact();
    }

    // ၇။ React ဘက်မှ ပို့လိုက်သော Token သည် အစစ်ဖြစ်ကြောင်း နှင့် သက်တမ်းမကုန်သေးကြောင်း စစ်ဆေးခြင်း
    public Boolean validateToken(String token, UserDetails userDetails) {
        final String username = extractUsername(token);
        return (username.equals(userDetails.getUsername()) && !isTokenExpired(token));
    }
}