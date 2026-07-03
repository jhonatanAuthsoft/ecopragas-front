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
  window.setTimeout(() => URL.revokeObjectURL(objectUrl), 100);
}

const decodeBase64 = (base64: string): Uint8Array => {
  const binary = atob(base64);
  const bytes = new Uint8Array(binary.length);

  for (let index = 0; index < binary.length; index += 1) {
    bytes[index] = binary.charCodeAt(index);
  }

  return bytes;
};

const parseBase64Content = (content: string): { bytes: Uint8Array; mimeType?: string } => {
  if (!content.includes(",")) {
    return { bytes: decodeBase64(content) };
  }

  const [header, base64] = content.split(",");
  const mimeType = header.match(/:(.*?);/)?.[1];

  return {
    bytes: decodeBase64(base64 ?? content),
    mimeType,
  };
};

export const downloadFileFromBase64 = (
  content: string,
  fileName: string,
  mimeType = "application/octet-stream",
) => {
  const { bytes, mimeType: inferredMimeType } = parseBase64Content(content);
  downloadFile(new Blob([bytes as BlobPart], { type: inferredMimeType ?? mimeType }), fileName);
};
