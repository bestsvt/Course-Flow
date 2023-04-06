import Navbar from "../components/Navbar";
import RegisterForm from "../components/RegisterForm";

function RegisterPage() {
    return (
      <>
      <Navbar/>
      <div className="bg-[#FCFCFE]">
      <RegisterForm/>
      </div>
      </>
    );
}

export default RegisterPage;