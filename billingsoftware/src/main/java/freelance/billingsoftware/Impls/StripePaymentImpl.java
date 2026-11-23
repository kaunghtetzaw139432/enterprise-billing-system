package freelance.billingsoftware.Impls;

import java.util.Date;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import com.stripe.Stripe;
import com.stripe.exception.StripeException;
import com.stripe.model.PaymentIntent;
import com.stripe.param.PaymentIntentCreateParams;

import freelance.billingsoftware.io.StripeOrderResponse;
import freelance.billingsoftware.services.StripeOrderService;
import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class StripePaymentImpl implements StripeOrderService {

    @Value("${stripe.api.secretKey}")
    private String secretKey;

    @PostConstruct
    public void init() {
        Stripe.apiKey = secretKey;
    }

    @Override
    public StripeOrderResponse createOrder(Double amount, String currency) throws StripeException {
        long amountInCents = (long) (amount * 100);

        PaymentIntentCreateParams params = PaymentIntentCreateParams.builder()
                .setAmount(amountInCents)
                .setCurrency(currency.toLowerCase())
                .build();
        PaymentIntent intent = PaymentIntent.create(params);

        return StripeOrderResponse.builder()
                .id("order_" + System.currentTimeMillis())

                .entity("order")

                .amount(intent.getAmount())
                .currency(intent.getCurrency())

                .status("created")

                .created_at(new Date(intent.getCreated() * 1000L))

                .receipt(intent.getClientSecret())
                .build();
    }

    @Override
    public boolean verifyPayment(String paymentIntentId) throws StripeException {

        PaymentIntent paymentIntent = PaymentIntent.retrieve(paymentIntentId);

        return "succeeded".equals(paymentIntent.getStatus());
    }
}