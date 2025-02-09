import logo from "../assets/logo.svg";
import { Link, NavLink } from "react-router-dom";
import cart from "../assets/cart.svg";
import { useContext, useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import { FaBars, FaTimes } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
import { CartContext } from "../Context/CartContext";
import { DonationCartContext } from "../Context/DonationCartContext";
import { RiDeleteBin5Fill } from "react-icons/ri";
import { FaUserCircle } from "react-icons/fa";
import { useEffect } from "react";
import logicon from "../assets/enter.png";
import donation from "../assets/donation.png";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [cartSidebar, setCartSidebar] = useState(false);
  const [donationSidebar, setDonationSidebar] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false); // For desktop
  const [mobileDropdownOpen, setMobileDropdownOpen] = useState(false); // For mobile
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isDropdownOpen2, setIsDropdownOpen2] = useState(false);
  const [isDropdownOpen3, setIsDropdownOpen3] = useState(false);
  const [hasAccessToken, setHasAccessToken] = useState(false);

  useEffect(() => {
    // Get the token from localStorage
    const accessToken = localStorage.getItem("token");

    // If the token exists and is not null, set the state to true
    if (accessToken) {
      setHasAccessToken(true);
    }
  }, []);

  // console.log(hasAccessToken);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };
  const toggleDropdown2 = () => {
    setIsDropdownOpen2(!isDropdownOpen2);
  };
  const toggleDropdown3 = () => {
    setIsDropdownOpen3(!isDropdownOpen3);
  };

  const { clearCart, removeFromCart, getCartTotal, addToCart, cartItems } =
    useContext(CartContext);

  const { donationCartItems, addToDonationCart, clearDonationCart, removeFromDonationCart, getDonationCartTotal } =
    useContext(DonationCartContext);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setHasAccessToken(false);
  };

  return (
    <>
      <div
        className="w-full h-[70px] rounded-[100px] pl-6 pr-4"
        style={{
          backgroundColor: "rgba(251,247,245,0.7)",
          backdropFilter: "blur(8px)",
          WebkitBackdropFilter: "blur(8px)",
        }}
      >
        <div className="w-full h-full flex justify-between items-center">
          <Link
            to="/"
            className="flex justify-center items-center flex-shrink-0"
          >
            <img
              src={logo}
              alt="logo"
              className="w-full h-full object-contain"
            />
          </Link>

          {/* Desktop Navigation */}
          <span className="hidden lg:flex items-center gap-10">
            <ul className="flex items-center gap-12 text-base font-medium">
              {[
                { path: "/about", label: "About Us" },
                { path: "/donation", label: "Donation" },
                { path: "/events", label: "Events" },
                { path: "/blogs", label: "Blogs" },
                { path: "/shop", label: "Shop" },
                { path: "/contacts", label: "Contacts" },
              ].map(({ path, label }) =>
                label === "Donation" ? (
                  <li
                    key={path}
                    className="relative group flex items-center gap-2 cursor-pointer"
                    onMouseEnter={() => setDropdownOpen(true)}
                    // onMouseLeave={() => setDropdownOpen(false)}
                  >
                    <span className="flex items-center gap-2 text-black group-hover:text-[#eb852c]">
                      {label}
                      <IoIosArrowDown />
                    </span>
                    {dropdownOpen && (
                      <div
                        className="absolute top-8 left-0 w-60 bg-white shadow-md rounded-xl"
                        onMouseLeave={() =>
                          setTimeout(() => setDropdownOpen(false), 200)
                        } // Small delay for better UX
                      >
                        <ul className="flex flex-col p-2">
                          <li>
                            <NavLink
                              to="/donation"
                              className="block px-4 py-2 rounded-full hover:bg-[#eb852c] hover:text-white"
                            >
                              General Donation
                            </NavLink>
                          </li>
                          <li>
                            <NavLink
                              to="/csr"
                              className="block px-4 py-2 rounded-full hover:bg-[#eb852c] hover:text-white"
                            >
                              CSR Donation
                            </NavLink>
                          </li>
                          <li>
                            <NavLink
                              to="/temple-construction"
                              className="block px-4 py-2 rounded-full hover:bg-[#eb852c] hover:text-white"
                            >
                              Temple Construction
                            </NavLink>
                          </li>
                        </ul>
                      </div>
                    )}
                  </li>
                ) : (
                  <li key={path}>
                    <NavLink
                      to={path}
                      className={({ isActive }) =>
                        `group relative flex items-center gap-2 ${
                          isActive
                            ? "text-[#eb852c] underline underline-offset-8"
                            : "text-black"
                        } hover:text-[#eb852c]`
                      }
                    >
                      {label}
                    </NavLink>
                  </li>
                )
              )}
            </ul>

            <button
              onClick={() => setCartSidebar(true)}
              className="text-black hover:text-[#eb852c] relative"
            >
              <img src={cart} alt="cart" />
              {cartItems.length > 0 && (
                <span className="text-[#eb852c] absolute font-semibold -top-1 text-xs -right-2 w-4 h-4 flex justify-center items-center bg-white rounded-full border border-gray-400">
                  {cartItems.length}
                </span>
              )}
            </button>
            <button
              onClick={() => setDonationSidebar(true)}
              className="text-black hover:text-[#eb852c] relative"
            >
              <img src={donation} alt="" className="w-8 h-8" />

              {donationCartItems.length > 0 && (
                <span className="text-[#eb852c] absolute font-semibold -top-1 text-xs -right-2 w-4 h-4 flex justify-center items-center bg-white rounded-full border border-gray-400">
                  {donationCartItems.length}
                </span>
              )}
            </button>
            <div className="flex gap-4">
              <NavLink
                to="/donate"
                className="px-8 py-3 bg-[#eb852c] text-white rounded-[124px] hover:bg-orange-600 transition ease-in-out"
              >
                Donate Now
              </NavLink>
              {hasAccessToken ? (
                <>
                  <div className="relative flex items-center gap-4">
                    <FaUserCircle
                      size={50}
                      color="#eb852c"
                      className="cursor-pointer border-2 border-white rounded-full"
                      onClick={toggleDropdown}
                    />
                    {isDropdownOpen && (
                      <div
                        className="absolute top-12 right-0 mt-2 w-52 bg-white shadow-lg rounded-lg border"
                        onMouseLeave={toggleDropdown}
                      >
                        <ul className="flex flex-col text-md space-y-1 m-2">
                          <Link
                            to="/profile"
                            className="px-4 py-2 cursor-pointer hover:bg-[#eb852c] hover:text-white rounded-full transition duration-300"
                          >
                            My Profile
                          </Link>
                          <Link
                            to="/donation-history"
                            className="px-4 py-2 cursor-pointer hover:bg-[#eb852c] hover:text-white rounded-full transition duration-300"
                          >
                            Donation History
                          </Link>
                          <li
                            className="px-4 py-2 cursor-pointer hover:bg-[#eb852c] hover:text-white rounded-full transition duration-300"
                            onClick={handleLogout}
                          >
                            Logout
                          </li>
                        </ul>
                      </div>
                    )}
                  </div>
                </>
              ) : (
                <>
                  <div className="relative flex items-center gap-4">
                    <div className="mr-2" onMouseEnter={toggleDropdown2}>
                      <img src={logicon} alt="" className="w-10 h-10 " />
                    </div>
                    {isDropdownOpen2 && (
                      <div
                        className="absolute top-12 right-0 mt-2 w-52 bg-white shadow-lg rounded-lg border"
                        onMouseLeave={toggleDropdown2}
                      >
                        <ul className="flex flex-col text-md space-y-1 m-2">
                          <Link
                            to="/signup"
                            className="px-4 py-2 cursor-pointer hover:bg-[#eb852c] hover:text-white rounded-full transition duration-300"
                          >
                            SignUp
                          </Link>
                          <Link
                            to="/signin"
                            className="px-4 py-2 cursor-pointer hover:bg-[#eb852c] hover:text-white rounded-full transition duration-300"
                          >
                            SignIn
                          </Link>
                        </ul>
                      </div>
                    )}
                  </div>
                </>
              )}
            </div>
          </span>

          {/* Mobile Menu Button */}
          <div className="w-auto h-auto flex gap-2 items-center lg:hidden">
            <button
              className="lg:hidden text-black text-2xl"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              {menuOpen ? <FaTimes /> : <FaBars />}
            </button>
            <div className="relative flex items-center gap-4">
              {hasAccessToken ? (
                <>
                  <FaUserCircle
                    size={50}
                    color="#eb852c"
                    className="cursor-pointer border-2 border-white rounded-full"
                    onClick={toggleDropdown3}
                  />
                  {isDropdownOpen3 && (
                    <div
                      className="absolute top-12 right-0 mt-2 w-52 bg-white shadow-lg rounded-lg border"
                      onMouseLeave={toggleDropdown3}
                    >
                      <ul className="flex flex-col text-md space-y-1 m-2">
                        <Link
                          to="/profile"
                          className="px-4 py-2 cursor-pointer hover:bg-[#eb852c] hover:text-white rounded-full transition duration-300"
                        >
                          My Profile
                        </Link>
                        <Link
                          to="/donation-history"
                          className="px-4 py-2 cursor-pointer hover:bg-[#eb852c] hover:text-white rounded-full transition duration-300"
                        >
                          Donation History
                        </Link>
                        <li
                          className="px-4 py-2 cursor-pointer hover:bg-[#eb852c] hover:text-white rounded-full transition duration-300"
                          onClick={() => {
                            // Clear the AccessToken on logout
                            Cookies.remove("AccessToken");
                            setHasAccessToken(false);
                          }}
                        >
                          Logout
                        </li>
                      </ul>
                    </div>
                  )}
                </>
              ) : (
                <>
                  <div className="relative flex items-center gap-4">
                    <div className="mr-2" onMouseEnter={toggleDropdown3}>
                      <img src={logicon} alt="" className="w-10 h-10 " />
                    </div>
                    {isDropdownOpen3 && (
                      <div
                        className="absolute top-12 right-0 mt-2 w-52 bg-white shadow-lg rounded-lg border"
                        onMouseLeave={toggleDropdown3}
                      >
                        <ul className="flex flex-col text-md space-y-1 m-2">
                          <Link
                            to="/signup"
                            className="px-4 py-2 cursor-pointer hover:bg-[#eb852c] hover:text-white rounded-full transition duration-300"
                          >
                            SignUp
                          </Link>
                          <Link
                            to="/signin"
                            className="px-4 py-2 cursor-pointer hover:bg-[#eb852c] hover:text-white rounded-full transition duration-300"
                          >
                            SignIn
                          </Link>
                        </ul>
                      </div>
                    )}
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Mobile Menu */}
          {menuOpen && (
            <div className="absolute top-[70px] left-0 w-full bg-[#ece4c7] shadow-md p-6 lg:hidden z-50 rounded-3xl mt-4">
              <ul className="flex flex-col items-center gap-6 text-base font-medium">
                {[
                  { path: "/about-us", label: "About Us" },
                  { path: "/donation", label: "Donation" },
                  { path: "/events", label: "Events" },
                  { path: "/blogs", label: "Blogs" },
                  { path: "/shop", label: "Shop" },
                  { path: "/contacts", label: "Contacts" },
                ].map(({ path, label }) => (
                  <li key={path}>
                    <NavLink
                      to={path}
                      className={({ isActive }) =>
                        `${
                          isActive
                            ? "text-[#eb852c] underline-[#eb852c]"
                            : "text-black underline underline-offset-8"
                        } hover:text-[#eb852c]`
                      }
                      onClick={() => setMenuOpen(false)}
                    >
                      {label}
                    </NavLink>
                  </li>
                ))}
              </ul>
              <div className="flex flex-col gap-4 mt-6">
                <span
                  className="flex items-center justify-center text-black hover:text-[#eb852c]"
                  // onClick={() => setMenuOpen(false)}
                  onClick={() => setCartSidebar(true)}
                >
                  <img src={cart} alt="cart" />
                </span>
                <span className="flex items-center justify-center text-black hover:text-[#eb852c]"
                 onClick={() => setDonationSidebar(true)}>
                  <img src={donation} alt="" className="w-8 h-8" />
                </span>
                <NavLink
                  to="/donate"
                  className="px-8 py-3 bg-[#eb852c] text-white text-center rounded-[124px] hover:bg-orange-600 transition ease-in-out"
                  onClick={() => setMenuOpen(false)}
                >
                  Donate Now
                </NavLink>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Cart Sidebar with Smooth Animation */}
      <div
        className={`fixed inset-y-0 font-poppins z-50 h-auto overflow-y-scroll right-0 w-[85%] bg-white shadow-lg p-5 transform transition-transform duration-300 ease-in-out md:w-[60%] lg:w-[50%] xl:w-[40%] 
        ${cartSidebar ? "translate-x-0" : "translate-x-full"}`}
        style={{
          scrollbarWidth: "none",
        }}
      >
        <button
          className="absolute top-3 right-3 text-gray-600"
          onClick={() => setCartSidebar(false)}
        >
          <IoMdClose size={40} />
        </button>
        <h2 className="text-lg font-bold">Shopping Cart</h2>
        <div className="w-full h-auto flex justify-end items-center my-2">
          <span
            className="flex gap-2 text-red-500 items-center text-sm md:text-base font-semibold cursor-pointer"
            onClick={clearCart}
          >
            Clear Cart
            <RiDeleteBin5Fill size={20} />
          </span>
        </div>
        <div className="w-full flex flex-col h-auto gap-4 my-7">
          {cartItems.length > 0 ? (
            cartItems.map((item) => (
              <div
                key={item.id}
                className="flex items-center p-2 pb-4 border-b gap-2 sm:gap-3"
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-24 rounded-lg object-cover sm:w-32 xl:w-40"
                />
                <div className="flex flex-col gap-1 justify-between h-full sm:py-2">
                  <div className="flex flex-col gap-1">
                    <h3 className="text-xs font-semibold sm:text-base xl:text-lg">
                      {item.name}
                    </h3>
                    <p className="text-xs text-gray-600 sm:text-sm xl:text-base">
                      Category: {item.category}
                    </p>
                    <p className="text-xs font-semibold sm:text-sm xl:text-base">
                      &#x20B9; {item.price * item.quantity}
                    </p>
                  </div>
                  <div className="w-full h-auto flex">
                    <div className="px-2 py-1 flex gap-2 text-xs items-center justify-center bg-[#ECA242] rounded-lg text-white sm:px-3 sm:text-base sm:rounded-xl sm:gap-3 xl:px-4 xl:py-2">
                      <span
                        onClick={() => removeFromCart(item)}
                        className="w-4 h-4 flex justify-center items-center rounded-full border border-white sm:w-5 sm:h-5 cursor-pointer select-none"
                      >
                        -
                      </span>
                      <span className="font-semibold xl:text-lg">
                        {item.quantity}
                      </span>
                      <span
                        onClick={() => addToCart(item)}
                        className="w-4 h-4 flex justify-center items-center rounded-full border border-white sm:w-5 sm:h-5 cursor-pointer select-none"
                      >
                        +
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-lg font-semibold h-80 flex justify-center items-center">
              Cart is Empty
            </p>
          )}
        </div>
        {cartItems.length > 0 && (
          <div className="w-full h-auto flex flex-col">
            <div className="w-full h-auto flex gap-2 items-center">
              <input type="checkbox" className="w-3" id="checkout" />
              <label htmlFor="checkout" className="text-xs">
                Checkout as Guest
              </label>
            </div>
            <div className="h-[1px] bg-black w-full mt-1"></div>
            <div className="w-full h-auto flex flex-col mt-4 gap-1.5 md:gap-2">
              <h1 className="font-semibold lg:text-lg xl:text-2xl">
                Order Summary
              </h1>
              <div className="w-full h-auto flex justify-between items-center md:text-lg">
                <span>Total MRP</span>
                <span>&#x20B9; {getCartTotal()}</span>
              </div>
              <div className="w-full h-auto flex justify-between items-center md:text-lg">
                <span>MRP Discount</span>
                <span>&#x20B9; 0000</span>
              </div>
              <div className="w-full h-auto flex justify-between items-center md:text-lg">
                <span>Coupon Discount</span>
                <span>&#x20B9; 0000</span>
              </div>
              <div className="w-full h-auto flex justify-between items-center md:text-lg">
                <span>Shipping Fee</span>
                <span>&#x20B9; 0000</span>
              </div>
              <div className="w-full h-[1px] bg-black"></div>
              <div className="w-full h-auto flex justify-between items-center md:text-lg">
                <span className="font-semibold">Total Amount</span>
                <span>&#x20B9; {getCartTotal()}</span>
              </div>
            </div>

            <div>
              <Link
                to={`/checkout`}
                className="w-full h-auto flex mt-5 lg:mt-7"
              >
                <button className="w-full bg-[#EB852C] rounded-3xl text-white h-auto flex justify-center items-center py-2 md:hover:bg-[#ffab62]">
                  Checkout
                </button>
              </Link>
            </div>
          </div>
        )}
      </div>
      <div
        className={`fixed inset-x-0 font-poppins z-50 h-[35%] overflow-y-scroll bottom-0 w-full bg-white shadow-lg px-6 py-3 transform transition-transform duration-300 ease-in-out  
        ${donationSidebar ? "translate-y-0" : "translate-y-full"}`}
        style={{
          scrollbarWidth: "none",
        }}
      >
        <button
          className="absolute top-3 right-3 text-gray-600"
          onClick={() => setDonationSidebar(false)}
        >
          <IoMdClose size={40} />
        </button>
        <div className="w-[95%] h-auto flex justify-between items-center">
        <h2 className="text-3xl font-bold">Donation Cart</h2>

          <span
            className="flex gap-2 text-red-500 items-center text-sm md:text-base font-semibold cursor-pointer"
            onClick={clearDonationCart}
          >
            Clear Cart
            <RiDeleteBin5Fill size={20} />
          </span>
        </div>
        <div className="w-full flex flex-col h-auto gap-4 my-4">
          {donationCartItems.length > 0 ? (
            donationCartItems.map((item) => (
              <div
                key={item.id}
                className="w-full flex items-center "
              >
                <div className="w-full md:w-1/2 flex justify-between items-center   h-full ">
                  <div className="w-[80%] flex justify-between items-center gap-4">
                    <h3 className="w-[90%] text-xs font-semibold sm:text-base xl:text-lg">
                      {item.title}
                    </h3>
                    <div className="w-full h-auto flex justify-end">
                    <div className="px-2 py-1 flex gap-2 text-xs items-center justify-center bg-[#ECA242] rounded-lg text-white sm:px-3 sm:text-base sm:rounded-xl sm:gap-3 xl:px-4 xl:py-1">
                      <span
                        onClick={() => removeFromDonationCart(item)}
                        className="w-4 h-4 flex justify-center items-center rounded-full border border-white sm:w-5 sm:h-5 cursor-pointer select-none"
                      >
                        -
                      </span>
                      <span className="font-semibold xl:text-lg">
                        {item.quantity}
                      </span>
                      <span
                        onClick={() => addToDonationCart(item)}
                        className="w-4 h-4 flex justify-center items-center rounded-full border border-white sm:w-5 sm:h-5 cursor-pointer select-none"
                      >
                        +
                      </span>
                    </div>
                  </div>
                  </div>
                  <p className="text-xs font-semibold sm:text-sm xl:text-base">
                      &#x20B9; {item.amount * item.quantity}
                    </p>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-lg font-semibold h-80 flex justify-center items-center">
              Cart is Empty
            </p>
          )}
        </div>
        {donationCartItems.length > 0 && (
          <div className="w-full h-auto flex flex-col">
            <div className="w-full h-auto flex gap-2 items-center">
              <input type="checkbox" className="w-3" id="checkout" />
              <label htmlFor="checkout" className="text-xs">
                Checkout as Guest
              </label>
            </div>
            <div className="h-[1px] bg-black w-full mt-1"></div>
            <div className="w-full h-auto flex flex-col mt-4 gap-1.5 md:gap-2">
              <h1 className="font-semibold lg:text-lg xl:text-2xl">
                Donation Summary
              </h1>
              <div className="w-full h-auto flex justify-between items-center md:text-lg">
                <span>Total Donation</span>
                <span>&#x20B9; {getDonationCartTotal()}</span>
              </div>
              {/* <div className="w-full h-[1px] bg-black"></div>
              <div className="w-full h-auto flex justify-between items-center md:text-lg">
                <span className="font-semibold">Total Amount</span>
                <span>&#x20B9; {getDonationCartTotal()}</span>
              </div> */}
            </div>

            <div>
              <Link
                to={`/donation-checkout`}
                className="w-full h-auto flex mt-5 lg:mt-7"
              >
                <button className="w-full bg-[#EB852C] rounded-3xl text-white h-auto flex justify-center items-center py-2 md:hover:bg-[#ffab62]">
                  Checkout
                </button>
              </Link>
            </div>
          </div>
        )}
      </div>

      {/* Backdrop for Cart Sidebar */}
      {cartSidebar && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 transition-opacity duration-300"
          onClick={() => setCartSidebar(false)}
        ></div>
      )}
      {donationSidebar && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 transition-opacity duration-300"
          onClick={() => setDonationSidebar(false)}
        ></div>
      )}
    </>
  );
};

export default Navbar;
