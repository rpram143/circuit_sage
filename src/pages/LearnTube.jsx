import { useState } from 'react';
import { Search, Play, Eye, Clock, Youtube, Sparkles, BookOpen, ChevronRight, Wrench } from 'lucide-react';
import CircuitAnalyzer from '../utils/CircuitAnalyzer';
import CircuitBuilderPanel from '../components/CircuitBuilderPanel';

export default function LearnTube() {
    const [searchQuery, setSearchQuery] = useState('');
    const [videos, setVideos] = useState([]);
    const [selectedVideo, setSelectedVideo] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [transcript, setTranscript] = useState([]);
    const [summaries, setSummaries] = useState([]);
    const [loadingTranscript, setLoadingTranscript] = useState(false);
    const [showCircuitBuilder, setShowCircuitBuilder] = useState(false);
    const [circuitData, setCircuitData] = useState(null);
    const [analyzingCircuit, setAnalyzingCircuit] = useState(false);

    // YouTube Data API v3 key
    const API_KEY = 'AIzaSyCt3M9UpZoCeNCVH-dC0-wkeen3YX8XqUE';

    const searchVideos = async (e) => {
        e.preventDefault();
        if (!searchQuery.trim()) return;

        setLoading(true);
        setError(null);

        try {
            // Enhanced query with ECE course-specific keywords
            const eceKeywords = 'ECE electronics digital analog circuits VLSI microprocessor embedded systems signals tutorial lecture';
            const enhancedQuery = `${searchQuery} ${eceKeywords}`;

            const response = await fetch(
                `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=12&q=${encodeURIComponent(enhancedQuery)}&type=video&key=${API_KEY}`
            );

            if (!response.ok) {
                throw new Error('Failed to fetch videos. Please check your API key.');
            }

            const data = await response.json();

            // Get video statistics (views, duration)
            const videoIds = data.items.map(item => item.id.videoId).join(',');
            const statsResponse = await fetch(
                `https://www.googleapis.com/youtube/v3/videos?part=statistics,contentDetails&id=${videoIds}&key=${API_KEY}`
            );

            const statsData = await statsResponse.json();

            // Combine search results with statistics
            const videosWithStats = data.items.map((item, index) => ({
                id: item.id.videoId,
                title: item.snippet.title,
                thumbnail: item.snippet.thumbnails.medium.url,
                channelTitle: item.snippet.channelTitle,
                publishedAt: item.snippet.publishedAt,
                viewCount: statsData.items[index]?.statistics?.viewCount || 'N/A',
                duration: statsData.items[index]?.contentDetails?.duration || 'N/A'
            }));

            setVideos(videosWithStats);
        } catch (err) {
            setError(err.message);
            console.error('Error fetching videos:', err);
        } finally {
            setLoading(false);
        }
    };

    const fetchTranscriptAndSummarize = async (videoId, videoTitle) => {
        setLoadingTranscript(true);
        setTranscript([]);
        setSummaries([]);

        try {
            // Note: YouTube doesn't provide direct transcript API access
            // This is a simulated implementation showing the structure
            // In production, you would use a backend service or third-party API

            // Simulated transcript data (in production, fetch from YouTube Transcript API via backend)
            const mockTranscript = generateMockTranscript(videoTitle);
            setTranscript(mockTranscript);

            // Generate AI summaries from transcript
            const generatedSummaries = await generateAISummaries(mockTranscript);
            setSummaries(generatedSummaries);

        } catch (err) {
            console.error('Error fetching transcript:', err);
        } finally {
            setLoadingTranscript(false);
        }
    };

    // Mock transcript generator (simulates real transcript data)
    const generateMockTranscript = (title) => {
        const topics = extractTopics(title);
        return [
            { start: 0, duration: 180, text: `Introduction to ${topics[0]}. Understanding the basic concepts and fundamentals.` },
            { start: 180, duration: 240, text: `Deep dive into ${topics[1]}. Exploring the theory and mathematical foundations.` },
            { start: 420, duration: 300, text: `Practical applications and real-world examples of ${topics[0]} in modern electronics.` },
            { start: 720, duration: 200, text: `Common mistakes and troubleshooting techniques when working with ${topics[1]}.` },
            { start: 920, duration: 180, text: `Advanced concepts and future trends in ${topics[0]} technology.` },
            { start: 1100, duration: 120, text: `Summary and key takeaways. Resources for further learning.` }
        ];
    };

    const extractTopics = (title) => {
        const commonTopics = ['digital circuits', 'analog electronics', 'microcontrollers', 'VLSI design', 'signal processing'];
        return commonTopics.slice(0, 2);
    };

    // AI Summary generator (simulates AI processing)
    const generateAISummaries = async (transcriptData) => {
        // Simulate AI processing delay
        await new Promise(resolve => setTimeout(resolve, 1500));

        return transcriptData.map((segment, index) => ({
            timestamp: formatTimestamp(segment.start),
            timeInSeconds: segment.start,
            title: `Chapter ${index + 1}`,
            summary: segment.text,
            keyPoints: generateKeyPoints(segment.text)
        }));
    };

    const generateKeyPoints = (text) => {
        const words = text.split(' ');
        const keyWords = words.filter(w => w.length > 6).slice(0, 3);
        return keyWords.map(word => word.replace(/[.,]/g, ''));
    };

    const formatTimestamp = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    const handleVideoSelect = async (video) => {
        setSelectedVideo(video);
        await fetchTranscriptAndSummarize(video.id, video.title);
    };

    const handleBuildCircuit = async () => {
        setAnalyzingCircuit(true);

        // Simulate AI processing delay
        await new Promise(resolve => setTimeout(resolve, 2000));

        // Analyze video and extract circuit info
        const analysis = CircuitAnalyzer.analyzeVideo(selectedVideo.title, transcript);

        // Add Q&A engine
        analysis.qaEngine = (question) => CircuitAnalyzer.generateQAResponse(question, analysis);

        setCircuitData(analysis);
        setAnalyzingCircuit(false);
        setShowCircuitBuilder(true);
    };

    const formatViewCount = (count) => {
        if (count === 'N/A') return count;
        const num = parseInt(count);
        if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
        if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
        return num.toString();
    };

    const formatDuration = (duration) => {
        if (duration === 'N/A') return duration;
        const match = duration.match(/PT(\d+H)?(\d+M)?(\d+S)?/);
        const hours = (match[1] || '').replace('H', '');
        const minutes = (match[2] || '').replace('M', '');
        const seconds = (match[3] || '').replace('S', '');

        if (hours) return `${hours}:${minutes.padStart(2, '0')}:${seconds.padStart(2, '0')}`;
        return `${minutes || '0'}:${seconds.padStart(2, '0')}`;
    };

    return (
        <main className="p-6 md:p-12 min-h-screen">
            {/* Header */}
            <header className="mb-8">
                <div className="flex items-center gap-3 mb-2">
                    <div className="p-2 bg-red-500/10 rounded-lg border border-red-500/20">
                        <Youtube className="w-6 h-6 text-red-500" />
                    </div>
                    <h1 className="text-2xl md:text-3xl font-bold text-white">Learn Tube</h1>
                </div>
                <p className="text-slate-400">Search and watch educational videos with AI-powered summaries</p>
            </header>

            {/* Search Bar */}
            <form onSubmit={searchVideos} className="mb-8">
                <div className="relative max-w-3xl">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 w-5 h-5" />
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search ECE topics... (e.g., digital logic, op-amp, microcontroller, VLSI)"
                        className="w-full bg-slate-900 border border-white/10 rounded-lg pl-12 pr-4 py-4 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500/50 text-base"
                    />
                    <button
                        type="submit"
                        disabled={loading}
                        className="absolute right-2 top-1/2 -translate-y-1/2 px-6 py-2 bg-cyan-500 hover:bg-cyan-600 disabled:bg-slate-700 text-white rounded-lg font-medium transition-colors"
                    >
                        {loading ? 'Searching...' : 'Search'}
                    </button>
                </div>
            </form>

            {/* Error Message */}
            {error && (
                <div className="mb-8 p-4 bg-red-500/10 border border-red-500/20 rounded-lg">
                    <p className="text-red-400">{error}</p>
                    <p className="text-slate-400 text-sm mt-2">
                        Note: You need to add a valid YouTube Data API v3 key to use this feature.
                    </p>
                </div>
            )}

            {/* Video Player with Transcript Sidebar */}
            {selectedVideo && (
                <div className="mb-8 grid lg:grid-cols-3 gap-6">
                    {/* Video Player Section */}
                    <div className="lg:col-span-2">
                        <div className="bg-slate-900 border border-white/10 rounded-lg overflow-hidden">
                            <div className="aspect-video">
                                <iframe
                                    width="100%"
                                    height="100%"
                                    src={`https://www.youtube.com/embed/${selectedVideo.id}`}
                                    title={selectedVideo.title}
                                    frameBorder="0"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                    className="w-full h-full"
                                ></iframe>
                            </div>
                            <div className="p-4">
                                <h2 className="text-xl font-bold text-white mb-2">{selectedVideo.title}</h2>
                                <p className="text-slate-400 mb-4">{selectedVideo.channelTitle}</p>

                                {/* Build This Circuit Button */}
                                <button
                                    onClick={handleBuildCircuit}
                                    disabled={analyzingCircuit}
                                    className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 disabled:from-slate-700 disabled:to-slate-700 text-white rounded-lg font-bold transition-all shadow-lg shadow-orange-500/20"
                                >
                                    {analyzingCircuit ? (
                                        <>
                                            <Sparkles className="w-5 h-5 animate-spin" />
                                            Analyzing Circuit...
                                        </>
                                    ) : (
                                        <>
                                            <Wrench className="w-5 h-5" />
                                            Build This Circuit
                                        </>
                                    )}
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* AI Summary Sidebar */}
                    <div className="lg:col-span-1">
                        <div className="bg-slate-900 border border-white/10 rounded-lg overflow-hidden h-full">
                            <div className="p-4 bg-gradient-to-r from-cyan-600 to-blue-600 border-b border-white/10">
                                <div className="flex items-center gap-2 text-white">
                                    <Sparkles className="w-5 h-5" />
                                    <h3 className="font-bold">AI Summary</h3>
                                </div>
                                <p className="text-blue-100 text-xs mt-1">Timestamped chapters</p>
                            </div>

                            <div className="overflow-y-auto max-h-[600px] scrollbar-thin scrollbar-thumb-slate-700">
                                {loadingTranscript ? (
                                    <div className="p-6 text-center">
                                        <Sparkles className="w-8 h-8 text-cyan-400 animate-spin mx-auto mb-3" />
                                        <p className="text-slate-400 text-sm">Analyzing video content...</p>
                                    </div>
                                ) : summaries.length > 0 ? (
                                    <div className="p-4 space-y-4">
                                        {summaries.map((summary, index) => (
                                            <div
                                                key={index}
                                                className="bg-slate-800 border border-white/5 rounded-lg p-4 hover:border-cyan-500/30 transition-colors cursor-pointer group"
                                            >
                                                <div className="flex items-start justify-between mb-2">
                                                    <div className="flex items-center gap-2">
                                                        <Clock className="w-4 h-4 text-cyan-400" />
                                                        <span className="text-cyan-400 font-mono text-sm font-bold">
                                                            {summary.timestamp}
                                                        </span>
                                                    </div>
                                                    <ChevronRight className="w-4 h-4 text-slate-500 group-hover:text-cyan-400 transition-colors" />
                                                </div>
                                                <h4 className="text-white font-semibold text-sm mb-2">{summary.title}</h4>
                                                <p className="text-slate-400 text-xs leading-relaxed mb-3">
                                                    {summary.summary}
                                                </p>
                                                {summary.keyPoints.length > 0 && (
                                                    <div className="flex flex-wrap gap-1">
                                                        {summary.keyPoints.map((point, i) => (
                                                            <span
                                                                key={i}
                                                                className="px-2 py-0.5 bg-cyan-500/10 text-cyan-400 rounded text-[10px] font-medium border border-cyan-500/20"
                                                            >
                                                                {point}
                                                            </span>
                                                        ))}
                                                    </div>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="p-6 text-center">
                                        <BookOpen className="w-8 h-8 text-slate-600 mx-auto mb-3" />
                                        <p className="text-slate-500 text-sm">No transcript available</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Video Grid */}
            {videos.length > 0 && (
                <section>
                    <h2 className="text-xl font-bold text-white mb-6">
                        {selectedVideo ? 'More Videos' : 'Search Results'}
                    </h2>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {videos.map((video) => (
                            <div
                                key={video.id}
                                onClick={() => handleVideoSelect(video)}
                                className="bg-slate-900 border border-white/10 rounded-lg overflow-hidden cursor-pointer hover:border-cyan-500/50 transition-all hover:scale-105 group"
                            >
                                <div className="relative aspect-video">
                                    <img
                                        src={video.thumbnail}
                                        alt={video.title}
                                        className="w-full h-full object-cover"
                                    />
                                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                        <div className="w-12 h-12 bg-red-500 rounded-full flex items-center justify-center">
                                            <Play className="w-6 h-6 text-white fill-white ml-1" />
                                        </div>
                                    </div>
                                    {video.duration !== 'N/A' && (
                                        <div className="absolute bottom-2 right-2 px-2 py-1 bg-black/80 rounded text-white text-xs font-medium">
                                            {formatDuration(video.duration)}
                                        </div>
                                    )}
                                </div>
                                <div className="p-4">
                                    <h3 className="text-white font-medium mb-2 line-clamp-2 text-sm">
                                        {video.title}
                                    </h3>
                                    <p className="text-slate-400 text-xs mb-2">{video.channelTitle}</p>
                                    <div className="flex items-center gap-3 text-slate-500 text-xs">
                                        <div className="flex items-center gap-1">
                                            <Eye className="w-3 h-3" />
                                            {formatViewCount(video.viewCount)}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            )}

            {/* Empty State */}
            {!loading && videos.length === 0 && !error && (
                <div className="text-center py-16">
                    <div className="inline-block p-4 bg-slate-900 rounded-full mb-4">
                        <Youtube className="w-12 h-12 text-slate-600" />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2">Search for Educational Videos</h3>
                    <p className="text-slate-400">
                        Enter a topic to find relevant tutorials with AI-powered summaries
                    </p>
                </div>
            )}

            {/* Circuit Builder Panel */}
            <CircuitBuilderPanel
                isOpen={showCircuitBuilder}
                onClose={() => setShowCircuitBuilder(false)}
                circuitData={circuitData}
                videoTitle={selectedVideo?.title}
            />
        </main>
    );
}
