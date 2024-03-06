import { useEffect, useState } from "react";
import { PieChart } from "@mui/x-charts/PieChart";
import axios from "axios";
import { BarChart } from "@mui/x-charts/BarChart";
import { API_PATH, CONFIG } from "../../constants/constants";
import { useNavigate } from "react-router-dom";

const data2 = [
  { label: "Joriy yil", value: 2400 },
  { label: "O'tgan yil", value: 4567 },
];

const uData = [
  4000, 3000, 2000, 2780, 1890, 2390, 3490, 2450, 2600, 2070, 2190, 3000,
];

const xLabels = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

const VisaDashboard = () => {
  const [operators, setOperators] = useState();
  const [searchOperator, setSearchOperator] = useState("");
  const [filterOperator, setFilterOperator] = useState("");
  const [topStats, setTopStats] = useState();
  const [barData, setBarData] = useState([]);

  const [userData, setUserData] = useState([]);
  const nav = useNavigate();
  const uData2 = null;
  useEffect(() => {
    axios.get(API_PATH + "account/top-stats/", CONFIG).then((res) => {
      setTopStats(res.data);
    });
    axios.get(API_PATH + "account/count-clients/", CONFIG).then((res) => {
      setBarData(res.data);
      uData2.push(res.data.jan > 0 ? res.data.jan : 1);
      uData2.push(res.data.feb > 0 ? res.data.feb : 1);
      uData2.push(res.data.mar > 0 ? res.data.mar : 1);
      uData2.push(res.data.apr > 0 ? res.data.apr : 1);
      uData2.push(res.data.may > 0 ? res.data.may : 1);
      uData2.push(res.data.jun > 0 ? res.data.jun : 1);
      uData2.push(res.data.jul > 0 ? res.data.jul : 1);
      uData2.push(res.data.aug > 0 ? res.data.aug : 1);
      uData2.push(res.data.sep > 0 ? res.data.sep : 1);
      uData2.push(res.data.oct > 0 ? res.data.oct : 1);
      uData2.push(res.data.nov > 0 ? res.data.nov : 1);
      uData2.push(res.data.dec > 0 ? res.data.dec : 1);
    });
    axios.get(API_PATH + "account/user-rud/", CONFIG).then((res) => {
      setUserData(res.data);
    });
  }, []);

  const getOperators = () => {
    axios
      .get(
        API_PATH +
          `/account/top-operators?search=${searchOperator}&filter=${filterOperator}`,
        CONFIG
      )
      .then((res) => {
        setOperators(res.data);
      });
  };

  useEffect(() => {
    getOperators();
  }, [searchOperator]);

  return (
    <>
      <div className="Dashboard">
        <div className="dash_name_box">
          <div className="dash_name">Welcome, {userData?.name}</div>
          <div onClick={() => nav("/vprofile")} className="dash_prof">
            <img
              src={userData?.avatar ? userData?.avatar : "/img/icon_prof.png"}
              alt=""
            />
            <div className="dash_prof_box">
              <div className="dash_prof_h">
                {userData?.name ? userData?.name : "User"}
              </div>
              <div className="dash_prof_p">
                {userData?.role ? userData?.role : "role"}
              </div>
            </div>
          </div>
        </div>
        <div className="w-100"></div>
        <div className="dash_stats_box">
          <div className="dash_stats_main">
            <img src="/img/icon_stats_1.png" alt="" />
            <div className="dash_stats_text">
              <div className="dash_stats_h">Jami Tushum</div>
              <div className="dash_stats_p">
                ${topStats?.full.price__sum / 1000} K
              </div>
            </div>
          </div>
          <div className="dash_stats_main">
            <img src="/img/icon_stats_2.png" alt="" />
            <div className="dash_stats_text">
              <div className="dash_stats_h">Bu oydagi</div>
              <div className="dash_stats_p">
                ${topStats?.month.price__sum / 1000} K
              </div>
            </div>
          </div>
          <div className="dash_stats_main">
            <img src="/img/icon_stats_3.png" alt="" />
            <div className="dash_stats_text">
              <div className="dash_stats_h">Bu yil</div>
              <div className="dash_stats_p">
                ${topStats?.year.price__sum / 1000} K
              </div>
            </div>
          </div>
        </div>
        <div className="dashboard_stats_box d-flex align-items-center justify-content-between">
          <div className="line_chart">
            <div className="d-flex align-items-center justify-content-between">
              <div className="dash_name">Oylik Statistika</div>
              <div className="d-flex gap-3">
                <div className="my_select">
                  <select
                    onChange={(e) => setFilterOperator(e.target.value)}
                    className="dash_sel"
                    name=""
                    id=""
                  >
                    <option value="01">2024</option>
                  </select>
                </div>
              </div>
            </div>
            <BarChart
              width={900}
              height={400}
              series={[
                { data: uData2 ? uData2 : uData, label: "Mijozlar soni" },
              ]}
              xAxis={[{ data: xLabels, scaleType: "band" }]}
            />
          </div>
          <div className="pie_chart d-flex flex-column justify-content-center align-items-center">
            <div>
              <h3 className="d-flex justify-content-center">
                {"O'tgan yilga nisbatan"}
              </h3>
            </div>
            <PieChart
              series={[
                {
                  data: data2,
                  faded: true,
                  cx: "50%",
                  cy: "50%",
                  innerRadius: 60,
                  outerRadius: 120,
                },
              ]}
              height={300}
              slotProps={{
                legend: { hidden: true },
              }}
            />
          </div>
        </div>

        <div className="dash_oper">
          <div className="dash_name_box">
            <div className="dash_name">Top Operatorlar</div>
            <div className="d-flex flex-md-row flex-column gap-3">
              <div className="my_select">
                <select
                  onChange={(e) => setFilterOperator(e.target.value)}
                  className="dash_sel"
                  name=""
                  id=""
                >
                  <option value="01">Yanvar</option>
                  <option value="02">Fevral</option>
                  <option value="03">Mart</option>
                  <option value="04">Aprel</option>
                  <option value="05">May</option>
                  <option value="06">Iyun</option>
                  <option value="07">Iyul</option>
                  <option value="08">Avgust</option>
                  <option value="09">Sentabr</option>
                  <option value="10">Oktabr</option>
                  <option value="11">Noyabr</option>
                  <option value="12">Dekabr</option>
                </select>
              </div>
              <div className="dash_inp">
                <img src="/img/icon_search.png" alt="" />
                <input
                  value={searchOperator}
                  onChange={(e) => setSearchOperator(e.target.value)}
                  type="text"
                  placeholder="Qidirish"
                />
              </div>
            </div>
          </div>
          <div className="dash_main">
            <div className="dash_main_h_1"># Operator ismi</div>
            <div className="dash_main_h_box">
              <div className="dash_main_h_2">Klientlar soni</div>
              <div className="dash_main_h_2">Umumiy tushum</div>
            </div>
          </div>
          {operators?.slice(0, 21)?.map((item, index) => (
            <div key={index} className="dash_main2">
              <div className="dash_main2_h_1">
                <div className="dash_num">{index + 1}</div>
                <div className="dash_num_text">
                  {item.name}
                  <span>{item.branch_name}</span>
                </div>
              </div>
              <div className="dash_main2_h_box">
                <div className="dash_main2_h_2">{item.info.count}</div>
                <div className="dash_main2_h_2">$ {item.info.cost}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default VisaDashboard;
