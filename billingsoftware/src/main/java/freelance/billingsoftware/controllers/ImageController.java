package freelance.billingsoftware.controllers;

import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.nio.file.Path;
import java.nio.file.Paths;

@RestController
@RequestMapping("/images")
@CrossOrigin(origins = "http://localhost:5173") 
public class ImageController {

    private final String UPLOAD_DIR = "/home/khz/billing-images/";

    @GetMapping("/{fileName:.+}")
    public ResponseEntity<Resource> serveImage(@PathVariable String fileName) {
        try {
            Path filePath = Paths.get(UPLOAD_DIR).resolve(fileName).normalize();
            Resource resource = new UrlResource(filePath.toUri());

            if (resource.exists() && resource.isReadable()) {
                String contentType = fileName.toLowerCase().endsWith(".png") ? 
                                     MediaType.IMAGE_PNG_VALUE : MediaType.IMAGE_JPEG_VALUE;
                
                return ResponseEntity.ok()
                        .header(HttpHeaders.CONTENT_TYPE, contentType)
                        .body(resource);
            } else {
                return ResponseEntity.notFound().build(); 
            }
        } catch (Exception e) {
            return ResponseEntity.internalServerError().build(); 
        }
    }
}