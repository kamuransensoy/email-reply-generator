package com.email.writer.app;

import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/email")
@AllArgsConstructor
@CrossOrigin(origins = "*")
public class EmailGeneratorController {

    private final EmailGeneratorService emailGeneratorService;

    @PostMapping("/generate")
    public ResponseEntity<String> generateEmail(@RequestBody EmailRequest emailRequest){
        String response = emailGeneratorService.generateEmailReply(emailRequest);
        return ResponseEntity.ok(response);
    }

    @PostMapping("/summarize")
    public ResponseEntity<String> summarizeThread(@RequestBody EmailRequest emailRequest) {
        String summaryPrompt = "Summarize this email conversation:\n\n" + emailRequest.getEmailContent();
        String response = emailGeneratorService.sendPromptToGemini(summaryPrompt);
        return ResponseEntity.ok(response);
    }

}
