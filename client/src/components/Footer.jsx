import { useNavigate } from "react-router-dom";

function Footer() {
    const navigate = useNavigate();
    return (
        <div className="flex flex-row justify-around items-center bg-blue-700 h-60">
            <div>
                <img src="/image/logo/CourseFlow.png" alt="Logo-page" className="w-[200px] hover:cursor-pointer" onClick={() => { navigate("/"); window.scrollTo(0, 0)}}/>
            </div>
            <div className="flex flex-row gap-20 justify-between items-center text-body1 text-gray-500">
                <p className="hover:cursor-pointer" onClick={() => { navigate("/courses"); window.scrollTo(0, 0);}}>All Course</p>
                <p className="hover:cursor-not-allowed">Bundle Package</p>
            </div>
            <div className="flex flex-row justify-around">
                <a href="http://www.facebook.com" target="_blank"><img src="\image\footer\fb.png" alt="Facebook logo" className="m-2"/></a>
                <a href="http://www.instagram.com" target="_blank"><img src="\image\footer\ig.png" alt="Instagram logo" className="m-2"/></a>
                <a href="http://www.twitter.com" target="_blank"><img src="\image\footer\tw.png" alt="Twitter logo" className="m-2"/></a>
            </div>
        </div>
    )
}

export default Footer;