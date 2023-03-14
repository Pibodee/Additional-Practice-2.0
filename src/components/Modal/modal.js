import { Loading } from 'components/Loader/loader';
import { useEffect, useState } from 'react';

export const Modal = ({ image, closeModal }) => {
  const [loaded, setLoad] = useState(false);

  useEffect(() => {
    const closeOnEsc = evt => {
      if (evt.code === 'Escape') {
        closeModal();
      }
    };
    window.addEventListener('keydown', closeOnEsc);
    return () => {
      window.removeEventListener('keydown', closeOnEsc);
    };
  }, [closeModal]);

  const onLoad = () => {
    setLoad(true);
  };

  return (
    <div className="Backdrop">
      <div className="Modal">
        <img
          src={`http://image.tmdb.org/t/p/original${image}`}
          alt="image"
          width="400px"
                  onLoad={onLoad}
                  style={{ display: loaded ? 'block' : 'none' }}
              />
              {!loaded && <Loading/>}
        {loaded && (<button type="button" onClick={() => closeModal()}>
          x
        </button>)}
      </div>
    </div>
  );
};
