import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const { totalCartPrice } = useSelector((state) => state.cart);

  // If totalCartPrice is 0 or undefined, redirect to cart or home page
  if (totalCartPrice <= 0) {
    return <Navigate to="/ProductCategory" />;
  }

  // If totalCartPrice is valid, render the checkout component
  return children;
};
export default ProtectedRoute