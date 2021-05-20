import { useContext } from 'react';
import { useHistory } from 'react-router';
import { AuthContext } from '../context/AuthContext';

export const ThankYouPage = () => {
  const [user] = useContext(AuthContext);
  const history = useHistory();
  return (
    <section className="thank-you-page">
      <div className="container">
        <h1 className="thank-you-page__heading">
          {' '}
          Thank you{user ? `, ${user.name},` : ''} for the order!{' '}
        </h1>
        <p className="thank-you-page__text">
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nam hic autem atque
          odio ab id ea dolore molestiae, corporis distinctio. Praesentium, reprehenderit!
          Molestiae aliquid sapiente nemo perspiciatis alias! Laboriosam, exercitationem.
        </p>
        <p className="thank-you-page__text">
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nam hic autem atque
          odio ab id ea dolore molestiae, corporis distinctio. Praesentium, reprehenderit!
        </p>
        <div className="row">
          <button
            className="btn btn-green"
            onClick={() => {
              history.push('/');
            }}
          >
            {' '}
            Home{' '}
          </button>
          {user ? null : (
            <button
              className="btn btn-orange"
              onClick={() => {
                history.push('/registration');
              }}
            >
              {' '}
              Registration{' '}
            </button>
          )}
        </div>
      </div>
    </section>
  );
};
