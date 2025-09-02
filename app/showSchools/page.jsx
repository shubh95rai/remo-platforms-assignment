import { getSchoolsAction } from "@/actions/actions.js";

export default async function ShowSchools() {
  const schools = await getSchoolsAction();

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6 text-center">Schools</h1>

      {schools && schools.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {schools.map((school) => (
            <div key={school.id} className="border rounded-lg shadow p-4">
              <img
                src={school.image}
                alt={school.name}
                className="w-full h-40 object-cover rounded mb-3"
              />
              <h2 className="font-semibold text-lg">{school.name}</h2>
              <p className="text-sm text-gray-600">
                {school.address}, {school.city}
              </p>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center">
          <h1 className="text-xl text-gray-400 font-bold">No Schools Found</h1>
        </div>
      )}
    </div>
  );
}
