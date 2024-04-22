import React from "react";
import { MdOutlineArrowOutward } from "react-icons/md";
import Ptrans from "../../components/page-tran/Ptrans";
import { motion, useAnimation } from "framer-motion";
import homeimg from "../../assets/vector-house.jpg";
import "./home.css";
const Home = () => {
  const cards = [useAnimation(), useAnimation()];
  const handleHover = (index) => {
    cards[index].start({ y: "0" });
  };
  const handleHoverEnd = (index) => {
    cards[index].start({ y: "100%" });
  };
  const marquee = {
    initial: { x: "0" },
    animate: { x: "-100%" },
    transition: { repeat: Infinity, ease: "linear", duration: 13 },
  };
  return (
    <>
      <div className="landing-page-main">
        <div className="text-structure">
          <div className="masker">
            <div className="masker-sub">
              <h1>EXPLORE</h1>
            </div>
          </div>
          <div className="masker">
            <div className="masker-sub masker-sub-push">
              {/* <div className="masker-sub-push-div"></div> */}
              <h1>UNLIMITED</h1>
            </div>
          </div>
          <div className="masker">
            <div className="masker-sub">
              <h1>POSSIBILITIES</h1>
            </div>
          </div>
        </div>

        <div className="landing-page-hr"></div>
        <div className="landing-page-main-third">
          <p>Unlock Your Dream Home</p>
          <p>From the first pitch to IPO</p>
          <div>
            <span>Start Your Journey Today</span>
            <i>
              <MdOutlineArrowOutward />
            </i>
          </div>
        </div>
        <Ptrans />
      </div>
      <div className="about-main">
        <h1>
          Begin your journey with Prime Properties. Whether you're searching for
          a cozy apartment or a spacious family house, we have options to suit
          every lifestyle and budget.
        </h1>
        <div className="about-img-con">
          <div className="about-img-one">
            <h1>Our approach:</h1>
            <a>
              <span>READ MORE</span>
              <span className="about-button-circle"></span>
            </a>
          </div>
          <div className="about-img-two">
            <img
              src="https://www.realestate.com.au/news-image/w_2560,h_1707/v1706073203/news-lifestyle-content-assets/wp-content/production/Students-1.jpg?_i=AA"
              alt=""
            />
          </div>
        </div>
      </div>
      <div className="featured-main">
        <div className="featured-sub">
          <h1>Featured Property</h1>
        </div>
        <div className="featured-cards-container">
          <motion.div
            className="featured-card"
            onHoverStart={() => handleHover(0)}
            onHoverEnd={() => handleHoverEnd(0)}
          >
            <h1 className="featured-card-text-one-h">
              {/* {"FYDE".split("").map((item, index) => ( */}
              <motion.span
                transition={{ ease: [0.61, 1, 0.88, 1], delay: 0.05 }}
                initial={{ y: "100%" }}
                animate={cards[0]}
              >
                COZY
              </motion.span>
              {/* ))} */}
            </h1>
            <div className="featured-card-sub">
              <img
                src={
                  "https://ochi.design/wp-content/uploads/2023/10/Fyde_Illustration_Crypto_2-663x551.png"
                }
                alt=""
              />
            </div>
          </motion.div>

          <motion.div
            onHoverStart={() => handleHover(1)}
            onHoverEnd={() => handleHoverEnd(1)}
            className="featured-card"
          >
            <h1 className="featured-card-text-two-h">
              {/* {"VISE".split("").map((item, index) => ( */}
              <motion.span
                transition={{ ease: [0.61, 1, 0.88, 1], delay: 0.05 }}
                initial={{ y: "100%" }}
                animate={cards[1]}
              >
                VILLA
              </motion.span>
              {/* ))} */}
            </h1>
            <div className="featured-card-sub">
              <img
                src={
                  "https://ochi.design/wp-content/uploads/2022/09/Vise_front2-663x551.jpg"
                }
                alt=""
              />
            </div>
          </motion.div>
        </div>
        <div className="marquee-main">
          <div className="marquee-text">
            <motion.h1
              initial={marquee.initial}
              animate={marquee.animate}
              transition={marquee.transition}
            >
              YOUR SEARCH ENDS HERE
            </motion.h1>

            <motion.h1
              initial={{ x: "0" }}
              animate={{ x: "-100%" }}
              transition={{ repeat: Infinity, ease: "linear", duration: 13 }}
            >
              YOUR SEARCH ENDS HERE
            </motion.h1>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
