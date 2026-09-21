'use client';

interface ShareButtonsProps {
  title: string;
  url: string;
}

export default function ShareButtons({ title, url }: ShareButtonsProps) {
  const handleWhatsAppShare = () => {
    const shareUrl = `https://wa.me/?text=${encodeURIComponent(title + ' - ' + url)}`;
    window.open(shareUrl, '_blank');
  };

  const handleFacebookShare = () => {
    const shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
    window.open(shareUrl, '_blank', 'width=600,height=400');
  };

  const handleTwitterShare = () => {
    const shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`;
    window.open(shareUrl, '_blank', 'width=600,height=400');
  };

  return (
    <div className="mt-8 pt-6 border-t">
      <h3 className="text-lg font-semibold mb-3">Share this article:</h3>
      <div className="flex gap-3">
        <button 
          onClick={handleFacebookShare}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          Share on Facebook
        </button>
        <button 
          onClick={handleTwitterShare}
          className="px-4 py-2 bg-sky-500 text-white rounded-lg hover:bg-sky-600 transition-colors"
        >
          Share on Twitter
        </button>
        <button 
          onClick={handleWhatsAppShare}
          className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
        >
          Share on WhatsApp
        </button>
      </div>
    </div>
  );
}
