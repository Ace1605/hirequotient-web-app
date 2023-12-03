import React from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  position: relative;
  padding: 0.7rem 1rem;
`;

const InnerWrapper = styled.div`
  position: relative;
  text-align: center;
  margin-top: 1rem;
  padding-top: 1rem;
`;

function DeleteAllModal({ closeModal, details, getChange, num }) {
  const deleteSelected = (x) => {
    const list = [...details];
    list.splice(0, x);

    console.log("list", list);
    getChange(list);
    closeModal();
  };
  return (
    <Wrapper>
      <h2 className="font-bold text-lg 880:text-2xl text-black">
        Delete all users on this row
      </h2>
      <InnerWrapper>
        <p className="text-base 880:text-xl font-medium text-neutral-700 text-center 880:text-left">
          Are you sure you want to delete all users?
        </p>
        <div className="flex justify-around mt-4">
          <p
            className="px-4 cursor-pointer py-2 bg-red-100 text-white rounded-xl hover:scale-90"
            onClick={() => {
              deleteSelected(num);
            }}
          >
            Yes
          </p>
          <p
            className="px-4 py-2 cursor-pointer bg-neutral-1000 text-white rounded-xl hover:scale-90"
            onClick={() => {
              closeModal();
            }}
          >
            No
          </p>
        </div>
      </InnerWrapper>
    </Wrapper>
  );
}

export default DeleteAllModal;
