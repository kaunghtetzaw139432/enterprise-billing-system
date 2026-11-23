package freelance.billingsoftware.config;

import java.util.List;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.ProviderManager;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityCustomizer;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;

import freelance.billingsoftware.filter.JwtRequestFilter;
import freelance.billingsoftware.services.AppUserDetailsService;
import lombok.RequiredArgsConstructor;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfig {
    private final AppUserDetailsService appUserDetailsService;
    private final JwtRequestFilter jwtRequestFilter;

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        // CorsFilter အား Spring Security ၏ Default ဖြင့် တွဲသုံးပါမည်
        http.cors(cors -> cors.configurationSource(corsConfigurationSource()))
                .csrf(AbstractHttpConfigurer::disable)
                .authorizeHttpRequests(auth -> auth
                        // OPTIONS Request များကို အမြဲတမ်း ခွင့်ပြုပါ (CORS ပြဿနာအတွက် အရေးကြီးသည်)
                        .requestMatchers(HttpMethod.OPTIONS, "/**").permitAll()

                        // /payments/** ကို လောလောဆယ် permitAll ထဲသို့ ထည့်၍ စမ်းသပ်ပါ
                        .requestMatchers("/auth/**", "/login", "/images/**", "/encode", "/payments/**",
                                "/api/v1.0/payments/**")
                        .permitAll()

                        .requestMatchers(
                                HttpMethod.GET,
                                "/admin/categories/**",
                                "/admin/items/**", "/dashboard")
                        .hasAnyRole("USER", "ADMIN")
                        .requestMatchers(
                                HttpMethod.POST,
                                "/admin/categories/**",
                                "/admin/items/**")
                        .hasAnyRole("ADMIN")

                        // /orders/** ကိုသာ Authenticated အဖြစ် ဆက်ထားပါမည်
                        .requestMatchers("/orders/**", "/api/v1.0/orders/**").hasAnyRole("USER", "ADMIN")

                        .requestMatchers(
                                HttpMethod.DELETE,
                                "/admin/categories/**",
                                "/admin/items/**")
                        .hasRole("ADMIN")
                        .requestMatchers("/admin/**").hasRole("ADMIN")
                        .anyRequest().authenticated())
                .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS));

        http.addFilterBefore(jwtRequestFilter,
                org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter.class);
        return http.build();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    // CORS Filter အား Bean အဖြစ် ထုတ်ထားခြင်း
    @Bean
    public CorsFilter corsFilter() {
        return new CorsFilter(corsConfigurationSource());
    }

    // CORS Configuration Source
    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration config = new CorsConfiguration();
        config.setAllowedOrigins(List.of("http://localhost:5173"));
        config.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"));
        // Authorization နှင့် အခြား Header များကို ခွင့်ပြုပါ
        config.setAllowedHeaders(List.of("Authorization", "Content-Type", "Accept", "Origin", "X-Requested-With"));
        config.setAllowCredentials(true);

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", config);
        return source;
    }

    @Bean
    public AuthenticationManager authenticationManager() {
        DaoAuthenticationProvider authProvider = new DaoAuthenticationProvider();
        authProvider.setUserDetailsService(appUserDetailsService);
        authProvider.setPasswordEncoder(passwordEncoder());
        return new ProviderManager(authProvider);
    }

    @Bean
    public WebSecurityCustomizer webSecurityCustomizer() {
        return (web) -> web.ignoring().requestMatchers("/api/v1.0/images/**");
    }
}