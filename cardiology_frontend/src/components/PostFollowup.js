import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
// API
import API from "../API";
// Components
import BreadCrumb from "./BreadCrumb";
import TemplatesTable from "./TemplatesTable";
import ButtonDark from "./ButtonDark";
import Spinner from "./Spinner";
// Hook
import { useTemplatesFetch } from "../hooks/useTemplatesFetch";
// Styles
import { Wrapper } from "./Users.styles";

const PostFollowup = () => {
  const formData = new FormData();

  const { state: templates } = useTemplatesFetch();

  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [template, setTemplate] = useState('null');

  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const [startDateError, setStartDateError] = useState(false);
  const [endDateError, setEndDateError] = useState(false);
  const [templateError, setTemplateError] = useState(false);

  const navigate = useNavigate();

  const handleInput = (e) => {
    const name = e.currentTarget.name;
    const value = e.currentTarget.value;

    if (name === 'startDate') setStartDate(value);
    if (name === 'endDate') setEndDate(value);
    if (name === 'template') setTemplate(value);

  }

  const handleSubmit = async () => {
    try {
      if (startDate != '') {

        if (endDate != '') {

          if (template != 'null') {

            setLoading(true);

            formData.append('followup[startDate]', startDate);
            formData.append('followup[endDate]', endDate);
            formData.append('followup[doctor_id]', sessionStorage.doctorId);
            formData.append('followup[patient_id]', sessionStorage.patientId);
            formData.append('followup[hospital_id]', localStorage.userHosp);
            formData.append('followup[followuptemplate_id]', template);

            await API.createFollowUp(formData);

            setLoading(false);

            navigate(`/patient/${sessionStorage.patientId}`);

          } else {
            setTemplateError(true);
            setTimeout(() => {
              setTemplateError(false)
            }, 3500);
          }



        } else {
          setEndDateError(true);
          setTimeout(() => {
            setEndDateError(false)
          }, 3500);
        }

      } else {
        setStartDateError(true);
        setTimeout(() => {
          setStartDateError(false)
        }, 3500);
      }

    } catch (error) {
      setError(true);
      setTimeout(() => {
        setError(false);
        setLoading(false);
        setStartDate('');
        setEndDate('');
        window.location.reload();
      }, 2000);

    }

  }

  return (
    <>
      {sessionStorage.removeItem('templateId')}
      <BreadCrumb text="Create Followup" linkPath={`/patient/${sessionStorage.patientId}`} />
      <Wrapper>
        {error && <div className="error">Something went wrong...</div>}
        {!loading && !error ? (
          <>
            <label>Start Date</label>
            <input
              type='date'
              value={startDate}
              name='startDate'
              onChange={handleInput}
            />
            {startDateError && <div className="formError">*Select a date</div>}
            <label>End Date</label>
            <input
              type='date'
              value={endDate}
              name='endDate'
              onChange={handleInput}
            />
            {endDateError && <div className="formError">*Select a date</div>}
            <label>Template</label>
            <select id="selectTemplate" name='template' value={template} onChange={handleInput}>
              <option value='null'></option>
              {templates.results.map(template => (
                <>
                  {template.hospital_id == localStorage.userHosp ? (
                    <option value={template.id}>{template.name}</option>
                  ) : null}
                </>
              ))}
            </select>
            {templateError && <div className="formError">*Select a template</div>}
            <ButtonDark text='Submit' callback={handleSubmit} />
            <TemplatesTable select={true} />
          </>
        ) : (
          <Spinner />
        )}
      </Wrapper>
    </>
  )
}

export default PostFollowup;
