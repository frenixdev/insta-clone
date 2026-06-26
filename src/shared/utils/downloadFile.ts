export const downloadFile = async (url: string, fileName: string) => {
  const response = await fetch(url);
  const blob = await response.blob();

  const objectUrl = URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = objectUrl;
  a.download = fileName;
  a.click();

  URL.revokeObjectURL(objectUrl);
};
