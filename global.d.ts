export {};

declare global {
  interface Window {
    TradingView: {
      widget: new (options: TradingViewWidgetOptions) => unknown;
    };
  }

  interface TradingViewWidgetOptions {
    symbol: string;
    interval: string;
    container_id: string;
    width?: string | number;
    height?: number;
    theme?: string;
    locale?: string;
    hide_top_toolbar?: boolean;
    hide_legend?: boolean;
    autosize?: boolean;
  }
}
