import React from "react";
import { useEffect, useState } from "react";
import Spinner from "../components/Spinner";
import axios from "axios";
import BooksTable from "../components/home/BooksTable";
import BooksCard from "../components/home/BooksCard";
import { Link } from "react-router-dom";
import { MdOutlineAddBox } from "react-icons/md";
import { CiDark } from "react-icons/ci";
import { MdDarkMode } from "react-icons/md";

const Home = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showType, setShowType] = useState("table");
  const [light, setLight] = useState(true);

  useEffect(() => {
    setLoading(true);
    axios
      .get("http://localhost:5555/books")
      .then((res) => {
        setBooks(res.data.data);
        console.log(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, []);

  const appStyle = {
    backgroundColor: !light ? 'black' : 'white',
    color: !light ? 'white' : 'black',
    minHeight: '100vh',
    transition: '0.3s ease',
  };


  console.log(books);

  return (
    <div className="p-4" style={appStyle}>
      <div className="flex justify-center items-center gap-x-4">
        <button
          className="bg-red-300 hover:bg-sky-600 py-1 px-4 rounded-lg"
          onClick={() => {
            setShowType("table");
          }}
        >
          Table
        </button>

        <button
          className="bg-sky-300 hover:bg-sky-600 py-1 px-4 rounded-lg"
          onClick={() => {
            setShowType("card");
          }}
        >
          Card
        </button>
        <button
          onClick={() => {
            setLight(!light);
            console.log(light);
          }}
        >
          {light ? <CiDark /> : <MdDarkMode />}
        </button>
      </div>

      <div className="flex justify-between items-center">
        <h1 className="text-3xl my-8 hover:text-red-500 duration-300 ease-in-out">Books List</h1>
        <Link to="/books/create">
          <MdOutlineAddBox className="text-sky-800 text-4xl" />
        </Link>
      </div>

      {loading ? (
        <Spinner />
      ) : showType === "table" ? (
        <BooksTable books={books} />
      ) : (
        <BooksCard books={books} />
      )}
    </div>
  );
};

export default Home;
