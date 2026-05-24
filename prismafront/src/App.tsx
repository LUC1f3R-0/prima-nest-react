import { type FormEvent } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import AxiosInstance from "./services/apis";

const App = () => {
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.currentTarget;
    const formData = new FormData(form);

    await postSubmit(formData);
  };

  const postSubmit = async (formData: FormData) => {
    try {
      const response = await AxiosInstance.post("/persons", formData);

      const { success, message } = response.data;

      console.log(success);
      console.log(message);

      toast.success(message ?? "Complete");
    } catch (error: any) {
      const success = error.response?.data?.success;
      const message =
        error.response?.data?.message ??
        error.message ??
        "Something went wrong";

      console.log(success);
      console.log(message);

      toast.error(message);
    }
  };

  return (
    <>
      <ToastContainer position="top-right" autoClose={3000} />

      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <div>
          <label>Name</label>
          <input type="text" name="name" defaultValue="John Doe" />
        </div>

        <div>
          <label>Email</label>
          <input type="email" name="email" defaultValue="john@example.com" />
        </div>

        <div>
          <label>Password</label>
          <input type="password" name="password" defaultValue="secret123" />
        </div>

        <div>
          <label>Date of Birth</label>
          <input type="date" name="dateOfBirth" defaultValue="1990-05-15" />
        </div>

        <h3>Address 1</h3>

        <div>
          <label>Street</label>
          <input
            type="text"
            name="addresses[0][street]"
            defaultValue="123 Main St"
          />
        </div>

        <div>
          <label>City</label>
          <input
            type="text"
            name="addresses[0][city]"
            defaultValue="Colombo"
          />
        </div>

        <div>
          <label>Country</label>
          <input
            type="text"
            name="addresses[0][country]"
            defaultValue="Sri Lanka"
          />
        </div>

        <h3>Address 2</h3>

        <div>
          <label>Street</label>
          <input
            type="text"
            name="addresses[1][street]"
            defaultValue="456 Lake Rd"
          />
        </div>

        <div>
          <label>City</label>
          <input
            type="text"
            name="addresses[1][city]"
            defaultValue="Kandy"
          />
        </div>

        <div>
          <label>Country</label>
          <input
            type="text"
            name="addresses[1][country]"
            defaultValue="Sri Lanka"
          />
        </div>

        <div>
          <label>Image</label>
          <input type="file" name="image" accept="image/*" />
        </div>

        <button type="submit">Submit</button>
      </form>
    </>
  );
};

export default App;