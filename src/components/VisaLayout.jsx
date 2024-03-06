import { Outlet, useNavigate } from "react-router-dom";

const VisaLayout = () => {
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
                onClick={() => navigate("/vdashboard")}
                className="nav_img"
                src="/img/logo.png"
                alt=""
              />
              <div
                onClick={() => navigate("/vdashboard")}
                className={`nav_l ${
                  window.location.href.slice(24) == "vdashboard" ? "active" : ""
                }`}
              >
                <div className="nav_l_text">
                  <img src="/img/nav_1.png" alt="" />
                 <span>Asosiy</span> 
                </div>
                <img className="nav_l_drop" src="/img/icon_drop_1.png" alt="" />
              </div>
              <div
                onClick={() => navigate("/vpaket")}
                className={`nav_l ${
                  window.location.href.slice(24) == "vpaket" ? "active" : ""
                }`}
              >
                <div className="nav_l_text">
                  <img src="/img/nav_2.png" alt="" />
                  <span>Paketlar</span> 
                </div>
                <img className="nav_l_drop" src="/img/icon_drop_1.png" alt="" />
              </div>
              <div
                onClick={() => navigate("/vfiliall")}
                className={`nav_l ${
                  window.location.href.slice(24) == "vfiliall" ? "active" : ""
                }`}
              >
                <div className="nav_l_text">
                  <img src="/img/nav_3.png" alt="" />
                  <span>Filiallar</span> 
                </div>
                <img className="nav_l_drop" src="/img/icon_drop_1.png" alt="" />
              </div>
              <div
                onClick={() => navigate("/vworkers")}
                className={`nav_l ${
                  window.location.href.slice(24) == "vworkers" ? "active" : ""
                }`}
              >
                <div className="nav_l_text">
                  <img src="/img/nav_3.png" alt="" />
                  <span>Ishchilar</span> 
                </div>
                <img className="nav_l_drop" src="/img/icon_drop_1.png" alt="" />
              </div>
              <div
                onClick={() => navigate("/vclients")}
                className={`nav_l ${
                  window.location.href.slice(24) == "vclients" ? "active" : ""
                }`}
              >
                <div className="nav_l_text">
                  <img src="/img/nav_3.png" alt="" />
                  <span>Klientlar</span> 
                </div>
                <img className="nav_l_drop" src="/img/icon_drop_1.png" alt="" />
              </div>
              <div
                onClick={() => navigate("/vfaq")}
                className={`nav_l ${
                  window.location.href.slice(24) == "vfaq" ? "active" : ""
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

export default VisaLayout;
