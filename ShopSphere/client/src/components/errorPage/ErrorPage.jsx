import { Link } from "react-router-dom";
import "./ErrorPage.css";
import { Button } from "../ui/button";

const ErrorPage = () => {
  return (
    <main className="error-page">
      <div className="container">
        <div className="eyes">
          <div className="eye">
            <div className="eye__pupil eye__pupil--left"></div>
          </div>
          <div className="eye">
            <div className="eye__pupil eye__pupil--right"></div>
          </div>
        </div>
        <div className="error-page__heading">
          <h1 className="error-page__heading-title">
            Looks like you&lsquo;re lost
          </h1>
          <p className="error-page__heading-description">404 error</p>
        </div>
        <Button className="mt-3">
          <Link to="/">Back to Home</Link>
        </Button>
      </div>
      <button className="color-switcher" data-theme-color-switch>
        &#127769;
      </button>
    </main>
  );
};

export default ErrorPage;
