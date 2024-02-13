import React from "react";

export default function Pagination({
  goToNextPage,
  goToPrevPage,
}: {
  goToNextPage: () => void;
  goToPrevPage: () => void;
}) {
  return (
    <div>
      {goToPrevPage && <button onClick={goToPrevPage}>Previous</button>}
      {goToNextPage && <button onClick={goToNextPage}>Next</button>}
    </div>
  );
}
