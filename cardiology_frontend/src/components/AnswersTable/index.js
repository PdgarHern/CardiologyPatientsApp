import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import jsreport from "@jsreport/browser-client";
// Components
import ButtonDark from "../ButtonDark";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
// Hook
import { useAnswersFetch } from "../../hooks/useAnswersFetch";
// Styles 
import { Wrapper } from "./AnswersTable.styles";

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

const AnswersTable = ({ id }) => {
  const { state: answers } = useAnswersFetch(id);

  const [open, setOpen] = useState(false);

  const navigate = useNavigate();

  var steps = [];

  const handleClick = (e) => {
    if (localStorage.userRol == 'patient') {
      sessionStorage.setItem('followupId', id);
      navigate(`/put-answer/${e.currentTarget.dataset.value}`);
    }
  }

  const getSteps = () => {
    answers.results.map((answer) => {
      if (answer.parameter.name == 'Steps') {
        steps.push(answer);
      }
    })
  }

  const handleStepsReport = async () => {

    jsreport.serverUrl = 'http://localhost:5488';

    const report = await jsreport.render({
      template: {
        name: 'StepsReport'
      },
      data: {
        data: steps
      }

    })

    report.openInWindow({ title: 'My Patients Report' });

  }

  const handleStepsReportPDF = async () => {

    jsreport.serverUrl = 'http://localhost:5488';

    const report = await jsreport.render({
      template: {
        name: 'StepsReport(pdf)'
      },
      data: {
        data: steps
      }

    })

    report.openInWindow({ title: 'My Patients Report' });

  }

  const handleOpen = () => {
    setOpen(true);
  }

  const handleClose = () => {
    setOpen(false);
  }

  return (
    <>
      {answers && (
        <>
          {getSteps()}
          <Wrapper>
            <h1>Answers</h1>
            <table className="table table-striped table-hover table-border table-bordered">
              <thead>
                <tr>
                  <th>Parameter</th>
                  <th>Value</th>
                  <th>Created at</th>
                </tr>
              </thead>
              <tbody>
                {answers.results.map(answer => (
                  <tr onClick={handleClick} data-value={answer.id}>
                    <td>{answer.parameter.name}</td>
                    <td>{answer.value}</td>
                    <td>{answer.created_at}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Wrapper>
          {steps.length > 0 && (
            <>
              <ButtonDark text="Steps Report" callback={handleOpen} />
              <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
              >
                <Box sx={style}>
                  <h1>Choose an option</h1>
                  <div className="modalButtons">
                    <ButtonDark text="Online" callback={handleStepsReport} />
                    <ButtonDark text="PDF" callback={handleStepsReportPDF} />
                  </div>
                </Box>
              </Modal>
            </>
          )}
        </>
      )}
    </>
  )
}

export default AnswersTable;
