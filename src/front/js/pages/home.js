import React, { useEffect, useContext, useState } from "react";
import "../../styles/home.css";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Context } from "../store/appContext";
import lr from "../../img/lr.jpeg";
import nicole from "../../img/nicole.jpeg";
import valentina from "../../img/valentina.jpeg";
import logoFondo from "../../img/nivalufondo.png";

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
    const words = ["Friends", "Family", "4geeks"];
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
            <img src={logoFondo} alt="Logo" style={{ width: "150px", height: "auto", marginBottom: "10px" }} />
          </div>
          <nav>
            <ul>
              <li>
                <Link to="/adminlogin">Admins</Link>
              </li>
              <li>
                <Link to="/loginrestaurant">Restaurants</Link>
              </li>
              <li>
                <Link to="/loginClients">Diners</Link>
              </li>
            </ul>
          </nav>
        </header>
        <div className="banner-content">
          <h1>
            Welcome to Nivalu <span id="dynamic-text"></span>
          </h1>
          <p className="subheading">The #1 restaurant reservation platform</p>
          <p className="description">
            Book your restaurant in just 2 clicks
          </p>
          <Link to="/loginClients">
            <button className="btn btn-primary">Make a Reservation</button>
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
            <h3>It all started, simply, like this...</h3>
            <p>
              At Nivalu, we are dedicated to offering unique culinary experiences that connect people with food and culture. Our mission is to create a space where friends, families, and colleagues can enjoy special moments while savoring exquisite dishes made with fresh, high-quality ingredients. Inspired by passion and creativity, we blend tradition and innovation to deliver an unforgettable experience. Join us and discover why food is so much more than just sustenance!
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
          <h2 className="special-title">Restaurant Categories</h2>
          <p className="special-description">
            Explore the delights we've prepared for you
          </p>
          <p className="special-description">
            Choose the restaurant category you like and discover the options we have for you!
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
          <h2 className="menu-title">Restaurants by Category</h2>
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
        <h2 className="section-title" style={{marginBottom: "62px"}}>Who are we?</h2>
        <div className="team-container">
          <div className="team-member">
            <img src={nicole} alt="nicole" />
            <h4>Nicolle Rodríguez</h4>
            <p>I am a responsible and dedicated individual who is deeply committed to my work and personal growth. I have a strong passion for continuous learning and improving my skills. Additionally, I hold a technical degree in software programming</p>
            <div className="social-icons">
            </div>
          </div>
          <div className="team-member">
            <img src={valentina} alt="valentina"/>  
            <h4>Valentina Rodríguez</h4>
            <p>I work as an Executive Admin and Call Center manager. I am passionate about continuous learning and always strive to improve in everything I do. While I have no prior experience in programming, this bootcamp has been a fantastic starting point for me</p>
            <div className="social-icons">
            </div>
          </div>
          <div className="team-member">
            <img src={lr} alt="lr"/>
            <h4>Luis Rico</h4>
            <p>My name is Luis Alejandro Rico, I’m a 29-year-old Venezuelan living in Panama, and I’m expecting my first child 💪🏼.

I am a dedicated athlete, a lover of technology and innovation (which sparked my interest in programming 🖥️⌨️), nature, and anime, all of which help me balance my professional life with my personal interests.

I believe that hard work, discipline, creativity, and surrounding yourself with good people bring great success in life!</p>
            <div className="social-icons">
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
