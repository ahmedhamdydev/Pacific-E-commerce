
import React, { useState } from 'react';
import styles from './sellerProducts.module.css';
import axios from 'axios';
import { useQuery } from 'react-query';
import ProductCardSeller from '../productCardSeller/ProductCardSeller';
import Cookies from 'js-cookie'

const SellerProducts = () => {
    const [pageNumber, setPageNumber] = useState(1);
    const [products, setProducts] = useState([]);
    const userId = Cookies.get('userId');
    const getProducts = async (pageNumber) => {
        const response = await axios.get(`http://localhost:3000/api/v1/users/${userId}/products?page=${pageNumber}&limit=9`, {
        
            withCredentials: true,
        });
        return response.data;
    };
    const { isLoading, isError, error, data } = useQuery(['products', pageNumber], () => getProducts(pageNumber), {
        onError: (err) => console.error(err),
        onSuccess: (res) => {
            setProducts(res.data.documents)
        },
    });

    if (isLoading) return <div>Loading...</div>;
    if (isError) return <div>Error: {error.message}</div>;

    const numberOfPage = data?.paginateResult.NumOfPages || 1;
    const disableNext = data.results / 9 
    
    return (
        <div>
            <div className={styles.productsContainer}>

                {
                    products.length > 0 ? (
                        products.map((product, i) =>
                        (
                            <div className={styles.productSellerContainer}>

                                <ProductCardSeller price={product.price} imageCover={product.imageCover} id={product._id} title={product.title} priceAfterDisc={product.priceAfterDisc} ratingsAverage={product.ratingsAverage} sellerId={userId}/>
                            </div>
                        ))
                    ) : <div className={styles.emptyProducts}>
                        <img src={require('../../assets/Empty-bro.png')} alt='empty products'/>
                    </div>
                }

            </div>
            <div className={styles.paginationContainer}>
                <button className={styles.nextPrevBtn} onClick={() => setPageNumber(prev => Math.max(prev - 1, 1))} disabled={pageNumber === 1}>Prev</button>
                <button className={styles.nextPrevBtn} onClick={() => setPageNumber(prev => Math.min(prev + 1, numberOfPage))} disabled={pageNumber === numberOfPage || disableNext < 1}>Next</button>
            </div>
        </div>
    );
};

export default SellerProducts;
