import React from "react";
import SidebarAdmin from "../../components/SidebarAdmin";
import { ArrowBackIcon } from "@chakra-ui/icons";
import { Button, Input, Divider } from "@chakra-ui/react";

const AddLessonPage = () => {
  const [value, setValue] = React.useState("");
  const handleChange = (event) => setValue(event.target.value);
  const [videoFile, setVideoFile] = React.useState(null);

  const handleVideoChange = (event) => {
    const file = event.target.files[0];
    setVideoFile(file);
  };
  return (
    <section className="flex">
      {/* ————————————— Left Section ————————————— */}
      <SidebarAdmin />
      {/* ————————————— Right Section ————————————— */}
      <div className="w-full">
        {/* ————————————— Navbar Section ————————————— */}
        <nav
          className="h-[100px] border-gray-400 border-b bg-white flex justify-between 
        px-20 py-4 items-center"
        >
          <div className="flex items-center gap-4">
            <ArrowBackIcon boxSize={7} color="#9AA1B9" />
            <div className="flex flex-col">
              <h1 className="text-body3 font-body3 text-gray-600">
                Course{" "}
                <span className="text-black">
                  ‘{"Service Design Essentials’Introduction"}’
                </span>
              </h1>
              <h1 className="text-headline3 font-headline3 text-black">
                Add Lesson
              </h1>
            </div>
          </div>
          <div className="flex gap-4">
            <Button variant="secondary">Cancel</Button>
            <Button variant="primary">Create</Button>
          </div>
        </nav>
        {/* ————————————— Content Section ————————————— */}
        <div className="flex justify-center bg-[#F6F7FC]">
          {/* ————————————— Start Coding Here ————————————— */}
          <div
            className="flex flex-col bg-white m-10 w-[1480px] h-[770px]
            px-[5%] py-[2%] rounded-3xl border border-gray-400"
          >
            <h1 className="text-body2 text-black mb-1 mt-1">Lesson name *</h1>
            <Input
              value={value}
              onChange={handleChange}
              placeholder="Here is a sample placeholder"
              size="lg"
              border="1px"
              color="#D6D9E4"
              h="45px"
            />
            <Divider h="40px" mb="10px" />

            <h1 className="text-xl font-semibold text-[#646D89] py-5">
              Sub-Lesson
            </h1>
            {/* ————————————— Sub Lesson box ————————————— */}
            <div
              className="flex flex-row justify-between h-[380px] bg-gray-100 border border-[#E4E6ED]
              rounded-lg py-6 px-6"
            >
              <img
                src="/image/icon/drag.png"
                alt="drag-icon"
                className="rounded-lg w-[26px] h-[76px] object-cover grow-0"
              />
              <div className="px-11 flex flex-col grow">
                <h1 className="text-[#07090D] text-body2 mb-1">
                  Sub-lesson name*
                </h1>
                <Input
                  value={value}
                  onChange={handleChange}
                  placeholder="Here is a sample placeholder"
                  size="lg"
                  bg="white"
                  w="70%"
                  border="1px"
                  color="#D6D9E4"
                />
                <h1 className="text-[#07090D] text-body2 py-6">Video*</h1>
                
                <label htmlFor="video-upload">
                  <div className="bg-gray-100 w-[200px] h-[200px] rounded-2xl flex flex-col justify-center text-center text-blue-400 shadow-shadow2 hover:opacity-50">
                    <input
                      type="file"
                      accept="video/*"
                      onChange={handleVideoChange}
                      id="video-upload"
                      style={{ display: "none" }}
                    />
                    <h1 className="text-[40px]">+</h1>
                    <h1 className="text-[20px]">Upload Video</h1>
                  </div>
                </label>
              </div>
              <div className="text-gray-500 font-bold text-base">Delete</div>
            </div>
            <Button variant="secondary" className="w-[220px] mt-6">
              + Add Sub-lesson
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AddLessonPage;
