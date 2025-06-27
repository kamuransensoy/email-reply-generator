import { useState } from "react";
import axios from "axios";
import {
  Container,
  Box,
  Typography,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  Paper,
  CircularProgress
} from "@mui/material";

function App() {
  const [emailContent, setEmailContent] = useState("");
  const [tone, setTone] = useState("");
  const [generatedReply, setGeneratedReply] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [threadContent, setThreadContent] = useState('');
  const [threadSummary, setThreadSummary] = useState('');
  const [summarizing, setSummarizing] = useState(false);


  const handleSubmit = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await axios.post("http://localhost:8080/api/email/generate", {
        emailContent,
        tone
      });
      setGeneratedReply(typeof response.data === "string" ? response.data : JSON.stringify(response.data));
    } catch (error) {
      setError("❌ Failed to generate email reply. Please try again.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleSummarize = async () => {
    setSummarizing(true);
    setThreadSummary('');
    try {
      const response = await axios.post('http://localhost:8080/api/email/summarize', {
        threadContent
      });
      setThreadSummary(response.data);
    } catch (error) {
      console.error('Error summarizing thread:', error);
      setThreadSummary('Failed to summarize thread. Please try again.');
    } finally {
      setSummarizing(false);
    }
  };
  

  return (
    <Container maxWidth="md" sx={{ py: 6 }}>
      <Paper elevation={3} sx={{ p: 5, borderRadius: 4, backgroundColor: "#ffffffdd" }}>
        <Typography variant="h4" fontWeight={600} gutterBottom>
          📧 Email Reply Generator
        </Typography>

        <TextField
          fullWidth
          multiline
          rows={6}
          variant="outlined"
          label="Original Email Content"
          value={emailContent}
          onChange={(e) => setEmailContent(e.target.value)}
          sx={{ mb: 3 }}
        />

        <FormControl fullWidth sx={{ mb: 3 }}>
          <InputLabel id="tone-label">Tone (Optional)</InputLabel>
          <Select
            labelId="tone-label"
            id="tone-select"
            value={tone}
            label="Tone (Optional)"
            onChange={(e) => setTone(e.target.value)}
          >
            <MenuItem value="">None</MenuItem>
            <MenuItem value="professional">Professional</MenuItem>
            <MenuItem value="casual">Casual</MenuItem>
            <MenuItem value="friendly">Friendly</MenuItem>
            <MenuItem value="polite">Polite</MenuItem>
            <MenuItem value="enthusiastic">Enthusiastic</MenuItem>
            <MenuItem value="empathetic">Empathetic</MenuItem>
            <MenuItem value="apologetic">Apologetic</MenuItem>
            <MenuItem value="assertive">Assertive</MenuItem>
            <MenuItem value="cheerful">Cheerful</MenuItem>
            <MenuItem value="formal">Formal</MenuItem>
          </Select>
        </FormControl>

        <Button
          variant="contained"
          fullWidth
          size="large"
          sx={{ borderRadius: 3 }}
          onClick={handleSubmit}
          disabled={loading}
        >
          {loading ? <CircularProgress size={24} color="inherit" /> : "Generate Reply"}
        </Button>

        {error && (
          <Typography color="error" sx={{ mt: 2 }}>
            {error}
          </Typography>
        )}

          {generatedReply && (
          <Paper elevation={2} sx={{ mt: 4, p: 3, backgroundColor: "#f6f8fa", borderRadius: 2 }}>
          <Typography variant="subtitle1" gutterBottom>
            ✉️ Suggested Reply:
          </Typography>
          <Typography variant="body1" sx={{ whiteSpace: "pre-line", mb: 2 }}>
            {generatedReply}
          </Typography>
          <Button
            variant="outlined"
            onClick={handleSubmit}
            disabled={loading}
            sx={{ borderRadius: 3 }}
          >
            {loading ? <CircularProgress size={24} /> : "Generate Another Reply"}
          </Button>
        </Paper>
        )}
      </Paper>

      {/* Gmail Thread Summarizer */}
      <Paper elevation={3} sx={{ p: 5, mt: 5, borderRadius: 4, backgroundColor: "#ffffffdd" }}>
        <Typography variant="h5" fontWeight={600} gutterBottom>
          📬 Gmail Thread Summarizer
        </Typography>

        <TextField
          fullWidth
          multiline
          rows={6}
          variant="outlined"
          label="Paste Email Thread"
          value={threadContent}
          onChange={(e) => setThreadContent(e.target.value)}
          sx={{ mb: 3 }}
        />

        <Button
          variant="contained"
          onClick={handleSummarize}
          disabled={summarizing || !threadContent.trim()}
          sx={{ borderRadius: 3 }}
        >
          {summarizing ? <CircularProgress size={24} color="inherit" /> : "Summarize Thread"}
        </Button>

        {threadSummary && (
          <Paper elevation={1} sx={{ mt: 3, p: 3, backgroundColor: "#f6f8fa", borderRadius: 2 }}>
            <Typography variant="subtitle1" gutterBottom>
              📄 Summary:
            </Typography>
            <Typography variant="body1" sx={{ whiteSpace: "pre-line" }}>
              {threadSummary}
            </Typography>
          </Paper>
        )}
      </Paper>
    </Container>
  );
}

export default App;
