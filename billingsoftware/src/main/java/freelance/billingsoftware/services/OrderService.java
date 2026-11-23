package freelance.billingsoftware.services;

import java.time.LocalDate;
import java.util.List;


import freelance.billingsoftware.io.OrderRequest;
import freelance.billingsoftware.io.OrderResponse;

public interface OrderService {
    OrderResponse createOrder(OrderRequest request);

    void deleteOrder(String orderId);

    List<OrderResponse> getLatesOrders();

    void updatePaymentStatusToCompleted(String orderId, String stripePaymentIntentId);

    Double sumSalesByDate(LocalDate date);

    Long countByOrderDate(LocalDate date);

    List<OrderResponse> findRecentOrders();

}
