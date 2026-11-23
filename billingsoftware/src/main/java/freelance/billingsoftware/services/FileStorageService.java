package freelance.billingsoftware.services;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Service
public class FileStorageService {

    @Value("${file.upload.dir}")
    private String uploadDir;

    public String saveFile(MultipartFile file) throws IOException {
        if (file.isEmpty()) {
            throw new RuntimeException("File is empty");
        }
        Path uploadPath = Paths.get(uploadDir);
        if (!Files.exists(uploadPath)) {
            Files.createDirectories(uploadPath);
        }

        String originalName = file.getOriginalFilename();
        String extension = originalName.substring(originalName.lastIndexOf("."));
        String newFileName = UUID.randomUUID().toString() + extension;

        Path filePath = uploadPath.resolve(newFileName);
        Files.copy(file.getInputStream(), filePath, StandardCopyOption.REPLACE_EXISTING);
        return "/images/" + newFileName;
    }

    public String saveMultipleFiles(List<MultipartFile> files) throws IOException {
        List<String> fileUrls = new ArrayList<>();

        for (MultipartFile file : files) {
            if (!file.isEmpty()) {
                String url = this.saveFile(file);
                fileUrls.add(url);
            }
        }

        return String.join(",", fileUrls);
    }

   public boolean deleteFile(String imgUrl) {
        if (imgUrl == null || imgUrl.isEmpty()) {
            return true;
        }

        try {
            // URL ထဲက "/images/" ကို ဖယ်ထုတ်ပြီး ဖိုင်နာမည် အစစ်ကိုပဲ ယူပါ
            String fileName = imgUrl.replace("/images/", "");
            
            // Upload directory နဲ့ ဖိုင်နာမည်ကို ပြန်ဆက်ပေးပါ
            Path filePath = Paths.get(uploadDir).resolve(fileName).normalize();

            return Files.deleteIfExists(filePath);

        } catch (IOException e) {
            System.err.println("Error deleting file: " + e.getMessage());
            return false;
        }
    }
}