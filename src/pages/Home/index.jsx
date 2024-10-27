import React, { useEffect, useState } from 'react'
import styles from './home.module.css'
import style from '../../components/SellerProducts/sellerProducts.module.css'
import axios from 'axios';
import ProductCard from '../../components/productCard/ProductCard';
import OffersCard from '../../components/offersCard/OffersCard';
import ProductCategoryType1 from '../../components/productCategoryType1/productCategoryType1';
import ProductCategoryType2 from '../../components/productCategoryType2/productCategoryType2';
import ReviewCard from '../../components/reviewCard/reviewCard';
import BlogCard from '../../components/blogCard/blogCard';
import ProductSlider from '../../components/slider/productSlider';
import styless from '../About/about.module.css'
import { useQuery, useQueryClient } from 'react-query';
import { useDispatch } from 'react-redux';
import toast from 'react-hot-toast';
import { addToWishlist } from "../../redux/wishlistSlice";
import { useNavigate } from 'react-router-dom';
const Home = () => {
  const [products, setProducts] = useState([]);
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
  const getProducts = async () => {
    const response = await axios.get(`http://localhost:3000/api/v1/products/`, {
      withCredentials: true,
    });
    return response.data;
  };
  const { isLoading, isError, error, data } = useQuery('products', getProducts, {
    onError: (err) => console.error(err),
    onSuccess: (res) => {
      setProducts(res.data.documents)
      console.log(res.data.documents, "full")
    },
  });

  const dispatch = useDispatch();
  const queryClient = useQueryClient();
  const handleAddToWishlist = async (productToAdd) => {
    try {
        // Send the product to the server
        await axios.post(
            "http://localhost:3000/api/v1/wishlist",
            { productId: productToAdd }, // Send the product details to the server
            { withCredentials: true }
        );

        // Dispatch the action to update the wishlist in Redux
        dispatch(addToWishlist(productToAdd));
        queryClient.refetchQueries("wish length");
        toast.success("Product added to Wishlist");
    } catch (error) {
        console.error("Error adding product to Wishlist:", error);
        toast.error("please Login First");
    }
};
const navigate = useNavigate()
const handleNavigate=()=>{
  navigate('/ProductCategory')
}

  return (
    <div>
      {/* Header */}
      <header className={styles.header}>
        <div className={`container ${styles.headerContainer}`}>
          <div className={`${styles.headerText} `}>
            <h1>the best <br /> collection 2024</h1>
            <p>luxary fasionable clothing and stationery item </p>
            <button onClick={handleNavigate}>shop now <i class="fa-solid fa-arrow-right"></i></button>
          </div>
          <img src={require("../../assets/header.PNG")} alt="" />
        </div>
      </header>
      {/* feature */}
      <div className={styles.feature}>
        <div className={styles.singleFeature}>
          <i class="fa-solid fa-truck"></i>
          <div>
            <p>free delivery</p>
            <p>for first 3 order</p>
          </div>
        </div>
        <div className={styles.singleFeature}>
          <i class="fa-regular fa-credit-card"></i>
          <div>
            <p>quick payment</p>
            <p>100% secure payment</p>
          </div>
        </div>
        <div className={styles.singleFeature}>
          <i class="fa-regular fa-credit-card"></i>
          <div>
            <p>quick payment</p>
            <p>100% secure payment</p>
          </div>
        </div>
        <div className={styles.singleFeature}>
          <i class="fa-solid fa-user-gear"></i>
          <div>
            <p>24/7 support</p>
            <p>ready support</p>
          </div>
        </div>
      </div>
      {/* top collection */}
      <div className={styles.homeTopic}>
        <h1 >our top collection</h1>
        <div></div>
      </div>
      {/* <ul className={styles.changeCollection}>
        <li> <a href="#" className={styles.active}> best seller</a></li>
        <li> <a href="#"> trending</a></li>
        <li> <a href="#"> new arrival</a></li>
      </ul> */}
      <div className={`container ${styles.productsCollection}`}>
        {
          products.map((product, i) => (
            (i < 8) && (
              <div className={styles.productSellerContainer}>
                <ProductCard key={product._id} onAddToWishlist={() => handleAddToWishlist(product)} id={product._id} className={styles.product} title={product.title} price={Math.round(product.price)} rate={product.ratingsAverage} img={product.imageCover} priceAfterDisc={product.priceAfterDisc} />
              </div>
            )
          ))
        }
      </div>
      {/* offers */}
      <div className={`${styles.offers} container`}>
        <OffersCard offerMonth={"decamber offer"} offer={"save uo to 30% off on all latest fashion"} offerTime={""} img={require("../../assets/of1-removebg-preview.png")} />

        <OffersCard offerMonth={"decamber offer"} offer={"30% off on all latest shose"} offerTime={"10 20 30"} img={require("../../assets/of1-removebg-preview.png")} />
      </div>

      {/* product categories */}
      <div className={styles.homeTopic}>
        <h1 >product categories</h1>
        <div></div>
      </div>
      <div className={`container ${styles.categories}`}>
        <ProductCategoryType1 img={require("../../assets/c1.png")} title={"smart phone new collection2024"} />

        <div className={`${styles.ProductCategoryType2}`}>
          <ProductCategoryType2 img={require("../../assets/c2.png")} title={"watch collection"}

            description={"good collection"} />
          <ProductCategoryType2 img={require("../../assets/c3.png")} title={"gallery collection"} description={"good collection"} />
        </div>

        <ProductCategoryType1 img={require("../../assets/c4.png")} title={"cosmatics products"} />
      </div>

      {/* slider */}
      <div className={styles.homeTopic}>
        <h1 className={styles.featureProuctsHeader}>featured product</h1>
        <div></div>
      </div>
      <div className='container'>
        <ProductSlider products={products} />
      </div>


      {/* shopping online */}
      <div className={`${styles.shoppingOnline} container`}>
        <div className={styles.shoppingContent}>
          <h2 >shopping online</h2>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia, consequatur dolores ipsum ex officiis dolorem doloremque? Rerum quam expedita, sunt delectus minima, ab reprehenderit aut, temporibus quae sit molestiae blanditiis?</p>
          <div className={styles.downloadBtns}>
            <button>
              <img src={require("../../assets/google1-removebg-preview.png")} alt="google play" />
              <div>
                <p>get it on </p>
                <h6>google play</h6>
              </div>
            </button>
            <button>
              <i class="fa-brands fa-apple"></i>
              <div>
                <p>download on the </p>
                <h6>app store</h6>
              </div>
            </button>
          </div>
        </div>
        <img src={require("../../assets/of1-removebg-preview.png")} alt='shopping ' />
      </div>
      {/* reviews */}
      <div className={`container ${styles.reviewContainer}` } >
        <div id="Reviewcarousel" class="carousel carousel-fade slide" data-bs-ride="carousel">
          <div class={`carousel-indicators ${styles.indecator}`}>
            {/* <button type="button" data-bs-target="#Reviewcarousel" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
            <button type="button" data-bs-target="#Reviewcarousel" data-bs-slide-to="1" aria-label="Slide 2"></button>
            <button type ="button" data-bs-target="#Reviewcarousel" data-bs-slide-to="2" aria-label="Slide 3"></button> */}
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
          <div class="carousel-inner">
            {/* {Array.from({ length: 3 }, (_, i) => (
              <div className={` ${styles.reviews} carousel-item ${i === 0 ? 'active' : ''}`} key={i}>
                <img src={require(`../../assets/p${i + 1}.jpg`)} alt='person' className={styles.person} />
                <img src={require("../../assets/person.jpg")} alt='person' className={styles.fakePerson} />
                <div className={styles.reviewCard}>
                  <div className={`${styles.homeTopic} 
            ${styles.reviewTopic}`}>
                    <h1 >customer review</h1>
                    <div></div>
                  </div>
                  <ReviewCard img={require(`../../assets/p${i + 1}.jpg`)} name={"rawan fetoh"} comment={"good product"} rate={4} />
                </div>
              </div>
            ))} */}
            {reviews.map((review, i) => (
                <div
                  className={` ${styles.reviews} carousel-item ${
                    i === 0 ? "active" : ""
                  }`}
                  key={i}
                >
                  <img
                    src={review.user_id.profilePicture}
                    alt="person"
                    className={styles.person}
                  />
                  {/*<img
                    src={require(`../../assets/p${i + 1}.jpg`)}
                    alt="person"
                    className={styles.person}
                  />*/}
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
      <div >
          <div className={`row container justify-content-center align-items-center p-3 `} style={{margin:' 0 auto'}}>
            {brands.map((brand) => (
              
              <div key={brand._id} className={` ${styless.brandImgDev} col-6 col-md-2 bg-white `}>
                <img src={brand.image} alt={brand.name} className={`img-fluid `} />
              </div>
            ))}
          </div>
        </div>
      {/* blog */}
      {/* <div className={`${styles.blog} `}>
        <div className={styles.homeTopic}>
          <h1 >from the blog</h1>
          <div></div>
        </div>
        <div className={`container ${styles.blogContainer}`}>
          {Array.from({ length: 3 }, (_, i) => (
            <BlogCard key={i} img={require('../../assets/person.jpg')} date={"july 14 , 2024"} time={"03:30 PM"} blog={"Customers have praised its effectiveness, with one reviewer stating they are very satisfied."} />
          ))}
        </div>
      </div> */}

    </div>
  )
}

export default Home
