import React from "react";
// Styles 
import { Wrapper } from "./FollowUpsTable.styles";

const FollowUpsTable = () => {
  return (
    <Wrapper>
      <table className="table table-striped table-hover table-border table-bordered">
        <thead>
          <tr>
            <th>Hola</th>
            <th>Adios</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Hola</td>
            <td>Adios</td>
          </tr>
          <tr>
            <td>Hola</td>
            <td>Adios</td>
          </tr>
        </tbody>
      </table>
    </Wrapper>
    
  )
}

export default FollowUpsTable;
