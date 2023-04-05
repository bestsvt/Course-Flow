import Navbar from "../components/Navbar";
import SubFooter from "../components/SubFooter"
import Footer from "../components/Footer"
import { intructor } from "../mockdata/intructor.js"
import { graduate } from "../mockdata/graduate.js";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';

function HomePage() {

    return (
        <div>
            <h1 className="text-3xl font-bold underline text-blue-900">
                Hello world!
            </h1>
            <Navbar />
            {/* ———————— Section Header ———————— */}
            <header>
                {/* Start Coding Here */}

            </header>
            {/* ———————— Section 2 ———————— */}
            <section>
                {/* Start Coding Here */}

            </section>

            {/* ———————— Section 3 ———————— */}
            <section>
                {/* Start Coding Here */}
                {/* {intructor.map((data,index)=>{
            return (
                <div key={index}>
                    <img src={data.image} alt="" />
                    <h1>Name: {data.name}</h1>
                    <h2>Position: {data.position}</h2>
                </div>
            )
        })} */}
            </section>


            {/* ———————— Section 4 ———————— */}
            <section>
                <div className="w-full h-[600px] flex flex-col items-center justify-center  ">

                    <h1 className="text-headline2 text-black ">Our Graduates</h1>

                    < div className="w-full h-[300px] m-16 flex  items-center justify-center   " >
                        <div className=" max-w-[1980px]  h-full" >
                            <Swiper
                                spaceBetween={60}
                                slidesPerView={2.5}
                                centeredSlides={true}
                                initialSlide={1}
                                onSlideChange={() => console.log('slide change')}
                                onSwiper={(swiper) => console.log(swiper)}
                            >
                                {graduate.map((data, index) => {
                                    return (
                                        <div key={index}>
                                            <SwiperSlide className=" h-[300px] flex flex-row items-center relative  " >
                                                <div className=" w-full h-[300px] flex flex-row justify-end  rounded-lg  " >
                                                    <div className=" w-[80%] h-[300px] flex flex-col justify-center p-5 pl-[90px] bg-blue-100 rounded-lg">
                                                        <h1 className="text-headline3 text-blue-500">{data.name}</h1>
                                                        <p className="text-body2 text-gray-700 pt-4">{data.content}</p>
                                                    </div>
                                                </div>

                                                <div className=" absolute z-10 ">
                                                    <img src={data.image} alt={data.name} />
                                                </div>

                                                <div className=" absolute z-20 flex flex-row gap-1 top-0 left-0">
                                                    <img src="../../public/image/graduate/Vector-1.png" alt="" />
                                                    <img src="../../public/image/graduate/Vector-1.png" alt="" />
                                                </div>

                                                <div className=" absolute z-20 flex flex-row gap-1 bottom-2 right-5 ">
                                                    <img src="../../public/image/graduate/Vector-2.png" alt="" />
                                                    <img src="../../public/image/graduate/Vector-2.png" alt="" />
                                                </div>

                                            </SwiperSlide>
                                        </div>
                                    )
                                })}
                            </Swiper>
                        </div>
                    </div>
                </div>


            </section>


            <SubFooter />
            <Footer />
        </div>
    )
}

export default HomePage;