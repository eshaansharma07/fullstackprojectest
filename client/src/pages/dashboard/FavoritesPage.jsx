import { useEffect, useState } from "react";
import api from "../../api/http.js";
import { EventCard } from "../../components/common/EventCard.jsx";
import { Loader } from "../../components/ui/Loader.jsx";

export default function FavoritesPage() {
  const [favorites, setFavorites] = useState(null);

  useEffect(() => {
    api.get("/users/favorites").then((response) => setFavorites(response.data.data));
  }, []);

  if (!favorites) return <Loader label="Loading favorites..." />;

  return (
    <div className="space-y-6">
      <h1 className="font-display text-4xl font-semibold text-white dark:text-white">Favorites</h1>
      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {favorites.map((event) => <EventCard key={event._id} event={event} />)}
      </div>
    </div>
  );
}
