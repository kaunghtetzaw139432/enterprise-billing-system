package freelance.billingsoftware.controllers;

import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.stripe.exception.StripeException;

import freelance.billingsoftware.io.PaymentRequest;
import freelance.billingsoftware.io.PaymentVerificationRequest;
import freelance.billingsoftware.io.StripeOrderResponse;
import freelance.billingsoftware.services.OrderService;
import freelance.billingsoftware.services.StripeOrderService;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/payments")
@CrossOrigin(origins = "http://localhost:5173")
@RequiredArgsConstructor
public class PaymentController {

    private final StripeOrderService stripePaymentService;
    private final OrderService orderService; 

    @PostMapping("/create-order")
    @ResponseStatus(HttpStatus.CREATED)
    public StripeOrderResponse createStripeOrder(@RequestBody PaymentRequest paymentRequest) throws StripeException {
        return stripePaymentService.createOrder(
                paymentRequest.getAmount(),
                paymentRequest.getCurrency());
    }

   @PostMapping("/verify")
    public ResponseEntity<Map<String, Object>> verifyPayment(@RequestBody PaymentVerificationRequest request) { // <--- ဤနေရာကို ပြင်ထားပါသည်
        
        String paymentIntentId = request.getPaymentIntentId();

        if (paymentIntentId == null || paymentIntentId.isEmpty()) {
            return ResponseEntity.badRequest().body(Map.of("error", "paymentIntentId is required"));
        }

        try {
           
            boolean isSuccess = stripePaymentService.verifyPayment(paymentIntentId);
            
            if (isSuccess) {
              
                String orderId = request.getOrderId();
                if (orderId != null && !orderId.isEmpty()) {
                    orderService.updatePaymentStatusToCompleted(orderId,paymentIntentId);
                }
                
                return ResponseEntity.ok(Map.of(
                        "success", true,
                        "message", "Payment verified and order status updated to COMPLETED",
                        "orderId", orderId
                ));
            } else {
                return ResponseEntity.badRequest().body(Map.of(
                        "success", false,
                        "message", "Payment verification failed or pending"
                ));
            }
        } catch (StripeException e) {
         
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(Map.of(
                    "success", false,
                    "error", e.getMessage()
            ));
        }
    }
}