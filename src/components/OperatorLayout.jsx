import { Outlet, useNavigate } from "react-router-dom";

const OperatorLayout = () => {
  const navigate = useNavigate();
  const logout = () => {
    localStorage.clear();
    navigate("/");
    document.location.reload();
  };

  return (
    <>
      <div className="Home">
        <div className="h_left">
          <div className="Nav">
            <div className="">
              <img
                onClick={() => navigate("/odashboard")}
                className="nav_img"
                src="/img/logo.png"
                alt=""
              />
              <div
                onClick={() => navigate("/odashboard")}
                className={`nav_l ${
                  window.location.href.slice(24) == "odashboard" ? "active" : ""
                }`}
              >
                <div className="nav_l_text">
                  <img src="/img/nav_1.png" alt="" />
                  <span>Asosiy</span>
                </div>
                <img className="nav_l_drop" src="/img/icon_drop_1.png" alt="" />
              </div>
              <div
                onClick={() => navigate("/opaket")}
                className={`nav_l ${
                  window.location.href.slice(24) == "opaket" ? "active" : ""
                }`}
              >
                <div className="nav_l_text">
                  <img src="/img/nav_2.png" alt="" />
                  <span>Paketlar</span>
                </div>
                <img className="nav_l_drop" src="/img/icon_drop_1.png" alt="" />
              </div>
              <div
                onClick={() => navigate("/ofiliall")}
                className={`nav_l ${
                  window.location.href.slice(24) == "ofiliall" ? "active" : ""
                }`}
              >
                <div className="nav_l_text">
                  <img src="/img/nav_3.png" alt="" />
                  <span>Filiallar</span>
                </div>
                <img className="nav_l_drop" src="/img/icon_drop_1.png" alt="" />
              </div>
              <div
                onClick={() => navigate("/oworkers")}
                className={`nav_l ${
                  window.location.href.slice(24) == "oworkers" ? "active" : ""
                }`}
              >
                <div className="nav_l_text">
                  <img src="/img/nav_3.png" alt="" />
                  <span>Ishchilar</span>
                </div>
                <img className="nav_l_drop" src="/img/icon_drop_1.png" alt="" />
              </div>
              <div
                onClick={() => navigate("/oclients")}
                className={`nav_l ${
                  window.location.href.slice(24) == "oclients" ? "active" : ""
                }`}
              >
                <div className="nav_l_text">
                  <img src="/img/nav_3.png" alt="" />
                  <span>Klientlar</span>
                </div>
                <img className="nav_l_drop" src="/img/icon_drop_1.png" alt="" />
              </div>
              <div
                onClick={() => navigate("/ofaq")}
                className={`nav_l ${
                  window.location.href.slice(24) == "ofaq" ? "active" : ""
                }`}
              >
                <div className="nav_l_text">
                  <img src="/img/nav_3.png" alt="" />
                  <span>FAQ</span>
                </div>
                <img className="nav_l_drop" src="/img/icon_drop_1.png" alt="" />
              </div>
            </div>
            <div className="d-flex justify-content-center">
              <div onClick={() => logout()} className="nav_ex">
                <img src="/img/icon_ex.png" alt="" />
                <span>Exit</span> 
              </div>
            </div>
          </div>
        </div>
        <div className="h_right">
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default OperatorLayout;
