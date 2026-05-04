/** 拼接 className，自动去掉 falsy 值。 */
export function cx(...classes: Array<string | false | null | undefined>): string {
  return classes.filter(Boolean).join(" ");
}

/** 安全 image 路径：URL-encode 文件名以兼容中文。 */
export function profileImageUrl(fileName: string): string {
  return `/images/profiles/${encodeURIComponent(fileName)}`;
}

export function logoImageUrl(): string {
  return "/images/Rockti.png";
}
