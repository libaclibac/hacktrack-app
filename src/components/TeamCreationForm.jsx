import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import Button from './Button';

const schema = z.object({
  name: z.string().min(1, 'Team name is required'),
});

const TeamCreationForm = ({ hackathonId }) => {
  const { register, handleSubmit } = useForm({
    resolver: zodResolver(schema),
  });
  const { user } = useAuth();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      await axios.post(
        'http://localhost:3002/teams/create',
        { name: data.name, hackathonId: parseInt(hackathonId) },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        }
      );
      alert('Team created successfully!');
      navigate(`/hackathons/${hackathonId}`);
    } catch (error) {
      console.error('Team creation failed:', error);
      if (error.response) {
        console.error('Error response:', error.response.data);
      }
      alert('Failed to create team. Please check the form and try again.');
    }
  };

  if (!user) {
    return <div>Please log in to create a team.</div>;
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="mt-4">
      <h3>Create a Team</h3>
      <div className="form-group">
        <input type="text" className="form-control" placeholder="Team Name" {...register('name')} required />
      </div>
      <Button type="submit" className="btn-success mt-3">
        Create Team
      </Button>
    </form>
  );
};

export default TeamCreationForm;
