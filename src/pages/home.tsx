import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { Skeleton } from "../components/loader";
import ProductCard from "../components/product-card";
import { useLatestProductsQuery } from "../redux/api/productAPI";
import { addToCart } from "../redux/reducer/cartReducer";
import { CartItem } from "../types/types";
import { LuBadgePercent } from 'react-icons/lu';
import { MdOutlineHeadsetMic, MdOutlineLocalShipping} from 'react-icons/md';
import { FiGift } from 'react-icons/fi';
import { IoCardOutline } from 'react-icons/io5';


const Home = () => {
  const { data, isLoading, isError } = useLatestProductsQuery("");

  const dispatch = useDispatch();

  const addToCartHandler = (cartItem: CartItem) => {
    if (cartItem.stock < 1) return toast.error("Out of Stock");
    dispatch(addToCart(cartItem));
    toast.success("Added to cart");
  };

  if (isError) toast.error("Cannot Fetch the Products");

  

  return (
    <div className="home">
      <section>
      <div className="herosection">
    <div className="slidingBanner">
        <div className="bannerContent">
          <h4>SUPERCHARGED FOR PROS</h4>
          <h5>Special Sale</h5>
          <p>From ₹999 or ₹41.62/mo </p>
          <p>for limited time</p>
          <Link to="/search" className="button">BUY NOW</Link> {/* Use Link component */}
        </div>
    </div>
    <div className="grid-container">
       <div className="grid-item">
         <h4>BEST SALE</h4>
         <h5>Laptop Max</h5>
         <p>From ₹2500 or</p>  
         <p>₹450</p>         
       </div>
       <div className="grid-item">      
          <h4>15% OFF</h4>
          <h5>Smartwatch 6</h5>
          <p>Shop the latest band</p>
          <p>style and colors</p>               
       </div>
       <div className="grid-item">              
          <h4>NEW ARRIVAL</h4>
          <h5>Buy IPpad Air</h5>
          <p>From ₹599 or</p>   
          <p>₹49/mo. for 12 mo. *</p>             
       </div>
       <div className="grid-item">
         <h4>FREE ENGRAVING</h4>
         <h5>AirPods Max</h5>
         <p>High-fidelity playback &</p>
         <p>ultra-low distortion</p>
       </div>
    </div>    
  </div>
  <div className="Info-container">
    <div className="Info-conatin">
      <div className="iconclass"><MdOutlineLocalShipping/></div>
      <div className="info">
      <h4>Free Shipping</h4>
      <p>Fast and reliable delivery</p>
      </div>
    </div>
    <div className="Info-conatin">
      <div className="iconclass"><FiGift/></div>
      <div className="info">
      <h4>Special Offers</h4>
      <p>Exclusive discounts</p>
      </div>
    </div>
    <div className="Info-conatin">
      <div className="iconclass"><MdOutlineHeadsetMic/></div>
      <div className="info">
      <h4> Support 24/7</h4>
      <p>free ship upto 300</p>
      </div>
    </div>
    <div className="Info-conatin">
      <div className="iconclass"><LuBadgePercent/></div>
      <div className="info">
      <h4>Affordable Prices</h4>
      <p>Great deals for every budget</p>
      </div>
    </div>
    <div className="Info-conatin">
      <div className="iconclass"><IoCardOutline/></div>
      <div className="info">
      <h4>Secure Payments</h4>
      <p>Safe and encrypted transactions</p>
      </div>
    </div>
  </div>
      </section>

      <h1>
        Latest Products
        <Link to="/search" className="findmore">
          More
        </Link>
      </h1>

      <main>
        {isLoading ? (
          <Skeleton width="80vw" />
        ) : (
          data?.products.map((i) => (
            <ProductCard
              key={i._id}
              productId={i._id}
              name={i.name}
              price={i.price}
              stock={i.stock}
              handler={addToCartHandler}
              photo={i.photo}
            />
          ))
        )}
      </main>
    </div>
  );
};

export default Home;
