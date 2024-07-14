import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const LandingPage = () => {
  const { user, loading, error } = useSelector((state) => state.user);
  console.log("landing", user);
  return (
    <>
      <div className="container text-center mt-5">
        <div className="jumbotron">
          <h1 className="display-4">Welcome to Kitchen Story!</h1>
          <p className="lead">Discover a variety of delicious dishes.</p>
          <hr className="my-4" />
          <p>
            Search and explore detailed information about your favorite food
            items.
          </p>
          <Link to="/foodlist" className="btn btn-primary btn-lg" role="button">
            Explore Now
          </Link>
        </div>

        <div id="explore" className="mt-5">
          <h2>Explore Featured Dishes</h2>
          <p>Discover mouth-watering food options!</p>
          <div className="row">
            <div className="col-md-4">
              <div className="card">
                <img
                  className="card-img-top"
                  src="src/assets/images/001.png"
                  alt="Food"
                />
                <div className="card-body">
                  <h5 className="card-title">Pizza</h5>
                  <p className="card-text">
                    Pizza is a delicious Italian dish. It comes in various
                    flavors and toppings.
                  </p>
                  <a href="#" className="btn btn-primary">
                    View Details
                  </a>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card">
                <img
                  className="card-img-top"
                  src="src/assets/images/002.png"
                  alt="Food"
                />
                <div className="card-body">
                  <h5 className="card-title">Sushi</h5>
                  <p className="card-text">
                    Sushi is a traditional Japanese dish made with vinegared
                    rice and seafood.
                  </p>
                  <a href="#" className="btn btn-primary">
                    View Details
                  </a>
                </div>
              </div>
            </div>
            <div className="col-md-4 mb-4">
              <div className="card">
                <img
                  className="card-img-top"
                  src="src/assets/images/003.png"
                  alt="Food"
                />
                <div className="card-body">
                  <h5 className="card-title">Hamburger</h5>
                  <p className="card-text">
                    Hamburger is a classic American sandwich with beef patty and
                    vegetables.
                  </p>
                  <a href="#" className="btn btn-primary">
                    View Details
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LandingPage;
