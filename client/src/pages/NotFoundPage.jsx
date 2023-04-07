import { Button } from "@chakra-ui/react"
import { useNavigate } from "react-router-dom";

function NotFoundPage() {

    const navigate = useNavigate();

    return (
        <div className="flex flex-col justify-center items-center h-screen">
            <h1 className="text-[200px] text-gray-600">404</h1>
            <h1 className="text-[120px] text-gray-600 mb-10">Page not found</h1>
            <h1 className="text-[35px] text-gray-700 mb-10">It's looking like you may have taken a wrong turn. Don't worry ... it happens to the most of us</h1>
            <Button variant="secondary" className="mb-10" onClick={() => {navigate("/")}}>GO BACK TO OUR HOMEPAGE</Button>
        </div>
    )
}

export default NotFoundPage