import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import 'reactjs-popup/dist/index.css';
// API
import API from "../API";
// Components
import BreadCrumb from "./BreadCrumb";
import ParametersTable from "./ParametersTable";
import TemplateParametersTable from "./TemplateParametersTable";
import ButtonDark from "./ButtonDark";
import Spinner from "./Spinner";
import Popup from 'reactjs-popup';
// Hook
import { useTemplateFetch } from "../hooks/useTemplateFetch";
// Styles
import { Wrapper, Content } from "./Users.styles";

const PutTemplate = () => {
  const { templateId } = useParams();
  const { state: template } = useTemplateFetch(templateId);

  const [name, setName] = useState('');

  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleValue = (e) => {
    setName(e.currentTarget.placeholder);
    e.currentTarget.placeholder = '';

  }

  const handleInput = (e) => {
    setName(e.currentTarget.value);

  }

  const handleSubmit = async () => {
    try {
      setError(false);
      setLoading(true);

      const formData = new FormData();

      if (name != '') formData.append('followuptemplate[name]', name);

      await API.updateTemplate(template.id, formData);

      setLoading(false);

      navigate('/post-template');

    } catch (error) {
      setError(true);
    }
  }

  const handleDelete = async () => {
    try {
      setError(false);
      setLoading(true);

      await API.deleteTemplate(template.id);

      navigate('/post-template');

    } catch (error) {
      setError(true);
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
      {template ? (
        <BreadCrumb text={template.name} linkPath={'/post-template'} />
      ) : null}
      <Wrapper>
        {error && <div className="error">There was an error...</div>}
        {!loading && template ? (
          <>
            <Content>
              <div className="column">
                <label>Name</label>
                <input
                  type='text'
                  value={name}
                  placeholder={template.name}
                  name='name'
                  onClick={handleValue}
                  onChange={handleInput}
                />
              </div>
            </Content>
            <div className="actionButtons">
              <ButtonDark text='Update' callback={handleSubmit} />
              <Popup trigger={<button className="triggerPopup">Delete</button>} modal nested>
                {close => (
                  <div className="modal">
                    <button className="close" onClick={close}>
                      &times;
                    </button>
                    <div className="header">Are you sure?</div>
                    <div className="content">
                      Do you want to delete the template?
                    </div>
                    <div className="actions">
                      <ButtonDark text="Confirm" callback={handleDelete} />
                      <ButtonDark text="Cancel" callback={() => close()} />
                    </div>
                  </div>
                )}
              </Popup>
            </div>
            <Content>
              <div className="tables">
                <TemplateParametersTable templateId={templateId} />
              </div>
              <div className="tables">
                <ParametersTable template={true} updatable={false} templateId={templateId} />
              </div>
            </Content>
          </>
        ) : (
          <>
            <Spinner />
            <div>Processing your request...</div>
          </>
        )}
      </Wrapper>
    </>
  )
}

export default PutTemplate;
