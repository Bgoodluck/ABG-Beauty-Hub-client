import React, { useContext, useEffect, useRef, useState } from "react";
import { displayNGNCurrency } from "../helpers/displayCurrency";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";

function HorizontalSalonProductCard({ heading }) {
  const [loading, setLoading] = useState(false);
  const [scroll, setScroll] = useState(0);
  const { products, addToCart } = useContext(ShopContext);
  const [salonProducts, setSalonProducts] = useState([]);

  const scrollElement = useRef();

  useEffect(() => {
    const salonProducts = products.filter((item) => item.salonProducts);
    setSalonProducts(salonProducts.slice(0, 5));
    setLoading(false);
  }, [products]);

  const scrollRight = () => {
    if (scrollElement.current) {
      const newScrollPosition = scroll + 300;
      scrollElement.current.scrollTo({
        left: newScrollPosition,
        behavior: "smooth",
      });
      setScroll(newScrollPosition);
    }
  };

  const scrollLeft = () => {
    if (scrollElement.current) {
      const newScrollPosition = scroll - 300;
      scrollElement.current.scrollTo({
        left: newScrollPosition,
        behavior: "smooth",
      });
      setScroll(newScrollPosition);
    }
  };

  // const handleAddToCart = async(e, productId) => {
  //   await addToCart(e, productId);
  // }

  const SkeletonLoader = () => {
    return Array(6)
      .fill()
      .map((_, index) => (
        <div
          key={index}
          className="w-full min-w-[280px] md:min-w-[320px] max-w-[280px] md:max-w-[320x] h-36 bg-slate-200 rounded-sm shadow-md flex animate-pulse"
        >
          <div className="bg-slate-300 h-full p-4 min-w-[120px] md:min-w-[145px] flex items-center justify-center">
            <div className="w-full h-full bg-slate-400 rounded"></div>
          </div>
          <div className="p-4 grid w-full">
            <div className="h-4 bg-slate-300 mb-2 w-3/4 rounded"></div>
            <div className="h-3 bg-slate-300 mb-2 w-1/2 rounded"></div>
            <div className="h-4 bg-slate-300 mb-2 w-2/3 rounded"></div>
            <div className="h-8 bg-slate-300 w-1/2 rounded mt-2"></div>
          </div>
        </div>
      ));
  };

  return (
    <div className="container mx-auto px-4 my-6 relative">
      <h2 className="text-2xl font-bold mb-4 py-4">{heading}</h2>
      <div className="relative">
        <div
          className="flex items-center gap-4 md:gap-6 overflow-x-scroll scrollbar-none transition-all"
          ref={scrollElement}
        >
          {loading ? (
            <SkeletonLoader />
          ) : salonProducts.length === 0 ? (
            <div>No products found</div>
          ) : (
            salonProducts.map((product, index) => (
              <Link
                to={`/product/${product._id}`}
                key={index}
                className="w-full min-w-[280px] md:min-w-[320px] max-w-[280px] md:max-w-[320x] h-36 bg-slate-300 rounded-sm shadow-md flex"
              >
                <div className="bg-white-300 h-full p-4 min-w-[120px] md:min-w-[145px]">
                  <img
                    src={product?.image[0]}
                    alt={product?.name}
                    className="w-full h-full object-scale-down hover:scale-110 transition-all"
                  />
                </div>
                <div className="p-4 flex-1">
                  <h2 className="text-base md:text-sm font-medium text-ellipsis line-clamp-1">
                    {product?.name}
                  </h2>
                  <p className="text-xs capitalize text-slate-500">
                    {product?.description}
                  </p>
                  <div className="flex flex-wrap items-center">
                    <span className="text-sm text-blue-500 font-medium">
                      {displayNGNCurrency(product?.price)}
                    </span>
                  </div>
                  <div className="">
                    <button
                      // onClick={(e) => handleAddToCart(e, product?._id)}
                      className="p-2 text-sm mt-2 rounded-full text-white
                                                bg-gradient-to-r from-violet-600 to-blue-400
                                                transition-all duration-300 hover:shadow-lg hover:scale-105
                                                focus:outline-none focus:ring-2 focus:ring-violet-400"
                    >
                      Interested?
                    </button>
                  </div>
                </div>
              </Link>
            ))
          )}
        </div>

        <button
          className="bg-white shadow-md rounded-full p-1 absolute left-0 top-1/2 -translate-y-1/2 text-lg hidden md:block transition-all"
          onClick={scrollLeft}
        >
          <FaAngleLeft />
        </button>
        <button
          className="bg-white shadow-md rounded-full p-1 absolute right-0 top-1/2 -translate-y-1/2 text-lg hidden md:block transition-all"
          onClick={scrollRight}
        >
          <FaAngleRight />
        </button>
      </div>
    </div>
  );
}

export default HorizontalSalonProductCard;
