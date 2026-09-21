'use client';

import { useEffect } from 'react';
import { adsenseConfig, shouldShowAds } from '@/config/adsense';

interface AdSenseProps {
  adSlot: string;
  adFormat?: string;
  adLayout?: string;
  adStyle?: React.CSSProperties;
  className?: string;
  fullWidthResponsive?: boolean;
}

/**
 * Google AdSense Component
 * 
 * Usage:
 * <AdSense adSlot="1234567890" />
 * 
 * With custom styling:
 * <AdSense 
 *   adSlot="1234567890" 
 *   adFormat="auto"
 *   className="my-4"
 *   adStyle={{ display: 'block' }}
 * />
 */
export default function AdSense({
  adSlot,
  adFormat = 'auto',
  adLayout,
  adStyle = { display: 'block' },
  className = '',
  fullWidthResponsive = true,
}: AdSenseProps) {
  useEffect(() => {
    if (shouldShowAds()) {
      try {
        // @ts-expect-error - AdSense global variable
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      } catch (err) {
        // Silent error handling
      }
    }
  }, []);

  // Don't render ads if disabled or in test mode
  if (!shouldShowAds()) {
    return (
      <div className={`bg-gray-100 border-2 border-dashed border-gray-300 rounded-lg p-8 text-center ${className}`}>
        <p className="text-gray-500 text-sm">
          Ad Placeholder ({adSlot})
        </p>
        <p className="text-xs text-gray-400 mt-2">
          Enable AdSense in production to show ads
        </p>
      </div>
    );
  }

  return (
    <div className={className}>
      <ins
        className="adsbygoogle"
        style={adStyle}
        data-ad-client={adsenseConfig.publisherId}
        data-ad-slot={adSlot}
        data-ad-format={adFormat}
        data-ad-layout={adLayout}
        data-full-width-responsive={fullWidthResponsive ? 'true' : 'false'}
      />
    </div>
  );
}

/**
 * Header Banner Ad (728x90 or responsive)
 * Best for desktop, top of page
 */
export function HeaderBannerAd({ className }: { className?: string }) {
  return (
    <AdSense
      adSlot={adsenseConfig.adSlots.headerBanner}
      adFormat="horizontal"
      className={className}
      adStyle={{ display: 'block', textAlign: 'center' }}
    />
  );
}

/**
 * Sidebar Ad (300x250 or 336x280)
 * Best for desktop sidebars
 */
export function SidebarAd({ className }: { className?: string }) {
  return (
    <AdSense
      adSlot={adsenseConfig.adSlots.sidebarTop}
      adFormat="rectangle"
      className={className}
      adStyle={{ display: 'block' }}
    />
  );
}

/**
 * In-Article Ad
 * Best performance - place within content
 */
export function InArticleAd({ className }: { className?: string }) {
  return (
    <AdSense
      adSlot={adsenseConfig.adSlots.inArticle}
      adFormat="fluid"
      adLayout="in-article"
      className={className}
      adStyle={{ display: 'block', textAlign: 'center' }}
    />
  );
}

/**
 * In-Feed Ad
 * Best for blog/article listings
 */
export function InFeedAd({ className }: { className?: string }) {
  return (
    <AdSense
      adSlot={adsenseConfig.adSlots.inFeed}
      adFormat="fluid"
      adLayout="in-feed"
      className={className}
      adStyle={{ display: 'block' }}
    />
  );
}

/**
 * Auto Ads Component
 * Automatically places ads on your page
 * Only add once per page
 */
export function AutoAds() {
  useEffect(() => {
    if (shouldShowAds()) {
      try {
        // @ts-expect-error - AdSense global variable
        (window.adsbygoogle = window.adsbygoogle || []).push({
          google_ad_client: adsenseConfig.publisherId,
          enable_page_level_ads: true,
        });
      } catch (err) {
        // Silent error handling
      }
    }
  }, []);

  return null;
}
