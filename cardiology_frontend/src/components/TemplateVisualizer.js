import React from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
// Components
import BreadCrumb from "./BreadCrumb";
import TemplateParametersTable from "./TemplateParametersTable";
import Spinner from "./Spinner";
// Hook
import { useTemplateFetch } from "../hooks/useTemplateFetch";
// Styles
import { Wrapper, Content } from "./Users.styles";

const TemplateVisualizer = () => {
  const { templateId } = useParams();
  const { state: template, loading, error } = useTemplateFetch(templateId);

  const navigate = useNavigate();

  const handleAuth = () => {
    navigate('/login');
  }

  return (
    <>
      {!localStorage.userId && (
        handleAuth()
      )}
      {localStorage.userRol != 'doctor' && (
        handleAuth()
      )}
      <BreadCrumb text='Template' linkPath={'/post-followup'} />
      <Wrapper>
        {error && <div className="formError">Something went wrong...</div>}
        {!loading && !error ? (
          <>
            {template && (
              <>
                <h1>Template: {template.name}</h1>
                <TemplateParametersTable templateId={templateId} />
              </>
            )}
          </>
        ) : (
          <Spinner />
        )}
      </Wrapper>
    </>
  )
}

export default TemplateVisualizer;
