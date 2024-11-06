import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import { Link, useParams } from "react-router-dom";
import { Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "../../styles/chat.css";

const Chatrestaurant = () => {
  const { store, actions } = useContext(Context);
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessages] = useState("");
  const [chats, setChats] = useState([]);
  const [selectedComensal, setSelectedComensal] = useState(""); 
  const params = useParams();
  const [chatId, setChatId] = useState(null);
  const [comensalId, setComensalId] = useState(null);

  function removeChat (idToDelete) {
    fetch(process.env.BACKEND_URL + "/api/restaurant/" + idToDelete, {
      method: "DELETE",
      redirect: "follow",
    })
      .then((response) => response.text())
      .then(() => getActions().loadSomeData());
  }
  
  
  function getMessages(id_restaurant, id_client, id_chat, comensal_name) {
    fetch(`${process.env.BACKEND_URL}/api/messages/${id_restaurant}/${id_client}/${id_chat}`)
      .then((response) => response.json())
      .then((data) => {
        setMessages(Array.isArray(data) ? data : []);
        setSelectedComensal(comensal_name);
        console.log("estado autenticado", store.restaurant_auth)
      })
      .catch((error) => console.error("Error al cargar los mensajes:", error));
  }

  
  function getChats() {
    fetch(`${process.env.BACKEND_URL}/api/chat/restaurant/${params.id}`)
      .then((response) => response.json())
      .then((data) => setChats(data))
      .catch((error) => console.error("Error al cargar los chats:", error));
  }


  function sendMessage(id_restaurant, id_comensal, id_chat, message) {
    const currentDate = new Date();
    const message_date = currentDate.toISOString().split("T")[0];
    const message_time = currentDate.toTimeString().split(" ")[0];
    
    const payload = {
      id_restaurant: parseInt(id_restaurant, 10),
      id_comensal: parseInt(id_comensal, 10),
      id_chat: parseInt(id_chat, 10),
      message,
      origin: "Restaurant",
      message_date,
      message_time,
    };

    console.log("Payload:", payload);

    fetch(`${process.env.BACKEND_URL}/api/message/post`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    })
    .then((response) => response.json())
    .then(() => {
      getMessages(id_restaurant, id_comensal, id_chat, selectedComensal);
      setInputMessages("");
    })
    .catch(error => console.error("Error al enviar el mensaje:", error));
  }
  
  useEffect(() => {
    getChats();
  }, []);

  
  return (
    <>
    {store.restaurant_auth ? null : <Navigate to="/restauranteselect" />}
    <div className="container">
      <div className="row clearfix">
        <div className="col-lg-12">
          <div className="card chat-app">
            <div id="plist" className="people-list">
              <div className="input-group">
                <div className="input-group-prepend">
                  <span className="input-group-text">
                    <i className="fa fa-search"></i>
                  </span>
                </div>
                <input type="text" className="form-control" placeholder="Search..." />
              </div>
              <ul className="list-unstyled chat-list mt-2 mb-0">
                {chats.map((item, index) => (
                  <li 
                    onClick={() => {
                      getMessages(item.id_restaurant, item.id_comensal, item.id, `${item.comensal_details.name} ${item.comensal_details.last_name}`);
                      setComensalId(item.id_comensal);
                      setChatId(item.id);
                    }}
                    key={index} 
                    className="clearfix"
                  >
                    <img src="https://bootdey.com/img/Content/avatar/avatar1.png" alt="avatar" />
                    <div className="about">
                      <div className="name">{item.comensal_details.name} {item.comensal_details.last_name}</div>
                      <div className="status">
                        <i className="fa fa-circle offline"></i> left 7 mins ago
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
            <div className="chat">
              <div className="chat-header clearfix">
                <div className="row">
                  <div className="col-lg-6">
                    <a href="#" data-toggle="modal" data-target="#view_info">
                      <img src="https://bootdey.com/img/Content/avatar/avatar2.png" alt="avatar" />
                    </a>
                    <div className="chat-about">
                      <h6 className="m-b-0">{selectedComensal || "Selecciona un chat"}</h6>
                    </div>
                  </div>
                  <Link to={`/restaurant/${params.id}`}>
                    <div className="col-lg-6 hidden-sm text-right">
                      <button type="button" class="btn btn-outline-danger">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-box-arrow-left" viewBox="0 0 16 16">
                          <path fill-rule="evenodd" d="M6 12.5a.5.5 0 0 0 .5.5h8a.5.5 0 0 0 .5-.5v-9a.5.5 0 0 0-.5-.5h-8a.5.5 0 0 0-.5.5v2a.5.5 0 0 1-1 0v-2A1.5 1.5 0 0 1 6.5 2h8A1.5 1.5 0 0 1 16 3.5v9a1.5 1.5 0 0 1-1.5 1.5h-8A1.5 1.5 0 0 1 5 12.5v-2a.5.5 0 0 1 1 0z"></path>
                          <path fill-rule="evenodd" d="M.146 8.354a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L1.707 7.5H10.5a.5.5 0 0 1 0 1H1.707l2.147 2.146a.5.5 0 0 1-.708.708z"></path>
                        </svg>
                        Regresar
                      </button>
                    </div>
                  </Link>
                </div>
              </div>
              <div className="chat-history">
                <ul className="m-b-0">
                  {messages.map((item, index) => (
                    item.origin === "Restaurant" ? (
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
                    )
                  ))}
                </ul>
              </div>
              <div className="chat-message clearfix">
                <div className="input-group mb-0">
                  <div className="input-group-prepend">
                    <span 
                      onClick={() => {
                        sendMessage(params.id, comensalId, chatId, inputMessage);
                      }} 
                      className="input-group-text"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-send-fill" viewBox="0 0 16 16">
                        <path d="M15.964.686a.5.5 0 0 0-.65-.65L.767 5.855H.766l-.452.18a.5.5 0 0 0-.082.887l.41.26.001.002 4.995 3.178 3.178 4.995.002.002.26.41a.5.5 0 0 0 .886-.083zm-1.833 1.89L6.637 10.07l-.215-.338a.5.5 0 0 0-.154-.154l-.338-.215 7.494-7.494 1.178-.471z"/>
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
                <button onClick={() => getMessages(params.id, comensalId, chatId, selectedComensal)}>Obtener nuevos mensajes</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default Chatrestaurant;
