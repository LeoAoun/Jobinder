import "@styles/components/ServiceProfile/ServiceProfile.css";

import ServiceProfileMenu from "./menu/ServiceProfileMenu";
import ServiceProfileCard from "./ServiceProfileCard";

export default function ServiceProfile() {
  return (
    <div className="service-profile-container">
      <ServiceProfileMenu />
      <ServiceProfileCard />
    </div>
  );
}
