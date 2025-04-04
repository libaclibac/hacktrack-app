import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Loader from '../components/Loader';
import Card from '../components/Card';
import TeamCreationForm from '../components/TeamCreationForm';
import TeamJoinForm from '../components/TeamJoinForm';
import Button from '../components/Button';

const HackathonDetails = () => {
  const { id } = useParams();
  const [hackathon, setHackathon] = useState(null);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    const fetchHackathonDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:3002/hackathons/${id}`);
        setHackathon(response.data);
      } catch (error) {
        console.error('Failed to fetch hackathon details:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchHackathonDetails();
  }, [id]);

  if (loading) {
    return <Loader />;
  }

  if (!hackathon) {
    return <div>Hackathon not found.</div>;
  }

  const isHackathonOver = new Date(hackathon.endDate) < new Date();

  const handleNotAuthenticated = () => {
    alert('Veuillez vous connecter ou vous inscrire pour effectuer cette action.');
  };

  return (
    <div className="container mt-5">
      <Card title={hackathon.name}>
        <p>{hackathon.description}</p>
        <p><strong>Date de début :</strong> {new Date(hackathon.startDate).toLocaleString()}</p>
        <p><strong>Date de fin :</strong> {new Date(hackathon.endDate).toLocaleString()}</p>
        <p><strong>Thème :</strong> {hackathon.theme}</p>
        <h3 className="mt-4">Équipes inscrites</h3>
        <ul className="list-group">
          {hackathon.teams.map((team) => (
            <li key={team.id} className="list-group-item">
              {team.name} - {team.users.map((user) => user.name).join(', ')}
            </li>
          ))}
        </ul>
        {!isHackathonOver ? (
          user ? (
            <>
              <TeamCreationForm hackathonId={id} />
              <TeamJoinForm hackathonId={id} />
            </>
          ) : (
            <>
              <Button className="btn-success mt-3" onClick={handleNotAuthenticated}>
                Créer une équipe
              </Button>
              <Button className="btn-primary mt-3 ml-2" onClick={handleNotAuthenticated}>
                Rejoindre une équipe
              </Button>
            </>
          )
        ) : null}
      </Card>
    </div>
  );
};

export default HackathonDetails;
