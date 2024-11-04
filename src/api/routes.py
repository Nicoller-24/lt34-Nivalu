"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""

from api.models import db, User, Client, Reservations, Restaurant, Admin1, Ocasiones1, Category
from flask import Flask, request, jsonify, Blueprint
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
        restaurant = Restaurant(email=body["email"], guests_capacity=body["guests_capacity"], location=body["location"], name=body["name"], phone_number=body["phone_number"], password=body["password"],image_url=body["image_url"],latitude=body["latitude"],longitude=body["longitude"], is_active=True)
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
        if existing_restaurant and existing_restaurant.id != restaurant_id:
            return jsonify({"error": "El email ya está en uso"}), 400
        else:
            restaurant.email = body["email"]
    if "guests_capacity" in body:
        restaurant.guests_capacity = body["guests_capacity"]
    if "password" in body:
        restaurant.password = body["password"]
    if "image_url" in body:
        restaurant.image_url = body["image_url"]
    if "latitude" in body:
        restaurant.latitude = body["latitude"]
    if "longitude" in body:
        restaurant.longitude = body["longitude"]

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
            id=body["id"],
            name=body["name"],
            last_name=body["last_name"],  
            identification_number=body["identification_number"],
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
    
@api.route("/login/restaurant", methods=["POST"])
def login_restaurant():
    email = request.json.get("email", None)
    password = request.json.get("password", None)

    restaurant= Restaurant.query.filter_by(email=email).first()
    print(restaurant)

    if restaurant == None:
        return jsonify({"msg": "Could not find the email"}), 401

    if email != restaurant.email or password != restaurant.password:
        return jsonify({"msg": "Bad email or password"}), 401
    
    access_token = create_access_token(identity=email)
    return jsonify(access_token=access_token)

    return jsonify(response_body), 200


@api.route("/loginClient", methods=["POST"])
def login():
    email = request.json.get("email", None)
    password = request.json.get("password", None)

    user = Client.query.filter_by(email=email).first()

    if user == None:
        return jsonify({"msg": "Could not find you email"}), 401

    if email != user.email or password != user.password:
        return jsonify({"msg": "Bad email or password"}), 401

    access_token = create_access_token(identity=email)
    return jsonify(access_token=access_token, user_id= user.id)

@api.route('/admins', methods=['GET'])
def get_admins():
    all_admins = Admin1.query.all() 
    results = list(map(lambda admin1: admin1.serialize(), all_admins)) 

    return jsonify(results), 200

@api.route('/admins/<int:admin_id>', methods=['GET'])
def get_admin(admin_id):
    admin = Admin1.query.filter_by(id=admin_id).first()
    
    if admin is None:
        return jsonify({"error": "Usuario admin no encontrado"}), 404
    
    return jsonify(admin.serialize()), 200

@api.route("/signup/admins", methods=["POST"])
def signup_admin():
    body = request.get_json()
    admin = Admin1.query.filter_by(email=body["email"]).first()
    if admin == None:
        admin = Admin1(email=body["email"], name=body["name"], user_name=body["user_name"], password=body["password"], is_active=True)
        db.session.add(admin)
        db.session.commit()
        response_body = {"msg": "Usuario admin creado"}
        return jsonify(response_body), 200
    else:
        return jsonify({"msg": "El usuario admin ya existe"}), 401
    
@api.route('edit/admins/<int:admin_id>', methods=['PUT'])
def update_admin(admin_id):  
    body = request.get_json()
    admin = Admin1.query.filter_by(id=admin_id).first()

    if admin is None:
        return jsonify({"error": "Admin no encontrado"}), 404

    if "email" in body:
        existing_admin = Admin1.query.filter_by(email=body["email"]).first()  
        if existing_admin and existing_admin.id != admin_id:
            return jsonify({"error": "El correo ya está en uso"}), 400
        admin.email = body["email"]  # Revicion de existencia de usuarios por email

    if "name" in body:
        admin.name = body["name"]
    if "user_name" in body:
        admin.user_name = body["user_name"]  
    if "password" in body:
        admin.password = body["password"]

    db.session.commit()
    return jsonify({"msg": "admin actualizado!", "admin": admin.serialize()}), 200

@api.route('/admins/<int:admin_id>', methods=['DELETE'])
def delete_admin(admin_id):
    admin_to_delete = Admin1.query.get(admin_id)

    if admin_to_delete:
        db.session.delete(admin_to_delete)
        db.session.commit()
        response_body = {"msg": "Se eliminó correctamente"}
    else:
        response_body = {"msg": "No se encontró el usuario de admin"}
    return jsonify(response_body), 200

@api.route("/login/admins", methods=["POST"])
def login_admin():
    email = request.json.get("email", None)
    password = request.json.get("password", None)

    admin= Admin1.query.filter_by(email=email).first()
    print(admin)

    if admin == None:
        return jsonify({"msg": "Could not find the email"}), 401

    if email != admin.email or password != admin.password:
        return jsonify({"msg": "Bad email or password"}), 401
    
    access_token = create_access_token(identity=email)
    return jsonify(access_token=access_token)
    return jsonify(response_body), 200


@api.route('/reservations', methods=['GET'])
def get_reservations():

    all_reservations = Reservations.query.all()
    results = list(map(lambda reservation: reservation.serialize(), all_reservations))
    

    return jsonify(results), 200


