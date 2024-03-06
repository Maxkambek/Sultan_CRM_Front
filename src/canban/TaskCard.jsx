import React from "react";
import { Draggable } from "react-beautiful-dnd";
import styled from "@emotion/styled";
// import CustomAvatar from '../TableComponents/CustomAvatar'
// import { ReactComponent as RedArrow } from '../../assets/icons/High.svg'
// import { ReactComponent as YellowArrow } from '../../assets/icons/Medium.svg'
// import { ReactComponent as BlueArrow } from '../../assets/icons/Low.svg'

const TaskInformation = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  padding: 12px;
  min-height: 106px;
  border-radius: 12px;
  // max-width: 311px;
  /* background: ${({ isDragging }) =>
    isDragging ? "rgba(255, 59, 59, 0.15)" : "white"}; */
  background: #efefef;
  margin-top: 15px;
  border: 1px solid #e7e7e7;
  box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;

  .secondary-details {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    font-size: 12px;
    font-weight: 400px;
    color: #7d7d7d;
  }
  /* .priority{ */
  /* margin-right: 12px; */
  /* align-self: center;
    svg{
      width: 12px !important;
      height: 12px !important;
      margin-right: 12px; */
  /* margin-top: 2px; */
  /* } */
  /* } */
`;

const TaskCard = ({ item, index }) => {
  return (
    <Draggable key={item.id} draggableId={`${item.id} canban`} index={index}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <TaskInformation>
            <div className="can_name_box">
              <div className="can_name_text">
                <div className="can_name">{item.full_name} </div>
                <div className="d-flex align-items-center justify-content-between gap-5">
                  <div className="can_pas">{item.passport_seria}</div>
                  <div className="can_pas">{item.country}</div>
                </div>
              </div>
              <div className="can_stay">{item.stay.slice(0, 1)}</div>
            </div>
            <div className="can_descr">**{item.description}</div>
          </TaskInformation>
        </div>
      )}
    </Draggable>
  );
};

export default TaskCard;

// <span className="priority">
// {item.Priority === 'High' ? (<RedArrow />) : item.Priority === 'Medium' ? (<YellowArrow />) : (<BlueArrow />)}
// </span>
// <div><CustomAvatar name={item.Assignee} isTable={false} size={16} /></div>
