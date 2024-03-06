import { useEffect, useState } from "react";
import styled from "@emotion/styled";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import TaskCard from "./TaskCard";
import axios from "axios";
import { API_PATH, CONFIG } from "../constants/constants";
import { v4 as uuidv4 } from "uuid";
import { useNavigate, useParams } from "react-router-dom";

const Container = styled.div`
  display: flex;
  width: 100%;
  background: #f9fbff;
  min-height: 100vh;
  justify-content: flex-end;
`;

const TaskList = styled.div`
  min-height: 200px;
  display: flex;
  flex-direction: column;
  background: #fff;
  // min-width: 341px;
  width: 100%;
  border-radius: 5px;
  padding: 15px 15px;
  // margin-right: 45px;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 6px 12px -2px,
    rgba(0, 0, 0, 0.3) 0px 3px 7px -3px;
`;

const TaskColumnStyles = styled.div`
  display: flex;
  width: 100%;
  // flex-direction: column;
  // min-height: 80vh;
  justify-content: flex-end;
`;

const Title = styled.span`
  color: #fff;
  font-size: 22px;
  line-height: 28px;
  background: #5932ea;
  padding: 8px 12px;
  border-radius: 5px;
  align-self: flex-start;
`;

const Kanban = () => {
  const { id } = useParams();
  const [columns, setColumns] = useState({});
  const [loading, setLoading] = useState(true);
  const nav = useNavigate("/");

  useEffect(() => {
    axios
      .get(API_PATH + `main/client-list/?paket_id=${id}`, CONFIG)
      .then((res) => {
        setColumns({
          birinchi: {
            title: "Barcha Mijozlar",
            items: res.data,
          },
        });
        setLoading(false);
      });
  }, []);

  const addRooms = () => {
    setColumns((prevcolums) => ({
      ...prevcolums,
      [uuidv4()]: {
        title: `${Object.entries(columns).length}-xona`,
        items: [],
      },
    }));
  };

  const onDragEnd = (result, columns, setColumns) => {
    if (!result.destination) return;
    const { source, destination } = result;
    if (source.droppableId !== destination.droppableId) {
      const sourceColumn = columns[source.droppableId];
      const destColumn = columns[destination.droppableId];
      const sourceItems = [...sourceColumn.items];
      const destItems = [...destColumn.items];
      const [removed] = sourceItems.splice(source.index, 1);
      destItems.splice(destination.index, 0, removed);
      setColumns({
        ...columns,
        [source.droppableId]: {
          ...sourceColumn,
          items: sourceItems,
        },
        [destination.droppableId]: {
          ...destColumn,
          items: destItems,
        },
      });
    } else {
      const column = columns[source.droppableId];
      const copiedItems = [...column.items];
      const [removed] = copiedItems.splice(source.index, 1);
      copiedItems.splice(destination.index, 0, removed);
      setColumns({
        ...columns,
        [source.droppableId]: {
          ...column,
          items: copiedItems,
        },
      });
    }
  };

  const goPdf = () => {
    localStorage.setItem("DATA_PDF", JSON.stringify(columns));
    nav("/pdf");
  };

  return (
    <>
      {loading ? (
        <></>
      ) : (
        <>
          <DragDropContext
            onDragEnd={(result) => onDragEnd(result, columns, setColumns)}
          >
            <Container>
              <TaskColumnStyles>
                <div className="can_l">
                  {Object.entries(columns).map(([col_id, col], index) => (
                    <>
                      {col_id == "birinchi" ? (
                        <>
                          {console.log(col_id)}
                          <Droppable key={index} droppableId={col_id}>
                            {(provided, snapshot) => (
                              <TaskList
                                ref={provided.innerRef}
                                {...provided.droppableProps}
                              >
                                <div className="can_back_box">
                                  <img
                                    onClick={() => nav(`/vpaket/${id}`)}
                                    src="/img/icon_right.png"
                                    alt=""
                                  />
                                  <div className="can_back_title">
                                    Barcha mijozlar
                                  </div>
                                </div>
                                {col?.items?.map((item, index) => (
                                  <TaskCard
                                    key={item}
                                    item={item}
                                    index={index}
                                  />
                                ))}
                                {provided.placeholder}
                              </TaskList>
                            )}
                          </Droppable>
                        </>
                      ) : (
                        <></>
                      )}
                    </>
                  ))}
                </div>
                <div className="row w-75 p-3 ps-0">
                  {Object.entries(columns).map(([columnId, column], index) => (
                    <>
                      {columnId == "birinchi" ? (
                        <></>
                      ) : (
                        <>
                          {console.log(columnId)}
                          <div key={index + 1000} className="col-4 mb-3">
                            <Droppable key={index + 100} droppableId={columnId}>
                              {(provided, snapshot) => (
                                <TaskList
                                  ref={provided.innerRef}
                                  {...provided.droppableProps}
                                >
                                  <Title>{column.title}</Title>
                                  {column?.items?.map((item, index) => (
                                    <TaskCard
                                      key={item}
                                      item={item}
                                      index={index}
                                    />
                                  ))}
                                  {provided.placeholder}
                                </TaskList>
                              )}
                            </Droppable>
                          </div>
                        </>
                      )}
                    </>
                  ))}
                  <div onClick={() => addRooms()} className="col-4 mb-3">
                    <div className="plus_box">
                      <img src="/img/icon_plus_2.png" alt="" />
                    </div>
                  </div>
                  <div
                    onClick={() => goPdf()}
                    className="col-12 d-flex justify-content-end"
                  >
                    <div className="can_btn">Yuklab olish</div>
                  </div>
                </div>
              </TaskColumnStyles>
            </Container>
          </DragDropContext>
        </>
      )}
    </>
  );
};

export default Kanban;
