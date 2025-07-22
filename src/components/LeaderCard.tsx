import React from 'react';

interface LeaderCardProps {
  name: string;
  skills: string;
  bio: string;
}

const LeaderCard: React.FC<LeaderCardProps> = ({ name, skills, bio }) => {
  return (
    <div className="p-4 bg-white shadow rounded-lg">
      <h2 className="text-xl font-bold">{name}</h2>
      <p className="text-sm">{skills}</p>
      <p className="text-gray-700">{bio}</p>
    </div>
  );
};

export default LeaderCard;