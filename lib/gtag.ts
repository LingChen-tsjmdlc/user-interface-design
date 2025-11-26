declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
  }
}

export const GA_ID = "G-MK81GG1ZEX";

export const pageview = (url: string) => {
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("config", GA_ID, {
      page_path: url,
    });
  }
};
