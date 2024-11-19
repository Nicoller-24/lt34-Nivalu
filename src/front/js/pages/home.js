import React, { useEffect, useContext, useState } from "react";
import "../../styles/home.css";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Context } from "../store/appContext";

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
    const words = ["Friends", "Family", "Officemates"];
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
            <span>NIVALU</span>
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
            Dinner with us <span id="dynamic-text"></span>
          </h1>
          <p className="subheading">Accidental appearances</p>
          <p className="description">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed diem
            nonummy nibh euismod.
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
            <h2 className="about-title">About Us</h2>
            <h3>It started, quite simply, like this...</h3>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod incididunt ut labore et dolore magna aliqua. Ut enim ad
              minim veniam, nostrud exercitation ullamco.
            </p>
            <p>
              Aenean commodo ligula eget dolor aenean massa. Cum sociis natoque
              penatibus et magnis dis parturient montes, nascetur ridiculus mus.
              quam felis, ultricies nec, pellentesque eu, pretium quis, sem.
              Nulla consequat massa quis enim. Donec vitae sapien ut libero
              venenatis faucibus. Nullam quis ante. Etiam sit amet orci eget
              eros.
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
          <h2 className="special-title">Today's Special</h2>
          <p className="special-description">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod incididunt ut labore et dolore magna aliqua. Ut enim ad
            minim veniam, nostrud exercitation ullamco.
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
          <h2 className="menu-title">Our Menu</h2>
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
    </div>
  );
};