import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import userContext from '../context/userContext';
import './login.css';

function Login() {
  const history = useHistory();
  const { user, setUser, isValidEmail, isValidPassword } = useContext(userContext);
  const { email, password } = user;

  const handleOnChange = ({ target }) => {
    const { name, value } = target;
    setUser({
      ...user,
      [name]: value,
    });
  };

  const handleOnClick = () => {
    localStorage.setItem('user', JSON.stringify({ email }));
    history.push('/meals');
  };

  return (
    <div className="login-container">
      <form className="login-form">
        <label htmlFor="email" className="label">
          <input
            placeholder="Email"
            data-testid="email-input"
            type="email"
            name="email"
            value={ email }
            id="email"
            onChange={ handleOnChange }
          />
        </label>
        <label htmlFor="password" className="label">
          <input
            placeholder="Senha"
            data-testid="password-input"
            type="password"
            name="password"
            value={ password }
            id="password"
            onChange={ handleOnChange }
          />
        </label>
        <button
          data-testid="login-submit-btn"
          className="label"
          type="button"
          disabled={ !(isValidEmail(email) && isValidPassword(password)) }
          onClick={ handleOnClick }
        >
          Enter
        </button>
      </form>
    </div>
  );
}

export default Login;
