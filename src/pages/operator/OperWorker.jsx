import axios from "axios";
import { useEffect, useState } from "react";
import { API_PATH, CONFIG } from "../../constants/constants";

const OperWorker = () => {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");
  const [filial, setFiliall] = useState("");
  const [filialData, setFiliallData] = useState([]);

  useEffect(() => {
    axios
      .get(
        API_PATH + `account/list-workers?search=${search}&?filiall=${filial}`,
        CONFIG
      )
      .then((res) => {
        setData(res.data);
      });
    axios.get(API_PATH + "main/branch-list/", CONFIG).then((res) => {
      setFiliallData(res.data);
    });
  }, [search, filial]);

  return (
    <>
      <div className="Worker">
        <div className="prod_main">
          <div className="dash_name_box">
            <div className="dash_name">Ishchilar Ro’yhati</div>
            <div className="d-flex gap-3">
              {/* <div className="my_select">
                <select
                  value={filial}
                  onChange={(e) => setFiliall(e.target.value)}
                  className="dash_sel"
                  name=""
                  id=""
                >
                  {filialData?.map((item, index) => (
                    <option key={index} value={item.id}>
                      {item.name}
                    </option>
                  ))}
                </select>
              </div> */}
              <div className="dash_inp">
                <img src="/img/icon_search.png" alt="" />
                <input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  type="text"
                  placeholder="Qidirish"
                />
              </div>
              {/* <div className="prod_btn">
                                <img src="/img/icon_plus.png" alt="" />
                                Add Client
                            </div> */}
            </div>
          </div>

          <div className="prod_text">
            <div className="prod_text_h prod_text_h1">#</div>
            <div className="prod_text_h prod_text_h2">F.I.O</div>
            <div className="prod_text_h prod_text_h3">Tel Num</div>
            <div className="prod_text_h prod_text_h2">Filial</div>
            <div className="prod_text_h prod_text_h3">Data registr</div>

            <div className="prod_text_h prod_text_h2">Lavozim</div>
          </div>
          {data?.map((item, index) => (
            <div key={index} className="prod_text2">
              <div className="prod_text_p prod_text_h1">{index + 1}</div>
              <div className="prod_text_p prod_text_h2 prod_name_curs">
                {item?.name}
              </div>
              <div className="prod_text_p prod_text_h3">{item.phone}</div>
              <div className="prod_text_p prod_text_h2">
                {item.get_branch_name}
              </div>
              <div className="prod_text_p prod_text_h3">{item.created_at}</div>
              <div className="prod_text_p prod_text_h2">{item.role}</div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default OperWorker;
