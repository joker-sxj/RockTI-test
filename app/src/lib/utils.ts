/** 拼接 className，自动去掉 falsy 值。 */
export function cx(...classes: Array<string | false | null | undefined>): string {
  return classes.filter(Boolean).join(" ");
}

/** Vite BASE_URL 已经是 "/<base>/" 形式（含尾斜杠），直接拼即可。 */
const BASE = import.meta.env.BASE_URL;

/** 安全 image 路径：URL-encode 文件名以兼容中文，并尊重 Vite base。 */
export function profileImageUrl(fileName: string): string {
  return `${BASE}images/profiles/${encodeURIComponent(fileName)}`;
}
