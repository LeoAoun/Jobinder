import { UserDTO } from "../../../interfaces/User";

export default function CardInfo({ profile }: { profile: UserDTO }) {
  return (
    <>
      <span className="location">
        {profile.serviceProfile?.location.city}, {profile.serviceProfile?.location.state}
      </span>
      <img src={profile.serviceProfile?.serviceImg} />
      <div className="info">
        <h3>{profile.fullName}</h3>
        <div>
          <span>Especialidade:</span>
          <span>{profile.serviceProfile?.specialty}</span>
        </div>
        <div>
          <span>Disponibilidade:</span>
          <span>{profile.serviceProfile?.availability}</span>
        </div>
        <div>
          <span>Descrição:</span>
          <span>{profile.serviceProfile?.description}</span>
        </div>
      </div>
    </>
  );
}
