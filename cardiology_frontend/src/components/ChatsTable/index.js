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
    sessionStorage.setItem('doctorId', e.currentTarget.dataset.doctor);
    navigate(`/chat/${e.currentTarget.dataset.chat}`);
  }

  return (
    <>
      {chats && (
        <Wrapper>
          <h1>Chats</h1>
          <table className="table">
            <thead>
            </thead>
            <tbody>
              {chats.results.map(chat => (
                <tr onClick={handleClick} data-doctor={chat.doctor.id} data-chat={chat.id}>
                  <td><Image src={chat.doctor.img ? chat.doctor.img.url : null} alt={UserPic} /></td>
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
