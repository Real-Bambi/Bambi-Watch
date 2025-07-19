import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import useSWRMutation from 'swr/mutation';

function CreateRoomModal({ isOpen, onClose }) {
  const [roomName, setRoomName] = useState('');
  const [youtubeUrl, setYoutubeUrl] = useState('');
  const navigate = useNavigate();

  const createRoomRequest = async (url, { arg }) => {
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(arg),
    });
    if (!response.ok) {
      throw new Error('Failed to create room');
    }
    return response.json();
  };

  const { trigger, isMutating } = useSWRMutation(
    'https://bambi-watch-api.onrender.com/api/v1/rooms',
    createRoomRequest
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await trigger({ roomName, youtubeUrl });
      console.log(data);
      if (data && data.roomId) {
        navigate(`/watchroom/${data.roomId}`);
      } else {
        navigate('/watchroom');
      }
      onClose();
    } catch (error) {
      console.error(error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md shadow-lg">
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="text"
            value={roomName}
            onChange={(e) => setRoomName(e.target.value)}
            placeholder="Enter the name of your room"
            className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            required
          />
          <input
            type="url"
            value={youtubeUrl}
            onChange={(e) => setYoutubeUrl(e.target.value)}
            placeholder="Enter YouTube URL"
            className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            required
          />
          <button
            type="submit"
            className="bg-purple-600 text-white py-3 rounded-lg hover:bg-purple-700 transition"
            disabled={isMutating}
          >
            {isMutating ? 'Creating...' : 'Create Room'}
          </button>
          <button
            type="button"
            onClick={onClose}
            className="text-gray-600 hover:text-gray-800 text-sm mt-2"
          >
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
}

export default CreateRoomModal;
