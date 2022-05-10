import "./CSS-Files/PageNotFound.css";
import { useNavigate } from "react-router-dom";
function PageNotFound() {
  const navigate = useNavigate();
  return (
    <div className="container404">
      <div className="mainDiv">PAGE NOT FOUND</div>
      <div className="secondaryDiv" onClick={() => navigate("/")}>
        Return to Home Page
      </div>
    </div>
  );
}
export default PageNotFound;
