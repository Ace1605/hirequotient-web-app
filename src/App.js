import React, { useEffect, useMemo, useState } from "react";
import api from "./api/api";
import AppTable from "./components/table/AppTable";
import { ToastContainer } from "react-toast";
import { useDispatch, useSelector } from "react-redux";
import { selectUser, userSaved } from "./reduxUser/userSlice";

function App() {
  const [getting, setGetting] = useState(false);
  const [datum, setDatum] = useState([]);
  const dispatch = useDispatch();
  const [data, setData] = useState([]);

  let value = useSelector(userSaved);

  useEffect(() => {
    getList();
  }, []);

  const getList = async (e) => {
    setGetting(true);
    const res = await api.getAll("members.json");
    if (res) {
      setGetting(false);
      setDatum(res);
      dispatch(userSaved(res));
    } else {
      setGetting(false);
      setDatum([]);
      console.log("team err", res);
    }
  };

  useEffect(() => {
    setData(value.payload.mid.users.user.mid);
  }, [datum, value]);

  const getChange = (param) => {
    setData(param);
  };

  const tableData = useMemo(() => {
    if (data) {
      const result = data?.map((x) => ({
        id: x.id,
        name: x.name,
        email: x.email,
        role: x.role,
      }));
      return result;
    }
    return [];
  }, [data]);

  return (
    <div>
      <div className="">
        <h2 className="text-center text-3xl 880:text-4xl font-bold text-bold mt-20">
          Users
        </h2>
        <div className="mx-auto my-12 max-w-[1296px] min-w-[360px] px-4">
          <AppTable data={tableData} getChange={getChange} />
        </div>
      </div>
      <ToastContainer delay={3000} position="top-right" />
    </div>
  );
}

export default App;
