import React, { useState } from "react";
import { QRCodeCanvas } from "qrcode.react";
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";

const QRCodeGenerator = () => {
  const [selectedOption, setSelectedOption] = useState("WiFi");
  const [ssid, setSsid] = useState("");
  const [password, setPassword] = useState("");
  const [url, setUrl] = useState("");
  const [text, setText] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [smsMessage, setSmsMessage] = useState("");
  const [whatsappMessage, setWhatsappMessage] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [location, setLocation] = useState("");
  const [name, setName] = useState("");
  const [vEmail, setVEmail] = useState("");
  const [vPhone, setVPhone] = useState("");
  const [qrValue, setQrValue] = useState("");

  const handleGenerateQRCode = () => {
    let qrData = "";
    if (selectedOption === "WiFi") {
      qrData = `WIFI:S:${ssid};T:WPA;P:${password};;`;
    } else if (selectedOption === "URL") {
      qrData = url;
    } else if (selectedOption === "Text") {
      qrData = text;
    } else if (selectedOption === "SMS") {
      qrData = `sms:${phoneNumber}?body=${encodeURIComponent(smsMessage)}`;
    } else if (selectedOption === "WhatsApp") {
      qrData = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(whatsappMessage)}`;
    } else if (selectedOption === "Email") {
      qrData = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(message)}`;
    } else if (selectedOption === "Phone") {
      qrData = `tel:${phoneNumber}`;
    } else if (selectedOption === "Location") {
      qrData = `https://www.google.com/maps?q=${encodeURIComponent(location)}`;
    } else if (selectedOption === "VCard") {
      qrData = `BEGIN:VCARD\nVERSION:3.0\nFN:${name}\nEMAIL:${vEmail}\nTEL:${vPhone.replace(/[^0-9+]/g, '')}\nEND:VCARD`;
    }
    setQrValue(qrData);
  };

  const handleDownloadQRCode = () => {
    const canvas = document.querySelector(".qrcode canvas");
    const image = canvas.toDataURL("image/png").replace("image/png", "image/octet-stream");
    const link = document.createElement("a");
    link.href = image;
    link.download = "qrcode.png";
    link.click();
  };

  return (
    <Box sx={styles.container}>
      <Box sx={styles.formContainer}>
        <Typography variant="h4" gutterBottom>
          QR Code Generator
        </Typography>

        <FormControl fullWidth sx={{ mb: 3 }}>
          <InputLabel id="qr-code-type-label">QR Code Type</InputLabel>
          <Select
            labelId="qr-code-type-label"
            value={selectedOption}
            onChange={(e) => {
              setSelectedOption(e.target.value);
              setQrValue(""); // Reset QR code when type is changed
            }}
          >
            <MenuItem value="WiFi">WiFi</MenuItem>
            <MenuItem value="URL">URL</MenuItem>
            <MenuItem value="Text">Text</MenuItem>
            <MenuItem value="SMS">SMS</MenuItem>
            <MenuItem value="WhatsApp">WhatsApp</MenuItem>
            <MenuItem value="Email">Email</MenuItem>
            <MenuItem value="Phone">Phone Call</MenuItem>
            <MenuItem value="Location">Location</MenuItem>
            <MenuItem value="VCard">VCard</MenuItem>
          </Select>
        </FormControl>

        {/* Input fields based on selectedOption */}
        {selectedOption === "WiFi" && (
          <>
            <TextField
              label="WiFi SSID"
              variant="outlined"
              fullWidth
              value={ssid}
              onChange={(e) => {
                setSsid(e.target.value);
                setQrValue(""); // Reset QR code on input change
              }}
              sx={styles.input}
            />
            <TextField
              label="WiFi Password"
              type="password"
              variant="outlined"
              fullWidth
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setQrValue("");
              }}
              sx={styles.input}
            />
          </>
        )}

        {/* Continue with other input fields... */}
        {/* Show generated QR code and download button */}
        {qrValue && (
          <Box sx={styles.qrContainer} className="qrcode">
            <QRCodeCanvas value={qrValue} size={256} />
            <Button
              variant="contained"
              color="secondary"
              onClick={handleDownloadQRCode}
              sx={styles.downloadButton}
            >
              Download QR Code
            </Button>
          </Box>
        )}
      </Box>
    </Box>
  );
};

const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "100vh",
    backgroundColor: "#f5f5f5",
    padding: "20px",
  },
  formContainer: {
    backgroundColor: "#fff",
    padding: "30px",
    borderRadius: "10px",
    boxShadow: "0 5px 15px rgba(0,0,0,0.1)",
    textAlign: "center",
    width: "100%",
    maxWidth: "400px",
  },
  input: {
    marginBottom: "15px",
  },
  button: {
    marginBottom: "20px",
  },
  qrContainer: {
    marginTop: "20px",
  },
  downloadButton: {
    marginTop: "10px",
  },
};

export default QRCodeGenerator;
