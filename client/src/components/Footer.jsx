function Footer() {
    
    return (
        <div className="flex flex-row justify-around items-center bg-blue-700 h-60">
            <div>
                <img src="./image/logo/CourseFlow.png" alt="Logo-page" className="w-[200px]" />
            </div>
            <div className="flex flex-row justify-between items-center text-body1 text-gray-500">
                <p className="m-10">All Course</p>
                <p className="m-10">Bundle Package</p>
            </div>
            <div className="flex flex-row justify-around">
            <a href="http://www.facebook.com"><img src=".\image\footer\fb.png" alt="Facebook logo" className="m-2"/></a>
                <a href="http://www.instagram.com"><img src=".\image\footer\ig.png" alt="Instagram logo" className="m-2"/></a>
                <a href="http://www.twitter.com"><img src=".\image\footer\tw.png" alt="Twitter logo" className="m-2"/></a>
            </div>
        </div>
    )
}

export default Footer;