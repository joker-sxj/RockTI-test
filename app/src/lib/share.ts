import { toPng } from "html-to-image";
import QRCode from "qrcode";

const SHARE_FILTER = (node: HTMLElement) => {
  // 排除带 data-no-export 的子节点（如下载按钮自身）
  return !node.dataset?.noExport;
};

export async function exportNodeToPng(
  node: HTMLElement,
  options: {
    pixelRatio?: number;
    backgroundColor?: string;
    fileName?: string;
  } = {},
): Promise<string> {
  const dataUrl = await toPng(node, {
    pixelRatio: options.pixelRatio ?? 2,
    backgroundColor: options.backgroundColor ?? "#FFF9EF",
    cacheBust: true,
    filter: SHARE_FILTER,
  });
  return dataUrl;
}

export function downloadDataUrl(dataUrl: string, fileName: string): void {
  const link = document.createElement("a");
  link.href = dataUrl;
  link.download = fileName;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

export async function generateQrCodeDataUrl(text: string, size = 240): Promise<string> {
  return await QRCode.toDataURL(text, {
    width: size,
    margin: 1,
    color: {
      dark: "#111111",
      light: "#FFF9EF",
    },
    errorCorrectionLevel: "M",
  });
}
