import Navbar from "../components/Navbar";
import SubFooter from "../components/SubFooter"
import Footer from "../components/Footer"
import {instructor} from "../mockdata/instructor.js"

function HomePage() {
    
    return (
        <div>
        <Navbar/>
        {/* ———————— Section Header ———————— */}
        <header>
            

        </header>
        {/* ———————— Section 2 ———————— */}
        <section>
            {/* Start Coding Here */}

        </section>

        {/* ———————— Section 3 ———————— */}
        <section className="px-[10%] my-[105px]">
            {/* Start Coding Here */}
            <div className="text-center text-headline2 text-black font-headline2 mb-10" >Our Professional Instructor</div>
            <div className="flex">
        {instructor.map((data,index)=>{
            return (
                <div key={index} className="flex-col mx-6 text-center">
                    <img src={data.image} alt={data.altDescription} className="w-[336px] h-[395px]"/>
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