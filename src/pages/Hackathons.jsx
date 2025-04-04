import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Loader from '../components/Loader';
import Card from '../components/Card';
import Button from '../components/Button';

const Hackathons = () => {
  const [hackathons, setHackathons] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState('upcoming');

  useEffect(() => {
    const fetchHackathons = async () => {
      try {
        const response = await axios.get(`http://localhost:3002/hackathons?page=${page}&limit=4`);
        setHackathons(response.data);
      } catch (error) {
        console.error('Error fetching hackathons:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchHackathons();
  }, [page, category]);

  const filterHackathons = (hackathons) => {
    const now = new Date();
    return hackathons.filter((hackathon) => {
      const startDate = new Date(hackathon.startDate);
      const endDate = new Date(hackathon.endDate);
      if (category === 'upcoming') {
        return startDate > now;
      } else if (category === 'ongoing') {
        return startDate <= now && endDate >= now;
      } else if (category === 'past') {
        return endDate < now;
      }
      return false;
    });
  };

  const filteredHackathons = filterHackathons(hackathons);

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="container mt-5">
      <h2>Hackathons</h2>
      <ul className="nav nav-tabs mb-3">
        <li className="nav-item">
          <button
            className={`nav-link ${category === 'upcoming' ? 'active' : ''}`}
            onClick={() => setCategory('upcoming')}
          >
            À venir
          </button>
        </li>
        <li className="nav-item">
          <button
            className={`nav-link ${category === 'ongoing' ? 'active' : ''}`}
            onClick={() => setCategory('ongoing')}
          >
            En cours
          </button>
        </li>
        <li className="nav-item">
          <button
            className={`nav-link ${category === 'past' ? 'active' : ''}`}
            onClick={() => setCategory('past')}
          >
            Passés
          </button>
        </li>
      </ul>
      <div className="row justify-content-center">
        {filteredHackathons.map((hackathon) => (
          <div key={hackathon.id} className="col-md-4 mb-4 d-flex">
            <Card title={hackathon.name} className="w-100">
              <p>{hackathon.description}</p>
              <p><strong>Date de début :</strong> {new Date(hackathon.startDate).toLocaleString()}</p>
              <p><strong>Date de fin :</strong> {new Date(hackathon.endDate).toLocaleString()}</p>
              <Link to={`/hackathons/${hackathon.id}`}>
                <Button className="btn-secondary">Voir les détails</Button>
              </Link>
            </Card>
          </div>
        ))}
      </div>
      <div className="mt-3 d-flex justify-content-center">
        <Button className="btn-secondary me-2" onClick={() => setPage((prev) => Math.max(prev - 1, 1))} disabled={page === 1}>
          Précédent
        </Button>
        <Button className="btn-primary" onClick={() => setPage((prev) => prev + 1)}>
          Suivant
        </Button>
      </div>
    </div>
  );
};

export default Hackathons;
