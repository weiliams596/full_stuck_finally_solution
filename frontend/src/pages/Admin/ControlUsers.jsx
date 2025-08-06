import React, { useState, useEffect, useContext } from "react";
import AutoListShower from "../../Components/InformationList/AutoListShower";
import SetContext from "../../Components/Contexts/SetContexts/SetContext";
import AuthContext from "../../Components/Contexts/Auth/AuthContext";
import ErrorShower from "../../Components/Form/ErrorShower";

export default function ControlUsers() {
  const { axiosInstance, error, setError } = useContext(SetContext);
  const { auth } = useContext(AuthContext);

  const [users, setUsers] = useState([]);
  const [selected, setSelected] = useState([]);

  const fetchUsers = async () => {
    try {
      const res = await axiosInstance.get("/admin/deleted-users");
      if (res.status === 200) {
        setUsers(res.data);
      } else throw new Error("Қолданушыларды алу сәтсіз болды");
    } catch (e) {
      setError(e.message);
    }
  };

  const toggleSelect = (id) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const activateSelected = async () => {
    try {
      const res = await axiosInstance.post("/admin/activate-users", {
        ids: selected,
      });
      await fetchUsers();
      setSelected([]);
    } catch (e) {
      setError("Белсендіру қате болды");
    }
  };

  const activateAll = async () => {
    try {
      const allIds = users.map((u) => u.id);
      const res = await axiosInstance.post("/admin/activate-users", {
        ids: allIds,
      });
      await fetchUsers();
      setSelected([]);
    } catch (e) {
      setError("Барлығын белсендіру сәтсіз");
    }
  };

  const deleteSelected = async () => {
    try {
      for (const id of selected) {
        await axiosInstance.delete("/admin/delete-user", {
          data: { id },
        });
      }
      await fetchUsers();
      setSelected([]);
    } catch (e) {
      setError("Жою кезінде қате шықты");
    }
  };

  const userTemplate = {
    builder: (user, index) => (
      <div key={index} className="flex items-center gap-2 border-b p-2">
        <input
          type="checkbox"
          checked={selected.includes(user.id)}
          onChange={() => toggleSelect(user.id)}
        />
        <div className="flex-grow">
          <strong>{user.name}</strong> ({user.email})
        </div>
      </div>
    ),
    name: "Аты",
    email: "Пошта",
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-xl mb-4 font-semibold">Қолданушыны басқару</h2>

      <div className="flex gap-4 mb-4">
        <button onClick={activateSelected} className="btn-blue">
          Таңдалғандарды белсендіру
        </button>
        <button onClick={activateAll} className="btn-green">
          Барлығын белсендіру
        </button>
        <button onClick={deleteSelected} className="btn-red">
          Таңдалғандарды жою
        </button>
      </div>

      <AutoListShower
        template={userTemplate}
        listData={users}
        onError={(e) => setError(e.message)}
        onSuccess={() => {}}
      />

      {error && <ErrorShower timer={5000} className="text-red-500 mt-4" />}
    </div>
  );
}
