export const adsenseConfig = {
  publisherId: process.env.NEXT_PUBLIC_ADSENSE_ID || 'ca-pub-1648505168892187',
  enabled: process.env.NEXT_PUBLIC_ADSENSE_ENABLED === 'true',
  adSlots: {
    headerBanner: '1234567890',
    sidebarTop: '2345678901',
    sidebarMiddle: '3456789012',
    inArticle: '4567890123',
    inFeed: '5678901234',
    footer: '6789012345',
  },
  testMode: process.env.NODE_ENV === 'development',
};

export const shouldShowAds = (): boolean => adsenseConfig.enabled && !adsenseConfig.testMode;