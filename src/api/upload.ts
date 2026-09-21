import axiosInstance from '../axiosInstance';

interface UploadResponse {
  success: boolean;
  url: string;
  message: string;
}

/**
 * Envoie un fichier vers le stockage MinIO public via l'API
 * @param file Le fichier physique sélectionné
 */
export const uploadClientMedia = async (file: File): Promise<UploadResponse> => {
  const formData = new FormData();
  formData.append('file', file);

  const response = await axiosInstance.post<UploadResponse>(
    '/uploads/client',
    formData,
    {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    },
  );
  return response.data;
};
