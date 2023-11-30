import TripSearch from "../app/components/TripSearch";
import QuickSearch from "../app/components/QuickSearch";
import RecomendTrips from "./components/RecomendTrips";

export default function Home() {
  return (
    <div>
      <TripSearch/>
      <QuickSearch/>
      <RecomendTrips/>
    </div>
  )
}
