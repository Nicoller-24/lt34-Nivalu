"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""

from api.models import db, User, Client, Reservations, Restaurant, Admin1, Ocasiones1, Category, RestaurantCategory, Chat, Message
from flask import Flask, request, jsonify, Blueprint
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from flask_jwt_extended import jwt_required, create_access_token
from flask_jwt_extended import create_access_token, get_jwt_identity, jwt_required, JWTManager
from flask import jsonify, request
from werkzeug.security import check_password_hash
from flask import Flask
from flask_cors import CORS
from geopy.distance import geodesic




app = Flask(__name__)
CORS(app)  # This will allow all origins
from datetime import datetime, timedelta, timezone


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

    # Verifica si ya existe un restaurante con ese email
    restaurant = Restaurant.query.filter_by(email=body["email"]).first()
    if restaurant is None:
        # Crea un nuevo restaurante
        restaurant = Restaurant(
            email=body["email"],
            guests_capacity=body["guests_capacity"],
            location=body["location"],
            name=body["name"],
            phone_number=body["phone_number"],
            password=body["password"],  
            image_url=body["image_url"],
            latitude=body["latitude"],
            longitude=body["longitude"],
            is_active=True
        )
        db.session.add(restaurant)
        db.session.commit()

        # Genera el token de acceso
        access_token = create_access_token(identity=restaurant.id)

        # Crea la respuesta con todos los datos del restaurante
        response_body = {
            "msg": "Restaurante creado",
            "access_token": access_token,
            "restaurant": {
                "id": restaurant.id,
                "email": restaurant.email,
                "guests_capacity": restaurant.guests_capacity,
                "location": restaurant.location,
                "name": restaurant.name,
                "phone_number": restaurant.phone_number,
                "image_url": restaurant.image_url,
                "latitude": restaurant.latitude,
                "longitude": restaurant.longitude,
                "is_active": restaurant.is_active
            }
        }
        return jsonify(response_body), 201  
    else:
        return jsonify({"msg": "El restaurante ya existe"}), 409
 


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

    # Verifica si ya existe un cliente con ese email
    client = Client.query.filter_by(email=body["email"]).first()
    if client is None:
        # Crea un nuevo cliente
        client = Client(
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

        # Genera el token de acceso
        access_token = create_access_token(identity=client.id)

        # Crea la respuesta con todos los datos del cliente
        response_body = {
            "msg": "Cliente creado con éxito",
            "access_token": access_token,
            "client": {
                "id": client.id,
                "name": client.name,
                "last_name": client.last_name,
                "identification_number": client.identification_number,
                "email": client.email,
                "phone_number": client.phone_number,
                "is_active": client.is_active
            }
        }
        return jsonify(response_body), 201
    else:
        return jsonify({"msg": "El cliente ya está registrado"}), 409

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

    restaurant = Restaurant.query.filter_by(email=email).first()

    if restaurant is None:
        return jsonify({"msg": "Could not find the email"}), 401

    if email != restaurant.email or password != restaurant.password:
        return jsonify({"msg": "Bad email or password"}), 401
    
    # Usar el id del restaurante como identidad en el token
    access_token = create_access_token(identity=restaurant.id)
    return jsonify(access_token=access_token, restaurant_id=restaurant.id)



@api.route("/loginClient", methods=["POST"])
def login():
    email = request.json.get("email", None)
    password = request.json.get("password", None)

    user = Client.query.filter_by(email=email).first()

    if user == None:
        return jsonify({"msg": "Could not find you email"}), 401

    if email != user.email or password != user.password:
        return jsonify({"msg": "Bad email or password"}), 401

    access_token = create_access_token(identity=user.id)

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
    if admin is None:
        admin = Admin1(
            email=body["email"],
            name=body["name"],
            user_name=body["user_name"],
            image_url=body.get("image_url", ""),  
            password=body["password"],
            is_active=True
        )
        db.session.add(admin)
        db.session.commit()

        access_token = create_access_token(identity=admin.id)

        response_body = {
            "msg": "Administrador creado",
            "access_token": access_token,
            "admin": {
                "id": admin.id,
                "email": admin.email,
                "name": admin.name,
                "user_name": admin.user_name,
                "image_url": admin.image_url,
                "is_active": admin.is_active
            }
        }
        return jsonify(response_body), 201
    else:
        return jsonify({"msg": "El administrador ya existe"}), 409

    
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
    if "image_url" in body:
        admin.image_url = body["image_url"]
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

    admin = Admin1.query.filter_by(email=email).first()

    if admin is None:
        return jsonify({"msg": "Could not find an admin with that email."}), 401

    if email != admin.email or password != admin.password:
        return jsonify({"msg": "Bad email or password"}), 401

    access_token = create_access_token(identity=admin.id)

    return jsonify(access_token=access_token, admin_id=admin.id), 200

@api.route('/reservations', methods=['GET'])
def get_reservations():

    all_reservations = Reservations.query.all()
    results = list(map(lambda reservation: reservation.serialize(), all_reservations)) 
    

    return jsonify(results), 200

@api.route('/reservations/<client_id>', methods=['GET'])
def get_reservationsUser(client_id):
    try:
        # Obtener todas las reservas del cliente
        reservationsUser = Reservations.query.filter_by(client_id=client_id).all()
        if not reservationsUser:
            return jsonify({"message": "Reservations not found"}), 404

        # Serializar cada reserva y agregar detalles del restaurante y la ocasión
        serialized_reservations = []
        for reservation in reservationsUser:
            # Obtener detalles del restaurante
            restaurant = Restaurant.query.get(reservation.restaurant_id)
            restaurant_details = {
                "name": restaurant.name,
                "location": restaurant.location,
                "email": restaurant.email,
                "phone_number": restaurant.phone_number,
            } if restaurant else None

            # Obtener detalles de la ocasión
            occasion = Ocasiones1.query.get(reservation.ocasiones_id)
            occasion_details = {
                "name": occasion.name,
            } if occasion else None

            # Agregar los detalles del restaurante y la ocasión a la reserva serializada
            serialized_reservations.append({
                **reservation.serialize(),
                "restaurant_details": restaurant_details,
                "occasion_details": occasion_details,
            })

        return jsonify(serialized_reservations), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500



@api.route('/reservationsRestaurant/<restaurant_id>', methods=['GET'])
def get_reservationsRestaurant(restaurant_id):
    try:
        reservationsRestaurant = Reservations.query.filter_by(restaurant_id=restaurant_id).all()  # Obtener todas las reservas del restaurante
        if not reservationsRestaurant:
            return jsonify({"message": "Reservations not found"}), 404

       
        serialized_reservations = []
        for reservation in reservationsRestaurant:
           
            client = Client.query.get(reservation.client_id)
            client_details = {
                "name": client.name,
                "last_name": client.last_name,
                "email": client.email,
                "phone_number": client.phone_number
            } if client else None

            serialized_reservations.append({
                **reservation.serialize(),
                "client_details": client_details
            })

        return jsonify(serialized_reservations), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500


@api.route('/reservations/accept/<int:reservation_id>', methods=['PUT'])
def accept_reservation(reservation_id):
    # Buscar la reserva por ID
    reservation = Reservations.query.get(reservation_id)
    
    if not reservation:
        return jsonify({"message": "Reservation not found"}), 404

    # Cambiar el estado de la reserva a "aceptada"
    reservation.state = "accepted"
    db.session.commit()

    return jsonify({"message": "Reservation accepted successfully", "reservation": reservation.serialize()}), 200

@api.route('/reservations/reject/<int:reservation_id>', methods=['PUT'])
def reject_reservation(reservation_id):
    reservation = Reservations.query.get(reservation_id)
    if not reservation:
        return jsonify({"message": "Reservation not found"}), 404
    
    try:
        reservation.state = "rejected"  # Cambia el estado a rechazado
        db.session.commit()
        return jsonify({"message": "Reservation rejected successfully"}), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({"message": "Error rejecting reservation", "error": str(e)}), 500



@api.route('/reservations', methods=['POST'])
def add_reservation():
    body = request.get_json()  

    if not body:
        return jsonify({"msg": "No se proporcionó información"}), 400

    required_fields = [ 'time','date', 'number_of_people', 'ocasiones_id', 'client_id', 'restaurant_id' ]
    missing_fields = [field for field in required_fields if field not in body]
    if missing_fields:
        return jsonify({"msg": f"Faltan los siguientes campos: {', '.join(missing_fields)}"}), 400

    nueva_reservation = Reservations(
        ocasiones_id =body['ocasiones_id'],
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

@api.route("/restaurant/<int:restaurant_id>/categories", methods=["POST"])
def set_restaurant_categories(restaurant_id):
    category_ids = request.json.get("category_ids", [])
    
    # Find the restaurant by ID
    restaurant = Restaurant.query.get(restaurant_id)
    if not restaurant:
        return jsonify({"msg": "Restaurant not found"}), 404
    
    # Clear existing categories in a more reliable way
    RestaurantCategory.query.filter_by(restaurant_id=restaurant.id).delete()

    # Add new categories from provided category IDs
    for category_id in category_ids:
        category = Category.query.get(category_id)
        if category:
            new_association = RestaurantCategory(restaurant_id=restaurant.id, category_id=category.id)
            db.session.add(new_association)
    
    db.session.commit()
    return jsonify({"msg": "Categories updated successfully"}), 200

@api.route('/categories/<int:category_id>', methods=['GET'])
def get_category(category_id):
    category = Category.query.filter_by(id=category_id).first()
    
    if category is None:
        return jsonify({"error": "Categoria no encontrada"}), 404
    
    return jsonify(category.serialize()), 200

@api.route("/create/categories", methods=["POST"])
@jwt_required()
def create_category():
    name = request.form.get("name")
    image_url = request.form.get("image_url")  # Access image_url from form data

    if not name:
        return jsonify({"msg": "Falta el nombre de la categoría"}), 400

    # Check if category exists
    category = Category.query.filter_by(name=name).first()
    
    if category is None:
        # Create a new category with name and image_url
        category = Category(name=name, image_url=image_url)
        db.session.add(category)
        db.session.commit()
        return jsonify({"msg": "Categoria creado", "category": category.serialize()}), 200
    else:
        return jsonify({"msg": "La categoria ya existe"}), 400

@api.route('edit/categories/<int:category_id>', methods=['PUT'])
def update_categories(category_id):  
    body = request.get_json()
    category = Category.query.filter_by(id=category_id).first()

    if category is None:
        return jsonify({"error": "Categoria no encontrada"}), 404

    # Update the name if provided
    if "name" in body:
        category.name = body["name"]

    # Update the image_url if provided
    if "image_url" in body:
        category.image_url = body["image_url"]

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
@jwt_required ()
def create_ocasion():
    body = request.get_json()

    if "name" not in body:
        return jsonify({"msg": "Falta el nombre de la ocasión"}), 400

    ocasion = Ocasiones1.query.filter_by(name=body["name"]).first()
    if ocasion == None:
        ocasion = Ocasiones1( name=body["name"])
        db.session.add(ocasion)
        db.session.commit()
        response_body = {"msg": "Ocasion creada"}
        return jsonify(response_body), 200
    else:
        return jsonify({"msg": "La ocasion ya existe"}), 401

@api.route('edit/ocasiones/<int:ocasion_id>', methods=['PUT'])
def update_ocasiones(ocasion_id):  
    body = request.get_json()
    ocasion = Ocasiones1.query.filter_by(id=ocasion_id).first()

    if ocasion is None:
        return jsonify({"error": "Ocasion no encontrada"}), 404

    if "name" in body:
        existing_ocasion = Ocasiones1.query.filter_by(name=body["name"]).first()  
        if existing_ocasion and existing_ocasion.id != ocasion_id:
            return jsonify({"error": "La ocasion ya está en uso"}), 400
        
        ocasion.name = body["name"] 

    db.session.commit()
    return jsonify({"msg": "Ocasion actualizada!", "ocasion": ocasion.serialize()}), 200 
    
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


@api.route("/chat/post/", methods=["POST"])
def create_chat():
    body = request.get_json()

    if not body or "id_restaurant" not in body or "id_comensal" not in body:
        return jsonify({"msg": "Faltan datos requeridos"}), 400

    chat = Chat.query.filter_by(id_restaurant=body["id_restaurant"], id_comensal=body["id_comensal"]).first()
    
    if chat is None:
        chat = Chat(id_restaurant=body["id_restaurant"], id_comensal=body["id_comensal"])
        db.session.add(chat)
        db.session.commit()
        response_body = {"msg": "Chat creado"}
        return jsonify(response_body), 201  
    else:
        return jsonify({"msg": "El chat ya existe"}), 409  

    
@api.route('/chat/get', methods=['GET'])
def get_chat():
    all_chats = list(Chat.query.all())
    results = list(map(lambda restaurant: restaurant.serialize(), all_chats))
    return jsonify(results), 200

@api.route('/chat/restaurant/<int:id_restaurant>', methods=['GET'])
def get_chats_restaurant(id_restaurant):
    chats = Chat.query.filter_by(id_restaurant=id_restaurant).all()

    response_data = []
    for chat in chats:
        chat_data = chat.serialize()
        
        comensal = Client.query.get(chat.id_comensal)
 
        if comensal:
            chat_data["comensal_details"] = {
                "name": comensal.name,
                "last_name": comensal.last_name,
                "email": comensal.email,
                "phone_number": comensal.phone_number
            }
        else:
            chat_data["comensal_details"] = None 

        response_data.append(chat_data)

    return jsonify(response_data), 200


@api.route('/chat/client/<int:id_comensal>', methods=['GET'])
def get_chats_client(id_comensal):
    chats = Chat.query.filter_by(id_comensal=id_comensal).all()

    response_data = []
    for chat in chats:
        chat_data = chat.serialize()

        restaurant = Restaurant.query.get(chat.id_restaurant)
        
        if restaurant:
            chat_data["restaurant_details"] = {
                "name": restaurant.name,
                "location": restaurant.location,
                "email": restaurant.email,
                "phone_number": restaurant.phone_number,
                "guests_capacity": restaurant.guests_capacity,
                "image_url": restaurant.image_url
            }
        else:
            chat_data["restaurant_details"] = None 

        response_data.append(chat_data)

    return jsonify(response_data), 200


@api.route('/messages/<int:restaurant_id>/<int:client_id>/<int:chat_id>', methods=['GET'])
def get_messages(restaurant_id, client_id, chat_id):

    messages = Message.query.filter_by(id_restaurant=restaurant_id, id_comensal=client_id, id_chat=chat_id).all()
    
    if not messages:
        return jsonify({"error": "No se encontraron mensajes para los criterios dados"}), 404


    comensal = Client.query.get(client_id)
    comensal_details = {
        "name": comensal.name,
        "last_name": comensal.last_name,
        "email": comensal.email,
        "phone_number": comensal.phone_number
    } if comensal else None 

    serialized_messages = [
        {**message.serialize(), "comensal_details": comensal_details}
        for message in messages
    ]

    return jsonify(serialized_messages), 200



@api.route("/message/post", methods=["POST"])
def create_message():
    body = request.get_json()

    required_fields = ["id_restaurant", "id_comensal", "id_chat", "message", "origin"]
    if not all(field in body for field in required_fields):
        return jsonify({"msg": "Faltan datos requeridos"}), 400

    if not isinstance(body["id_restaurant"], int) or not isinstance(body["id_comensal"], int) or not isinstance(body["id_chat"], int):
        return jsonify({"msg": "Los valores de id_restaurant, id_comensal y id_chat deben ser enteros"}), 400

    message = Message(
        id_restaurant=body["id_restaurant"],
        id_comensal=body["id_comensal"],
        id_chat=body["id_chat"],
        message=body["message"],
        origin=body["origin"],
        message_date=body["message_date"],
        message_time=body["message_time"]
    )

    db.session.add(message)
    db.session.commit()

    response_body = {"msg": "Mensaje creado"}
    return jsonify(response_body), 201

@api.route('/chat/messages/delete/<int:id>', methods=['DELETE'])
def delete_chat_and_messages(id):

    chat_to_delete = Chat.query.get(id)
    
    if chat_to_delete:
        messages_to_delete = Message.query.filter_by(id_chat=id).all()
        
        for message in messages_to_delete:
            db.session.delete(message)

        db.session.delete(chat_to_delete)
        db.session.commit()
        
        response_body = {"msg": "Se eliminaron correctamente el chat y sus mensajes"}
    else:
        response_body = {"msg": "No se encontró el chat"}
    
    return jsonify(response_body), 200

@api.route('/restaurants_nearby', methods=['GET'])
def get_nearby_restaurants():
    client_lat = request.args.get('lat')
    client_lon = request.args.get('lon')

    # Verificar si las coordenadas existen
    if client_lat is None or client_lon is None:
        return jsonify({"error": "Missing latitude or longitude"}), 400

    # Convertir a float después de validar
    client_lat = float(client_lat)
    client_lon = float(client_lon)

    distance_threshold = 5  # 5 km de radio
    restaurants = Restaurant.query.all()
    nearby_restaurants = []

    for restaurant in restaurants:
        if restaurant.latitude and restaurant.longitude:
            rest_location = (float(restaurant.latitude), float(restaurant.longitude))
            client_location = (client_lat, client_lon)
            distance = geodesic(client_location, rest_location).km
            if distance <= distance_threshold:
                nearby_restaurants.append(restaurant.serialize())

    return jsonify(nearby_restaurants)


