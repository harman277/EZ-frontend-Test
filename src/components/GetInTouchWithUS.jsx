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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setEmailError("");
    setFileError("");
    setApiError("");

    if (!email) {
      setEmailError("Email is required");
      return;
    }
    if (!file) {
      setFileError("Please select a file to upload");
      return;
    }

    try {
      // Step 1: Validate Email using API
      const emailResponse = await axios.post("https://test.ezworks.ai/api", { email });

      if (emailResponse.status === 422) {
        setEmailError("Emails ending with @ez.works are not allowed");
        return;
      }

      // Step 2: Proceed with File Upload
      const uploadResponse = await axios.post("https://test.ezworks.ai/upload-get-url", {
        email,
        file_name: file.name,
        chunk_size: 1024 * 1024,
        file_size: file.size,
      });

      if (uploadResponse.status === 200) {
        alert("File Uploaded Successfully!");
        setEmail("");
        setFile(null);
      }
    } catch (err) {
      if (err.response && err.response.status === 422) {
        setEmailError("Emails ending with @ez.works are not allowed");
      } else {
        setApiError("Something went wrong. Please try again.");
        console.error("API Error:", err);
      }
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
          <label htmlFor="file" className="form__label">Upload File:</label>
          <input
            type="file"
            id="file"
            className="form__input"
            onChange={(e) => setFile(e.target.files[0])}
          />
          {fileError && <span className="error-message">{fileError}</span>}
        </div>

        {apiError && <span className="error-message">{apiError}</span>}

        <button type="submit" className="form__button">Upload & Submit</button>
      </form>
    </div>
  );
};

export default GetInTouchWithUs;
