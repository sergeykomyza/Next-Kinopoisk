import Link from "next/link"

interface Film{
  kinopoiskId: number,
  nameRu: string,
  posterUrlPreview: string,
  year: number
}

interface Films{
  items: Film[]
}
 
const fetchData = async(): Promise<Films>=>{
  return fetch('https://kinopoiskapiunofficial.tech/api/v2.2/films/collections?type=TOP_250_MOVIES&page=1',{
    method: 'GET',
      headers: {
        'X-API-KEY': '07ca675a-db71-4e5b-8119-5618275b2fab',
        'Content-Type': 'application/json',
      }
    })
    .then(response=>response.json())
}

export default async function Home(){
  const films = await fetchData()
  
  return(
    <>
      <main id="app">
        <div className="films-box">
          {
            films.items.map(film =>( 
              <Link key={film.kinopoiskId} href={`/film/` + film.kinopoiskId}>
                <div className="film-preview">
                  <figure className="film-preview__fotobox">
                    <img src={film.posterUrlPreview} alt="" />
                  </figure>
                  <h6 className="film-preview__name">{film.nameRu}</h6> 
                  <time className="film-preview__year">{film.year}</time>
                </div>
              </Link>
            ))
          } 
        </div>
      </main>
    </>
  )
}

