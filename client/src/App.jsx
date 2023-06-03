import React, { useEffect, useState } from "react";
import { Icon } from "@iconify/react";
//impport axios
import axios from "axios";
const App = () => {
  const [Addbook, setAddbook] = useState(false);
  const [bookName, setBookName] = useState("");
  const [author, setAuthor] = useState("");
  const [status, setStatus] = useState("");
  const [books, setBooks] = useState([]);
  const [IsUpdate, setIsUpdate] = useState(null);
  const [IsDelete, setIsDelete] = useState(null);
  const [changeStatus, setChangeStatus] = useState("");
  const upadateStatus = async (id) => {
    const response = await axios
      .post(`http://localhost:3000/update/status/${id}`, {
        status: changeStatus,
      })
      .then(() => getBooks());
  };

  const deleteBook = async (id) => {
    const response = await axios
      .delete(`http://localhost:3000/delete/${id}`)
      .then(() => getBooks());
  };
  const getBooks = async () => {
    //get what backend send
    const response = await axios.get("http://localhost:3000/getBook");
    setBooks(response.data);
  };
  useEffect(() => {
    getBooks();
  }, []);

  const AddNewBook = async () => {
    const response = await axios
      .put("http://localhost:3000/add", {
        name: bookName,
        author: author,
        status: status,
      })
      .then(() => getBooks());
  };
  return (
    <div className="w-full h-sreen overflow-y-auto flex-col flex justify-center items-center ">
      <div className="w-3/4">
        <div className="w-full   flex items-center flex-row justify-between mt-12">
          <div className="flex items-center">
            <Icon
              icon="ri:book-2-fill"
              width="50"
              height="50"
              className="text-blue-500"
            />
            <h1 className="text-5xl  font-semibold">Library</h1>
          </div>

          <button
            onClick={() => setAddbook(true)}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded flex items-center transition-colors"
          >
            <Icon icon="material-symbols:add" />
            Add book
          </button>
        </div>
        <p className="mt-3">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam
        </p>
      </div>

      <div className="w-full p-10">
        <table className="table-auto w-full flex flex-col gap-2">
          <tr className="flex border-b  ">
            <th width="10%" className="text-left">
              number
            </th>
            <th width="50%" className="text-left">
              name
            </th>
            <th width="10%" className="text-left">
              author
            </th>
            <th width="10%" className="text-left">
              status
            </th>
            <th width="10%" className="text-left">
              update
            </th>
            <th width="10%" className="text-left">
              delete
            </th>
          </tr>

          {
            //map all books
            books.map((book, index) => (
              <tr className="flex border-b p-1 justify-center items-center ">
                <td width="10%" className="text-left">
                  {index + 1}
                </td>
                <td width="50%" className="text-left">
                  {book.name}
                </td>
                <td width="10%" className="text-left">
                  {book.author}
                </td>
                <td width="10%" className="text-left">
                  {book.status}
                </td>
                <td width="10%" className="text-left">
                  <button
                    onClick={() => setIsUpdate(book.id)}
                    className="bg-blue-500 hover:bg-blue-700 text-white flex items-center gap-2 font-bold py-2 px-4 rounded transition-colors"
                  >
                    <Icon icon="akar-icons:edit" className="w-4 h-4" />
                    update
                  </button>
                </td>
                <td width="10%" className="text-left">
                  <buttonv
                    onClick={() => setIsDelete(book.id)}
                    className="bg-red-500 hover:bg-red-700 gap-2 flex items-center text-white font-bold py-2 px-4 rounded transition-colors"
                  >
                    <Icon
                      icon="material-symbols:delete-outline"
                      className="w-4 h-4"
                    />
                    delete
                  </buttonv>
                </td>
              </tr>
            ))
          }
        </table>
      </div>
      <div>
        {Addbook && (
          <div className=" fixed bg-gray-100 p-5 rounded-md   top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1/2">
            <div className="relatvie w-full">
              <h1 className="text-4xl font-semibold flex items-center">
                <Icon icon="ri:book-2-fill" className="text-blue-500" />
                Add book
              </h1>
              <div className="flex flex-col gap-4 mt-5 w-full">
                <div className="w-full">
                  <p className="flex items-center gap-2">
                    <Icon icon="carbon:book" className="w-5 h-5 " />
                    <span className="font-semibold  ">Book name</span>
                  </p>
                  <input
                    type="text"
                    placeholder="name"
                    className="border-2 border-gray-300 p-2 rounded-md outline-none w-full"
                    value={bookName}
                    onChange={(e) => setBookName(e.target.value)}
                  />
                </div>
                <div className="w-full">
                  <p className="flex items-center gap-2">
                    <Icon icon="clarity:avatar-solid" className="w-5 h-5 " />
                    <span className="font-semibold  ">Author</span>
                  </p>
                  <input
                    type="text"
                    placeholder="author"
                    className="border-2 border-gray-300 p-2 rounded-md outline-none w-full"
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}
                  />
                </div>
                <div className="w-full">
                  <p className="flex items-center gap-2">
                    <Icon icon="ep:reading-lamp" className="w-5 h-5 " />
                    <span className="font-semibold  ">Status</span>
                  </p>
                  <input
                    type="text"
                    placeholder="status"
                    className="border-2 border-gray-300 p-2 rounded-md outline-none w-full"
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                  />
                </div>
              </div>
              <Icon
                icon="carbon:close"
                className="w-6 h-6 absolute top-5 right-5 cursor-pointer"
                onClick={() => setAddbook(false)}
              />
            </div>
            <button
              className="bg-blue-500 font-semibold text-white text-xl p-2 rounded-md mt-2"
              onClick={() =>
                AddNewBook().then(() => {
                  setAddbook(false);
                  setAuthor("");
                  setBookName("");
                  setStatus("");
                })
              }
            >
              Add Book
            </button>
          </div>
        )}
        <div>
          {IsDelete && (
            <div className="fixed bg-gray-100 p-5 rounded-md   top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1/2">
              <div>
                <h1 className="text-3xl text-red-500 font-semibold flex items-center">
                  Delete
                  <Icon icon="ph:warning-bold" className="h-8 w-8" />{" "}
                </h1>
                <p className="text-sm mt-2">
                  Are you sure you want to delete this book ?{" "}
                </p>
                <button
                  className="bg-red-500 text-white font-semibold rounded-md p-1 text-xl w-32 text-center mt-3 "
                  onClick={() =>
                    deleteBook(IsDelete).then(() => setIsDelete(null))
                  }
                >
                  Sure
                </button>
                <Icon
                  icon="carbon:close"
                  className="w-6 h-6 absolute top-5 right-5 cursor-pointer"
                  onClick={() => setIsDelete(null)}
                />
              </div>
            </div>
          )}
        </div>
        <div>
          {IsUpdate && (
            <div className="fixed bg-gray-100 p-5 rounded-md   top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1/2">
              <div>
                <Icon
                  icon="carbon:close"
                  className="w-6 h-6 absolute top-5 right-5 cursor-pointer"
                  onClick={() => setIsUpdate(null)}
                />
                <h1 className="text-3xl text-blue-500 font-semibold flex items-center gap-2">
                  Update
                  <Icon icon="akar-icons:edit" className="h-8 w-8" />{" "}
                </h1>
                <p className="flex items-center gap-2">
                  <Icon icon="ep:reading-lamp" className="w-5 h-5 " />
                  <span className="font-semibold  ">Status</span>
                </p>
                <input
                  type="text"
                  placeholder="status"
                  className="border-2 border-gray-300 p-2 rounded-md outline-none w-full"
                  value={changeStatus}
                  onChange={(e) => setChangeStatus(e.target.value)}
                />
              </div>
              <button
                onClick={() =>
                  upadateStatus(IsUpdate).then(() => setIsUpdate(null))
                }
                className="flex items-center p-1 font-semibold text-white  rounded-md bg-blue-500 mt-2 w-32 justify-center"
              >
                <Icon icon="akar-icons:edit" className="h-5 w-5" />
                Update
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default App;
