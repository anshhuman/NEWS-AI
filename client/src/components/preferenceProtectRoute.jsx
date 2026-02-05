
import { Navigate, Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { getCookie } from '../utils/utils.js';


function PreferenceProtectRoute() {
  const [preferences, setPreferences] = useState(null);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    const fetchUserPreferences = async () => {
      try {
        const userId = getCookie("id"); // actual MongoDB id
        console.log(userId)

        const response = await axios.get(
          `http://localhost:3000/api/${userId}/preferences`
        );

        setPreferences(response.data.preferences);
      } catch (error) {
        console.log("Error fetching preferences:", error);
        setPreferences([]);
      } finally {
        setLoading(false);
      }
    };

    fetchUserPreferences();
  }, []);

  // ⏳ Jab tak API complete nahi hoti
  if (loading) {
    return null; // ya spinner
  }

  // 🔒 Agar preferences already exist karti hain
  if (preferences && preferences.length > 0) {
    return <Navigate to="/" replace />;
  }

  // ✅ Tabhi preferences page allow hoga
  return <Outlet />;
}

export default PreferenceProtectRoute;
