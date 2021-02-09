import React, { useState, useRef, useEffect, useContext } from "react";
import ReactEmoji from "react-emoji";
import { Form, Button, InputGroup } from "react-bootstrap";
import UserContext from "../../context/userContext";
import { socket } from "../services/services";
import LoginForm from "../LoginForm/loginForm";
import "./messaging.css";

export default function Messaging() {
  const [response, setResponse] = useState([]);
  const [message, setMsg] = useState("");
  const messageEl = useRef(null);
  const { userData } = useContext(UserContext);

  useEffect(() => {
    if (userData.user) {
      if (messageEl) {
        messageEl.current.addEventListener("DOMNodeInserted", (event) => {
          const { currentTarget: target } = event;
          target.scroll({ top: target.scrollHeight, behavior: "smooth" });
        });
      }
    }
    socket.on("chat_rcvd", (data) => {
      setResponse([
        ...response,
        {
          message: data.msg,
          username: data.user,
          time: data.time,
          id: data.id,
        },
      ]);
    });
    return () => socket.off("chat_rcvd");
  }, [response, userData.user]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (message === "") {
      return;
    }
    var currentDate = new Date();
    var currentTime = currentDate.getHours() + ":" + currentDate.getMinutes();
    socket.emit("chats", {
      msg: message,
      username: userData.user.displayname,
      time: currentTime,
    });
    setMsg("");
  };

  return (
    <div>
      {userData.user === undefined ? (
        <LoginForm />
      ) : (
        <div className="container">
          <div className="chatBox" ref={messageEl}>
            <div>
              {response.map((response, index) =>
                response.username === userData.user.displayname ? (
                  <div className="messageContainer justifyEnd" key={index}>
                    <div className="messageBox backgroundBlue">
                      <p className="messageText colorWhite">
                        {ReactEmoji.emojify(response.message)}
                      </p>
                      <br />
                      <p className="time">{response.time}</p>
                    </div>
                  </div>
                ) : (
                  <div className="messageContainer justifyStart" key={index}>
                    <div className="messageBox backgroundLight">
                      <p className="sentText p1-10">{response.username}</p>
                      <p className="messageText colorDark">
                        {ReactEmoji.emojify(response.message)}
                      </p>
                      <br />
                      <p className="time">{response.time}</p>
                    </div>
                  </div>
                )
              )}
            </div>
          </div>
          <div className="form">
            <Form onSubmit={handleSubmit}>
              <InputGroup className="mb-3">
                <Form.Control
                  type="text"
                  placeholder="Enter message"
                  value={message}
                  onChange={(e) => setMsg(e.target.value)}
                />
                <InputGroup.Append>
                  <Button type="submit">Send</Button>
                </InputGroup.Append>
              </InputGroup>
            </Form>
          </div>
        </div>
      )}
    </div>
  );
}
