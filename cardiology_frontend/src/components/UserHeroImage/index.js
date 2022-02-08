import React from "react";
import { useNavigate } from "react-router-dom";
// Components
import Button from "../Button";
// Styles
import { Wrapper, Content, Text, Image } from "./UserHeroImage.styles";

const UserHeroImage = ({ userPic, name }) => {
  const navigate = useNavigate();

  const handleEditButton = () => {
    navigate(`/update-doctor/${localStorage.userId}`);
  }

  return (
    <Wrapper>
      <Content>
        <div className='content'>
          <Image src={userPic} alt='user-pic' />
          <Text>
            <h1>{name}</h1>
          </Text>
        </div>
        <div className="configButton">
          <Button text='Edit Profile' callback={handleEditButton} />
        </div>
      </Content>
    </Wrapper>
  )

}

export default UserHeroImage;
