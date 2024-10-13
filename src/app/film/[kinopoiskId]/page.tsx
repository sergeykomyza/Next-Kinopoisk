import React from 'react';

interface FilmData {
  kinopoiskId: number,
  posterUrlPreview: string,
  nameRu: string,
  year: number,
  slogan: string,
  shortDescription: string,
  nameOriginal: string
}

const fetchData = async (kinopoiskId: number): Promise<FilmData> => {
  const response = await fetch(`https://kinopoiskapiunofficial.tech/api/v2.2/films/${kinopoiskId}`, {
    method: 'GET',
    headers: {
      'X-API-KEY': '07ca675a-db71-4e5b-8119-5618275b2fab',
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error('Network response was not ok');
  }

  return response.json();
};

interface FilmProps {
  params: {
    kinopoiskId: number;
  };
}

const Film: React.FC<FilmProps> = async ({ params: { kinopoiskId } }) => {
  const film = await fetchData(kinopoiskId);
  
  return (
    <>
      <main>
        <div className="film">
          <figure className="film__fotobox">
            <img src={film.posterUrlPreview} alt={film.nameRu} title={film.nameRu} />
          </figure>
          <div className="film__info">
            <h6 className="film__name">{film.nameRu} <span className="film__year">({film.year})</span> </h6>
            <h6 className="film__originalname">{film.nameOriginal}</h6>
            
            <p className="film__descr">{film.shortDescription}</p>
          </div>
        </div>
      </main>
    </>
  );
};

export default Film;


