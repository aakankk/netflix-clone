import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom';
import './Player.css'
import back_arrow_icon from '../../assets/back_arrow_icon.png'
import { useNavigate } from 'react-router-dom';

const Player = () => {

  const {id} = useParams(); 
  const navigate = useNavigate();

  const [apiData, setapiData] = React.useState([]);

  const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxOGVmMDRmNTlmOWI2ZjE0MTMzYjdkMDNmN2JiNmEzYyIsIm5iZiI6MTc1NTM3MDc3OC44MDE5OTk4LCJzdWIiOiI2OGEwZDUxYWZlOGM1YTE0ZGEwMmNkODgiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.S7ntZMd2p0YofVgWKBjQWzdOS05KMjPbEbEjuAc57Xw'
  }
};
useEffect(() => {

  fetch(`https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`, options)
  .then(res => res.json())
  .then(res => setapiData(res.results))
  .catch(err => console.error(err));
}, []);

  // Find the first trailer
  const trailer = apiData.find(item => item.type === 'Trailer');
  return (
    <div className='player'>
      <img src={back_arrow_icon} alt="" onClick={() => navigate('/')} />
      {trailer ? (
        <iframe
          width='90%'
          height='90%'
          src={`https://www.youtube.com/embed/${trailer.key}`}
          title="Trailer"
          frameBorder="0"
          allowFullScreen
        ></iframe>
      ) : (
        <p>Trailer not available.</p>
      )}
      {trailer && (
        <div className='player-info'>
          <p>{trailer.published_at.slice(0, 10)}</p>
          <p>{trailer.name}</p>
          <p>{trailer.type}</p>
        </div>
      )}
    </div>
  );
}

export default Player