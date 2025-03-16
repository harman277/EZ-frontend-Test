import "../styles/GetInTouchWithUs.css";
import "../styles/MediaQuery.css";
import React, { useState } from "react";
import axios from "axios";

const GetInTouchWithUs = () => {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");

  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setEmailError("");
    setFileError("");
    setApiError("");

    if (!email) return setEmailError("Email is required.");
    if (!validateEmail(email)) return setEmailError("Invalid email format.");
    if (email.endsWith("@ez.works")) return setEmailError("Emails ending with @ez.works are not allowed.");

    const fileValidationError = validateFile(file);
    if (fileValidationError) return setFileError(fileValidationError);

    setIsLoading(true);

    try {
      // Step 1: Validate email
      const emailResponse = await axios.post(
        "https://test.ezworks.ai/api",
        { email },
        { headers: { "Content-Type": "application/json" } }
      );

      if (emailResponse.status === 422) return setEmailError("Emails ending with @ez.works are not allowed."); 
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
