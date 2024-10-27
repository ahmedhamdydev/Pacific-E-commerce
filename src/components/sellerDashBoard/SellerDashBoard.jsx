import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import axios from "axios";
import { useQueries } from "react-query";
import styles from "./sellerDashBoard.module.css";
import ProductCardSeller from "../productCardSeller/ProductCardSeller";
import style from "../slider/productSlider.module.css";
import { Chart as ChartJs , defaults} from "chart.js/auto";
import {  Line } from "react-chartjs-2";

defaults.maintainAspectRatios = false;
defaults.responsive=true;

const SellerDashBoard = () => {
  const [products, setProducts] = useState([]);
  const [salesNum, setSalesNum] = useState(0);
  const [salesPrice, setSalesPrice] = useState(0);
  const [stockProducts, setStockProducts] = useState(0);
  const [mostSalesProducts, setMostSalesProduct] = useState(null);
  const [leastSalesProducts, setLeastSalesProduct] = useState(null);
  const [restockProducts, setRestockProduct] = useState([]);
  const userId = Cookies.get("userId");
  const getProducts = async () => {
    const response = await axios.get(
      `http://localhost:3000/api/v1/users/${userId}/products`,
      {
        withCredentials: true,
      }
    );
    return response.data;
  };
  const getMostSalesProduct = async () => {
    const response = await axios.get(
      `http://localhost:3000/api/v1/users/${userId}/products?sort=-sold&limit=1`,
      {
        withCredentials: true,
      }
    );
    return response.data;
  };
  const getLeastSalesProduct = async () => {
    const response = await axios.get(
      `http://localhost:3000/api/v1/users/${userId}/products?sort=sold&limit=1`,
      {
        withCredentials: true,
      }
    );
    return response.data;
  };

  useQueries([
    {
      queryKey: ["products"],
      queryFn: getProducts,
      onSuccess: (productsData) => {
        console.log(productsData.data.documents, "pro");
        setProducts(productsData.data.documents);

        let totalSalesNum = 0;
        let totalSalesPrice = 0;
        let totalStockProducts = 0;

        productsData.data.documents.forEach((item) => {
          totalSalesNum += item.sold;
          totalSalesPrice += item.sold * item.price;
          totalStockProducts += item.stock;
        });
        setSalesNum(totalSalesNum);
        setSalesPrice(totalSalesPrice);
        setStockProducts(totalStockProducts);

        // restock Products
        const restockProduct = productsData.data.documents.filter(
          (product) => product.stock < 5
        );
        console.log(restockProduct, "restock products");
        setRestockProduct(restockProduct);
      },
      onError: (err) => console.error("Error fetching products:", err),
    },
    {
      queryKey: ["mostSalesProduct"],
      queryFn: getMostSalesProduct,
      onSuccess: (mostSalesProductData) => {
        if (
          mostSalesProductData &&
          mostSalesProductData.data.documents.length > 0
        ) {
          setMostSalesProduct(mostSalesProductData.data.documents[0]);
        }
      },
      onError: (err) =>
        console.error("Error fetching most sold products:", err),
    },
    {
      queryKey: ["leastSalesProduct"],
      queryFn: getLeastSalesProduct,
      onSuccess: (leastSalesProductData) => {
        if (
          leastSalesProductData &&
          leastSalesProductData.data.documents.length > 0
        ) {
          setLeastSalesProduct(leastSalesProductData.data.documents[0]);
        }
      },
      onError: (err) =>
        console.error("Error fetching least sold products:", err),
    },
  ]);

  const chunkArray = (arr, size) => {
    const chunks = [];
    for (let i = 0; i < arr.length; i += size) {
      chunks.push(arr.slice(i, size + i));
    }
    return chunks;
  };
  const chunkedProducts = chunkArray(restockProducts, 3);
  return (
    <div>
      <div className={styles.analysisContainer}>
        <div className={styles.productAnalysit}>
          <h5>
            <i class="fa-solid fa-store"></i> stock products
          </h5>
          <h3>{stockProducts || 0} </h3>
        </div>
        <div className={styles.productAnalysit}>
          <h5>
            <i class="fa-solid fa-tags"></i> sales products
          </h5>
          <h3>{salesNum || 0} </h3>
        </div>
        <div className={styles.productAnalysit}>
          <h5>
            <i class="fa-solid fa-dollar-sign"></i> revenue
          </h5>
          <h3>{Math.round(salesPrice) || 0}</h3>
        </div>
      </div>
      {products.length > 0 ? (
        <div className={styles.chartContainer}>
          <h5> sales</h5>
          <div className={styles.salesChartContainer}>
            <Line  data={{
              labels:products.map((product,i)=> product.title),
              datasets:[
                
                {
                label: 'Sales',
                data: products.map((product)=> product.sold),
                backgroundColor: '#ED7A56',
                borderColor: '#ED7A56',
              }
            ]
            }}/>
            </div>
        </div>
      ) : (
        ""
      )}
      <div className={styles.productMostLeatContainer}>
        {mostSalesProducts && (
          <div className={styles.productDashBoardContainer}>
            <h5>most sold product</h5>
            <ProductCardSeller
              key={mostSalesProducts._id}
              id={mostSalesProducts._id}
              title={mostSalesProducts.title}
              price={Math.round(mostSalesProducts.price)}
              ratingsAverage={mostSalesProducts.ratingsAverage}
              imageCover={mostSalesProducts.imageCover}
              priceAfterDisc={mostSalesProducts.priceAfterDisc}
            />
          </div>
        )}
        {leastSalesProducts && (
          <div className={styles.productDashBoardContainer}>
            <h5>least sold product</h5>
            <ProductCardSeller
              key={leastSalesProducts._id}
              id={leastSalesProducts._id}
              title={leastSalesProducts.title}
              price={Math.round(leastSalesProducts.price)}
              ratingsAverage={leastSalesProducts.ratingsAverage}
              imageCover={leastSalesProducts.imageCover}
              priceAfterDisc={leastSalesProducts.priceAfterDisc}
            />
          </div>
        )}
      </div>
      {restockProducts.length > 0 ? (
        <div className={styles.productRestock}>
          <h5>products need to restock</h5>
          <div
            id="ProductCursol"
            className={`carousel carousel-dark slide ${style.productSlider}`}
            data-bs-ride="carousel"
          >
            <div className={`carousel-indicators ${style.indecator}`}>
              {chunkedProducts.map((_, index) => (
                <button
                  key={index}
                  type="button"
                  data-bs-target="#ProductCursol"
                  data-bs-slide-to={index}
                  className={index === 0 ? "active" : ""}
                  aria-current={index === 0 ? "true" : "false"}
                  aria-label={`Slide ${index + 1}`}
                ></button>
              ))}
            </div>
            <div className="carousel-inner">
              {chunkedProducts.map((chunk, index) => (
                <div
                  key={index}
                  className={`carousel-item ${index === 0 ? "active" : ""}`}
                  data-bs-interval="10000"
                >
                  <div className={style.sliderContent}>
                    {chunk.map((product) => (
                      <div
                        className={style.psroductSliderCardsContainer}
                        key={product._id}
                      >
                        <ProductCardSeller
                          title={product.title}
                          price={product.price}
                          ratingsAverage={product.ratingsAverage}
                          imageCover={product.imageCover}
                          priceAfterDisc={
                            product.priceAfterDisc || product.price
                          }
                        />
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            {/* <button
              className="carousel-control-prev"
              type="button"
              data-bs-target="#ProductCursol"
              data-bs-slide="prev"
            >
              <span className="visually-hidden">Previous</span>
            </button>
            <button
              className="carousel-control-next"
              type="button"
              data-bs-target="#ProductCursol"
              data-bs-slide="next"
            >
              <span className="visually-hidden">Next</span>
            </button> */}
          </div>
        </div>
      ) : (
        ""
      )}

      
    </div>
  );
};

export default SellerDashBoard;
