const API_URL = process.env.NEXT_PUBLIC_SERVER_URL?.replace('/graphql', '');

interface AddImageResponse {
  imageUrl: string;
  allImages: string[];
}

interface UpdateImagesResponse {
  success: boolean;
  images: string[];
}

interface RemoveImageResponse {
  success: boolean;
  images: string[];
}

export async function addImageToPost(
  postId: string,
  file: File,
): Promise<AddImageResponse> {
  const formData = new FormData();
  formData.append('file', file);

  const response = await fetch(`${API_URL}/posts/${postId}/images`, {
    method: 'POST',
    body: formData,
    credentials: 'include',
  });

  if (!response.ok) {
    const error = await response
      .json()
      .catch(() => ({ message: 'Unknown error' }));
    throw new Error(error.message || 'Failed to upload image');
  }

  return response.json();
}

export async function updatePostImages(
  postId: string,
  files: File[],
): Promise<UpdateImagesResponse> {
  const formData = new FormData();
  files.forEach((file) => {
    formData.append('files', file);
  });

  const response = await fetch(`${API_URL}/posts/${postId}/images`, {
    method: 'PUT',
    body: formData,
    credentials: 'include',
  });

  if (!response.ok) {
    const error = await response
      .json()
      .catch(() => ({ message: 'Unknown error' }));
    throw new Error(error.message || 'Failed to update images');
  }

  return response.json();
}

export async function removeImageFromPost(
  postId: string,
  imageUrl: string,
): Promise<RemoveImageResponse> {
  const response = await fetch(
    `${API_URL}/posts/${postId}/images?imageUrl=${encodeURIComponent(imageUrl)}`,
    {
      method: 'DELETE',
      credentials: 'include',
    },
  );

  if (!response.ok) {
    const error = await response
      .json()
      .catch(() => ({ message: 'Unknown error' }));
    throw new Error(error.message || 'Failed to remove image');
  }

  return response.json();
}
