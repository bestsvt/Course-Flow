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
        <section>
            {/* Start Coding Here */}
            <div>Our Professional Ins</div>
        {instructor.map((data,index)=>{
            return (
                <div key={index} className="">
                    <img src={data.image} alt={data.altDescription} />
                    <h1>Name: {data.name}</h1>
                    <h2>Rank: {data.rank}</h2>
                </div>
            )
        })}
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