export function triggerDownload(href: string, fileName: string) {
  const link = document.createElement("a");
  link.href = href;
  link.download = fileName;
  link.target = "_blank";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

export function downloadFile(file: Blob | File, fileName: string) {
  const objectUrl = URL.createObjectURL(file);
  triggerDownload(objectUrl, fileName);
  URL.revokeObjectURL(objectUrl);
}
