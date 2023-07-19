// 画像アップロード処理

import { BACKEND_URL } from '../Common/Constants/backendUrl';

// 補足：保存した際のファイル名かnullを返してます
export const uploadImage = async (imageFile: File) => {
  if (imageFile) {
    try {
      const formData = new FormData();
      formData.append('image', imageFile);

      const response = await fetch(`${BACKEND_URL.UPLOAD_IMAGE}`, {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        // ファイルのアップロード成功
        const data = await response.json();
        const fileName = data.fileName; // ファイル名を取得
        console.log('ファイル送信成功', fileName);
        // ファイル名を返却
        return fileName;
      } else {
        // エラーハンドリング
      }
    } catch (error) {
      // エラーハンドリング
      console.log('error:', error);
    }
  }
  return null;
};
