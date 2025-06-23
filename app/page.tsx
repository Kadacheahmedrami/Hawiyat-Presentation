import { useState, useEffect } from 'react';
import { Maximize2, Minimize2, RefreshCw, ExternalLink, AlertCircle } from 'lucide-react';

export default function Home() {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [key, setKey] = useState(0);

  const figmaUrl = "https://embed.figma.com/proto/KSyUoxacOyg1XVqR0yO9lp/Hawiyat?node-id=459-665&p=f&scaling=min-zoom&content-scaling=fixed&page-id=459%3A664&embed-host=share";
  const directUrl = "https://www.figma.com/proto/KSyUoxacOyg1XVqR0yO9lp/Hawiyat?node-id=459-665&p=f&scaling=min-zoom&content-scaling=fixed&page-id=459%3A664";

  useEffect(() => {
    const timer = setTimeout(() => {
      if (isLoading) {
        setHasError(true);
        setIsLoading(false);
      }
    }, 10000);

    return () => clearTimeout(timer);
  }, [isLoading, key]);

  const handleLoad = () => {
    setIsLoading(false);
    setHasError(false);
  };

  const handleError = () => {
    setIsLoading(false);
    setHasError(true);
  };

  const handleRefresh = () => {
    setIsLoading(true);
    setHasError(false);
    setKey(prev => prev + 1);
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  if (hasError) {
    return (
      <div className="h-screen w-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center p-8">
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 max-w-md w-full text-center border border-gray-200 dark:border-gray-700">
          <div className="mb-6">
            <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              Unable to Load Prototype
            </h2>
            <p className="text-gray-600 dark:text-gray-300">
              The Figma prototype couldn't be loaded. This might be due to network issues or access restrictions.
            </p>
          </div>
          
          <div className="space-y-3">
            <button
              onClick={handleRefresh}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2"
            >
              <RefreshCw className="w-4 h-4" />
              Try Again
            </button>
            
            <a
              href={directUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-900 dark:text-white font-medium py-3 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2 no-underline"
            >
              <ExternalLink className="w-4 h-4" />
              Open in Figma
            </a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen w-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 relative overflow-hidden">
      {/* Loading Overlay */}
      {isLoading && (
        <div className="absolute inset-0 bg-white dark:bg-gray-900 flex items-center justify-center z-10">
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4"></div>
            <p className="text-gray-600 dark:text-gray-300 font-medium">Loading Hawiyat Prototype...</p>
          </div>
        </div>
      )}

      {/* Control Bar */}
      <div className="absolute top-4 right-4 z-20 flex gap-2">
        <button
          onClick={handleRefresh}
          className="bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 p-2 rounded-lg shadow-lg border border-gray-200 dark:border-gray-600 transition-all duration-200 group"
          title="Refresh"
        >
          <RefreshCw className="w-4 h-4 text-gray-700 dark:text-gray-300 group-hover:rotate-180 transition-transform duration-500" />
        </button>
        
        <button
          onClick={toggleFullscreen}
          className="bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 p-2 rounded-lg shadow-lg border border-gray-200 dark:border-gray-600 transition-all duration-200"
          title={isFullscreen ? "Exit Fullscreen" : "Enter Fullscreen"}
        >
          {isFullscreen ? (
            <Minimize2 className="w-4 h-4 text-gray-700 dark:text-gray-300" />
          ) : (
            <Maximize2 className="w-4 h-4 text-gray-700 dark:text-gray-300" />
          )}
        </button>
        
        <a
          href={directUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-blue-600 hover:bg-blue-700 p-2 rounded-lg shadow-lg transition-all duration-200 group"
          title="Open in Figma"
        >
          <ExternalLink className="w-4 h-4 text-white group-hover:scale-110 transition-transform duration-200" />
        </a>
      </div>

      {/* Header */}
      <div className="absolute top-4 left-4 z-20">
        <div className="bg-white dark:bg-gray-800 px-4 py-2 rounded-lg shadow-lg border border-gray-200 dark:border-gray-600">
          <h1 className="text-lg font-bold text-gray-900 dark:text-white">Hawiyat</h1>
          <p className="text-sm text-gray-600 dark:text-gray-300">Interactive Prototype</p>
        </div>
      </div>

      {/* Main Iframe */}
      <div className="w-full h-full p-4 pt-20">
        <div className="w-full h-full bg-white dark:bg-gray-800 rounded-2xl shadow-2xl overflow-hidden border border-gray-200 dark:border-gray-700">
          <iframe
            key={key}
            className="w-full h-full rounded-2xl"
            src={figmaUrl}
            allowFullScreen
            onLoad={handleLoad}
            onError={handleError}
            title="Hawiyat Figma Prototype"
            style={{ border: 'none' }}
          />
        </div>
      </div>

      {/* Bottom Info Bar */}
      <div className="absolute bottom-4 left-4 right-4 z-20">
        <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm px-4 py-2 rounded-lg shadow-lg border border-gray-200 dark:border-gray-600 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-sm text-gray-600 dark:text-gray-300">Live Prototype</span>
          </div>
          <div className="text-sm text-gray-500 dark:text-gray-400">
            Press F11 or click fullscreen for best experience
          </div>
        </div>
      </div>
    </div>
  );
}