from datetime import datetime, timezone
from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class Category(db.Model):
    __tablename__ = 'restaurant_category'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(120), nullable=False, unique=True)
    restaurants = db.relationship('RestaurantCategory', back_populates='category')
    image_url = db.Column(db.String(120), unique=False, nullable=True)
    
    def __repr__(self):
        return f'<Category {self.name}>'

    def serialize(self):
        return {
            "id": self.id,
            "name": self.name,
            "image_url": self.image_url

        }
    
class Ocasiones1(db.Model):
    __tablename__ = 'ocasiones'
    
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(120), nullable=False, unique=True)
    
    def __repr__(self):
        return f'<Ocasiones1 {self.name}>'

    def serialize(self):
        return {
            "id": self.id,
            "name": self.name,
        }

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(80), unique=False, nullable=False)
    is_active = db.Column(db.Boolean(), unique=False, nullable=False)

    def __repr__(self):
        return f'<User {self.email}>'

    def serialize(self):
        return {
            "id": self.id,
            "email": self.email,
            "image_url": self.image_url,
        }

class Client(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(120), nullable=True)
    last_name = db.Column(db.String(120), nullable=True)
    identification_number = db.Column(db.String(120), unique=True, nullable=True)
    phone_number = db.Column(db.String(120), nullable=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(80), unique=False, nullable=False)
    is_active = db.Column(db.Boolean(), unique=False, nullable=False)

    chats = db.relationship('Chat', backref='comensal', lazy=True)
    messages = db.relationship('Message', backref='client', lazy=True)

    def __repr__(self):
        return f'<Client {self.email}>'

    def serialize(self):
        return {
            "id": self.id,
            "email": self.email,
            "name": self.name,
            "last_name": self.last_name,
            "phone_number": self.phone_number,
            "identification_number": self.identification_number,
            "is_active": self.is_active
        }

class Restaurant(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(80), unique=False, nullable=False)
    location = db.Column(db.String(80), unique=False, nullable=False)
    phone_number = db.Column(db.String(80), unique=False, nullable=False)
    email = db.Column(db.String(80), unique=True, nullable=False)
    guests_capacity = db.Column(db.String(80), unique=False, nullable=False)
    password = db.Column(db.String(80), unique=False, nullable=False)
    image_url = db.Column(db.String(120), unique=False, nullable=False)
    latitude = db.Column(db.Numeric, nullable=True)
    longitude = db.Column(db.Numeric, nullable=True)
    is_active = db.Column(db.Boolean(), unique=False, nullable=False)
    categories = db.relationship('RestaurantCategory', back_populates='restaurant')

    chats = db.relationship('Chat', backref='restaurant', lazy=True)
    messages = db.relationship('Message', backref='restaurant_messages', lazy=True)

    def __repr__(self):
        return f'<Restaurant {self.email}>'

    def serialize(self):
        categories_list = [category.category.serialize() for category in self.categories]
        return {
            "id": self.id,
            "name": self.name,
            "location": self.location,
            "phone_number": self.phone_number,
            "email": self.email,
            "guests_capacity": self.guests_capacity,
            "image_url": self.image_url,
            "latitude": self.latitude,
            "longitude": self.longitude,
            "is_active": self.is_active,
            "categories": [category.category.serialize() for category in self.categories]
            # do not serialize the password, it's a security breach
        }

