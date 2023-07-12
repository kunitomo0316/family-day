import { endPoint } from '../common/const/endPoint';

export const uploadImage = async (selectedFile: File) => {
  if (selectedFile) {
    try {
      const formData = new FormData();
      formData.append('image', selectedFile);

      const response = await fetch(`${endPoint.images}/upload`, {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        // ファイルのアップロード成功
        const data = await response.json();
        const fileName = data.fileName; // ファイル名を取得
        console.log('ファイル送信成功', fileName);
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
