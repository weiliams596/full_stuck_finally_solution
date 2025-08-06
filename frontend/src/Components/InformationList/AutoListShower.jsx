import React, { useContext, useEffect, useState } from "react";
import SetContext from "../Contexts/SetContexts/SetContext";
import AuthContext from "../Contexts/Auth/AuthContext";
import ErrorShower from "../Form/ErrorShower";

/**
 * This component is used to show the list of data from the server.
 * @param {Object} props - props object
 * @param {String} props.className - style class name
 * @param {Object} props.template - template object is formated to show data
 * @param {Function(Object,Number)} props.template.builder - function to build the data(item,index)
 * @param {String} props.active - active url
 * @param {Array} props.listData - data array
 * @param {async Function} props.onError - async function to handle error(params: error)
 * @param {async Function} props.onSuccess - async function to handle success(params: data)
 * @returns {JSX.Element}
 */

export default function AutoListShower({
  className = "",
  template,
  active = null,
  listData = null,
  onError,
  onSuccess,
}) {
  const { axiosInstance, error, setError } = useContext(SetContext);
  const { auth } = useContext(AuthContext);
  const [data, setData] = useState([]);

  const fetchData = async () => {
    try {
      const response = await axiosInstance.get(active, {
        params: { id: auth.id },
      });
      if (response.status === 200 || response.status === 201) {
        setData(response.data);
      } else {
        throw new Error("AutoListShower : Шақыру қате");
      }
      await onSuccess?.(response.data);
    } catch (e) {
      const newError = await onError?.(e);
      console.log(newError);
      setError(newError);
    }
  };

  useEffect(() => {
    setData(listData);
    if (active) {
      fetchData();
    }
  }, [listData, active]);

  useEffect(() => {
    if (data && data.length > 0) {
      let index = 0;
      const temptShowDatas = [];
      data.map((item) => {
        const obj = {};
        if (typeof template.builder === "function") {
          for (const key in template) {
            if (key !== "builder") obj[key] = item[key] ?? template[key];
          }
          temptShowDatas.push(template.builder(obj, index));
          index++;
          return obj;
        }
      });
    }
  }, [data]);

  return (
    <div className={className ?? "flex flex-col mt-2 mb-2 h-full"}>
      {!error &&
        data?.map((item, index) => {
          const obj = { id: item.id };
          for (const key in template) {
            if (key !== "builder") obj[key] = item[key] ?? template[key];
          }
          return template.builder(obj, index);
        })}
      {error && <ErrorShower timer={5000} className="text-red-500" />}
    </div>
  );
}
