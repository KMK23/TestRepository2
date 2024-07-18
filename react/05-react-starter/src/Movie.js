import React, { startTransition, useRef } from "react";
import "./Movie.css";
import tempImg from "./assets/벚꽃.png";

function Movie({ movie }) {
  const ref = useRef();
  console.log(`콘솔로 찍은 ref ${ref}`);

  const { title, year, summary, medium_cover_image, genres } = movie;
  return (
    <div className="movie">
      <img className="movie-img" src={medium_cover_image} />
      <div>
        <h2 className="movie-title">
          <span>{title}</span>
        </h2>
        <h3 className="movie-year">{year}</h3>
        <p className="movie-summary">
          {summary.length > 235 ? `${summary.slice(0, 235)}...` : summary}
        </p>
        <ul className="movie-genres">
          {genres.map((list, idx) => {
            return <li key={idx}>{list}</li>;
          })}
        </ul>
      </div>
    </div>
  );
}

export default Movie;
