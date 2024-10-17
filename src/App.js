import { useState } from "react";

function App() {
  return <GenerateList />;
}

const GenerateList = () => {
  const [activities, setActivities] = useState([]);

  const getData = async () => {
    try {
      const response = await fetch("https://bored.api.lewagon.com/api/activity/");
      const data = await response.json();
      setActivities((prev) => [...prev, data]);
    } catch (e) {
      console.error("API çağrısı başarısız oldu:", e.message);
    }
  };

  return (
    <div>
      <h1>Aktivite Listesi</h1>
      <button onClick={getData}>Yeni Aktivite Getir</button>
      {activities.map((activity, index) => (
        <ExpandableListItem key={index} item={activity} />
      ))}
    </div>
  );
};

const ExpandableListItem = ({ item }) => {
  const [details, setDetails] = useState(false);

  return (
    <div style={{ margin: "10px 0", border: "1px solid #ccc", padding: "10px" }}>
      <p><strong>Aktivite:</strong> {item.activity}</p>
      <button onClick={() => setDetails(!details)}>
        {details ? "Detayları Gizle" : "Detayları Göster"}
      </button>
      {details && (
        <div>
          <p><strong>Tür:</strong> {item.type}</p>
          <p><strong>Katılımcılar:</strong> {item.participants}</p>
          <p><strong>Fiyat:</strong> {item.price}</p>
          <p><strong>Erişilebilirlik:</strong> {item.accessibility}</p>
        </div>
      )}
    </div>
  );
};

export default App;
