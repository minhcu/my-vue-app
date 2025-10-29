import api from "@/shared/lib/axios.interceptor";
import { useEffect, useState } from "react";

export default function DashBoardPage() {
  const [sprints, setSprints] = useState<Array<any>>([]);

  useEffect(() => {
    api.get('/users')
      .then(response => {
        setSprints(response.data);
      })
      .catch(error => {
        console.error("Error fetching sprints:", error);
      });
  }, []);
  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        {sprints.map(sprint => (
          <div key={sprint.id} className="border-b py-4">
            <h3 className="text-lg font-semibold">{sprint.name}</h3>
            <p className="text-sm text-gray-500">{sprint.description}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
