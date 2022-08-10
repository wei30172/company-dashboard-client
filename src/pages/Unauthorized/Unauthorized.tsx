import React from "react";
import { useNavigate } from "react-router-dom";
import { ButtonWrapper } from "../../components";
import "./Unauthorized.scss";

const Unauthorized = () => {
  const navigate = useNavigate();
  const goBack = () => navigate(-1);

  return (
    <main className="unauthorized page-flex">
      <section>
        <h1>Unauthorized</h1>
        <br />
        <p>You do not have access to the requested page.</p>
        <ButtonWrapper className="btn" title="Go Back" onClick={goBack} />
      </section>
    </main>
  );
};

export default Unauthorized;
