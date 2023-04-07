import Navbar from "../components/Navbar";
import RegisterForm from "../components/RegisterForm";

function RegisterPage() {
    return (
      <>
      <Navbar/>
      <div className="bg-[#FCFCFE] bg-imag-register">
      <RegisterForm/>
      </div>
      </>
    );
}

export default RegisterPage;