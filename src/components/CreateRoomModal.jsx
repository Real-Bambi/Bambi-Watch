import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import useSWRMutation from 'swr/mutation';
import { apiClient } from '../../api/client';

function CreateRoomModal({ isOpen, onClose }) {
  const [roomName, setRoomName] = useState('');
  const [youtubeUrl, setYoutubeUrl] = useState('');
  const navigate = useNavigate();

  // This handles the API request using your axios client
  const createRoomRequest = async (url, { arg }) => {
    const token = localStorage.getItem('bambi_token');
    const response = await apiClient.post(url, arg, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  };

  const { trigger, isMutating } = useSWRMutation('/rooms', createRoomRequest);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await trigger({ roomName, youtubeUrl });
      if (data && data.roomId) {
        navigate(`/watchroom/${data.roomId}`);
      } else {
        navigate('/watchroom');
      }
      onClose();
    } catch (error) {
      console.error('Error creating room:', error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md shadow-lg relative">
        {isMutating && (
          <div className="absolute inset-0 bg-white bg-opacity-75 flex items-center justify-center z-10">
            <div className="w-10 h-10 border-4 border-purple-600 border-t-transparent rounded-full animate-spin"></div>
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4 relative z-20">
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
