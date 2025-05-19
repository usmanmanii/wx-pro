import React from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

const ThankYouPage = () => {
  const navigate = useRouter();

  const goToHomepage = () => {
    navigate.push("/");
  };

  return (
    <div className="thank-you-container">
      <Image
        src="/assets/info.png"
        alt="doc emoji"
        className="emoji"
        width={60}
        height={60}
      />
      <h2>Thank You</h2>
      <p>
        Your information was submitted to our team of immigration attorneys.
        Expect an email from <strong>hello@tryalma.ai</strong>.
      </p>
      <button className="thank-you-button" onClick={goToHomepage}>
        Go Back to Homepage
      </button>
    </div>
  );
};

export default ThankYouPage;
