from flask import Flask, request, jsonify, Blueprint
from api.models import db, Restaurant
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from flask_jwt_extended import create_access_token, get_jwt_identity, jwt_required, JWTManager

api = Blueprint('api', __name__)
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

@api.route("/signup/restaurant", methods=["POST"])
def signup():
    body = request.get_json()
    restaurant = Restaurant.query.filter_by(email=body["email"]).first()
    if restaurant == None:
        restaurant = Restaurant(email=body["email"], guests_capacity=body["guests_capacity"], location=body["location"], name=body["name"], phone_number=body["phone_number"], password=body["password"], is_active=True)
        db.session.add(restaurant)
        db.session.commit()
        response_body = {"msg": "Restaurante creado"}
        return jsonify(response_body), 200
    else:
        return jsonify({"msg": "El restaurante ya existe"}), 401
    
    

@api.route('/restaurant/<int:restaurant_id>', methods=['PUT'])
def update_restaurant(restaurant_id):
    body = request.get_json()
    restaurant = Restaurant.query.filter_by(id=restaurant_id).first()
    if restaurant is None:
        return jsonify({"error": "Restaurante no encontrado"}), 404

    if "name" in body:
        restaurant.name = body["name"]
    if "location" in body:
        restaurant.location = body["location"]
    if "phone_number" in body:
        restaurant.phone_number = body["phone_number"]
    if "email" in body:
        existing_restaurant = Restaurant.query.filter_by(email=body["email"]).first()
        if existing_restaurant and existing_restaurant["id"] != restaurant_id:
            return jsonify({"error": "El email ya está en uso"}), 400
        else:
            restaurant.email = body["email"]
    if "guests_capacity" in body:
        restaurant.guests_capacity = body["guests_capacity"]
    if "password" in body:
        restaurant.password = body["password"]

    db.session.commit()
    return jsonify({"msg": "Restaurante actualizado con éxito", "restaurant": restaurant.serialize()}), 200

@api.route('/restaurant/<int:restaurant_id>', methods=['DELETE'])
def delete_restaurant(restaurant_id):
    restaurant_to_delete = Restaurant.query.get(restaurant_id)
    if restaurant_to_delete:
        db.session.delete(restaurant_to_delete)
        db.session.commit()
        response_body = {"msg": "Se eliminó correctamente"}
    else:
        response_body = {"msg": "No se encontró el restaurante"}
    return jsonify(response_body), 200
