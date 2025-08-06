import React, { useContext, useEffect, useMemo, useState } from "react";
import AutoListShower from "../../Components/InformationList/AutoListShower";
import SetContext from "../../Components/Contexts/SetContexts/SetContext";
import AuthContext from "../../Components/Contexts/Auth/AuthContext";
import AddHospital from "../../Components/AnimationDom/AddHospital";
import ErrorShower from "../../Components/Form/ErrorShower";

export default function ControlHospital() {
  const { axiosInstance, setError, error } = useContext(SetContext);
  const { auth } = useContext(AuthContext);

  const [hospitals, setHospitals] = useState([]);
  const [selectedIds, setSelectedIds] = useState([]);
  const [success, setSuccess] = useState(null);

  const fetchHospitals = async () => {
    try {
      const res = await axiosInstance.get("/admin/hospitals", {
        params: { id: auth.id },
      });
      setHospitals(res.data.hospitals);
    } catch (e) {
      setError("Ауруханаларды жүктеу қате");
    }
  };

  const handleCheckbox = (id) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const handleDeleteSelected = async () => {
    try {
      const res = await axiosInstance.delete("/admin/delete-hospitals", {
        data: { id: auth.id, hospital_ids: selectedIds },
      });
      setSuccess("Өшірілді: " + res.data.count);
      await fetchHospitals();
      setHospitals([]);
    } catch (e) {
      setError("Өшіру кезінде қате");
    }
  };

  const template = {
    name: "Атауы",
    code: "Коды",
    address: "Мекенжайы",
    city: "Қаласы",
    description: "Сипаттама",
    builder: (item, index) => (
      <div
        key={index}
        className="flex items-center gap-4 border-b py-2"
        onClick={() => handleCheckbox(item.id)}>
        <input
          type="checkbox"
          checked={selectedIds.includes(item.id)}
          onChange={() => handleCheckbox(item.id)}
        />
        <div className="flex flex-col">
          <span className="font-bold">{item.name}</span>
          <span className="text-sm text-gray-600">
            {item.city} — {item.code}
          </span>
        </div>
      </div>
    ),
  };

  useEffect(() => {
    fetchHospitals();
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Ауруханаларды басқару</h2>

      {error && <ErrorShower timer={5000} className="text-red-500 mb-2" />}
      {success && <div className="text-green-500 mb-2">{success}</div>}

      {hospitals && (
        <AutoListShower
          className="mb-4"
          template={template}
          listData={hospitals}
          onError={(e) => setError(e.message)}
          onSuccess={() => {}}
        />
      )}
      <div className="flex justify-around items-center gap-4 mb-4">
        <button
          onClick={async () => await fetchHospitals()}
          className="bg-primary-blue text-white px-4 py-2 rounded mb-4">
          Жаңарту
        </button>

        <button
          onClick={handleDeleteSelected}
          disabled={selectedIds.length === 0}
          className="bg-red-500 text-white px-4 py-2 rounded mb-4">
          Таңдалғандарды өшіру
        </button>
      </div>
      <div className="border-t pt-4">
        <h3 className="text-lg font-semibold mb-2">Аурухана қосу</h3>
        <AddHospital
          haveTitle={false}
          onSuccess={async (data) => await fetchHospitals()}
          onError={(e) => setError(e.message)}
        />
      </div>
    </div>
  );
}
