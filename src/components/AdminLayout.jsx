import { Outlet, useNavigate } from "react-router-dom";

const AdminLayout = () => {
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
                onClick={() => navigate("/dashboard")}
                className="nav_img"
                src="/img/logo.png"
                alt=""
              />
              <div
                onClick={() => navigate("/dashboard")}
                className={`nav_l ${
                  window.location.href.slice(24) == "dashboard" ? "active" : ""
                }`}
              >
                <div className="nav_l_text">
                  <img src="/img/nav_1.png" alt="" />
                  <span>Asosiy</span>
                </div>
                <img className="nav_l_drop" src="/img/icon_drop_1.png" alt="" />
              </div>
              <div
                onClick={() => navigate("/paket")}
                className={`nav_l ${
                  window.location.href.slice(24) == "paket" ? "active" : ""
                }`}
              >
                <div className="nav_l_text">
                  <img src="/img/nav_2.png" alt="" />
                  <span>Paketlar</span>
                </div>
                <img className="nav_l_drop" src="/img/icon_drop_1.png" alt="" />
              </div>
              <div
                onClick={() => navigate("/filiall")}
                className={`nav_l ${
                  window.location.href.slice(24) == "filiall" ? "active" : ""
                }`}
              >
                <div className="nav_l_text">
                  <img src="/img/nav_3.png" alt="" />
                  <span>Filiallar</span>
                </div>
                <img className="nav_l_drop" src="/img/icon_drop_1.png" alt="" />
              </div>
              <div
                onClick={() => navigate("/workers")}
                className={`nav_l ${
                  window.location.href.slice(24) == "workers" ? "active" : ""
                }`}
              >
                <div className="nav_l_text">
                  <img src="/img/nav_3.png" alt="" />
                  <span>Ishchilar</span>
                </div>
                <img className="nav_l_drop" src="/img/icon_drop_1.png" alt="" />
              </div>
              <div
                onClick={() => navigate("/clients")}
                className={`nav_l ${
                  window.location.href.slice(24) == "clients" ? "active" : ""
                }`}
              >
                <div className="nav_l_text">
                  <img src="/img/nav_3.png" alt="" />
                  <span>Klientlar</span>
                </div>
                <img className="nav_l_drop" src="/img/icon_drop_1.png" alt="" />
              </div>
              <div
                onClick={() => navigate("/faq")}
                className={`nav_l ${
                  window.location.href.slice(24) == "faq" ? "active" : ""
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

export default AdminLayout;
