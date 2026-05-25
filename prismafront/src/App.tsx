import { useEffect, useState, type FormEvent } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import AxiosInstance from "./services/apis";
import type { Person } from "./types/person.types";

const App = () => {
  const [persons, setPersons] = useState<Person[]>([]);

  const getRequests = async () => {
    try {
      const response = await AxiosInstance.get("/persons");

      const { success, message, data } = response.data;

      console.log("GET success?", success);
      console.log("GET message?", message);
      console.log("GET data:", data);

      setPersons(data.data);
    } catch (error: any) {
      console.log("GET error:", error.response?.data ?? error.message);

      toast.error(
        error.response?.data?.message ?? "Failed to fetch persons"
      );
    } finally {
      console.log("GET request ended");
    }
  };

  const postSubmit = async (formData: FormData) => {
    try {
      const response = await AxiosInstance.post("/persons", formData);

      const { success, message, data } = response.data;

      console.log("POST success?", success);
      console.log("POST message?", message);
      console.log("POST data:", data);

      toast.success(message ?? "Person created successfully");

      return response.data;
    } catch (error: any) {
      console.log("Full error:", error);
      console.log("Error response:", error.response);
      console.log("Error data:", error.response?.data);

      toast.error(error.response?.data?.message ?? "Something went wrong");

      return error.response?.data;
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.currentTarget;
    const formData = new FormData(form);

    const result = await postSubmit(formData);

    if (result?.success) {
      await getRequests();
      form.reset();
    }
  };

  useEffect(() => {
    getRequests();
  }, []);

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

      {persons.map((person) => (
        // <div key={person.id}>
        //   <h3>{person.name}</h3>
        //   <p>{person.email}</p>
        // </div>
        console.log(persons)
      ))}
    </>
  );
};

export default App;