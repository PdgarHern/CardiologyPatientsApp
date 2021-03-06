import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
// API
import API from "../API";
// Components
import BreadCrumb from "./BreadCrumb";
import TemplateParametersTable from "./TemplateParametersTable";
import ButtonDark from "./ButtonDark";
import Spinner from "./Spinner";
// Styles
import { Wrapper, Content } from "./Users.styles";

const PostTemplate = () => {
  const [name, setName] = useState('');

  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const [nameError, setNameError] = useState(false);

  const navigate = useNavigate();

  const handleInput = (e) => {
    setName(e.currentTarget.value);
  }

  const handleSubmit = async () => {
    try {
      if (name != '') {

        setLoading(true);

        const formData = new FormData();

        formData.append('followuptemplate[name]', name);
        formData.append('followuptemplate[hospital_id]', localStorage.userHosp);

        await API.createTemplate(formData);

        setLoading(false);

        navigate('/templates');

      } else {
        setNameError(true);
        setTimeout(() => {
          setNameError(false)
        }, 3500);
      }
    } catch (error) {
      setError(true);
      setTimeout(() => {
        setError(false);
        setLoading(false);
        setName('');
        window.location.reload();
      }, 2000);

    }
  }

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
      <BreadCrumb text="Create Template" linkPath={`/templates`} />
      <Wrapper>
        {error && <div className="error">Something went wrong...</div>}
        {!loading && !error ? (
          <>
            <label>Name</label>
            <input
              type='text'
              value={name}
              name='name'
              onChange={handleInput}
            />
            {nameError && <div className="formError">*Write a name</div>}
            <ButtonDark text="Submit" callback={handleSubmit} />
            <br />
            {/* <Wrapper>
              <Content>
                <div className="tables">
                  <TemplateParametersTable templateId={templateId} />
                </div>
                <div className="tables">
                  <ParametersTable template={true} updatable={false} templateId={templateId} />
                </div>
              </Content>
            </Wrapper> */}
          </>
        ) : (
          <Spinner />
        )}
      </Wrapper>
    </>
  )
}

export default PostTemplate;
