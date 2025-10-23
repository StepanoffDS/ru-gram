import { API_URL } from '../constants/api.constants';

interface UpdateAvatarResponse {
  success: boolean;
  avatar: string;
}

interface RemoveAvatarResponse {
  success: boolean;
  message: string;
}

export async function updateAvatar(file: File): Promise<UpdateAvatarResponse> {
  const formData = new FormData();
  formData.append('avatar', file);

  const response = await fetch(`${API_URL}/profile-avatar`, {
    method: 'POST',
    body: formData,
    credentials: 'include',
  });

  if (!response.ok) {
    const error = await response
      .json()
      .catch(() => ({ message: 'Unknown error' }));
    throw new Error(error.message || 'Failed to upload avatar');
  }

  return response.json();
}

export async function removeAvatar(): Promise<RemoveAvatarResponse> {
  const response = await fetch(`${API_URL}/profile-avatar`, {
    method: 'DELETE',
    credentials: 'include',
  });

  if (!response.ok) {
    const error = await response
      .json()
      .catch(() => ({ message: 'Unknown error' }));
    throw new Error(error.message || 'Failed to remove avatar');
  }

  return response.json();
}
