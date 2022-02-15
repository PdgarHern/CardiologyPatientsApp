import React from "react";
import { useParams } from "react-router-dom";
// Components
import BreadCrumb from "./BreadCrumb";
import Spinner from "./Spinner";
// Hook
import { useTemplateFetch } from "../hooks/useTemplateFetch";
// Styles
import { Wrapper, Content } from "./Users.styles";

const TemplateVisualizer = () => {
  const { templateId } = useParams();
  const { state: template, loading, error } = useTemplateFetch(templateId);

  return (
    <>
      <BreadCrumb text='Template' linkPath={'/post-followup'} />
      <Wrapper>
        {error && <div className="formError">Something went wrong...</div>}
        {!loading && !error ? (
          <></>
        ) : (
          <Spinner />
        )}
      </Wrapper>
    </>
  )
}

export default TemplateVisualizer;
