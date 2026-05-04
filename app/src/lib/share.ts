import { toPng } from "html-to-image";
import QRCode from "qrcode";

const SHARE_FILTER = (node: HTMLElement) => {
  // 排除带 data-no-export 的子节点（如下载按钮自身）
  return !node.dataset?.noExport;
};

/** 等待节点内所有 <img> 真正加载完成（含 decoded），最长 4s 兜底。 */
async function waitForImagesReady(node: HTMLElement, timeoutMs = 4000): Promise<void> {
  const imgs = Array.from(node.querySelectorAll("img"));
  if (imgs.length === 0) return;

  const perImage = imgs.map(async (img) => {
    if (img.complete && img.naturalWidth > 0) {
      // 已加载完，再走一次 decode 确保浏览器把像素准备好
      try {
        if (img.decode) await img.decode();
      } catch {
        /* decode 失败不阻塞 */
      }
      return;
    }
    await new Promise<void>((resolve) => {
      const done = () => resolve();
      img.addEventListener("load", done, { once: true });
      img.addEventListener("error", done, { once: true });
    });
    try {
      if (img.decode) await img.decode();
    } catch {
      /* ignore */
    }
  });

  await Promise.race([
    Promise.all(perImage),
    new Promise<void>((resolve) => setTimeout(resolve, timeoutMs)),
  ]);
}

export async function exportNodeToPng(
  node: HTMLElement,
  options: {
    pixelRatio?: number;
    backgroundColor?: string;
  } = {},
): Promise<string> {
  await waitForImagesReady(node);
  // 给浏览器一帧把布局/字体 layout 完全应用
  await new Promise<void>((r) => requestAnimationFrame(() => r()));

  const dataUrl = await toPng(node, {
    pixelRatio: options.pixelRatio ?? 1,
    backgroundColor: options.backgroundColor ?? "#FFF9EF",
    cacheBust: false,
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
