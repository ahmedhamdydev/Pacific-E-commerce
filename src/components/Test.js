
//////////This was ProductCard.jsx page////////////////
// import React from 'react';
// import { Card, Button } from 'react-bootstrap';

// const ProductCard = ({ product }) => {
//     return (
//         <Card style={{ width: '18rem' }}>
//             <Card.Img variant="top" src={product.image} alt={product.title} />
//             <Card.Body>
//                 <Card.Title>{product.title}</Card.Title>
//                 <Card.Text>${product.price}</Card.Text>
//                 <Button variant="primary">View Details</Button>
//             </Card.Body>
//         </Card>
//     );
// };

// export default ProductCard;



// ------------------------------------------------------------------------------------



//testing



//         <Container>
//             <Row className="my-5">
//                 <Col md={6}>
//                     <img src={products[0].image} alt={products.title} className="img-fluid" />
//                 </Col>
//                 <Col md={6}>
//                     <h2>{products[0].title}</h2>
//                     <h5>Price: ${products[0].price} <span className="text-success">{products.discount} Off</span></h5>
//                     <h5>Color: {products[0].color}</h5>
//                     <h5>Size: {products[0].size}</h5>
//                     <Button variant="warning" className="my-2">Buy Now</Button>
//                     <Button variant="secondary" className="my-2">Add to Cart</Button>
//                 </Col>
//             </Row>
//             <Tabs defaultActiveKey="description" id="product-details-tabs">
//                 <Tab eventKey="description" title="Product Description">
//                     <p>{products[0].description}</p>
//                 </Tab>
//                 <Tab eventKey="details" title="Product Details">
//                     <p>{products[0].details}</p>
//                 </Tab>
//                 <Tab eventKey="review" title="Product Review">
//                     <p>{products[0].reviews}</p>
//                 </Tab>
//             </Tabs>
//         </Container>
//     );
// };

// export default ProductDetails;

// ------------------------------------------------------------------------------------

/////////// this was ProductImageGallery.jsx page /////////////////

// import React from 'react';
// import { useSelector } from "react-redux";

// const ProductImageGallery = () => {

//     const { products } = useSelector((state) => state.allproducts);

//     if (!products || products.length === 0) {
//         return <p>No products available.</p>;
//     }

//     return (

//         <div className="product-gallery col-md-9" style={{
//             maxWidth: '40%',
//         }}>
//             <div className="thumbnail mb-3">
//                 <img src={products[0].image} alt={products[0].title} className="img-thumbnail rounded float-start" />
//             </div>
//             <div className="thumbnail mb-3">
//                 <img src={products[0].image} alt={products[0].title} className="img-thumbnail rounded float-start" />
//             </div>
//             <div className="thumbnail mb-3">
//                 <img src={products[0].image} alt={products[0].title} className="img-thumbnail" />
//             </div>
//             <div className="thumbnail mb-3">
//                 <img src={products[0].image} alt={products[0].title} className="img-thumbnail" />
//             </div>
//         </div>
//     );
// };

// export default ProductImageGallery;



///////////////////// this was SimilarProducts.jsx page //////////////

// import React from 'react';
// import { Row, Col } from 'react-bootstrap';
// import ProductCard from './ProductCard';

// const SimilarProducts = ({ products }) => {
//     return (
//         <Row className="my-5">
//             {products.map((product) => (
//                 <Col key={product.id} sm={12} md={6} lg={4}>
//                     <ProductCard product={product} />
//                 </Col>
//             ))}
//         </Row>
//     );
// };

// export default SimilarProducts;


//////////////////////////



// try {
//     const response = await axios.get("http://localhost:3000/api/v1/products",{withCredentials:true});
//     console.log("response "+response);
    
//     const data = await response.data;
// console.log( "data "+data);
//     setProducts(data);
//     console.log(products);
// } catch (error) {
//     console.log(error);
    
// }

// };

// useEffect(() => {
// fetchProducts();
// }, []);


// const fetchData = async () => {
//     try {
//         const resopnse = await axios.get("http://localhost:3000/api/v1/products");
//         console.log(resopnse.data.data.documents);

//     } catch (error) {
//         console.log(error);

//     }
// }
// fetchData()




//index for ProductPage

// const ProductPage = () => {

//     const { id } = useParams();
    
//         const [products, setProducts] = useState();
//         const fetchProducts = async () => {
//             const response = await axios.get(`http://localhost:3000/api/v1/products/${id}`);
           
//             const newata =   response.data;
//             console.log(response.data.data);
//             setProducts(newata);
//             console.log(products);
//         };
//         useEffect(() => {
//             fetchProducts();
    
//         }, []);