import PropTypes from 'prop-types';
import { Link } from "react-router-dom";

const VideoTitle = ({title, overview, id}) => {
    return (
      <div className="w-screen aspect-video pt-[17%] px-6 md:px-24 absolute text-white bg-gradient-to-r from-black">
        <h1 className="text-2xl md:text-6xl font-bold">{title}</h1>
        <p className="hidden md:inline-block py-6 text-lg w-[45%]">{overview}</p>
        <div className="my-4 md:m-0">
        <Link to={`/watch/${id}`}>
          <button className=" bg-white text-black py-1 md:py-4 px-3 md:px-12 text-xl  rounded-lg hover:bg-opacity-80">
            ▶️ Play
          </button>
          </Link>
          <button className="hidden md:inline-block mx-2  bg-gray-500 text-white p-4 px-12 text-xl bg-opacity-50 rounded-lg">
            More Info 

          </button>
        </div>
      </div>
    );
  };

  VideoTitle.propTypes = {
    title : PropTypes.string.isRequired,
    overview : PropTypes.string.isRequired,
    id :PropTypes.number.isRequired
  };
  
  export default VideoTitle;