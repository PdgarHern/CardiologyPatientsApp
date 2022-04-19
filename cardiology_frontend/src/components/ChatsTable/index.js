import React from "react";
import { useNavigate } from "react-router-dom";
// Components
import ButtonDark from "../ButtonDark";
import SearchBar from "../SearchBar";
// Hook
import { useChatFetch } from "../../hooks/useChatFetch";
// Styles 
import { Wrapper, Image } from "./ChatsTable.styles";
// Images
import UserPic from "../../images/userpic.png";

const ChatsTable = ({ id }) => {
  const { state: chats, searchTerm, setSearchTerm, setIsLoadingMore, setIsLoadingPrevious } = useChatFetch(null, id);

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
          <SearchBar placeholder={"Search Chat"} setSearchTerm={setSearchTerm} />
          <table className="table">
            <thead>
            </thead>
            <tbody>
              {chats.results.map(chat => (
                <>
                {console.log(chat)}
                <tr onClick={handleClick} data-doctor={chat.doctor.id} data-chat={chat.id}>
                  <td><Image src={chat.doctor.img ? chat.doctor.img.url : UserPic} alt={UserPic} /> {chat.doctor.name}</td>
                  <td>{chat.name}</td>
                </tr>
                </>
              ))}
            </tbody>
          </table>
          <div className="loadMoreButton">
          {chats.page === 1 ? (
                <button type="button" className="btn btn-light" disabled onClick={() => setIsLoadingPrevious(true)}>Previous</button>
              ) : (
                <button type="button" className="btn btn-light" onClick={() => setIsLoadingPrevious(true)}>Previous</button>
              )}
              {chats.page === chats.total_pages ? (
                <button type="button" className="btn btn-light" disabled onClick={() => setIsLoadingMore(true)}>Next</button>
              ) : (
                <button type="button" className="btn btn-light" onClick={() => setIsLoadingMore(true)}>Next</button>
              )}
          </div>
        </Wrapper>
      )}
    </>
  )
}

export default ChatsTable;
