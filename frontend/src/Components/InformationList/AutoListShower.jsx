import React, { useContext, useEffect, useState } from "react";
import SetContext from "../Contexts/SetContexts/SetContext";
import AuthContext from "../Contexts/Auth/AuthContext";

/**
 * This component is used to show the list of data from the server.
 * @param {Object} props - props object
 * @param {String} props.className - style class name
 * @param {Object} props.template - template object is formated to show data
 * @param {Function(Object,Number)} props.template.builder - function to build the data(item,index)
 * @param {String} props.active - active url
 * @param {Array} props.listData - data array
 * @returns {JSX.Element}
 */

export default function AutoListShower({
  className = "",
  template = null,
  active = null,
  listData = null,
}) {
  const [error, setError] = useState(null);
  const { axiosInstance } = useContext(SetContext);
  const { auth } = useContext(AuthContext);
  const [data, setData] = useState([]);
  const [showData, setShowData] = useState([]);

  const fetchData = async () => {
    try {
      const response = await axiosInstance.get(active, { id: auth.id });
      if (response.status === 200 || response.status === 201) {
        setData(response.data);
      } else {
        throw new Error("AutoListShower : Шақыру қате");
      }
    } catch (e) {
      console.log(e);
      setError(e);
    }
  };

  useEffect(() => {
    setData(listData);
    if (active) {
      fetchData();
    }
    if (data && data.length > 0) {
      let index = 0;
      const showDatas = [];
      data.map((item) => {
        const obj = {};
        if (template) {
          for (const key in template) {
            obj[key] = data[key] ?? template[key];
          }
          showDatas.push(template.builder(obj,index));
          index++;
          return obj;
        }
      });
      setShowData(showDatas);
    }
  }, []);
  return <div className={className ?? "flex flex-col mt-2 mb-2 h-full w-full"}>
    {showData}
  </div>;
}
