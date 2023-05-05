import { Button } from '@chakra-ui/react'
import { useNavigate } from "react-router-dom";

function SubFooter() {
    const navigate = useNavigate();
    return (
        <div className='bg-gradient-to-l from-linear2-1 to-linear2-2'>
        <div className="flex flex-row justify-between items-center px-[15%] pt-[5%] bg-imag-subfooter">
            <div className="box-left flex flex-col items-start mb-16">
                <h1 className="text-headline2 text-white">Interested in Becomming<br/>a Software Developer?</h1>
                <Button variant="secondary" className="w-[250px] mt-10" onClick={() => { navigate("/courses"); window.scrollTo(0, 0);}}>Check Out Our Course</Button>
            </div>
            <div>
            <img src="\image\footer\Group.png" alt="Group"/>
            </div>
        </div>
        </div>
    )
}

export default SubFooter;