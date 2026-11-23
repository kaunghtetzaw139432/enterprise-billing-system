package freelance.billingsoftware.controllers;

import java.time.LocalDate;
import java.util.List;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import freelance.billingsoftware.io.DashboardResponse;
import freelance.billingsoftware.io.OrderResponse;
import freelance.billingsoftware.services.OrderService;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/dashboard")
@CrossOrigin(origins = "http://localhost:5173")
@RequiredArgsConstructor
public class DashboardController {
    private final OrderService orderService;

    @GetMapping
    public DashboardResponse getDashboardData() {
        LocalDate today = LocalDate.now();
        Double todaySale = orderService.sumSalesByDate(today);
        Long todayOrderCount = orderService.countByOrderDate(today);
        List<OrderResponse> recentOrders = orderService.findRecentOrders();
        return new DashboardResponse(
                todaySale != null ? todaySale : 0.0,
                todayOrderCount != null ? todayOrderCount : 0,
                recentOrders);
    }
}
