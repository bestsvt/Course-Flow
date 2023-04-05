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
        <div className="flex flex-col p-[10%] gap-[120px]">
            {/* letf content */}
            <div className="flex justify-between">
                <img src="./image/homepage-section-2/Section2-1.png" alt="" className="rounded-lg w-[40%] h-[360px] object-cover"/>
                <div className="flex flex-col w-[50%] gap-6 h-full">
                    <h1 className="text-headline2 text-black mb-4">Learning experience has been enhanced with new technologies</h1>
                    <div className="flex gap-6">
                        <img src="./image/homepage-section-2/Section2-icon1.png" alt="" className="w-[36px] h-[36px]"/>
                        <div className="flex flex-col gap-2.5">
                            <h1 className="text-headline3 text-black w-[85%]">Secure & Easy</h1>
                            <p className="text-body2 text-black w-[85%]">Duis aute irure dolor in reprehenderit in voluptate velit es se cillum dolore eu fugiat nulla pariatur. Excepteur sint.</p>
                        </div>
                    </div>
                    <div className="flex gap-6">
                        <img src="./image/homepage-section-2/Section2-icon2.png" alt="" className="w-[36px] h-[36px]"/>
                        <div className="flex flex-col gap-2.5">
                            <h1 className="text-headline3 text-black w-[85%]">Support All Student</h1>
                            <p className="text-body2 text-black w-[85%]">Duis aute irure dolor in reprehenderit in voluptate velit es se cillum dolore eu fugiat nulla pariatur. Excepteur sint.</p>
                        </div>
                    </div>
                </div>
            </div>
            {/* Right content */}
            <div className="flex justify-between">
                <div className="flex flex-col w-[50%] gap-6 h-full">
                    <h1 className="text-headline2 text-black mb-4">Interaction between the tutor and the learners </h1>
                    <div className="flex gap-6">
                        <img src="./image/homepage-section-2/Section2-icon3.png" alt="" className="w-[36px] h-[36px]"/>
                        <div className="flex flex-col gap-2.5">
                            <h1 className="text-headline3 text-black w-[85%]">Purely Collaborative</h1>
                            <p className="text-body2 text-black w-[85%]">Duis aute irure dolor in reprehenderit in voluptate velit es se cillum dolore eu fugiat nulla pariatur. Excepteur sint.</p>
                        </div>
                    </div>
                    <div className="flex gap-6">
                        <img src="./image/homepage-section-2/Section2-icon2.png" alt="" className="w-[36px] h-[36px]"/>
                        <div className="flex flex-col gap-2.5">
                            <h1 className="text-headline3 text-black w-[85%]">Support All Student</h1>
                            <p className="text-body2 text-black w-[85%]">Duis aute irure dolor in reprehenderit in voluptate velit es se cillum dolore eu fugiat nulla pariatur. Excepteur sint.</p>
                        </div>
                    </div>
                </div>
                <img src="./image/homepage-section-2/Section2-2.png" alt="" className="rounded-lg w-[40%] h-[360px] object-cover"/>
            </div>            
        </div>
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