export interface IAsset {
  id: string;
  name: boolean;
  symbol: boolean;
  metrics: {
    market_data: {
      price_usd: number;
    };
  };
}

export interface IExchangeAsset {
  asset_id: string;
  name: string;
  price_usd: number;
  type_is_crypto: 1 | 0;
}
