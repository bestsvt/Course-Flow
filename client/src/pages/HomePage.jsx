import Navbar from "../components/Navbar";
import SubFooter from "../components/SubFooter"
import Footer from "../components/Footer"
import {instructor} from "../mockdata/instructor.js"
import { Button } from '@chakra-ui/react'
import Vector1 from "/image/header/Vector1.png"

function HomePage() {
    
    return (
        <div>
        <Navbar/>
        {/* ———————— Section Header ———————— */}
        <header>
        <div className="flex flex-row justify-between px-[10%] py-[7.5%] bg-blue-100 bg-imag-header">
            <div className="flex flex-col gap-6">
                <h1 className="text-headline1 text-black font-headline1">
                Best Virtual <br/>
                Classroom Software
                </h1>
                <h2 className="text-body1 text-gray.700 font-body1">
                Welcome to Schooler! The one-stop online class management<br/>
                system that caters to all your educational needs!
                </h2>
                <Button className="w-[200px] mt-[36px]" variant="primary">
                Explore Courses
                </Button>
            </div>
            <img className="w-[30%] mr-20"  
            src={Vector1} alt="computer"/>
        </div>
      </header>
        {/* ———————— Section 2 ———————— */}
        <section>
            {/* Start Coding Here */}

        </section>

        {/* ———————— Section 3 ———————— */}
        <section className="px-[10%] py-[5%] flex flex-col gap-16">
            <div className="text-center text-headline2 text-black font-headline2">Our Professional Instructor</div>
            <div className="flex justify-between">
            {instructor.map((data,index)=>{
                return (
                    <div key={index} className="flex-col text-center w-[30%]">
                        <img src={data.image} alt={data.altDescription} className="w-full"/>
                        <div className="text-headline3 font-headline3 text-black mt-4">{data.name}</div>
                        <div className="text-blue-400">{data.position}</div>
                    </div> 
                )
            })}
            </div>
        </section>


        {/* ———————— Section 4 ———————— */}
        <section>
            {/* Start Coding Here */}

        </section>


        <SubFooter/>
        <Footer/>
        </div>
    )
}

export default HomePage;