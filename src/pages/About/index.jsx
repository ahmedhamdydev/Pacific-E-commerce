import React, { useEffect, useState } from "react";
import styles from "./about.module.css";
import Header from "../../components/Header/Header";
import AboutComponents from "../../components/aboutComponents";
import ReviewCard from "../../components/reviewCard/reviewCard";
import axios from "axios";

const About = () => {
  let arr = [
    { head: "Free", paragraph: "Delivery", image: "free.png" },
    {
      head: "Quick Payment",
      paragraph: "100% Secure Payment",
      image: "card-in-use-64.png",
    },
    {
      head: "Gift Certificate ",
      paragraph: "Buy Now ",
      image: "gift-card.png",
    },
    { head: "24/7 Support", paragraph: "Ready Support", image: "support.png" },
  ];
  const [reviews, setReviews] = useState([]);
  const [brands, setBrands] = useState([]);
  useEffect(() => {
    // Call your fetch function here
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/v1/reviews?limit=3"
        );
        setReviews(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);
  useEffect(() => {
    // Call your fetch function here
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/v1/brands?limit=6"
        );
        setBrands(response.data.data.documents);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);
  console.log("brands=", brands);
  return (
    <div>
      <Header
        title={"about us"}
        details={"home > aboutus"}
        bgImage={"aboutHeader"}
      />
      <div className="container pb-4 ">
        <div className={` my-5  ${styles.homeTopic}`}>
          <h2>
            There is all about E-commerce
            <br /> fashion
          </h2>
          <div></div>
        </div>
        <div>
          <dev>
            <div className={`${styles.outer}  col-12`}>
              <div className={styles.imageDev}></div>
            </div>
            {/* image dev ended */}
          </dev>
          {/** outer */}
          <div className={`${styles.outerContent} d-flex col-12 my-5 mx-auto `}>
            <div className={`${styles.content} p-3 `}>
              <p>
                Welcome to Pacific, your trusted partner in delivering the
                finest shopping experience online. Founded with a vision to
                offer high-quality products at unbeatable prices, we are
                committed to making shopping more accessible and enjoyable for
                everyone. From the latest fashion trends to cutting-edge
                electronics, home essentials, and beyond, our diverse catalog is
                carefully curated to meet all your lifestyle needs.
              </p>
              <p>
                At Pacific, customer satisfaction is at the heart of everything
                we do. We prioritize quality, transparency, and exceptional
                service, ensuring that each purchase leaves a lasting
                impression. Thank you for choosing us as your go-to destination
                for all things shopping. We look forward to serving you!
              </p>

            </div>
          </div>
        </div>
        <div className="mb-5 pb-3">
          <div className="row py-3 mx-auto ">
            {arr.map((ele, index) => (
              <AboutComponents
                key={index}
                head={ele.head}
                paragraph={ele.paragraph}
                image={ele.image}
              />
            ))}
          </div>
        </div>{" "}
        {/** end services */}
        <div className={`container mb-3 `}>
          <div
            id="Reviewcarousel"
            className="carousel carousel-fade slide"
            data-bs-ride="carousel"
          >
            <div className={`carousel-indicators ${styles.indecator}`}>
              {Array.from({ length: reviews.length }, (_, i) => (
                <button
                  type="button"
                  data-bs-target="#Reviewcarousel"
                  data-bs-slide-to={i}
                  className={i === 0 ? "active" : ""}
                  aria-current={i === 0 ? "true" : "false"}
                  aria-label={`Slide ${i + 1}`}
                ></button>
              ))}
            </div>
            <div className="carousel-inner">
              {reviews.map((review, i) => (
                <div
                  className={` ${styles.reviews} carousel-item ${i === 0 ? "active" : ""
                    }`}
                  key={i}
                >
                  <img
                    src={review.user_id.profilePicture}
                    alt="person"
                    className={styles.person}
                  />
                  <img
                    src={require("../../assets/person.jpg")}
                    alt="person"
                    className={styles.fakePerson}
                  />
                  <div className={styles.reviewCard}>
                    <div
                      className={`${styles.homeTopic} 
          ${styles.reviewTopic}`}
                    >
                      <h1>customer review</h1>
                      <div></div>
                    </div>
                    <ReviewCard
                      img={review.user_id.profilePicture}
                      name={review.user_id.username}
                      comment={review.comment}
                      rate={review.rating}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        {/*end reviews */}
        <div>
          <div className="row justify-content-center align-items-center p-3 ">
            {brands.map((brand) => (

              <div key={brand._id} className={` ${styles.brandImgDev} col-6 col-md-2 bg-white `}>
                <img src={brand.image} alt={brand.name} className={`img-fluid `} />
              </div>
            ))}
          </div>
        </div>{" "}
        {/* end brands */}
      </div>
    </div>
  );
};

export default About;
