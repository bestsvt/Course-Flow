import Navbar from "../components/Navbar";
import SubFooter from "../components/SubFooter"
import Footer from "../components/Footer"
import {intructor} from "../mockdata/intructor.js"
import { Button } from '@chakra-ui/react'
import Vector1 from "/image/header/Vector1.png"

function HomePage() {
    
    return (
        <div>
        <Navbar/>
        {/* ———————— Section Header ———————— */}
        <Navbar />
      {/* ———————— Section Header ———————— */}
      <header>
        {/* Start Coding Here */}
        <div className="flex flex-row p-[10%] bg-blue-100 bg-imag-header">
          <div className="flex flex-col">
            <h1 className="text-headline1 -mb-6">Best Virtual</h1>
            <h1 className="text-headline1 mb-2">Classroom Software</h1>
            <h2 className="text-body1 break-words">
              Welcome to Schooler! The one-stop online class management
            </h2>
            <h2 className="text-body1 break-words">
              system that caters to all your educational needs!
            </h2>
            <Button className="w-[200px] my-10" variant="primary">
              Explore Courses
            </Button>
          </div>
          <div className="relative">
            <img className="fixed right-36 w-[452px] h-[448px] z-[2]"  
            src={Vector1} alt="computer"/>
          </div>
        </div>
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
            {/* Start Coding Here */}

        </section>


        <SubFooter/>
        <Footer/>
        </div>
    )
}

export default HomePage;