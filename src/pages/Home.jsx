import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Loader from '../components/Loader';
import Card from '../components/Card';

const Home = () => {
  const [upcomingHackathons, setUpcomingHackathons] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUpcomingHackathons = async () => {
      try {
        const response = await axios.get('http://localhost:3002/hackathons?page=1&limit=5');
        const allHackathons = response.data;
        const filteredHackathons = filterUpcomingHackathons(allHackathons);
        setUpcomingHackathons(filteredHackathons.slice(0, 3));
      } catch (error) {
        console.error('Error fetching upcoming hackathons:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUpcomingHackathons();
  }, []);

  const filterUpcomingHackathons = (hackathons) => {
    const now = new Date();
    return hackathons
      .filter((hackathon) => new Date(hackathon.startDate) > now)
      .sort((a, b) => new Date(a.startDate) - new Date(b.startDate));
  };

  return (
    <div className="container mt-5">
      <section className="jumbotron text-center">
        <h1 className="display-4">Bienvenue sur HackTrack</h1>
      </section>

      <section className="mt-5">
        <h2>Prochains Hackathons</h2>
        {loading ? (
          <Loader />
        ) : (
          <div className="row">
            {upcomingHackathons.map((hackathon) => (
              <div key={hackathon.id} className="col-md-4 mb-4">
                <Card title={hackathon.name}>
                  <p>{hackathon.description}</p>
                  <p><strong>Date de début :</strong> {new Date(hackathon.startDate).toLocaleString()}</p>
                  <Link to={`/hackathons/${hackathon.id}`} className="btn btn-secondary">Voir les détails</Link>
                </Card>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default Home;
