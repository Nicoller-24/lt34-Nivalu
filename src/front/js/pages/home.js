import React, { useEffect } from "react";
import "../../styles/home.css";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

export const Home = () => {
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
  }, []);

  const settings = {
	dots: true, // Enables navigation dots below the slider
	infinite: true, // Allows the slider to loop infinitely
	speed: 500, // Transition speed in milliseconds
	slidesToShow: 3, // Number of slides visible at once
	slidesToScroll: 1, // Number of slides to scroll at a time
	autoplay: true, // Enables automatic sliding
	autoplaySpeed: 3000, // Time interval (in milliseconds) for automatic sliding
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
			<Link to="/restaurant/view">
				restaurant view
			</Link>
			</li>
			<li>
				<Link to="/adminhomepage">
					admins
				</Link>
			</li>
			<li>
				<Link to="/restauranteselect">
					restaurantes
				</Link>
			</li>
			<li>
				<Link to="/userList">
					comensales
				</Link>
			</li>
			<li>
				<Link to="/openai">
					Open AI
				</Link>
			</li>
			<li>
				<Link to="/listOfRestaurants">
					Lista de Restaurantes
				</Link>
			</li>
			<li>
				<Link to="/listReservationsUser">Acive reservations Client
				</Link>
			</li>
			<li>
				<Link to="/reservationsRestaurant">Acive reservations Restaurant
				</Link>
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
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed diem nonummy nibh euismod.
          </p>
          <Link to="/aboutRestaurants">
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
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod incididunt ut labore et dolore
              magna aliqua. Ut enim ad minim veniam, nostrud exercitation ullamco.
            </p>
            <p>
              Aenean commodo ligula eget dolor aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes,
              nascetur ridiculus mus. quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa
              quis enim. Donec vitae sapien ut libero venenatis faucibus. Nullam quis ante. Etiam sit amet orci eget eros.
            </p>
          </div>
          <div className="about-images">
            <img src="https://themewagon.github.io/food-funday/images/about-main.jpg" alt="Main Dish" className="main-img" />
            <img src="https://themewagon.github.io/food-funday/images/about-inset.jpg" alt="Inset Dish" className="inset-img" />
          </div>
        </div>
      </section>

	  <section id="todays-special">
        <div className="special-container">
          <h2 className="special-title">Today's Special</h2>
          <p className="special-description">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, nostrud exercitation ullamco.
          </p>
          <Slider {...settings} className="special-slider">
            <div className="special-item">
              <img src="https://themewagon.github.io/food-funday/images/special-menu-1.jpg" alt="Special Dish 1" />
            </div>
            <div className="special-item">
              <img src="https://themewagon.github.io/food-funday/images/special-menu-2.jpg" alt="Special Dish 2" />
            </div>
            <div className="special-item">
              <img src="https://themewagon.github.io/food-funday/images/special-menu-3.jpg" alt="Special Dish 3" />
            </div>
            <div className="special-item">
              <img src="https://themewagon.github.io/food-funday/images/special-menu-2.jpg" alt="Special Dish 4" />
            </div>
          </Slider>
        </div>
      </section>
	  </div>
	);
};
