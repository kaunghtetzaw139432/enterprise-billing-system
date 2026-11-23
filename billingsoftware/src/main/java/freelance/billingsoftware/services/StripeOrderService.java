package freelance.billingsoftware.services;

import com.stripe.exception.StripeException;

import freelance.billingsoftware.io.StripeOrderResponse;

public interface StripeOrderService {
    StripeOrderResponse createOrder(Double amount, String currency) throws StripeException;

    boolean verifyPayment(String paymentIntentId) throws StripeException;
}
