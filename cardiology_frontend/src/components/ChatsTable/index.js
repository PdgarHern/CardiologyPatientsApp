import React from "react";
import { useNavigate } from "react-router-dom";
// Hook
import { useChatFetch } from "../../hooks/useChatFetch";
// Styles 
import { Wrapper, Image } from "./ChatsTable.styles";
// Images
import UserPic from "../../images/userpic.png";

const ChatsTable = ({ id }) => {
  const { state: chats } = useChatFetch(null, id);

  const navigate = useNavigate();

  const handleClick = (e) => {
    sessionStorage.setItem('doctorId', e.currentTarget.dataset.value);
    navigate(`/chat/${e.currentTarget.dataset.value}-${id}`);
  }

  return (
    <>
      {chats && (
        <Wrapper>
          <h1>Chats</h1>
          <table className="table table-striped table-hover table-border table-bordered">
            <thead>
            </thead>
            <tbody>
              {chats.results.map(chat => (
                <tr onClick={handleClick} data-value={chat.doctor.id}>
                  <td><Image src={chat.doctor.img.url} alt={UserPic} /></td>
                  <td>{chat.name}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Wrapper>
      )}
    </>
  )
}

export default ChatsTable;
