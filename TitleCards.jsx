import React, { useRef, useEffect } from 'react'
import './TitleCards.css'
import cards_data from '../../assets/cards/cards_data'
import { Link } from 'react-router-dom'

const TitleCards = ({title, category}) => {
const[ apiData, setapiData ] = React.useState([]);

  const cardsRef = useRef();
  const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxOGVmMDRmNTlmOWI2ZjE0MTMzYjdkMDNmN2JiNmEzYyIsIm5iZiI6MTc1NTM3MDc3OC44MDE5OTk4LCJzdWIiOiI2OGEwZDUxYWZlOGM1YTE0ZGEwMmNkODgiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.S7ntZMd2p0YofVgWKBjQWzdOS05KMjPbEbEjuAc57Xw'
  }
};
  const handleWheel = (event) => {
    event.preventDefault();
    cardsRef.current.scrollLeft += event.deltaY;
  };

  useEffect(() => {
    fetch(`https://api.themoviedb.org/3/movie/${category ? category : 'now_playing'}?language=en-US&page=1`, options)
      .then(res => res.json())
      .then(res => {
        if (res && res.results && res.results.length > 0) {
          setapiData(res.results);
        } else {
          setapiData([]);
        }
      })
      .catch(err => {
        console.error(err);
        setapiData([]);
      });
    const ref = cardsRef.current;
    if (ref) {
      ref.addEventListener('wheel', handleWheel);
      return () => ref.removeEventListener('wheel', handleWheel);
    }
  }, []);

  return (
    <div className='title-cards'>
      <h2>{title ? title : "Popular on Netflix"}</h2>
      <div className='card-list' ref={cardsRef}>
        {(apiData.length > 0 ? apiData : cards_data).map((card, index) => (
          <div key={index}>
            <Link to={`/player/${card.id}`} className='card'>
              {apiData.length > 0 ? (
                <>
                  <img src={`https://image.tmdb.org/t/p/w500${card.backdrop_path}`} alt="" />
                  <p>{card.original_title}</p>
                </>
              ) : (
                <>
                  <img src={card.image} alt="" />
                  <p>{card.name}</p>
                </>
              )}
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TitleCards