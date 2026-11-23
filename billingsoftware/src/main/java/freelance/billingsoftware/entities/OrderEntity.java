package freelance.billingsoftware.entities;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import freelance.billingsoftware.io.PaymentDetails;
import freelance.billingsoftware.io.PaymentMethod;

@Entity
@Table(name = "tbl_orders")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class OrderEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String orderId;

    private String customerName;

    private String phoneNumber;

    private Double subtotal;

    private Double tax;

    private Double grandTotal;

    private LocalDateTime createdAt;
    @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true)
    @JoinColumn(name = "order_id")
    private List<OrderItemEntity> items = new ArrayList<>();
    @Embedded 
    private PaymentDetails paymentDetails;
    
    @Enumerated (EnumType.STRING)
    private  PaymentMethod paymentMethod;

    @PrePersist
    protected void onCreate() {
        this.orderId = "ORD-" + System.currentTimeMillis();
        this.createdAt = LocalDateTime.now();
    }

}
