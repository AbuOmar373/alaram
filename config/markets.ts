export type Market = {
  marketId: string;
  name: string;
  nameAR: string;
  nameEN: string;
  defaultCurrency: string;
  currencySymbol: string;
  vatRate: number;
  dateLocale: string;
  phoneFormat: string;
  paymentMethodsAvailable: string[];
  taxLabels: {
    vat: string;
    taxNumber: string;
  };
  eInvoicing: {
    zatca?: boolean;
    provider?: string;
    enabled: boolean;
  };
};

export const markets: Record<string, Market> = {
  KSA: {
    marketId: "KSA",
    name: "Saudi Arabia",
    nameAR: "المملكة العربية السعودية",
    nameEN: "Saudi Arabia",
    defaultCurrency: "SAR",
    currencySymbol: "ر.س",
    vatRate: 15,
    dateLocale: "ar-SA",
    phoneFormat: "+966",
    paymentMethodsAvailable: ["Mada", "Apple Pay", "STC Pay", "Credit Cards"],
    taxLabels: {
      vat: "VAT / ضريبة القيمة المضافة",
      taxNumber: "TRN / الرقم الضريبي",
    },
    eInvoicing: {
      zatca: true,
      provider: "ZATCA",
      enabled: true, // Placeholder - actual integration needed
    },
  },
  UAE: {
    marketId: "UAE",
    name: "United Arab Emirates",
    nameAR: "الإمارات العربية المتحدة",
    nameEN: "United Arab Emirates",
    defaultCurrency: "AED",
    currencySymbol: "د.إ",
    vatRate: 5,
    dateLocale: "ar-AE",
    phoneFormat: "+971",
    paymentMethodsAvailable: ["Apple Pay", "Credit Cards", "Digital Wallets"],
    taxLabels: {
      vat: "VAT / ضريبة القيمة المضافة",
      taxNumber: "TRN / رقم التسجيل الضريبي",
    },
    eInvoicing: {
      enabled: false, // Placeholder for future implementation
    },
  },
  KWT: {
    marketId: "KWT",
    name: "Kuwait",
    nameAR: "الكويت",
    nameEN: "Kuwait",
    defaultCurrency: "KWD",
    currencySymbol: "د.ك",
    vatRate: 0, // Kuwait doesn't have VAT yet
    dateLocale: "ar-KW",
    phoneFormat: "+965",
    paymentMethodsAvailable: ["K-Net", "Credit Cards", "Apple Pay"],
    taxLabels: {
      vat: "Tax / الضريبة",
      taxNumber: "Tax Number / الرقم الضريبي",
    },
    eInvoicing: {
      enabled: false,
    },
  },
};

export const getMarket = (marketId: string): Market => {
  return markets[marketId] || markets.KSA;
};

export const getDefaultMarket = (): Market => {
  const defaultMarketId = process.env.NEXT_PUBLIC_DEFAULT_MARKET || "KSA";
  return getMarket(defaultMarketId);
};

