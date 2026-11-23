package freelance.billingsoftware.services;

import java.util.List;

import freelance.billingsoftware.io.UserRequest;
import freelance.billingsoftware.io.UserResponse;

public interface UserService {
    UserResponse createUser(UserRequest request);

    String getUserRole(String email);

    List<UserResponse> readUser();

    void deleteUser(String id);
}
