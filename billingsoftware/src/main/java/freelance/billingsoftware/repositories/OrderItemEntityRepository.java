package freelance.billingsoftware.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import freelance.billingsoftware.entities.OrderItemEntity;

public interface OrderItemEntityRepository extends JpaRepository<OrderItemEntity,Long>{

}
