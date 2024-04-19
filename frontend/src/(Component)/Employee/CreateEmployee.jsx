import { useState } from "react";
import { Button, Container, Input } from "@/(Component)/index"; // Adjust path as needed
import { BACKEND_API } from "@/config/config";
import { toast } from "react-toastify";
import { validateEmail } from "@/utils/utilis";

const CreateEmployee = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    designation: "HR",
    gender: "",
    avatar: "",
    course: [],
  });

  const handleInputChange = (event) => {
    const { name, value, type } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? [...prevData[name], value] : value,
    }));
  };

  const handleCheckboxChange = (event) => {
    const { name, value, checked } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: checked
        ? [...prevData[name], value]
        : prevData[name].filter((course) => course !== value),
    }));
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setFormData((prevData) => ({
      ...prevData,
      avatar: file,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form Data:", formData);
    const emailError = validateEmail(formData.email);
    if (emailError ) {
      if (emailError) toast.error(emailError);
      return;
    }

    try {
      const response = await BACKEND_API.post(
        "/api/v1/employee/register_employee",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      toast.success(response.data.message);
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };

  return (
    <Container className="w-full h-screen">
      <h1 className="font-bold text-4xl py-10 text-zinc-700">
        Create Employee
      </h1>
      <form
        className="flex flex-col gap-10 shadow-lg bg-gray-200 p-10 rounded"
        onSubmit={handleSubmit}
      >
        <Input
          type="text"
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleInputChange}
        />
        <Input
          type="text"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleInputChange}
        />
        <Input
          type="text"
          name="mobile"
          placeholder="Mobile No"
          value={formData.mobile}
          onChange={handleInputChange}
        />
        <select
          className="block max-w-sm w-full p-2 outline-none"
          name="designation"
          value={formData.designation}
          onChange={handleInputChange}
        >
          {["HR", "Manager", "Sales"].map((designation, index) => (
            <option key={index} value={designation}>
              {designation}
            </option>
          ))}
        </select>
        <div className="flex items-center gap-4 max-w-sm">
          <label className="font-semibold">Gender</label>
          {["Male", "Female"].map((gender, index) => (
            <div key={index} className="flex items-center gap-2">
              <Input
                type="radio"
                name="gender"
                value={gender}
                checked={formData.gender === gender}
                onChange={handleInputChange}
              />
              <span>{gender}</span>
            </div>
          ))}
        </div>
        <div className="flex items-center gap-4">
          <label className="font-semibold">Course</label>
          {["MCA", "BCA", "BSC"].map((course, index) => (
            <div key={index} className="flex items-center gap-2">
              <span>{course}</span>
              <Input
                type="checkbox"
                name="course"
                value={course}
                checked={formData.course.includes(course)}
                onChange={handleCheckboxChange}
              />
            </div>
          ))}
        </div>
        <Input
          placeholder="Upload Avatar"
          type="file"
          accept="image/jpeg,image/png"
          onChange={handleFileChange}
        />
        <Button type="submit" text={"Submit"} />
      </form>
    </Container>
  );
};

export default CreateEmployee;
