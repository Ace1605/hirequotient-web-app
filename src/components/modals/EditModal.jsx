import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { selectUser, userSaved } from "../../reduxUser/userSlice";
import { useDispatch, useSelector } from "react-redux";

const Wrapper = styled.div`
  position: relative;
  overflow-x: hidden;
  padding: 20px 20px 1rem;

  .inner-wrap {
    margin: 1rem;
  }
  .tag {
    display: block;
    margin: 1rem 0 0.5rem 0;
  }
  .spa {
    padding: 0.2rem 0.8rem 0.2rem 0.5rem;
    display: inline-block;
  }
  .selector {
    display: flex;
  }

  .selector input {
    cursor: pointer;
  }

  input[type="radio"] {
    display: grid;
    place-content: center;
    appearance: none;
    background-color: #fff;
    margin: 0;
    font: inherit;
    color: red;
    width: 1.5em;
    height: 1.5em;
    border: 0.15em solid red;
    cursor: pointer;
    border-radius: 50%;
    transform: translateY(-0.075em);
  }

  input[type="radio"]::before {
    content: "";
    width: 0.65em;
    height: 0.65em;
    border-radius: 50%;
    transform: scale(0);
    transition: 120ms transform ease-in-out;
    box-shadow: inset 1em 1em red;
    cursor: pointer;
  }

  input[type="radio"]:checked::before {
    transform: scale(1);
  }

  .ball {
    float: right;
    margin-top: -2rem;
    margin-right: 1rem;
    z-index: 100;
    position: relative;
    cursor: pointer;
  }

  .perks-container {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    max-width: -webkit-fill-available;

    .remove {
      cursor: pointer;
    }
  }

  .show-perks {
    margin: 0.5rem 1rem 0 0;
    padding: 0.5rem;
    border-radius: 3rem;
    display: flex;
    justify-content: space-around;

    p {
      display: block;
      margin: 0.2rem 0.5rem 0 0;
    }
    svg {
    }
  }
`;

const Input = styled.input`
  display: block;
  padding: 1rem 2rem;
  width: -webkit-fill-available;
  border-radius: 10px;
  border: 1px solid grey;
`;
const Field = styled.div`
  padding-bottom: 1rem;
`;

function EditModal({ closeModal, details, current, getChange }) {
  const [name, setName] = useState(current ? current.name : "");
  const [email, setEmail] = useState(current ? current.email : "");
  const [role, setRole] = useState(current ? current.role : "admin");
  const dispatch = useDispatch();

  const save = () => {
    let cUser = {
      name: name,
      email: email,
      role: role,
      id: current.id,
    };
    const result = details.map((item) =>
      item.id === cUser?.id ? cUser : item
    );

    dispatch(userSaved(result));
    closeModal();
    getChange(result);
  };

  return (
    <Wrapper>
      <div className="inner-wrap">
        <h2 className="text-2xl font-semibold text-black">Edit user info</h2>
        <p className="my-4 text-left text-black font-medium">
          Enter the fields to edit user info
        </p>
        <div className="selector">
          <input
            type="radio"
            id="admin"
            name="radio"
            value="admin"
            checked={role === "admin"}
            onChange={() => {
              setRole("admin");
            }}
          />
          <label className="spa" for="admin">
            Admin
          </label>

          <input
            type="radio"
            id="member"
            name="radio"
            value="member"
            checked={role === "member"}
            onChange={() => {
              setRole("member");
            }}
          />
          <label className="spa" for="member">
            Member
          </label>
        </div>
        <Field>
          <label className="tag">User name</label>
          <Input
            placeholder="Enter username"
            onChange={(e) => {
              if (e) {
                setName(e.target.value);
              }
            }}
            name="name"
            value={name}
          />

          <label className="tag">User email</label>
          <Input
            placeholder="Enter email address"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            name="perks"
            value={email}
          />
        </Field>
        <p
          className="cursor-pointer flex justify-center mt-4 px-8 py-2 rounded-xl bg-black text-white"
          onClick={() => {
            save();
          }}
        >
          Save changes
        </p>
      </div>
    </Wrapper>
  );
}

export default EditModal;
