import { useEffect } from "react";
import { LikeMessage, PictureMessage, SmileMessage, VoiceMessage } from "../../../components/NavigationMenu/NavigationIcons";
import { UseRequest } from "../../../hook/UseRequest";
import { ALL_USERS_URL } from "../../../projectInfo";
import "./messageFooter.css";

const MessageFooterInput = ({ otherUser, activeUser }) => {
  const { patch } = UseRequest();

  const addNewMessage = async (e) => {
    e.preventDefault();
    const [input] = e.target;

    const newMessage = {
      id: activeUser.id,
      userMessage: [{ id: activeUser.id, text: input.value, time: new Date().getHours() + ":" + new Date().getMinutes() }],
    };

    let userMes = otherUser?.message?.find((el) => el.id === activeUser.id);
    if (userMes) {
      let obj = {
        ...userMes,
        userMessage: [...userMes.userMessage, { id: activeUser.id, text: input.value, time: new Date().getHours() + ":" + new Date().getMinutes() }],
      };

      let newArray = otherUser.message.map((el) => (el.id === obj.id ? obj : el));
      const result = await patch(ALL_USERS_URL + `/${otherUser.id}`, {
        message: newArray,
      });
      console.log(result, "if");
    } else {
      const result = await patch(ALL_USERS_URL + `/${otherUser.id}`, {
        message: [...otherUser.message, newMessage],
      });

      console.log(result, "el");
    }
    e.target.reset();
  };

  // useEffect(() => {}, []);

  return (
    <div className="messageFooter">
      <div className="footMessage">
        <div className="messageBlockInp">
          <form className="smileAndInputDiv" onSubmit={addNewMessage}>
            <SmileMessage />
            <input type="text" className="messageInput" placeholder="Message..." />
            <button>Submit</button>
          </form>
          <div className="messageIcons">
            <VoiceMessage />
            <PictureMessage />
            <LikeMessage />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MessageFooterInput;