class Admin1(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_name = db.Column(db.String(120), unique=True, nullable=False)
    name = db.Column(db.String(80), unique=False, nullable=False)
    email = db.Column(db.String(80), unique=False, nullable=False)
    image_url = db.Column(db.String(120), unique=False, nullable=True)
    password = db.Column(db.String(80), unique=False, nullable=False)
    is_active = db.Column(db.Boolean(), unique=False, nullable=False)

    # categories = db.relationship('Category', backref='admin', lazy=True)
    # ocasiones = db.relationship('Ocasiones1', backref='admin', lazy=True)

    def __repr__(self):
        return f'<Admin1 {self.email}>'

    def serialize(self):
        return {
            "id": self.id,
            "user_name": self.user_name,
            "name": self.name,
            "email": self.email,
            "image_url": self.image_url,
            "is_active": self.is_active
        }

class Reservations(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    time = db.Column(db.String(120), nullable=False)
    date = db.Column(db.String(120), nullable=False)
    number_of_people = db.Column(db.String(120), nullable=False)
    client_id = db.Column(db.Integer, db.ForeignKey('client.id'), nullable=True)
    restaurant_id = db.Column(db.Integer, db.ForeignKey('restaurant.id'), nullable=True)  
    ocasiones_id= db.Column(db.Integer, db.ForeignKey('ocasiones.id'), nullable=True)   
    is_active = db.Column(db.Boolean(), nullable=True)

    client = db.relationship('Client', backref=db.backref('reservations', lazy=True))
    restaurant = db.relationship('Restaurant', backref=db.backref('reservations', lazy=True))
    Ocasiones = db.relationship('Ocasiones1', backref=db.backref('reservations', lazy=True))
    


    def __repr__(self):
        return f'<Reservations {self.time}, {self.date}>'

    def serialize(self):
        return {
            "id": self.id,
            "client_id": self.client_id,
            "email_client": self.client.email if self.client else None,
            "restaurant_id": self.restaurant_id,
            "number_of_people": self.number_of_people,
            "time": self.time,
            "date":self.date,
            "ocasiones_id": self.ocasiones_id,
            # "occasion":self.occasion,
        }

class Chat(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    id_restaurant = db.Column(db.Integer, db.ForeignKey('restaurant.id'), nullable=False)
    id_comensal = db.Column(db.Integer, db.ForeignKey('client.id'), nullable=False)
    messages = db.relationship('Message', backref='chat', lazy=True)

    def __repr__(self):
        return f'<Chat {self.id}>'

    def serialize(self):
        return {
            "id": self.id,
            "id_comensal": self.id_comensal,
            "id_restaurant": self.id_restaurant
        }

class Message(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    id_restaurant = db.Column(db.Integer, db.ForeignKey('restaurant.id'), nullable=False)
    id_comensal = db.Column(db.Integer, db.ForeignKey('client.id'), nullable=False)
    id_chat = db.Column(db.Integer, db.ForeignKey('chat.id'), nullable=False)
    message = db.Column(db.String(120), nullable=False)
    origin = db.Column(db.String(120), nullable=False)
    message_date = db.Column(db.Date, nullable=False)
    message_time = db.Column(db.Time, nullable=False)

    id_chat = db.Column(db.Integer, db.ForeignKey('chat.id'), nullable=False)
    def __repr__(self):
        return f'<Message {self.id}>'

    def serialize(self):
        return {
            "id": self.id,
            "id_comensal": self.id_comensal,
            "id_restaurant": self.id_restaurant,
            "id_chat": self.id_chat,
            "message": self.message,
            "origin": self.origin,
            "message_date": self.message_date.isoformat(),
            "message_time": self.message_time.isoformat()
        }

class RestaurantCategory(db.Model):
    __tablename__ = 'restaurant_category_association'
    restaurant_id = db.Column(db.Integer, db.ForeignKey('restaurant.id'), primary_key=True)
    category_id = db.Column(db.Integer, db.ForeignKey('restaurant_category.id'), primary_key=True)  
    restaurant = db.relationship('Restaurant', back_populates='categories')
    category = db.relationship('Category', back_populates='restaurants')

# Association Table for Client and Ocasiones
class ClientOcasiones(db.Model):
    __tablename__ = 'client_ocasiones_association'
    
    client_id = db.Column(db.Integer, db.ForeignKey('client.id'), primary_key=True)
    ocasion_id = db.Column(db.Integer, db.ForeignKey('ocasiones.id'), primary_key=True)

    client = db.relationship('Client', backref=db.backref('ocasiones', lazy='dynamic'))
    ocasion = db.relationship('Ocasiones1', backref=db.backref('clients', lazy='dynamic'))



