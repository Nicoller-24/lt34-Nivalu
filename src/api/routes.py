"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""

from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User, Client
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from flask_jwt_extended import create_access_token
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required
from flask_jwt_extended import JWTManager

api = Blueprint('api', __name__)

# Allow CORS requests to this API
CORS(api)


@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }

    return jsonify(response_body), 200


@api.route('/clients', methods=['GET'])
def get_clients():
    all_clients = Client.query.all() 
    results = [client.serialize() for client in all_clients]  # lista por comprensión
    return jsonify(results), 200

@api.route('/client/<int:client_id>', methods=['GET'])
def get_client(client_id):
    client = Client.query.filter_by(id=client_id).first()
    if client is None:
        return jsonify({"error": "Cliente no se encontró"}), 404
    return jsonify(client.serialize()), 200

@api.route("/signup/client", methods=["POST"])  
def signup_client(): 
    body = request.get_json()
    client = Client.query.filter_by(email=body["email"]).first()
    if client is None:
        client = Client(
            name=body["name"],
            last_name=body["last_name"],  
            identification_number=body["id#"],
            email=body["email"],
            phone_number=body["phone_number"],
            password=body["password"],
            is_active=True
        )
        db.session.add(client)
        db.session.commit()
        response_body = {"msg": "Usuario creado con éxito"}
        return jsonify(response_body), 201 
    else:
        return jsonify({"msg": "Ya se encuentra un usuario registrado"}), 409  # Cambiado a 409

@api.route('/client/<int:client_id>', methods=['PUT'])
def update_client(client_id):  
    body = request.get_json()
    client = Client.query.filter_by(id=client_id).first()

    if client is None:
        return jsonify({"error": "Usuario no encontrado"}), 404

    if "email" in body:
        existing_client = Client.query.filter_by(email=body["email"]).first()  
        if existing_client and existing_client.id != client_id:
            return jsonify({"error": "El correo ya está en uso"}), 400
        client.email = body["email"]  # Revicion de existencia de usuarios por email

    if "name" in body:
        client.name = body["name"]
    if "last_name" in body:
        client.last_name = body["last_name"]  
    if "identification_number" in body:
        client.identification_number = body["identification_number"] 
    if "phone_number" in body:
        client.phone_number = body["phone_number"]  
    if "password" in body:
        client.password = body["password"]

    db.session.commit()
    return jsonify({"msg": "Usuario actualizado!", "client": client.serialize()}), 200

@api.route('/client/<int:client_id>', methods=['DELETE'])
def delete_client_user(client_id):
    user_to_delete = Client.query.filter_by(id=client_id).first()  
    if user_to_delete:
        db.session.delete(user_to_delete)
        db.session.commit()
        response_body = {"msg": "Se eliminó usuario correctamente"}
    else:
        response_body = {"msg": "No se encontró usuario"}
        return jsonify(response_body), 404  

    return jsonify(response_body), 200



