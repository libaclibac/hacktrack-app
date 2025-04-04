import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import Button from './Button';

const TeamJoinForm = ({ hackathonId }) => {
  const [teams, setTeams] = useState([]);
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTeams = async () => {
      try {
        const response = await axios.get(`http://localhost:3002/hackathons/${hackathonId}`);
        setTeams(response.data.teams);
      } catch (error) {
        console.error('Failed to fetch teams:', error);
      }
    };

    fetchTeams();
  }, [hackathonId]);

  const joinTeam = async (teamId) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No token found');
      }

      await axios.post(
        `http://localhost:3002/teams/join/${teamId}`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      alert('Joined team successfully!');
      navigate(`../hackathons/${hackathonId}`);
    } catch (error) {
      console.error('Failed to join team:', error);
      if (error.response) {
        console.error('Error response:', error.response.data);
      }
      alert('Failed to join team. Please try again.');
    }
  };

  if (!user) {
    return <div>Please log in to join a team.</div>;
  }

  return (
    <div className="mt-4">
      <h3>Join a Team</h3>
      <ul className="list-group">
        {teams.map((team) => (
          <li key={team.id} className="list-group-item d-flex justify-content-between align-items-center">
            {team.name} - {team.users.map((user) => user.name).join(', ')}
            <Button className="btn btn-primary" onClick={() => joinTeam(team.id)}>Join</Button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TeamJoinForm;
