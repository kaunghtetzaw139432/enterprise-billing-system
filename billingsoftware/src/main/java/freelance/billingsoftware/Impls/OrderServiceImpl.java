package freelance.billingsoftware.Impls;

import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.stripe.exception.StripeException;

import freelance.billingsoftware.entities.OrderEntity;
import freelance.billingsoftware.entities.OrderItemEntity;
import freelance.billingsoftware.io.OrderRequest;
import freelance.billingsoftware.io.OrderResponse;
import freelance.billingsoftware.io.PaymentDetails;
import freelance.billingsoftware.io.PaymentMethod;
import freelance.billingsoftware.io.StripeOrderResponse;
import freelance.billingsoftware.repositories.OrderEntityRepository;
import freelance.billingsoftware.services.OrderService;
import freelance.billingsoftware.services.StripeOrderService;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class OrderServiceImpl implements OrderService {
    private final OrderEntityRepository repository;
    private final StripeOrderService stripeOrderService;

    @Override
    public OrderResponse createOrder(OrderRequest request) {
        OrderEntity newOrder = convertToOrderEntity(request);
        PaymentDetails paymentDetails = new PaymentDetails();

        PaymentMethod method = PaymentMethod.valueOf(request.getPaymentMethod());
        paymentDetails.setPaymentStatus(
                method == PaymentMethod.CASH ? PaymentDetails.PaymentStatus.COMPLETED
                        : PaymentDetails.PaymentStatus.PENDING);
        newOrder.setPaymentDetails(paymentDetails);

        List<OrderItemEntity> orderItems = request.getCartItems().stream().map(this::convertToOrderItemEntity)
                .collect(Collectors.toList());
        newOrder.setItems(orderItems);

        newOrder = repository.save(newOrder);

        OrderResponse response = convertToResponse(newOrder);
        if (method != PaymentMethod.CASH) {
            try {

                StripeOrderResponse stripeResponse = stripeOrderService.createOrder(
                        newOrder.getGrandTotal(),
                        "mmk");

                response.setReceipt(stripeResponse.getReceipt());

            } catch (StripeException e) {
                throw new RuntimeException("Failed to create Stripe Payment Intent: " + e.getMessage());
            }
        }

        return response;

    }

    private OrderResponse convertToResponse(OrderEntity newOrder) {
        return OrderResponse.builder()
                .orderId(newOrder.getOrderId())
                .customerName(newOrder.getCustomerName())
                .phoneNumber(newOrder.getPhoneNumber())
                .subtotal(newOrder.getSubtotal())
                .tax(newOrder.getTax())
                .grandTotal(newOrder.getGrandTotal())
                .paymentMethod(newOrder.getPaymentMethod())
                .items(newOrder.getItems().stream()
                        .map(this::convertToItemResponse)
                        .collect(Collectors.toList()))
                .paymentDetails(newOrder.getPaymentDetails())
                .createdAt(newOrder.getCreatedAt())
                .build();
    }

    private OrderEntity convertToOrderEntity(OrderRequest request) {
        return OrderEntity.builder()
                .customerName(request.getCustomerName())
                .phoneNumber(request.getPhoneNumber())
                .subtotal(request.getSubtotal())
                .tax(request.getTax())
                .grandTotal(request.getGrandTotal())
                .paymentMethod(PaymentMethod.valueOf(request.getPaymentMethod()))
                .build();
    }

    private OrderItemEntity convertToOrderItemEntity(OrderRequest.OrderItemRequest orderItemRequest) {
        return OrderItemEntity.builder()
                .itemId(orderItemRequest.getItemId())
                .name(orderItemRequest.getName())
                .price(orderItemRequest.getPrice())
                .quantity(orderItemRequest.getQuantity())
                .build();
    }

    private OrderResponse.OrderItemResponse convertToItemResponse(OrderItemEntity orderItemEntity) {
        return OrderResponse.OrderItemResponse.builder()
                .itemId(orderItemEntity.getItemId())
                .price(orderItemEntity.getPrice())
                .name(orderItemEntity.getName())
                .quantity(orderItemEntity.getQuantity())
                .build();
    }

    @Override
    public void deleteOrder(String orderId) {
        OrderEntity existingOrder = repository.findByOrderId(orderId)
                .orElseThrow(() -> new RuntimeException("Order not found"));
        repository.delete(existingOrder);
    }

    @Override
    public List<OrderResponse> getLatesOrders() {
        return repository.findAllByOrderByCreatedAtDesc().stream()
                .map(this::convertToResponse)
                .collect(Collectors.toList());
    }

    @Override
    public void updatePaymentStatusToCompleted(String orderId, String stripePaymentIntentId) {
        OrderEntity existingOrder = repository.findByOrderId(orderId)
                .orElseThrow(() -> new RuntimeException("Order not found with ID: " + orderId));

        PaymentDetails paymentDetails = existingOrder.getPaymentDetails();
        if (paymentDetails == null) {
            paymentDetails = new PaymentDetails();
        }

        paymentDetails.setPaymentStatus(PaymentDetails.PaymentStatus.COMPLETED);
        paymentDetails.setStripePaymentIntentId(stripePaymentIntentId);

        existingOrder.setPaymentDetails(paymentDetails);
        repository.save(existingOrder);
    }

    @Override
    public Double sumSalesByDate(LocalDate date) {
        return repository.sumSalesByDate(date);
    }

    @Override
    public Long countByOrderDate(LocalDate date) {
        return repository.countByOrderDate(date);
    }

    @Override
    public List<OrderResponse> findRecentOrders() {
        return repository.findRecentOrders(PageRequest.of(0, 5))
                .stream()
                .map(orderEntity -> convertToResponse(orderEntity))
                .collect(Collectors.toList());
    }

}
