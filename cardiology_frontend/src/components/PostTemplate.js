import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
// API
import API from "../API";
// Components
import BreadCrumb from "./BreadCrumb";
import ParametersTable from "./ParametersTable";
import ButtonDark from "./ButtonDark";
import Spinner from "./Spinner";
// Styles
import { Wrapper } from "./Users.styles";
import TemplatesTable from "./TemplatesTable";

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

        window.location.reload();

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

  return (
    <>
      <BreadCrumb text="Create Template" linkPath={`/doctor-profile/${localStorage.userId}`} />
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
            <br/>
            <TemplatesTable />
          </>
        ) : (
          <Spinner />
        )}
      </Wrapper>
    </>
  )
}

export default PostTemplate;
