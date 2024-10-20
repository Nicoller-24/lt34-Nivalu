"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""

from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User, Restaurant
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

@api.route('/restaurants', methods=['GET'])
def get_restaurants():
    all_restaurants = list(Restaurant.query.all()) 
    results = list(map(lambda restaurant: restaurant.serialize(), all_restaurants)) 

    return jsonify(results), 200

@api.route('/restaurant/<int:restaurant_id>', methods=['GET'])
def get_restaurant(restaurant_id):
    restaurant = Restaurant.query.filter_by(id=restaurant_id).first()
    
    if restaurant is None:
        return jsonify({"error": "Restaurante no encontrado"}), 404
    
    return jsonify(restaurant.serialize()), 200

@api.route("/singup/restaurant", methods=["POST"])
def singup():

    body = request.get_json()
    print(body)
    restaurant = Restaurant.query.filter_by(user_name=body["user_name"]).first()
    print(restaurant)
    if restaurant == None:
        restaurant = Restaurant(email=body["email"], guests_capacity=body["guests_capacity"],location=body["location"],name=body["name"],phone_number=body["phone_number"],user_name=["user_name"],password=body["password"], is_active=True)
        db.session.add(restaurant)
        db.session.commit()
        response_body = {
            "msg" : "Restaurante creado"
         }
        return jsonify(response_body), 200
    else:
       return jsonify(response_body = {"msg" : "el restaurante ya existe"}), 401
    
@api.route('/restaurant/<int:restaurant_id>', methods=['PUT'])
def update_restaurant(restaurant_id):
    body = request.get_json()

    restaurant = Restaurant.query.filter_by(id=restaurant_id).first()

    if restaurant is None:
        return jsonify({"error": "Restaurante no encontrado"}), 404

    if "user_name" in body:
        existing_restaurant = Restaurant.query.filter_by(user_name=body["user_name"]).first()

        if existing_restaurant and existing_restaurant.id != restaurant_id:
            return jsonify({"error": "El nombre de usuario ya está en uso"}), 400
        else:
            restaurant.user_name = body["user_name"]

    if "name" in body:
        restaurant.name = body["name"]
    if "location" in body:
        restaurant.location = body["location"]
    if "phone_number" in body:
        restaurant.phone_number = body["phone_number"]
    if "email" in body:
        restaurant.email = body["email"]
    if "guests_capacity" in body:
        restaurant.guests_capacity = body["guests_capacity"]
    if "password" in body:
        restaurant.password = body["password"]

    db.session.commit()

    return jsonify({"msg": "Restaurante actualizado con éxito", "restaurant": restaurant.serialize()}), 200


@api.route('/restaurant/<int:restaurant_id>', methods=['DELETE'])
def delete_planeta(restaurant_id):
    restaurant_to_delete = Restaurant.query.filter_by(id=restaurant_id).all()

    def deleterestaurant(item):
        return item.id == restaurant_id
    
    seleccion_de_restaurante = list(filter(deleterestaurant, restaurant_to_delete))

    if len(seleccion_de_restaurante) > 0:
        restaurante_a_eliminar = seleccion_de_restaurante[0]
        db.session.delete(restaurante_a_eliminar)
        db.session.commit()

        response_body = {"msg": "Se eliminó correctamente"}
    else:
        response_body = {"msg": "No se encontró el restaurante"}

    return jsonify(response_body), 200