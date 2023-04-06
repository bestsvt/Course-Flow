import { Button } from '@chakra-ui/react'

function SubFooter() {
    
    return (
        <div className="flex flex-row justify-around items-center bg-blue-500 h-[500px]"  >
            <div className="box-left flex flex-col justify-around items-start">
                <h1 className="text-headline2 text-white">Interested in Becomming<br/>a Software Developer?</h1>
                <Button variant="secondary" className="w-[250px] mt-10">Check Out Our Course</Button>
            </div>
            <div>
            <img src=".\image\footer\Group.png" alt="Group"/>
            </div>
        </div>
    )
}

export default SubFooter;