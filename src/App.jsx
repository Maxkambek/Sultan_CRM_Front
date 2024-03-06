import { HashRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { useSelector } from "react-redux";
import Login from "./pages/main/Login";
import AdminLayout from "./components/AdminLayout";
import Dashboard from "./pages/admin/Dashboard";
import Filial from "./pages/admin/Filial";
import Packet from "./pages/admin/Packet";
import Product from "./pages/admin/Product";
import Clients from "./pages/admin/Clients";
import Worker from "./pages/admin/Worker";
import FAQ from "./components/FAQ";
import OperatorLayout from "./components/OperatorLayout";
import OperDashboard from "./pages/operator/OperDashboard";
import OperFilial from "./pages/operator/OperFilial";
import OperPacket from "./pages/operator/OperPaket";
import OperProduct from "./pages/operator/OperProduct";
import OperClients from "./pages/operator/OperClients";
import OperWorker from "./pages/operator/OperWorker";
import HeadBranchLayout from "./components/HeadBranchLayout";
import Profile from "./pages/admin/Profile";
import VisaLayout from "./components/VisaLayout";
import VisaDashboard from "./pages/visa/VisaDashboard";
import VisaFilial from "./pages/visa/VisaFiliall";
import VisaPacket from "./pages/visa/VisaPaket";
import VisaProduct from "./pages/visa/VisaProduct";
import VisaClient from "./pages/visa/VisaClient";
import VisaWorkers from "./pages/visa/VisaWorkers";
import Canban from "./components/Canban";
import Can from "./canban/Can";
import PdfPage from "./canban/PdfPage";

const App = () => {
  const { userRole } = useSelector((state) => state.auth);

  return (
    <>
      <HashRouter>
        <Routes>
          <Route path="/" element={<Login />} />

          {userRole === "BOSS" && (
            <>
              {/* BOSS */}
              <Route element={<AdminLayout />}>
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/filiall" element={<Filial />} />
                <Route path="/paket" element={<Packet />} />
                <Route path="/paket/:id" element={<Product />} />
                <Route path="/clients" element={<Clients />} />
                <Route path="/workers" element={<Worker />} />
                <Route path="/faq" element={<FAQ />} />
              </Route>
              {/* BOSS */}
            </>
          )}

          {userRole === "OPERATOR" && (
            <>
              {/* OPERATOR */}
              <Route element={<OperatorLayout />}>
                <Route path="/oprofile" element={<Profile />} />
                <Route path="/odashboard" element={<OperDashboard />} />
                <Route path="/ofiliall" element={<OperFilial />} />
                <Route path="/opaket" element={<OperPacket />} />
                <Route path="/opaket/:id" element={<OperProduct />} />
                <Route path="/oclients" element={<OperClients />} />
                <Route path="/oworkers" element={<OperWorker />} />
                <Route path="/ofaq" element={<FAQ />} />
              </Route>
              {/* OPERATOR */}
            </>
          )}

          {userRole === "HEADBRANCH" && (
            <>
              {/* HEADBRANCH */}
              <Route element={<HeadBranchLayout />}>
                <Route path="/oprofile" element={<Profile />} />
                <Route path="/odashboard" element={<OperDashboard />} />
                <Route path="/ofiliall" element={<OperFilial />} />
                <Route path="/opaket" element={<OperPacket />} />
                <Route path="/opaket/:id" element={<OperProduct />} />
                <Route path="/oclients" element={<OperClients />} />
                <Route path="/oworkers" element={<OperWorker />} />
                <Route path="/ofaq" element={<FAQ />} />
              </Route>
              {/* HEADBRANCH */}
            </>
          )}

          {userRole === "VISA" && (
            <>
              {/* VISA */}
              <Route element={<VisaLayout />}>
                <Route path="/vprofile" element={<Profile />} />
                <Route path="/vdashboard" element={<VisaDashboard />} />
                <Route path="/vfiliall" element={<VisaFilial />} />
                <Route path="/vpaket" element={<VisaPacket />} />
                <Route path="/vpaket/:id" element={<VisaProduct />} />
                <Route path="/vclients" element={<VisaClient />} />
                <Route path="/vworkers" element={<VisaWorkers />} />
                <Route path="/vfaq" element={<FAQ />} />
              </Route>
              {/* VISA */}
            </>
          )}
          <Route path="/can/:id" element={<Can />} />
          <Route path="/pdf" element={<PdfPage />} />
        </Routes>
        <ToastContainer />
      </HashRouter>
    </>
  );
};

export default App;
