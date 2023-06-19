import React, { useState } from "react";
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  Checkbox,
  FormControlLabel,
  Paper,
  Button,
} from "@mui/material";

import "./formStyles.css";

const AccountForm = () => {
  const [accountType, setAccountType] = useState("Advanced");
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [serverAddress, setServerAddress] = useState("");
  const [serverPath, setServerPath] = useState("");
  const [port, setPort] = useState("");
  const [useSSL, setUseSSL] = useState(false);

  const handleAccountTypeChange = (event: any) => {
    setAccountType(event.target.value);
  };

  // Validate username (should be a valid email)
  const validateUserName = () => {
    if (userName.trim().length === 0) {
      return "Username is required";
    } else if (
      !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(userName)
    ) {
      return "Invalid email format";
    }
    return "";
  };

  // Validate password (should contain at least one letter, one number, and one special character)
  const validatePassword = () => {
    if (password.trim().length === 0) {
      return "Password is required";
    } else if (
      !/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]+$/.test(
        password
      )
    ) {
      return "Invalid password format. Should contain at least one letter, one number, and one special character.";
    }
    return "";
  };

  // Validate server address (supports IP addresses, domain names, and URLs)
  const validateServerAddress = () => {
    if (serverAddress.trim().length === 0) {
      return "Server address is required";
    } else if (
      !/^((https?:\/\/)?([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}|(\d{1,3}\.){3}\d{1,3})(\/[^\s]*)?$/.test(
        serverAddress
      )
    ) {
      return "Invalid server address format";
    }
    return "";
  };

  // Validate server path (should only contain alphanumeric characters and '/')
  const validateServerPath = () => {
    if (!/^[a-zA-Z0-9/]*$/.test(serverPath)) {
      return "Invalid server path";
    }
    return "";
  };

  // Validate port number (should be a valid number in the range 0-65535)
  const validatePort = () => {
    if (port.trim().length === 0) {
      return "Port is required";
    } else if (
      !/^\d+$/.test(port) ||
      parseInt(port) < 0 ||
      parseInt(port) > 65535
    ) {
      return "Invalid port number (0 - 65535)";
    }
    return "";
  };

  const isFormValid = () => {
    return (
      validateUserName() === "" &&
      validatePassword() === "" &&
      validateServerAddress() === "" &&
      (accountType === "Advanced"
        ? validateServerPath() === "" && validatePort() === ""
        : true)
    );
  };

  const handleSubmit = () => {
    if (isFormValid()) {
      const payload = {
        accountType,
        userName,
        password,
        serverAddress,
        ...(accountType === "Advanced" && {
          serverPath,
          port,
          useSSL,
        }),
      };

      console.log("Form submitted!");
      console.log("Payload:", payload);
      alert(JSON.stringify(payload));
    } else {
      console.log(
        "Form is not valid. Please fill in all mandatory fields correctly."
      );
    }
  };

  return (
    <Paper
      sx={{
        display: "flex",
        flexDirection: "column",
        padding: "1rem",
        gap: "1rem",
      }}
    >
      <FormControl>
        <InputLabel id="account-type-label">Account Type</InputLabel>
        <Select
          labelId="account-type-label"
          id="account-type-select"
          value={accountType}
          onChange={handleAccountTypeChange}
        >
          <MenuItem value="Advanced">Advanced</MenuItem>
          <MenuItem value="Manual">Manual</MenuItem>
        </Select>
      </FormControl>

      {accountType === "Advanced" && (
        <div
          style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
          className="account__form"
        >
          <TextField
            label="User Name"
            value={userName}
            onChange={event => setUserName(event.target.value)}
            error={validateUserName() !== ""}
            helperText={validateUserName()}
            required
          />
          <TextField
            label="Password"
            value={password}
            type="password"
            onChange={event => setPassword(event.target.value)}
            error={validatePassword() !== ""}
            helperText={validatePassword()}
            required
          />
          <TextField
            label="Server Address"
            value={serverAddress}
            onChange={event => setServerAddress(event.target.value)}
            error={validateServerAddress() !== ""}
            helperText={validateServerAddress()}
            required
          />
          <TextField
            label="Server Path"
            value={serverPath}
            onChange={event => setServerPath(event.target.value)}
            error={validateServerPath() !== ""}
            helperText={validateServerPath()}
          />
          <TextField
            label="Port"
            value={port}
            onChange={event => setPort(event.target.value)}
            error={validatePort() !== ""}
            helperText={validatePort()}
            required
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={useSSL}
                onChange={event => setUseSSL(event.target.checked)}
              />
            }
            label="Use SSL"
          />
        </div>
      )}

      {accountType === "Manual" && (
        <div className="account__form">
          <TextField
            label="User Name"
            value={userName}
            onChange={event => setUserName(event.target.value)}
            error={validateUserName() !== ""}
            helperText={validateUserName()}
            required
          />
          <TextField
            label="Password"
            value={password}
            type="password"
            onChange={event => setPassword(event.target.value)}
            error={validatePassword() !== ""}
            helperText={validatePassword()}
            required
          />
          <TextField
            label="Server Address"
            value={serverAddress}
            onChange={event => setServerAddress(event.target.value)}
            error={validateServerAddress() !== ""}
            helperText={validateServerAddress()}
            required
          />
        </div>
      )}

      <Button
        variant="contained"
        color="primary"
        onClick={handleSubmit}
        disabled={!isFormValid()}
      >
        Submit
      </Button>
    </Paper>
  );
};

export default AccountForm;
