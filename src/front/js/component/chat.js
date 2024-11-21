import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import { Link, useParams } from "react-router-dom";
import "../../styles/chat.css";
import { NavbarClient } from "./navbarclient";

const Chat = () => {
  const { store, actions } = useContext(Context);
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessages] = useState("");
  const [chats, setChats] = useState([]);
  const [selectedRestaurant, setSelectedRestaurant] = useState("");
  const [selectedImage, setSelectedImage] = useState("https://bootdey.com/img/Content/avatar/avatar2.png"); // Estado inicial de la imagen
  const [offcanvasOpen, setOffcanvasOpen] = useState(false);
  const params = useParams();
  const [chatId, setChatId] = useState(null);
  const [restaurantId, setRestaurantId] = useState(null);

  const handleToggleOffcanvas = (isOpen) => {
    setOffcanvasOpen(isOpen);
  };

  const getMessages = (id_restaurant, id_client, id_chat, restaurant_name, image_url) => {
    fetch(`${process.env.BACKEND_URL}/api/messages/${id_restaurant}/${id_client}/${id_chat}`)
      .then((response) => response.json())
      .then((data) => {
        setMessages(Array.isArray(data) ? data : []);
        setSelectedRestaurant(restaurant_name);
        setSelectedImage(image_url); // Actualiza la imagen seleccionada
      })
      .catch((error) => console.error("Error al cargar los mensajes:", error));
  };

  const getChats = () => {
    fetch(`${process.env.BACKEND_URL}/api/chat/client/${params.idclient}`)
      .then((response) => response.json())
      .then((data) => setChats(data))
      .catch((error) => console.error("Error al cargar los chats:", error));
  };

  const sendMessage = (id_restaurant, id_client, id_chat, message) => {
    const currentDate = new Date();
    const message_date = currentDate.toISOString().split("T")[0];
    const message_time = currentDate.toTimeString().split(" ")[0];

    const payload = {
      id_restaurant: parseInt(id_restaurant, 10),
      id_comensal: parseInt(id_client, 10),
      id_chat: parseInt(id_chat, 10),
      message,
      origin: "Client",
      message_date,
      message_time,
    };

    fetch(`${process.env.BACKEND_URL}/api/message/post`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    })
      .then((response) => response.json())
      .then(() => {
        getMessages(id_restaurant, id_client, id_chat, selectedRestaurant, selectedImage);
        setInputMessages("");
      })
      .catch((error) => console.error("Error al enviar el mensaje:", error));
  };

  useEffect(() => {
    getChats();
  }, [params.idclient]);

  useEffect(() => {
    if (chatId && restaurantId) {
      const interval = setInterval(() => {
        getMessages(restaurantId, params.idclient, chatId, selectedRestaurant, selectedImage);
      }, 2000);
      return () => clearInterval(interval);
    }
  }, [chatId, restaurantId, params.idclient, selectedRestaurant, selectedImage]);

  return (
    <div style={{ backgroundColor: "#f4f8fb", minHeight: "100vh" }}>
      <NavbarClient id={params.idclient} onToggle={handleToggleOffcanvas} />
      <div
        className="page-content"
        style={{
          padding: "2rem",
          marginLeft: offcanvasOpen ? "300px" : "0",
          transition: "margin-left 0.3s ease-in-out",
          minHeight: "calc(100vh - 8rem)",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <h1
          style={{
            fontSize: "2rem",
            fontFamily: "Nunito, sans-serif",
            color: "#012970",
            marginBottom: "1rem",
            paddingTop: "4rem"

          }}
        >
          Chats
        </h1>
        <div
          className="chat-container"
          style={{
            width: "100%",
            height: "calc(100vh - 12rem)",
            backgroundColor: "#ffffff",
            borderRadius: "8px",
            boxShadow: "rgb(0 0 255 / 13%) 0px 1px 9px 5px",
            overflow: "hidden",
          }}
        >
          <div className="row clearfix" style={{ height: "100%" }}>
            <div className="col-lg-12" style={{ height: "100%" }}>
              <div
                className="card chat-app"
                style={{
                  display: "flex",
                  flexDirection: "row",
                  height: "100%",
                }}
              >
                <div
                  id="plist"
                  className="people-list"
                  style={{
                    height: "100%",
                    overflowY: "auto",
                    borderRight: "1px solid #ddd",
                  }}
                >
                  <ul className="list-unstyled chat-list mt-2 mb-0">
                    {chats.map((item, index) => (
                      <li
                        key={index}
                        onClick={() => {
                          getMessages(
                            item.id_restaurant,
                            params.idclient,
                            item.id,
                            item.restaurant_details.name,
                            item.restaurant_details.image_url // Pasar la URL de la imagen
                          );
                          setRestaurantId(item.id_restaurant);
                          setChatId(item.id);
                        }}
                        className="clearfix"
                      >
                        <img
                          src={item.restaurant_details.image_url}
                          alt="avatar"
                          style={{
                            width: "40px",
                            height: "40px",
                            borderRadius: "50%",
                            marginRight: "10px",
                          }}
                        />
                        <div className="about">
                          <div className="name">{item.restaurant_details.name}</div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
                <div
                  className="chat"
                  style={{
                    flex: 1,
                    display: "flex",
                    flexDirection: "column",
                    overflowY: "hidden",
                  }}
                >
                  <div className="chat-header clearfix">
                    <div className="row">
                      <div className="col-lg-6 d-flex align-items-center">
                        <a href="#" data-toggle="modal" data-target="#view_info">
                          <img
                            src={selectedImage} // Imagen dinámica
                            alt="avatar"
                            style={{
                              width: "40px",
                              height: "40px",
                              borderRadius: "50%",
                              marginRight: "10px",
                            }}
                          />
                        </a>
                        <div className="chat-about">
                          <h6 className="m-b-0">{selectedRestaurant || "Selecciona un chat"}</h6>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div
                    className="chat-history"
                    style={{
                      flex: 1,
                      overflowY: "auto",
                      padding: "1rem",
                    }}
                  >
                    <ul className="m-b-0">
                      {messages.map((item, index) => (
                        <li key={index} className="clearfix">
                          {item.origin === "Client" ? (
                      <li key={index} className="clearfix">
                        <div className="message-data text-right">
                          <span className="message-data-time">{item.message_time}</span>
                        </div>
                        <div className="message other-message float-right">
                          {item.message}
                        </div>
                      </li>
                    ) : (
                      <li key={index} className="clearfix">
                        <div className="message-data">
                          <span className="message-data-time">{item.message_time}</span>
                        </div>
                        <div className="message my-message">{item.message}</div>
                      </li>
                    )}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="chat-message clearfix">
                    <div className="input-group mb-0">
                      <div className="input-group-prepend">
                        <span
                          onClick={() =>
                            sendMessage(restaurantId, params.idclient, chatId, inputMessage)
                          }
                          style={{
                            backgroundColor: "#e75b1e",
                            color: "#fff",
                            height: "39px",
                          }}
                          className="input-group-text"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            fill="currentColor"
                            className="bi bi-send-fill"
                            viewBox="0 0 16 16"
                          >
                            <path d="M15.964.686a.5.5 0 0 0-.65-.65L.767 5.855H.766l-.452.18a.5.5 0 0 0-.082.887l.41.26.001.002 4.995 3.178 3.178 4.995.002.002.26.41a.5.5 0 0 0 .886-.083zm-1.833 1.89L6.637 10.07l-.215-.338a.5.5 0 0 0-.154-.154l-.338-.215 7.494-7.494 1.178-.471z" />
                          </svg>
                        </span>
                      </div>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Enter text here..."
                        value={inputMessage}
                        onChange={(e) => setInputMessages(e.target.value)}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;
