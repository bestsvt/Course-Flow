import Navbar from "../components/Navbar";
import SubFooter from "../components/SubFooter";
import Footer from "../components/Footer";
import { graduate } from "../mockdata/graduate.js";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { instructor } from "../mockdata/instructor.js";
import { Button } from "@chakra-ui/react";

function HomePage() {
  return (
    <div>
      <Navbar />
      {/* ———————— Section Header ———————— */}
      <header>
        <div className="flex flex-row justify-between px-[10%] py-[7.5%] bg-blue-100 bg-imag-header">
          <div className="flex flex-col gap-6">
            <h1 className="text-headline1 text-black font-headline1">
              Best Virtual <br />
              Classroom Software
            </h1>
            <h2 className="text-body1 text-gray.700 font-body1">
              Welcome to Schooler! The one-stop online class management
              <br />
              system that caters to all your educational needs!
            </h2>
            <Button className="w-[200px] mt-[36px]" variant="primary">
              Explore Courses
            </Button>
          </div>
          <img
            className="w-[30%] mr-20"
            src="./image/homepage/header/Vector1.png"
            alt="computer"
          />
        </div>
      </header>
      {/* ———————— Section 2 ———————— */}
      <section>
        <div className="flex flex-col p-[10%] gap-[120px]">
          {/* letf content */}
          <div className="flex justify-between">
            <img
              src="./image/homepage/homepage-section-2/Section2-1.png"
              alt="feature-image-1"
              className="rounded-lg w-[40%] h-[360px] object-cover"
            />
            <div className="flex flex-col w-[50%] gap-6 h-full">
              <h1 className="text-headline2 text-black mb-4">
                Learning experience has been enhanced with new technologies
              </h1>
              <div className="flex gap-6">
                <img
                  src="./image/homepage/homepage-section-2/Section2-icon1.png"
                  alt="icon-secure"
                  className="w-[36px] h-[36px]"
                />
                <div className="flex flex-col gap-2.5">
                  <h1 className="text-headline3 text-black w-[85%]">
                    Secure & Easy
                  </h1>
                  <p className="text-body2 text-black w-[85%]">
                    Duis aute irure dolor in reprehenderit in voluptate velit es
                    se cillum dolore eu fugiat nulla pariatur. Excepteur sint.
                  </p>
                </div>
              </div>
              <div className="flex gap-6">
                <img
                  src="./image/homepage/homepage-section-2/Section2-icon2.png"
                  alt="icon-heart"
                  className="w-[36px] h-[36px]"
                />
                <div className="flex flex-col gap-2.5">
                  <h1 className="text-headline3 text-black w-[85%]">
                    Support All Student
                  </h1>
                  <p className="text-body2 text-black w-[85%]">
                    Duis aute irure dolor in reprehenderit in voluptate velit es
                    se cillum dolore eu fugiat nulla pariatur. Excepteur sint.
                  </p>
                </div>
              </div>
            </div>
          </div>
          {/* Right content */}
          <div className="flex justify-between">
            <div className="flex flex-col w-[50%] gap-6 h-full">
              <h1 className="text-headline2 text-black mb-4">
                Interaction between the tutor and the learners{" "}
              </h1>
              <div className="flex gap-6">
                <img
                  src="./image/homepage/homepage-section-2/Section2-icon3.png"
                  alt="icon-group"
                  className="w-[36px] h-[36px]"
                />
                <div className="flex flex-col gap-2.5">
                  <h1 className="text-headline3 text-black w-[85%]">
                    Purely Collaborative
                  </h1>
                  <p className="text-body2 text-black w-[85%]">
                    Duis aute irure dolor in reprehenderit in voluptate velit es
                    se cillum dolore eu fugiat nulla pariatur. Excepteur sint.
                  </p>
                </div>
              </div>
              <div className="flex gap-6">
                <img
                  src="./image/homepage/homepage-section-2/Section2-icon2.png"
                  alt="icon-heart"
                  className="w-[36px] h-[36px]"
                />
                <div className="flex flex-col gap-2.5">
                  <h1 className="text-headline3 text-black w-[85%]">
                    Support All Student
                  </h1>
                  <p className="text-body2 text-black w-[85%]">
                    Duis aute irure dolor in reprehenderit in voluptate velit es
                    se cillum dolore eu fugiat nulla pariatur. Excepteur sint.
                  </p>
                </div>
              </div>
            </div>
            <img
              src="./image/homepage/homepage-section-2/Section2-2.png"
              alt="feature-image-2"
              className="rounded-lg w-[40%] h-[360px] object-cover"
            />
          </div>
        </div>
      </section>

      {/* ———————— Section 3 ———————— */}
      <section className="px-[10%] py-[5%] flex flex-col gap-16">
        <div className="text-center text-headline2 text-black font-headline2">
          Our Professional Instructor
        </div>
        <div className="flex justify-between">
          {instructor.map((data, index) => {
            return (
              <div key={index} className="flex-col text-center w-[30%]">
                <img
                  src={data.image}
                  alt={data.altDescription}
                  className="w-full"
                />
                <div className="text-headline3 font-headline3 text-black mt-4">
                  {data.name}
                </div>
                <div className="text-blue-400">{data.position}</div>
              </div>
            );
          })}
        </div>
      </section>
      {/* ———————— Section 4 ———————— */}
      <section className="mb-[5%]">
        <div className="w-full h-[600px] flex flex-col items-center justify-center  ">
          <h1 className="text-headline2 text-black font-headline2">
            Our Graduates
          </h1>

          <div className="w-full h-[300px] m-16 flex  items-center justify-center   ">
            <div className=" max-w-[1980px]  h-full">
              <Swiper
                spaceBetween={60}
                slidesPerView={2.5}
                centeredSlides={true}
                initialSlide={1}
              >
                {graduate.map((graduate, index) => {
                  return (
                    <SwiperSlide
                      className=" h-[300px] flex flex-row items-center relative"
                      key={index}
                    >
                      <div className=" w-full h-[300px] flex flex-row justify-end  rounded-lg  ">
                        <div className=" w-[80%] h-[300px] flex flex-col justify-center p-5 pl-[90px] bg-blue-100 rounded-lg">
                          <h1 className="text-headline3 text-blue-500 font-headline3">
                            {graduate.name}
                          </h1>
                          <p className="text-body2 text-gray-700 pt-4 font-body2">
                            {graduate.content}
                          </p>
                        </div>
                      </div>
                      <div className=" absolute z-10 ">
                        <img src={graduate.image} alt={graduate.name} />
                      </div>

                      <div className=" absolute z-20 flex flex-row gap-1 top-0 left-0">
                        <img
                          src="./image/homepage/graduate/Vector-1.png"
                          alt="icon-double-quote"
                        />
                        <img
                          src="./image/homepage/graduate/Vector-1.png"
                          alt="icon-double-quote"
                        />
                      </div>

                      <div className=" absolute z-20 flex flex-row gap-1 bottom-2 right-5 ">
                        <img
                          src="./image/homepage/graduate/Vector-2.png"
                          alt="icon-double-quote"
                        />
                        <img
                          src="./image/homepage/graduate/Vector-2.png"
                          alt="icon-double-quote"
                        />
                      </div>
                    </SwiperSlide>
                  );
                })}
              </Swiper>
            </div>
          </div>
        </div>
      </section>
      <SubFooter />
      <Footer />
    </div>
  );
}

export default HomePage;
