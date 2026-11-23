package freelance.billingsoftware.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import freelance.billingsoftware.entities.ItemEntity;
import java.util.Optional;


public interface ItemRepository extends JpaRepository<ItemEntity, Long> {

    Optional<ItemEntity> findByItemId(String id);

    Integer countByCategoryId(Long id);
}