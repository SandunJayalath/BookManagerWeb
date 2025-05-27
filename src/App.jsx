import { useState } from "react";
import { BookPlus } from 'lucide-react';
import { Funnel } from 'lucide-react';
import { BookmarkCheck } from 'lucide-react';
import { Trash2 } from 'lucide-react';
import { Link } from 'react-router-dom'

function App() {

  // For the Books Manager
    const [books, setBooks] = useState([
        { title: "Rich Dad & Poor Dad", isRead: false },
        { title: "Think & Grow Rich", isRead: true},
    ]);

    const [newBook, setNewBook] = useState("");

    const [filter, setFilter] = useState("all")

    function handleNewBook(event) {
        setNewBook(event.target.value)
    }

    function addBook(){
        if (newBook.trim() !=="") {
            setBooks(b => [...b, { title: newBook, isRead: false}]);
            setNewBook("");
        }
    }

    const toggleReadStatus = (index) => {
        const updatedBooks = [...books];
        updatedBooks[index].isRead = !updatedBooks[index].isRead;
        setBooks(updatedBooks);
    }

    function deleteButton(indexToDelete) {
        setBooks(books => books.filter((_, index) => index!== indexToDelete))
    }

    const filteredBooks = books.filter((book) => {
        if (filter === "read") return book.isRead;
        if (filter === "unread") return !book.isRead;
        return true;
    })

    // Collapsing container
    const [isFilterContainer, setIsFilterContainer] = useState(false);

    // Privacy Box
    const [isPrivacyBox, setIsPrivacyBox] = useState(false);

  return (
    <>
    <div className="container-fluid d-flex justify-content-center align-items-center" style={{backgroundColor: "rgb(24, 24, 24)"}}>
        <div className="container main-container d-flex align-items-center" style={{flexDirection: "column"}}>
          <div className="main-header mb-5">
            <h1 style={{fontWeight :"bold"}}>Book List Manager</h1>
          </div>
          
          <h5>Add a New Book to Your Collection</h5>

          <div className="mt-3" style={{display: "flex", flexDirection: "row", gap: "0px", justifyContent: "center", alignItems: "center"}}>
              <input className='books-adding-bar' value={newBook} onChange={handleNewBook} type="text" placeholder="Enter the Book..."/>
              <button onClick={addBook} id="adding-button" className='d-flex gap-2'><strong className="d-none d-md-flex d-lg-flex d-xl-flex">Add Books</strong> <BookPlus/></button>
          </div>
        
          <div className="books-holder mt-4">
           
            <button onClick={() => setIsFilterContainer(!isFilterContainer)} className="filtering-button">Filter <Funnel className="filter-icon"/></button>

            { isFilterContainer && (
                <div id="filtering-container" className={`filter-container ${isFilterContainer ? "show" : ""}`} style={{display: "flex", flexDirection: "row", gap: "20px", alignItems: "center", margin: "20px 0px", width: "100%", justifyContent: "center"}}>
                  <button onClick={() => setFilter("all")}>All</button>
                  <button onClick={(() => setFilter("read"))}>Read</button>
                  <button onClick={() => setFilter("unread")}>Unread</button>
                </div>
            )}

            {filteredBooks.length === 0 ? (
                <div className='d-flex justify-content-center' style={{width: "100%"}}>
                <div style={{border: "3px solid red", textAlign:"center", borderRadius: "10px", padding: "20px 0px", width: "400px"}}>
                    <h4>Books Are Not Found!</h4>
                </div>
                </div>
            ) : (
            filteredBooks.map((book, index) =>
            <div className="book-card mb-3 px-3" key={index} style={{display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center", borderRadius: "10px", minHeight: "60px"}}>
                <div style={{width: "60%"}}>
                    <h5>{book.title}</h5>
                </div>
                <div style={{display: "flex", flex: "0 0 50%", justifyContent: "flex-end", gap: "10px"}}>
                    <button id="read-button" onClick={() => toggleReadStatus(index)}>
                      <>
                      <BookmarkCheck className="book-mark" /> {book.isRead ? "Read" : "Unread"}
                      </>
                    </button> 
                    <button id="delete-button" onClick={() => deleteButton(index)}><Trash2/></button>
                </div>
            </div>
            ))}
          </div>

          <div className="d-flex footer-section" style={{flexDirection: "column"}}>
                <h5>Book List Manager App v1.0.0</h5>
                <h6>Created by Sandun</h6>
                <div className="d-flex gap-2 fs-6">
                    <a href="https://github.com/SandunJayalath/" target="_blank">
                        GitHub
                    </a>
                    <div className="vertical-line"></div>
                    <a href="https://sandunjayalath.github.io/SandunPortfolio/" target="_blank">
                        Portfolio
                    </a>
                    <div className="vertical-line"></div>
                    <a className='policy-text' onClick={() => setIsPrivacyBox(true)}>Privacy Policy</a>
                    
                    { isPrivacyBox && (
                        <div className="privacy-box">
                            <h5>🛡️ Privacy Info</h5>
                            <h6>This app stores your tasks locally on your device. No data is collected, stored, or shared with anyone.</h6>
                            <button onClick={() => setIsPrivacyBox(false)}>Done</button>
                        </div>
                    ) }
                </div>
            </div>

              </div>
          </div>
    </>
  )
}

export default App
