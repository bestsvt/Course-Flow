import Navbar from "../components/Navbar";
import SubFooter from "../components/SubFooter"
import Footer from "../components/Footer"
import {intructor} from "../mockdata/intructor.js"

function HomePage() {
    
    return (
        <div>
            <h1 className="text-3xl font-bold underline text-blue-900">
                Hello world!
            </h1>
        <Navbar/>
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
            {/* Start Coding Here */}

        </section>


        <SubFooter/>
        <Footer/>
        </div>
    )
}

export default HomePage;