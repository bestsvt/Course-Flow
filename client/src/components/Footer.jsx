function Footer() {
    
    return (
        <div className="flex flex-row justify-around items-center bg-blue-700 h-60">
            <div>
                <img src=".\image\footer\CourseFlow.png" alt="Logo page" />
            </div>
            <div className="flex flex-row justify-between items-center text-body1 text-gray-500">
                <p className="m-10">All Course</p>
                <p className="m-10">Bundle Package</p>
            </div>
            <div className="flex flex-row justify-around">
                <img src=".\image\footer\fb.png" alt="Facebook logo" className="m-2"/>
                <img src=".\image\footer\ig.png" alt="Instagram logo" className="m-2"/>
                <img src=".\image\footer\tw.png" alt="Twitter logo" className="m-2"/>
            </div>
        </div>
    )
}

export default Footer;