import React, { useRef, useState } from "react";
import { toast } from "react-toastify";
import { PDFExport } from "@progress/kendo-react-pdf";
import styled from "@emotion/styled";

const PdfPage = () => {
  const [data, setData] = useState(
    JSON.parse(localStorage.getItem("DATA_PDF")) || ""
  );
  console.log(data);
  const pdfExportComponent = useRef(null);
  const contentArea = useRef(null);
  const [layoutSelection, setLayoutSelection] = useState({
    text: "A4",
    value: "size-a4",
  });

  const handleExportWithComponent = () => {
    pdfExportComponent.current.save();
  };

  const PDFBody = styled.div``;

  return (
    <div className="PdfPage">
      <button onClick={handleExportWithComponent} className="btn myBtn">
        Скачать PDF
      </button>

      <PDFExport ref={pdfExportComponent}>
        <PDFBody>
          <div
            ref={contentArea}
            className={`cardsBody ${layoutSelection.value}`}
          >
            <div className="pdf_name">
              Standart 14 - kun <span>(27.05-26.06)</span>{" "}
            </div>
            {Object.entries(data).map(([ind, item], index) => (
              <>
                {item?.items?.length > 1 ? (
                  <>
                    <div key={index} className="table_box">
                      <div className="table_header">
                        <div className="table_item table_item_1">N#</div>
                        <div className="table_item table_item_2">F.I.O</div>
                        <div className="table_item table_item_3">
                          Passport Seria
                        </div>
                        <div className="table_item table_item_3">Joylashuv</div>
                        <div className="table_item table_item_3">Madina</div>
                        <div className="table_item table_item_3">Makka</div>
                      </div>
                      {item?.items?.map((i, f) => (
                        <div key={f + 10000} className="table_body">
                          <div className="table_item table_item_1">
                            {/* {index + 1} */}
                          </div>
                          <div className="table_item table_item_2">
                            {i.full_name}
                          </div>
                          <div className="table_item table_item_3">
                            {i.passport_seria}
                          </div>
                          <div className="table_item table_item_3">
                            {i.stay}
                          </div>
                          <div className="table_item table_item_3"></div>
                          <div className="table_item table_item_3"></div>
                        </div>
                      ))}
                    </div>
                  </>
                ) : (
                  <></>
                )}
              </>
            ))}
          </div>
        </PDFBody>
      </PDFExport>
    </div>
  );
};

export default PdfPage;