@api.route('/reservations', methods=['POST'])
def add_reservation():
    body = request.get_json()  

    if not body:
        return jsonify({"msg": "No se proporcionó información"}), 400

    required_fields = [ 'time','date', 'number_of_people', 'occasion', 'client_id', 'restaurant_id' ]
    missing_fields = [field for field in required_fields if field not in body]
    if missing_fields:
        return jsonify({"msg": f"Faltan los siguientes campos: {', '.join(missing_fields)}"}), 400

    nueva_reservation = Reservations(
        occasion =body['occasion'],
        time=body['time'],
        date=body['date'],
        number_of_people=body['number_of_people'],
        client_id=body['client_id'],  # Agregar client_id
        restaurant_id=body['restaurant_id']  # Agregar restaurant_id
  )

    try:
        db.session.add(nueva_reservation)
        db.session.commit() 
    except Exception as e:
        return jsonify({"msg": "Error al crear la reserva", "error": str(e)}), 500

    response_body = {
        "msg": "Reserva creada exitosamente",
        "reservation": nueva_reservation.serialize() 
    }
    
    return jsonify(response_body), 201

@api.route('/reservations/<int:reservations_id>', methods=['DELETE'])
def delete_reservation(reservations_id):
    reservation_to_delete = Reservations.query.filter_by(id=reservations_id).first()
    
    if reservation_to_delete is None:
        return jsonify({"error": "Reserva no encontrada"}), 404
    
    db.session.delete(reservation_to_delete)
    db.session.commit()
    
    return jsonify({"msg": "Reserva eliminada exitosamente"}), 200


@api.route('/reservations/<int:reservations_id>', methods=['PUT'])
def update_reservation(reservations_id):
    body = request.get_json()
    reservation = Reservations.query.get(reservations_id)
    
    if reservation is None:
        return jsonify({"error": "Reserva no encontrada"}), 404

    # Actualizar campos de la reserva
    reservation.time = body.get('time', reservation.time)
    reservation.date = body.get('date', reservation.date)
    reservation.number_of_people = body.get('number_of_people', reservation.number_of_people)
    
    try:
        db.session.commit()
    except Exception as e:
        return jsonify({"msg": "Error al actualizar la reserva"}), 500

    response_body = {
        "msg": "Reseña actualizada exitosamente",
        "reservation": reservation.serialize()
    }

    return jsonify(response_body), 201

@api.route('/categories', methods=['GET'])
def get_categories():
    all_categories = Category.query.all() 
    results = list(map(lambda Category: Category.serialize(), all_categories)) 

    return jsonify(results), 200

@api.route('/categories/<int:category_id>', methods=['GET'])
def get_category(category_id):
    category = Category.query.filter_by(id=category_id).first()
    
    if category is None:
        return jsonify({"error": "Categoria no encontrada"}), 404
    
    return jsonify(category.serialize()), 200

@api.route("/create/categories", methods=["POST"])
def create_category():
    body = request.get_json()
    category = Category.query.filter_by(name=body["name"]).first()
    if category == None:
        category = Category( name=body["name"])
        db.session.add(category)
        db.session.commit()
        response_body = {"msg": "Categoria creado"}
        return jsonify(response_body), 200
    else:
        return jsonify({"msg": "La categoria ya existe"}), 401

@api.route('edit/categories/<int:category_id>', methods=['PUT'])
def update_categories(category_id):  
    body = request.get_json()
    category = Category.query.filter_by(id=category_id).first()

    if category is None:
        return jsonify({"error": "Categoria no encontrado"}), 404

    if "name" in body:
        existing_category = Category.query.filter_by(name=body["name"]).first()  
        if existing_category and existing_category.id != category_id:
            return jsonify({"error": "La categoria ya está en uso"}), 400
        
        category.name = body["name"] 

    db.session.commit()
    return jsonify({"msg": "Categoria actualizada!", "category": category.serialize()}), 200 
    
@api.route('/categories/<int:category_id>', methods=['DELETE'])
def delete_category(category_id):
    category_to_delete = Category.query.get(category_id)

    if category_to_delete:
        db.session.delete(category_to_delete)
        db.session.commit()
        response_body = {"msg": "Se eliminó correctamente"}
    else:
        response_body = {"msg": "No se encontró la categoria"}
    return jsonify(response_body), 200

@api.route('/ocasiones', methods=['GET'])
def get_ocasiones():
    all_ocasiones = Ocasiones1.query.all() 
    results = list(map(lambda Ocasiones1: Ocasiones1.serialize(), all_ocasiones)) 

    return jsonify(results), 200

@api.route('/ocasiones/<int:ocasion_id>', methods=['GET'])
def get_ocasion(ocasion_id):
    ocasion = Ocasiones1.query.filter_by(id=ocasion_id).first()
    
    if ocasion is None:
        return jsonify({"error": "ocasion no encontrada"}), 404
    
    return jsonify(ocasion.serialize()), 200

@api.route("/create/ocasiones", methods=["POST"])
def create_ocasion():
    body = request.get_json()
    ocasion = Ocasiones1.query.filter_by(name=body["name"]).first()
    if ocasion == None:
        ocasion = Ocasiones1( name=body["name"])
        db.session.add(ocasion)
        db.session.commit()
        response_body = {"msg": "Ocasion creada"}
        return jsonify(response_body), 200
    else:
        return jsonify({"msg": "La ocasion ya existe"}), 401
    
@api.route('/ocasiones/<int:ocasion_id>', methods=['DELETE'])
def delete_ocasion(ocasion_id):
    ocasion_to_delete = Ocasiones1.query.get(ocasion_id)

    if ocasion_to_delete:
        db.session.delete(ocasion_to_delete)
        db.session.commit()
        response_body = {"msg": "Se eliminó correctamente"}
    else:
        response_body = {"msg": "No se encontró la ocasion"}
    return jsonify(response_body), 200
