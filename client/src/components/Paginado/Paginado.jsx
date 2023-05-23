import React from "react";
import "./Paginado.css";

export default function Paginado({ dogsPerPage, allDogs, paginado, currentPage }) {
  const pageNumbers = Math.ceil(allDogs / dogsPerPage);

  const handlePrevPage = () => {
    if (currentPage > 1) {
      paginado(currentPage - 1); //when the previous is clicked it checks if theres is another page before if so it sets the paginado to Current page - 1
    }
  };

  const handleNextPage = () => {
    if (currentPage < pageNumbers) {
      paginado(currentPage + 1); // if Current page is less to total page numbers then paginado is set to current page +1
    }
  };

  return (
    <nav>
      <ul className="paginado">
        <li className="number">
          <button onClick={handlePrevPage} disabled={currentPage === 1}>   {/* Previous button is disabled if current page is === 1 */}
            Prev
          </button>
        </li>
        {[...Array(pageNumbers)].map((_, index) => (  
            //A new array from pagenumbers is created for us to use map, only useing the index of the element
          <li className="number" key={index + 1}>
            <button
              onClick={() => paginado(index + 1)} // when clicking a number we expect to be taken to that page
              className={currentPage === index + 1 ? "active" : ""} // if current page matches index + 1 then class name would be active.
            >
              {index + 1} {/*shows the page number*/} 
            </button>
          </li>
        ))}
        <li className="number">
          <button onClick={handleNextPage} disabled={currentPage === pageNumbers}> {/* if current page is equal to total amount of pages then the next button is disabled.  */}
            Next
          </button>
        </li>
      </ul>
    </nav>
  );
}