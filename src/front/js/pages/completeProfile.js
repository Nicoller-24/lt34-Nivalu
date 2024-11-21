import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Cambiado de useHistory a useNavigate

export const CompleteProfile = () => {
  const navigate = useNavigate(); // Ahora usas navigate

  const [formInfo, setFormInfo] = useState({
    name: "",
    last_name: "",
    identification_number: "",
    phone_number: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const clientId = localStorage.getItem("client_id"); // O de alguna forma obtienes el ID del cliente

    const response = await fetch("/api/signup/client", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...formInfo, client_id: clientId }),
    });

    if (response.ok) {
      alert("Perfil completado correctamente");
      navigate("/dashboard"); // Usar navigate para redirigir
    } else {
      alert("Hubo un error al completar el perfil");
    }
  };

  return (
    <div className="p-3 m-auto w-75">
      <h1>Completa tu perfil</h1>

      <form onSubmit={handleSubmit}>
        <div className="form-group p-1">
          <label htmlFor="name">Nombre</label>
          <input
            type="text"
            name="name"
            placeholder="Nombre"
            value={formInfo.name}
            onChange={(e) => setFormInfo({ ...formInfo, name: e.target.value })}
            required
            className="form-control"
          />
        </div>

        <div className="form-group p-1">
          <label htmlFor="last_name">Apellido</label>
          <input
            type="text"
            name="last_name"
            placeholder="Apellido"
            value={formInfo.last_name}
            onChange={(e) =>
              setFormInfo({ ...formInfo, last_name: e.target.value })
            }
            required
            className="form-control"
          />
        </div>

        <div className="form-group p-1">
          <label htmlFor="identification_number">Cédula</label>
          <input
            type="text"
            name="identification_number"
            placeholder="Cédula"
            value={formInfo.identification_number}
            onChange={(e) =>
              setFormInfo({ ...formInfo, identification_number: e.target.value })
            }
            required
            className="form-control"
          />
        </div>

        <div className="form-group p-1">
          <label htmlFor="phone_number">Teléfono</label>
          <input
            type="text"
            name="phone_number"
            placeholder="Teléfono"
            value={formInfo.phone_number}
            onChange={(e) =>
              setFormInfo({ ...formInfo, phone_number: e.target.value })
            }
            required
            className="form-control"
          />
        </div>

        <button type="submit" className="btn btn-success">
          Completar Perfil
        </button>
      </form>
    </div>
  );
};