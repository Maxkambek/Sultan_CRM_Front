import axios from "axios";
import { useEffect, useState } from "react";
import {} from "react";
import { useParams } from "react-router-dom";
import { API_PATH, CONFIG, IMAGE_CONFIG } from "../../constants/constants";
import { toast } from "react-toastify";

const OperProduct = () => {
  const [userId, setUserId] = useState(localStorage.getItem("USER_ID") || "");
  const { id } = useParams();
  const [search, setSearch] = useState("");
  const [name, setName] = useState("");
  const [passNum, setPassNum] = useState("");
  const [passBerilgan, setPassBerilgan] = useState("");
  const [passExpire, setPassExpire] = useState("");
  const [price, setPrice] = useState("");
  const [takenPayment, setTakenPayment] = useState("");
  const [passFile, setPassFile] = useState("");
  const [phone, setPhone] = useState("");
  const [stay, setStay] = useState("");
  const [country, setCountry] = useState("");
  const [paketData, setPaketData] = useState([]);
  const [data, setData] = useState([]);
  const [mod2, setMod2] = useState(false);
  const [mod3, setMod3] = useState(false);
  const [mod, setMod] = useState(false);
  const [currentClient, setCurrentClient] = useState();
  const [description, setDescription] = useState("");
  const [updatedPrice, setUpdatedPrice] = useState("");
  const [updatedStay, setUpdatedStay] = useState("");
  const [updatedDescription, setUpdatedDescription] = useState("");

  useEffect(() => {
    axios.get(API_PATH + `main/paket-update/${id}`, CONFIG).then((res) => {
      setPaketData(res.data);
    });
    axios
      .get(
        API_PATH + `main/client-list?paket_id=${id}&search=${search}`,
        IMAGE_CONFIG
      )
      .then((res) => {
        setData(res.data);
      });
  }, [search]);

  const formData = new FormData();

  const updateClient = (client_id) => {
    axios
      .patch(
        API_PATH + `main/client-update/${client_id}/`,
        {
          payment_taken: updatedPrice
            ? updatedPrice
            : currentClient.payment_taken,
          stay: updatedStay ? updatedStay : currentClient.stay,
          description: updatedDescription
            ? updatedDescription
            : currentClient.description,
        },
        CONFIG
      )
      .then(() => {
        document.location.reload();
      });
  };

  const clientAdd = () => {
    if (paketData?.quantity <= data?.length) {
      return alert("joy to'ldi");
    } else {
      formData.append("full_name", name);
      formData.append("phone", phone);
      formData.append("passport_seria", passNum);
      formData.append("paket", id);
      formData.append("payment_taken", takenPayment);
      formData.append("stay", stay);
      formData.append("price", price);
      formData.append("country", country);
      formData.append("passport_date", passBerilgan);
      formData.append("passport_file", passFile);
      formData.append("passport_expire", passExpire);

      axios
        .post(API_PATH + `main/client-create/`, formData, IMAGE_CONFIG)
        .then(() => {
          setName("");
          setPhone("");
          setPassFile("");
          setPassNum("");
          setStay("");
          setCountry("");
          setPrice("");
          document.location.reload();
        });
    }
  };

  const clientGetID = (pk) => {
    axios.get(API_PATH + `main/client-update/${pk}/`, CONFIG).then((res) => {
      setCurrentClient(res.data);
      console.log(res.data);
      setMod3(!mod3);
    });
  };

  return (
    <>
      <div className="Product">
        <div className="prod_name_box">
          <div className="prod_name_box_1">
            <div className="prod_name_1_text">
              <div className="prod_name_1_1">{paketData?.name}</div>
              <div className="prod_name_1_2">{paketData?.price} $</div>
            </div>
            <div className="prod_name_1_btn">
              {data?.length}/{paketData?.quantity}
            </div>
          </div>

          <div className="prod_name_2">
            <div className="prod_name_2_main">
              <img src="/img/icon_correct.png" alt="" />
              <div className="prod_name_2_text">
                <div className="prod_name_2_text_h">Ketish</div>
                <div className="prod_name_2_text_p">{paketData?.date_go}</div>
              </div>
            </div>

            <div className="prod_name_2_main">
              <img src="/img/icon_correct.png" alt="" />
              <div className="prod_name_2_text">
                <div className="prod_name_2_text_h">Qaytish</div>
                <div className="prod_name_2_text_p">{paketData?.date_back}</div>
              </div>
            </div>

            <div className="prod_name_2_main">
              <img src="/img/icon_correct.png" alt="" />
              <div className="prod_name_2_text">
                <div className="prod_name_2_text_h">Yo’nalish</div>
                <div className="prod_name_2_text_p">{paketData?.reys}</div>
              </div>
            </div>

            <div className="prod_name_2_main">
              <img src="/img/icon_correct.png" alt="" />
              <div className="prod_name_2_text">
                <div className="prod_name_2_text_h">Madina Davomiyligi</div>
                <div className="prod_name_2_text_p">
                  {paketData?.madina_duration}
                </div>
              </div>
            </div>

            <div className="prod_name_2_main">
              <img src="/img/icon_correct.png" alt="" />
              <div className="prod_name_2_text">
                <div className="prod_name_2_text_h">Madina Hotel</div>
                <div className="prod_name_2_text_p">
                  {paketData?.madina_hotel}
                </div>
              </div>
            </div>

            <div className="prod_name_2_main">
              <img src="/img/icon_correct.png" alt="" />
              <div className="prod_name_2_text">
                <div className="prod_name_2_text_h">Madina ovqatlanish</div>
                <div className="prod_name_2_text_p">
                  {paketData?.madina_dish}
                </div>
              </div>
            </div>
            <div className="prod_name_2_main">
              <img src="/img/icon_correct.png" alt="" />
              <div className="prod_name_2_text">
                <div className="prod_name_2_text_h">Makka davomiyligi </div>
                <div className="prod_name_2_text_p">
                  {paketData?.makka_duration}
                </div>
              </div>
            </div>
            <div className="prod_name_2_main">
              <img src="/img/icon_correct.png" alt="" />
              <div className="prod_name_2_text">
                <div className="prod_name_2_text_h">Makka Hotel</div>
                <div className="prod_name_2_text_p">
                  {paketData.makka_hotel}
                </div>
              </div>
            </div>
            <div className="prod_name_2_main">
              <img src="/img/icon_correct.png" alt="" />
              <div className="prod_name_2_text">
                <div className="prod_name_2_text_h">Makka ovqatlanish</div>
                <div className="prod_name_2_text_p">
                  {paketData?.makka_dish}
                </div>
              </div>
            </div>
            <div className="prod_name_2_main w-100">
              <img src="/img/icon_correct.png" alt="" />
              <div className="prod_name_2_text">
                <div className="prod_name_2_text_h">
                  {"Qo'shimcha ma'lumotlari"}
                </div>
                <div className="prod_name_2_text_p w-100">
                  {paketData?.description}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="prod_main">
          <div className="dash_name_box">
            <div className="dash_name">Ziyoratchilar ro’yhati</div>
            <div className="d-flex gap-3 align-items-center">
              {/* <div className="my_select">
                <select className="dash_sel" name="" id="">
                  <option value="">Filiallar</option>
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
              <div className="">
                <div
                  onClick={() => {
                    paketData?.quantity <= data?.length
                      ? toast("Joy to'ldi")
                      : setMod(true);
                  }}
                  className="prod_btn"
                >
                  <img src="/img/icon_plus.png" alt="" />
                  {"Qo'shish"}
                </div>
              </div>
            </div>
          </div>
          <div className="prod_text">
            <div className="prod_text_h prod_text_h1">#</div>
            <div className="prod_text_h prod_text_h2">F.I.O</div>
            <div className="prod_text_h prod_text_h3">Pass Num</div>
            <div className="prod_text_h prod_text_h4">Narxi</div>
            <div className="prod_text_h prod_text_h4">To’lov</div>
            <div className="prod_text_h prod_text_h5">Qoldi</div>
            <div className="prod_text_h prod_text_h6">Pass File</div>
            <div className="prod_text_h prod_text_h7">Visa</div>
            <div className="prod_text_h prod_text_h8">Tel Num</div>
            <div className="prod_text_h prod_text_h9">Joylashuv</div>
            <div className="prod_text_h prod_text_h10">Hudud</div>
            <div className="prod_text_h prod_text_h11 text-center">Filiall</div>
          </div>
          {data?.map((item, index) => (
            <div key={index} className="prod_text2">
              <div className="prod_text_p prod_text_h1">{index + 1}</div>
              <div
                onClick={() => {
                  item.owner === userId
                    ? clientGetID(item.id)
                    : toast("Bu sizning mijozingiz emas!");
                }}
                className="prod_text_p prod_text_h2 cursor"
              >
                {item.full_name}
              </div>
              <div className="prod_text_p prod_text_h3">
                {item.passport_seria}
              </div>
              <div className="prod_text_p prod_text_h4">$ {item.price}</div>
              <div className="prod_text_p prod_text_h4">
                $ {item.payment_taken}
              </div>
              <div className="prod_text_p red prod_text_h5">
                {" "}
                $ {item.price - item.payment_taken}
              </div>
              <div className="prod_text_p prod_text_h6">
                <a target="_blank" href={item.passport_file}>
                  <span>PassFile</span>
                </a>
              </div>
              <div className="prod_text_p prod_text_h7">
                {item.visa_file ? (
                  <>
                    <a target="_blank" href={item.visa_file}>
                      {" "}
                      <span>VisaFile</span>
                    </a>
                  </>
                ) : (
                  <>
                    <span>VisaFile</span>
                  </>
                )}
              </div>
              <div className="prod_text_p prod_text_h8">{item.phone}</div>
              <div className="prod_text_p prod_text_h9">{item.stay}</div>
              <div className="prod_text_p prod_text_h10">{item.country}</div>
              <div className="prod_text_p prod_text_h11">
                {item.branch_name}
              </div>
            </div>
          ))}
        </div>

        <div className={`modalcha2 ${mod2 ? "active" : ""}`}>
          <div className="mod_2_box">
            <div className="mod_2_box_img">
              <img
                onClick={() => setMod2(!mod2)}
                src="/img/icon_x.png"
                alt=""
              />
            </div>
            <div className="mod_2_name">
              <div className="mod_2_name_h">
                {
                  " Kiritga ma'lumotlaringizni to'g'ri ekanligiga ishonch hosil qildingizmi?"
                }
              </div>
            </div>

            <div onClick={() => clientAdd()} className="mod_2_btn">
              Ha, Davom etish
            </div>
          </div>
        </div>
        {mod ? (
          <>
            <div className={`modalcha`}>
              <div className="d-flex flex-column justify-content-between h-100">
                <form onSubmit={() => setMod2(!mod2)} action="">
                  <div className="mod_text">
                    <div className="mod_name">
                      <div className="mod_name_h">Klient Qo’shish</div>
                      <img
                        onClick={() => setMod(!mod)}
                        className={``}
                        src="/img/icon_x.png"
                        alt=""
                      />
                    </div>
                    <div className="mod_text_box">
                      <div className="mod_text_h">F.I.O </div>
                      <input
                        placeholder="Kasimov Mahkam"
                        value={name}
                        required
                        onChange={(e) => setName(e.target.value)}
                        className="mod_text_inp"
                        type="text"
                      />
                    </div>
                    <div className="mod_text_box">
                      <div className="mod_text_h">Passport Seria</div>
                      <input
                        required
                        minLength={9}
                        maxLength={9}
                        value={passNum}
                        onChange={(e) => setPassNum(e.target.value)}
                        className="mod_text_inp"
                        type="text"
                      />
                    </div>
                    <div className="mod_text_box">
                      <div className="mod_text_h">Passport berilgan vaqti</div>
                      <input
                        placeholder="01.01.2020"
                        required
                        value={passBerilgan}
                        onChange={(e) => setPassBerilgan(e.target.value)}
                        className="mod_text_inp"
                        type="date"
                      />
                    </div>
                    <div className="mod_text_box">
                      <div className="mod_text_h">
                        Passport amal qilish muddati
                      </div>
                      <input
                        placeholder="01.01.2030"
                        value={passExpire}
                        required
                        onChange={(e) => setPassExpire(e.target.value)}
                        className="mod_text_inp"
                        type="date"
                      />
                    </div>
                    <div className="mod_text_box">
                      <div className="mod_text_h"> Telefon Raqami</div>
                      <input
                        placeholder="+998977165434"
                        className="mod_text_inp"
                        maxLength={15}
                        type="text"
                        value={phone}
                        required
                        onChange={(e) => setPhone(e.target.value)}
                      />
                    </div>
                    <div className="mod_text_box">
                      <div className="mod_text_h">Kelishilgan Narx</div>
                      <input
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        required
                        step={0}
                        className="mod_text_inp"
                        onWheel={(e) => e.target.blur()}
                        type="number"
                      />
                    </div>
                    <div className="mod_text_box">
                      <div className="mod_text_h">Oldindan to’lov</div>
                      <input
                        onWheel={(e) => e.target.blur()}
                        value={takenPayment}
                        max={price}
                        min={1}
                        onChange={(e) => setTakenPayment(e.target.value)}
                        className="mod_text_inp"
                        type="number"
                      />
                    </div>
                    <div className="mod_text_box">
                      <div className="mod_text_h">Qolgan {"To'lov"}</div>
                      <input
                        disabled
                        className="mod_text_inp"
                        type="number"
                        value={price - takenPayment}
                      />
                    </div>
                    <div className="mod_text_box">
                      <div className="mod_text_h">Joylashuv</div>
                      <select
                        onChange={(e) => setStay(e.target.value)}
                        className="mod_text_inp"
                        name=""
                        id=""
                      >
                        {" "}
                        <option value="" selected disabled hidden>
                          Tanlang
                        </option>
                        <option value="2-kishi">2-kishilik</option>
                        <option value="3-kishi">3-kishilik</option>
                        <option value="4-kishi">4-kishilik</option>
                      </select>
                    </div>
                    <div className="mod_text_box">
                      <div className="mod_text_h">Passport File</div>
                      {passFile ? (
                        <>
                          <div className="d-flex justify-content-between align-items-center">
                            <div>
                              <a
                                target="_blank"
                                href={URL.createObjectURL(passFile)}
                              >
                                PassportFile
                              </a>
                            </div>
                            <div>
                              <label className="input-file ">
                                <input
                                  type="file"
                                  // accept="file/pdf"
                                  onChange={(e) =>
                                    setPassFile(e.target.files[0])
                                  }
                                  name="pass_file"
                                  id="passport"
                                />
                                <span> Update File</span>
                              </label>
                            </div>
                          </div>
                        </>
                      ) : (
                        <>
                          <label className="input-file ">
                            <input
                              required
                              type="file"
                              // accept="file/pdf"
                              onChange={(e) => setPassFile(e.target.files[0])}
                              name="pass_file"
                              id="passport"
                            />
                            <span>File</span>
                          </label>
                        </>
                      )}
                    </div>
                    <div className="mod_text_box">
                      <div className="mod_text_h">Hudud</div>
                      <input
                        required
                        value={country}
                        onChange={(e) => setCountry(e.target.value)}
                        className="mod_text_inp"
                        type="text"
                      />
                    </div>
                    <div className="mod_text_box">
                      <div className="mod_text_h">
                        {"Qo'shimcha ma'lumotlar"}
                      </div>
                      <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="mod_textarea"
                        type="text"
                      />
                    </div>
                    <div className="mod_text_box">
                      <div className="mod_text_h">Filiall</div>
                      <input className="mod_text_inp" type="text" disabled />
                      {/* <select className="mod_text_inp" name="" id="">
                      <option value="">Toshkent</option>
                      <option value="">O'rda</option>
                      <option value="">4-kishilik</option>
                    </select> */}
                    </div>
                  </div>
                  <div className="mod_btn">
                    <button type="submit">
                      <img src="/img/icon_plus.png" alt="" />
                      Klient qo’shish
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </>
        ) : (
          <></>
        )}

        {mod3 ? (
          <>
            <div className={`modalcha`}>
              <div className="d-flex flex-column justify-content-between h-100">
                <form action="">
                  <div className="mod_text">
                    <div className="mod_name">
                      <div className="mod_name_h">
                        {currentClient?.full_name}
                      </div>
                      <img
                        onClick={() => setMod3(!mod3)}
                        className={``}
                        src="/img/icon_x.png"
                        alt=""
                      />
                    </div>
                    <div className="mod_text_box">
                      <div className="mod_text_h">F.I.O </div>
                      <input
                        value={currentClient?.full_name}
                        disabled
                        className="mod_text_inp"
                        type="text"
                      />
                    </div>
                    <div className="mod_text_box">
                      <div className="mod_text_h">Passport Seria</div>
                      <input
                        disabled
                        value={currentClient?.passport_seria}
                        className="mod_text_inp"
                        type="text"
                      />
                    </div>
                    <div className="mod_text_box">
                      <div className="mod_text_h">Passport berilgan vaqti</div>
                      <input
                        value={currentClient?.passport_date}
                        disabled
                        className="mod_text_inp"
                        type="date"
                      />
                    </div>
                    <div className="mod_text_box">
                      <div className="mod_text_h">
                        Passport amal qilish muddati
                      </div>
                      <input
                        value={currentClient?.passport_expire}
                        disabled
                        className="mod_text_inp"
                        type="date"
                      />
                    </div>
                    <div className="mod_text_box">
                      <div className="mod_text_h"> Telefon Raqami</div>
                      <input
                        className="mod_text_inp"
                        type="text"
                        value={currentClient?.phone}
                      />
                    </div>
                    <div className="mod_text_box">
                      <div className="mod_text_h">Kelishilgan Narx</div>
                      <input
                        disabled
                        value={currentClient?.price}
                        className="mod_text_inp"
                        type="number"
                      />
                    </div>
                    <div className="mod_text_box">
                      <div className="mod_text_h">Oldindan to’lov</div>
                      <input
                        onChange={(e) => setUpdatedPrice(e.target.value)}
                        defaultValue={currentClient?.payment_taken}
                        className="mod_text_inp"
                        type="number"
                      />
                    </div>
                    <div className="mod_text_box">
                      <div className="mod_text_h">Qolgan {"To'lov"}</div>
                      <input
                        disabled
                        className="mod_text_inp"
                        type="number"
                        value={
                          currentClient?.price - currentClient?.payment_taken
                        }
                      />
                    </div>
                    <div className="mod_text_box">
                      <div className="mod_text_h">Joylashuv</div>
                      <select
                        onChange={(e) => setUpdatedStay(e.target.value)}
                        className="mod_text_inp"
                        name=""
                        defaultValue={currentClient?.stay}
                        id=""
                      >
                        {" "}
                        <option value="2-kishi">2-kishilik</option>
                        <option value="3-kishi">3-kishilik</option>
                        <option value="4-kishi">4-kishilik</option>
                      </select>
                    </div>
                    <div className="mod_text_box">
                      <div className="mod_text_h">Passport File</div>

                      <label className="input-file ">
                        <input
                          disabled
                          type="file"
                          name="upload"
                          accept="application/pdf"
                          id="passport"
                        />
                        <a target="_blank" href={currentClient?.passport_file}>
                          <span>File Link</span>
                        </a>
                      </label>
                    </div>
                    <div className="mod_text_box">
                      <div className="mod_text_h">Hudud</div>
                      <input
                        disabled
                        value={currentClient?.country}
                        className="mod_text_inp"
                        type="text"
                      />
                    </div>

                    <div className="mod_text_box">
                      <div className="mod_text_h">
                        {"Qo'shimcha ma'lumotlar"}
                      </div>
                      <textarea
                        defaultValue={
                          currentClient?.description
                            ? currentClient?.description
                            : ""
                        }
                        onChange={(e) => setUpdatedDescription(e.target.value)}
                        className="mod_textarea"
                        type="text"
                      />
                    </div>
                    <div className="mod_text_box">
                      <div className="mod_text_h">Filiall</div>
                      <input
                        value={currentClient?.branch_name}
                        className="mod_text_inp"
                        type="text"
                        disabled
                      />
                      {/* <select className="mod_text_inp" name="" id="">
                      <option value="">Toshkent</option>
                      <option value="">O'rda</option>
                      <option value="">4-kishilik</option>
                    </select> */}
                    </div>
                  </div>
                  <div className="mod_btn mt-3 mb-2">
                    <button
                      onClick={() => updateClient(currentClient.id)}
                      type="submit"
                    >
                      {"O'"}zgartirish
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </>
        ) : (
          <></>
        )}
      </div>
    </>
  );
};

export default OperProduct;
