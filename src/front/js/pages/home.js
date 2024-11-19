import React, { useEffect, useContext, useState } from "react";
import "../../styles/home.css";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Context } from "../store/appContext";
import logo from "../../img/nivalulogo.jpg";
import lr from "../../img/lr.jpeg";
import nicole from "../../img/nicole.jpeg";
import valentina from "../../img/valentina.jpeg";

export const Home = () => {
  const { store, actions } = useContext(Context);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [filteredRestaurants, setFilteredRestaurants] = useState([]);

  useEffect(() => {
    actions.loadSomeDataCategory();
    actions.loadSomeData();
  }, []);

  useEffect(() => {
    if (selectedCategory) {
      const filtered = store.restaurants.filter((restaurant) =>
        restaurant.categories.some((category) => category.id === selectedCategory)
      );
      setFilteredRestaurants(filtered);
    } else {
      setFilteredRestaurants(store.restaurants);
    }
  }, [selectedCategory, store.restaurants]);

  const handleCategoryClick = (categoryId) => {
    setSelectedCategory(categoryId);
  };

  useEffect(() => {
    const dynamicText = document.getElementById("dynamic-text");
    const words = ["Amigos", "Familia", "4geeks"];
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    const type = () => {
      const currentWord = words[wordIndex];
      dynamicText.textContent = currentWord.substring(0, charIndex);

      if (!isDeleting) {
        charIndex++;
        if (charIndex === currentWord.length) {
          isDeleting = true;
          setTimeout(type, 1000); // Pause before deleting
          return;
        }
      } else {
        charIndex--;
        if (charIndex === 0) {
          isDeleting = false;
          wordIndex = (wordIndex + 1) % words.length; // Move to next word
        }
      }

      setTimeout(type, isDeleting ? 50 : 100);
    };

    type();

    // Fetch categories for the slider
    actions.loadSomeDataCategory();
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className="text-center">
      <section id="banner">
        <header>
          <div className="logo">
            <img src={logo} alt="Logo" style={{ width: "150px", height: "auto", marginBottom: "10px" }} />
          </div>
          <nav>
            <ul>
              <li>
                <Link to="/restaurant/view">restaurant view</Link>
              </li>
              <li>
                <Link to="/adminhomepage">admins</Link>
              </li>
              <li>
                <Link to="/restauranteselect">restaurantes</Link>
              </li>
              <li>
                <Link to="/userList">comensales</Link>
              </li>
              <li>
                <Link to="/openai">Open AI</Link>
              </li>
              <li>
                <Link to="/listOfRestaurants">Lista de Restaurantes</Link>
              </li>
              <li>
                <Link to="/listReservationsUser">Acive reservations Client</Link>
              </li>
              <li>
                <Link to="/reservationsRestaurant">Acive reservations Restaurant</Link>
              </li>
            </ul>
          </nav>
        </header>
        <div className="banner-content">
          <h1>
            Bienvenido a Nivalu <span id="dynamic-text"></span>
          </h1>
          <p className="subheading">La pagina #1 en reservas de restaurantes</p>
          <p className="description">
            Reserva tu restaurante en tan solo 2 clicks
          </p>
          <Link to="/listOfRestaurants">
            <button className="btn btn-primary">Hacer Reserva</button>
          </Link>
        </div>
        <div className="scroll-indicator">
          <span></span>
        </div>
      </section>
      <section id="about-us">
        <div className="about-container">
          <div className="about-text">
            <h2 className="about-title">Nosotros</h2>
            <h3>Todo comenzo, sencillamente, asi...</h3>
            <p>
            En Nivalu, nos dedicamos a ofrecer experiencias culinarias únicas que conectan a las personas con la comida y la cultura. Nuestra misión es crear un espacio donde amigos, familias y compañeros puedan disfrutar de momentos especiales mientras saborean platos exquisitos elaborados con ingredientes frescos y de alta calidad. Inspirados por la pasión y la creatividad, combinamos tradición e innovación para ofrecer una experiencia inolvidable. ¡Únete a nosotros y descubre por qué la comida es mucho más que un simple alimento!
            </p>
          </div>
          <div className="about-images">
            <img
              src="https://themewagon.github.io/food-funday/images/about-main.jpg"
              alt="Main Dish"
              className="main-img"
            />
            <img
              src="https://themewagon.github.io/food-funday/images/about-inset.jpg"
              alt="Inset Dish"
              className="inset-img"
            />
          </div>
        </div>
      </section>

      <section id="todays-special">
        <div className="special-container">
          <h2 className="special-title">Categorias de Restaurantes</h2>
          <p className="special-description">
          Te invitamos a descubrir las delicias que hemos preparado 
          </p>
          <p className="special-description">
          Escoge la categoria de restaurante que gustes y descubre las opciones que tenemos para ti!
          </p>
          <Slider {...settings} className="special-slider">
            {store.categories.length > 0 ? (
              store.categories.map((category, index) => (
                <div key={index} className="special-item">
                  <img
                    src={category.image_url}
                    alt={category.name}
                    style={{
                      width: "100%",
                      height: "200px",
                      objectFit: "cover",
                      borderRadius: "8px",
                    }}
                  />
                  <h3 style={{ textAlign: "center", marginTop: "10px" }}>
                    {category.name}
                  </h3>
                </div>
              ))
            ) : (
              <p>Loading categories...</p>
            )}
          </Slider>
        </div>
      </section>
      <section id="our-menu">
        <div className="menu-container">
          <h2 className="menu-title">Restaurantes por categoria</h2>
          <p>
            There are many variations of passages of Lorem Ipsum available, but
            the majority have suffered alteration in some form.
          </p>
          <div className="menu-tabs">
            {store.categories.map((category) => (
              <button
                key={category.id}
                className={`menu-tab ${selectedCategory === category.id ? "active" : ""}`}
                onClick={() => handleCategoryClick(category.id)}
              >
                {category.name}
              </button>
            ))}
          </div>
          <div className="menu-items">
            {filteredRestaurants.map((restaurant) => (
              <div key={restaurant.id} className="menu-item">
                <img
                  src={restaurant.image_url}
                  alt={restaurant.name}
                  className="menu-item-img"
                />
                <div className="menu-item-details">
                  <h3>{restaurant.name}</h3>
                  <p>{restaurant.location}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="our-team">
        <h2 className="section-title">Quienes somos?</h2>
        <p className="section-description">
          There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable.
        </p>
        <div className="team-container">
          <div className="team-member">
            <img src={nicole} alt="nicole" />
            <h4>Nicolle</h4>
            <p>Nullam quis ante. Etiam sit amet orci eget eros faucibus tincidunt. Duis leo. Sed fringilla mauris sit amet nibh.</p>
            <div className="social-icons">
              <a href="#"><i class="fab fa-facebook-f"></i></a>
              <a href="#"><i class="fab fa-twitter"></i></a>
              <a href="#"><i class="fab fa-linkedin-in"></i></a>
            </div>
          </div>
          <div className="team-member">
            <img src={valentina} alt="valentina"/>  
            <h4>Valentina</h4>
            <p>Nullam quis ante. Etiam sit amet orci eget eros faucibus tincidunt. Duis leo. Sed fringilla mauris sit amet nibh.</p>
            <div className="social-icons">
              <a href="#"><i class="fab fa-facebook-f"></i></a>
              <a href="#"><i class="fab fa-twitter"></i></a>
              <a href="#"><i class="fab fa-linkedin-in"></i></a>
            </div>
          </div>
          <div className="team-member">
            <img src={lr} alt="lr"/>
            <h4>Luis Rico</h4>
            <p>Nullam quis ante. Etiam sit amet orci eget eros faucibus tincidunt. Duis leo. Sed fringilla mauris sit amet nibh.</p>
            <div className="social-icons">
              <a href="#"><i class="fab fa-facebook-f"></i></a>
              <a href="#"><i class="fab fa-twitter"></i></a>
              <a href="#"><i class="fab fa-linkedin-in"></i></a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};