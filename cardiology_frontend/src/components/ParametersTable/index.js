import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import jsreport from "@jsreport/browser-client";
// API
import API from "../../API";
// Components
import ButtonDark from "../ButtonDark";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
// Hook
import { useParametersFetch } from "../../hooks/useParametersFetch";
// Styles 
import { Wrapper } from "./ParametersTable.styles";

const style = {
  position: 'absolute',
  display: 'flex',
  justifyContent: 'center',
  flexDirection: 'column',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 600,
  bgcolor: 'background.paper',
  border: '1px solid #000',
  borderRadius: '50px',
  boxShadow: 24,
  p: 4,
  h1: { color: '#1c1c1c', marginLeft: '30%' },
  '.modalButtons': {
    display: 'flex',
    flexDirection: 'row',
  }
};

const ParametersTable = ({ report, updatable, templateId }) => {
  const { state: parameters } = useParametersFetch();

  const [parameterId, setParameterId] = useState('');

  const [open, setOpen] = useState(false);

  const navigate = useNavigate();

  const handleClick = (e) => {
    if (updatable) {
      navigate(`/put-parameter/${e.currentTarget.dataset.value}`);

    } else {
      setParameterId(e.currentTarget.dataset.value);
      sessionStorage.setItem('parameterId', e.currentTarget.dataset.value);
    }

  }

  const handleReport = async () => {
    jsreport.serverUrl = 'http://localhost:5488';

    const report = await jsreport.render({
      template: {
        name: 'ParametersCount'
      },
      data: {
        data: parameters.results
      }

    })

    report.openInWindow({ title: 'My Patients Report' });
  }

  const handleReportPDF = async () => {
    jsreport.serverUrl = 'http://localhost:5488';

    const report = await jsreport.render({
      template: {
        name: 'ParametersCount(pdf)'
      },
      data: {
        data: parameters.results
      }

    })

    report.openInWindow({ title: 'My Patients Report' });
  }

  const handleAdd = async () => {
    try {

      const formData = new FormData();

      formData.append('followuptemplates_parameter[followuptemplate_id]', templateId);
      formData.append('followuptemplates_parameter[parameter_id]', parameterId);

      await API.createTemplateParam(formData);

      setParameterId('');

      window.location.reload();

    } catch (error) {

    }
  }

  const handleOpen = () => {
    setOpen(true);
  }

  const handleClose = () => {
    setOpen(false);
  }

  return (
    <>
      {parameters && (
        <>
          <Wrapper>
            <h1>Parameters</h1>
            <table className="table table-striped table-hover table-border table-bordered">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Kind</th>
                  <th>Frequency</th>
                </tr>
              </thead>
              <tbody>
                {parameters.results.map(parameter => (
                  <>
                    {parameter.hospital_id == localStorage.userHosp ? (
                      <tr onClick={handleClick} data-value={parameter.id} >
                        <td>{parameter.name}</td>
                        <td>{parameter.kind}</td>
                        <td>{parameter.frequency}</td>
                      </tr>
                    ) : null}
                  </>
                ))}
              </tbody>
            </table>
          </Wrapper>
          {report && (
            <>
              <ButtonDark text="Number of templates" callback={handleOpen} />
              <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
              >
                <Box sx={style}>
                  <h1>Choose an option</h1>
                  <div className="modalButtons">
                    <ButtonDark text="Online" callback={handleReport} />
                    <ButtonDark text="PDF" callback={handleReportPDF} />
                  </div>
                </Box>
              </Modal>
            </>
          )}
          {parameterId != '' && (
            <ButtonDark text="Add Parameter" callback={handleAdd} />
          )}
        </>
      )}
    </>
  )
}

export default ParametersTable;
