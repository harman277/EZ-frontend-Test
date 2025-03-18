import "../styles/GetInTouchWithUs.css";
import "../styles/MediaQuery.css";
import React, { useState } from "react";
import axios from "axios";

const GetInTouchWithUs = () => {
  const [email, setEmail] = useState("");
  const [file, setFile] = useState(null);
  const [emailError, setEmailError] = useState("");
  const [fileError, setFileError] = useState("");
  const [apiError, setApiError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const validateFile = (file) => {
    if (!file) return "Please select a file to upload.";
    if (file.type !== "text/plain") return "Only .txt files are allowed.";
    if (file.size > 10 * 1024 * 1024) return "File size must be less than 10MB.";
    return "";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setEmailError("");
    setFileError("");
    setApiError("");

    // Validate email
    if (!email) {
      setEmailError("Email is required.");
      return;
    }
    if (!validateEmail(email)) {
      setEmailError("Invalid email format.");
      return;
    }
    if (email.endsWith("@ez.works")) {
      setEmailError("Emails ending with @ez.works are not allowed.");
      return;
    }
    
    const fileValidationError = validateFile(file);
    if (fileValidationError) {
      setFileError(fileValidationError);
      return;
    }

    setIsLoading(true);

    try {
      const emailResponse = await axios.post(
        "https://test.ezworks.ai/api",
        { email },
        { headers: { "Content-Type": "application/json" } }
      );

      if (emailResponse.status === 422) {
        setEmailError("Emails ending with @ez.works are not allowed.");
        return;
      }

      const uploadUrlResponse = await axios.post(
        "https://test.ezworks.ai/upload-get-url",
        {
          file_name: file.name,
          chunk_size: 1024,
          file_size: file.size,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        }
      );

      const { upload_url, upload_id } = uploadUrlResponse.data;

      if (!upload_url || !upload_id) {
        throw new Error("Failed to get upload URL.");
      }

      const uploadFileResponse = await axios.put(upload_url, file, {
        headers: {
          "Content-Type": "text/plain",
        },
      });

      if (uploadFileResponse.status !== 200) {
        throw new Error("Failed to upload file.");
      }

      const uploadCompleteResponse = await axios.post(
        "https://test.ezworks.ai/upload-complete",
        {
          file_name: file.name,
          upload_id,
          parts: [],
        },
        { headers: { "Content-Type": "application/json" } }
      );

      if (uploadCompleteResponse.status === 200) {
        alert("File Uploaded Successfully!");
        setEmail("");
        setFile(null);
      }
    } catch (err) {
      setApiError(err.response?.data?.message || "Something went wrong. Please try again.");
      console.error("API Error:", err.response || err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="form__container">
      <form className="form" onSubmit={handleSubmit}>
        <div className="form__group">
          <label htmlFor="email" className="form__label">
            Enter Your Email:
          </label>
          <input
            type="email"
            id="email"
            name="email"
            className="form__input"
            placeholder="Enter Your Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {emailError && <span className="error-message">{emailError}</span>}
        </div>

        <div className="form__group">
          <label htmlFor="file" className="form__label">
            Upload File:
          </label>
          <input
            type="file"
            id="file"
            className="form__input"
            accept=".txt"
            onChange={(e) => setFile(e.target.files[0])}
          />
          {fileError && <span className="error-message">{fileError}</span>}
        </div>

        {apiError && <span className="error-message">{apiError}</span>}

        <button type="submit" className="form__button" disabled={isLoading}>
          {isLoading ? "Uploading..." : "Upload & Submit"}
        </button>
      </form>
    </div>
  );
};

export default GetInTouchWithUs;