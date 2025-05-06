import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate, useSearchParams } from 'react-router-dom';
import { 
  useCourseApi, 
  CourseDetails, 
  Lesson,
  VideoLessonResponse,
  QuizLessonResponse 
} from '../../hooks/useCourseApi';
import ReactPlayer from 'react-player';
import { QuizContent } from '../quiz/QuizContent';

// Bunny Video Player Component
const BunnyVideoPlayer: React.FC<{
  url: string;
  playing: boolean;
  onProgress: (state: { played: number; playedSeconds: number; loaded: number; loadedSeconds: number }) => void;
  onDuration: (duration: number) => void;
}> = ({ url, playing, onProgress, onDuration }) => {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const playerInterval = useRef<NodeJS.Timeout | null>(null);
  
  // Extract video ID from Bunny URL
  const getVideoId = (url: string) => {
    const parts = url.split('/');
    return parts[parts.length - 1];
  };

  // Setup message listener for communication with iframe
  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      // Only handle messages from our iframe
      if (iframeRef.current && event.source === iframeRef.current.contentWindow) {
        const data = event.data;
        
        // Handle duration info
        if (data.duration) {
          onDuration(data.duration);
        }
        
        // Handle progress updates
        if (data.currentTime && data.duration) {
          onProgress({ 
            played: data.currentTime / data.duration,
            playedSeconds: data.currentTime,
            loaded: 1, // Assume fully loaded
            loadedSeconds: data.duration
          });
        }
      }
    };
    
    window.addEventListener('message', handleMessage);
    return () => {
      window.removeEventListener('message', handleMessage);
    };
  }, [onDuration, onProgress]);

  // Control player with play/pause
  useEffect(() => {
    if (isLoaded && iframeRef.current) {
      const iframe = iframeRef.current;
      try {
        const message = playing ? { action: 'play' } : { action: 'pause' };
        iframe.contentWindow?.postMessage(message, '*');
      } catch (error) {
        console.error('Error controlling Bunny player:', error);
      }
    }
  }, [playing, isLoaded]);

  // Fallback progress tracking when postMessage is not available
  useEffect(() => {
    if (isLoaded && playing) {
      // Clear any existing interval
      if (playerInterval.current) {
        clearInterval(playerInterval.current);
      }
      
      // Set up progress tracking
      playerInterval.current = setInterval(() => {
        if (iframeRef.current) {
          // Try to get current time via postMessage
          iframeRef.current.contentWindow?.postMessage({ action: 'getCurrentTime' }, '*');
        }
      }, 1000);
    } else if (playerInterval.current) {
      clearInterval(playerInterval.current);
    }
    
    return () => {
      if (playerInterval.current) {
        clearInterval(playerInterval.current);
      }
    };
  }, [playing, isLoaded]);

  return (
    <iframe
      ref={iframeRef}
      src={url}
      className="w-full h-full absolute inset-0 border-0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
      title="Bunny Video Player"
      onLoad={() => setIsLoaded(true)}
    />
  );
};

const CourseViewer: React.FC = () => {
  const { courseId } = useParams<{ courseId: string }>();
  const navigate = useNavigate();
  const { fetchCourseDetails, isLoading, fetchLessonDetails } = useCourseApi();
  const [courseDetails, setCourseDetails] = useState<CourseDetails | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeUnit, setActiveUnit] = useState<number | null>(null);
  const [activeLesson, setActiveLesson] = useState<number | null>(null);
  const [collapsedUnits, setCollapsedUnits] = useState<string[]>([]);
  const [searchParams] = useSearchParams();
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const playerRef = useRef<ReactPlayer>(null);
  const [completedLessons, setCompletedLessons] = useState<string[]>([]);
  const [showCompleteButton, setShowCompleteButton] = useState(false);
  const [selectedLesson, setSelectedLesson] = useState<Lesson | null>(null);
  const [lessonDetails, setLessonDetails] = useState<VideoLessonResponse['data'] | QuizLessonResponse['data'] | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Load course details and initialize first lesson
  useEffect(() => {
    const loadCourseDetails = async () => {
      if (courseId) {
        const response = await fetchCourseDetails(courseId);
        if (response?.success && response.data.units.length > 0) {
          setCourseDetails(response.data);
          
          // Check for URL parameters
          const unitParam = searchParams.get('unit');
          const lessonParam = searchParams.get('lesson');
          
          if (unitParam && lessonParam) {
            const unitIndex = parseInt(unitParam);
            const lessonIndex = parseInt(lessonParam);
            
            if (!isNaN(unitIndex) && !isNaN(lessonIndex) && 
                unitIndex >= 0 && unitIndex < response.data.units.length) {
              const unit = response.data.units[unitIndex];
              if (unit && lessonIndex >= 0 && lessonIndex < unit.lessons.length) {
                setActiveUnit(unitIndex);
                setActiveLesson(lessonIndex);
                handleLessonSelect(unit.lessons[lessonIndex]);
                return;
              }
            }
          }
          
          // If no valid URL parameters, load first lesson
          const firstUnit = response.data.units[0];
          if (firstUnit && firstUnit.lessons.length > 0) {
            setActiveUnit(0);
            setActiveLesson(0);
            handleLessonSelect(firstUnit.lessons[0]);
          }
        }
      }
    };

    loadCourseDetails();
  }, [courseId, fetchCourseDetails]);

  useEffect(() => {
    if (courseDetails) {
      const saved = localStorage.getItem(`course_${courseDetails.id}_completed`);
      if (saved) {
        setCompletedLessons(JSON.parse(saved));
      }
    }
  }, [courseDetails]);

  const toggleUnit = (unitId: string) => {
    setCollapsedUnits(prev => 
      prev.includes(unitId) 
        ? prev.filter(id => id !== unitId)
        : [...prev, unitId]
    );
  };

  const handleLessonClick = async (unitIndex: number, lessonIndex: number) => {
    setActiveUnit(unitIndex);
    setActiveLesson(lessonIndex);
    setIsMenuOpen(false);
    navigate(`?unit=${unitIndex}&lesson=${lessonIndex}`);

    if (courseDetails) {
      const lesson = courseDetails.units[unitIndex].lessons[lessonIndex];
      await handleLessonSelect(lesson);
    }
  };

  const handleLessonSelect = async (lesson: Lesson) => {
    setSelectedLesson(lesson);
    setLoading(true);
    setError(null);
    setLessonDetails(null);

    try {
      const response = await fetchLessonDetails(lesson.id);
      if (response?.success) {
        setLessonDetails(response.data);
        // Reset video state when switching lessons
        if (lesson.type === 'Video') {
          setPlaying(false);
          setProgress(0);
          setShowCompleteButton(false);
        }
      } else {
        setError('Failed to load lesson details');
      }
    } catch (err) {
      setError('An error occurred while loading the lesson');
    } finally {
      setLoading(false);
    }
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handlePlayPause = () => {
    setPlaying(!playing);
  };

  const handleProgress = (state: { played: number; playedSeconds: number; loaded: number; loadedSeconds: number }) => {
    setProgress(state.played * 100);
    if (state.played > 0.9 && selectedLesson && !completedLessons.includes(selectedLesson.id.toString())) {
      setShowCompleteButton(true);
    }
  };

  const handleDuration = (duration: number) => {
    setDuration(duration);
  };

  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    const bounds = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - bounds.left;
    const width = bounds.width;
    const percentage = (x / width) * 100;
    setProgress(percentage);
    if (playerRef.current) {
      playerRef.current.seekTo(percentage / 100);
    }
  };

  const formatTime = (seconds: number) => {
    const date = new Date(seconds * 1000);
    const hh = date.getUTCHours();
    const mm = date.getUTCMinutes();
    const ss = date.getUTCSeconds().toString().padStart(2, '0');
    if (hh) {
      return `${hh}:${mm.toString().padStart(2, '0')}:${ss}`;
    }
    return `${mm}:${ss}`;
  };

  const calculateProgress = () => {
    if (!courseDetails || !courseDetails.units) return 0;
    const totalLessons = courseDetails.units.reduce((total, unit) => total + unit.lessons.length, 0);
    const completed = completedLessons.length;
    return (completed / totalLessons) * 100;
  };

  const handleLessonComplete = () => {
    if (!courseDetails || !selectedLesson) return;
    
    setCompletedLessons(prev => {
      const lessonId = selectedLesson.id.toString();
      if (!prev.includes(lessonId)) {
        const newCompleted = [...prev, lessonId];
        localStorage.setItem(`course_${courseDetails.id}_completed`, JSON.stringify(newCompleted));
        return newCompleted;
      }
      return prev;
    });

    if (hasNextLesson) {
      goToNextLesson();
    }
  };

  // Type guard to check if lesson details is video lesson response
  const isVideoLessonResponse = (details: VideoLessonResponse['data'] | QuizLessonResponse['data']): details is VideoLessonResponse['data'] => {
    return 'videoUrl' in details;
  };

  // Function to check if URL is a Bunny.net embed
  const isBunnyVideo = (url: string): boolean => {
    return url.includes('iframe.mediadelivery.net');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (error || !courseDetails || activeUnit === null || activeLesson === null) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center p-8 max-w-md">
          <div className="text-6xl mb-4">🔍</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Course Not Found</h2>
          <p className="text-gray-600 mb-6">The course you're looking for doesn't seem to exist.</p>
          <button 
            onClick={() => navigate('/enrolled-courses')}
            className="bg-primary text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition-colors duration-200"
          >
            Back to My Courses
          </button>
        </div>
      </div>
    );
  }

  const currentUnit = courseDetails.units[activeUnit];
  const currentLesson = currentUnit?.lessons[activeLesson];

  // Add safety check for currentUnit and currentLesson
  if (!currentUnit || !currentLesson) {
    setActiveUnit(0);
    setActiveLesson(0);
    return null;
  }

  const totalLessons = courseDetails.units.reduce((total, unit) => total + unit.lessons.length, 0);
  const currentLessonNumber = courseDetails.units.slice(0, activeUnit).reduce((total, unit) => total + unit.lessons.length, 0) + activeLesson + 1;

  const goToNextLesson = () => {
    if (activeLesson < currentUnit.lessons.length - 1) {
      const nextLesson = activeLesson + 1;
      setActiveLesson(nextLesson);
      navigate(`?unit=${activeUnit}&lesson=${nextLesson}`);
    } else if (activeUnit < courseDetails.units.length - 1) {
      const nextUnit = activeUnit + 1;
      setActiveUnit(nextUnit);
      setActiveLesson(0);
      navigate(`?unit=${nextUnit}&lesson=0`);
    }
  };

  const hasNextLesson = activeLesson < currentUnit.lessons.length - 1 || activeUnit < courseDetails.units.length - 1;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100" dir="rtl">
      {/* Top Navigation Bar */}
      <div className="bg-white/80 backdrop-blur-lg border-b border-gray-200 fixed top-0 right-0 left-0 z-50">
        <div className="h-16 flex items-center px-4 lg:px-6 max-w-[1920px] mx-auto">
          <button 
            onClick={toggleMenu}
            className="p-2 rounded-xl hover:bg-gray-100/80 transition-colors"
            aria-label={isMenuOpen ? 'إغلاق القائمة' : 'فتح القائمة'}
          >
            <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          <div className="mr-4 flex-1">
            <h1 className="text-lg font-semibold text-gray-900">{courseDetails.courseName}</h1>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <span className="flex items-center gap-1">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                الدرس {currentLessonNumber} من {totalLessons}
              </span>
              <span>•</span>
              <span>اكتمل {calculateProgress().toFixed(0)}%</span>
            </div>
            {/* Course Progress Bar */}
            <div className="absolute bottom-0 right-0 left-0 h-1 bg-gray-200">
              <div 
                className="h-full bg-primary transition-all duration-300"
                style={{ width: `${calculateProgress()}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Main Layout */}
      <div className="pt-16 min-h-screen relative flex">
        {/* Sidebar */}
        <aside 
          className={`fixed inset-y-0 right-0 z-40 w-80 bg-white/80 backdrop-blur-lg transform border-l border-gray-200
            ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'} 
            transition-all duration-300 ease-in-out`}
          style={{ top: '4rem' }}
        >
          <div className="h-full flex flex-col">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-primary/10 to-primary/20 flex items-center justify-center">
                  <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-gray-900">محتوى الدورة</h2>
                  <p className="text-sm text-gray-600">{courseDetails.units.length} وحدات • {totalLessons} دروس</p>
                </div>
              </div>
            </div>
            
            <div className="overflow-y-auto flex-1 py-4">
              {courseDetails.units.map((unit, unitIndex) => (
                <div key={unit.id} className="mb-2 last:mb-0">
                  <div 
                    className="px-6 py-3 hover:bg-gray-50/80 cursor-pointer transition-colors rounded-lg mx-2"
                    onClick={() => toggleUnit(unit.id.toString())}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-primary/10 to-primary/20 flex items-center justify-center">
                          <span className="text-primary text-sm font-medium">{unitIndex + 1}</span>
                        </div>
                        <div>
                          <h3 className="font-medium text-gray-900">{unit.unitName}</h3>
                          <p className="text-sm text-gray-600">{unit.lessons.length} دروس</p>
                        </div>
                      </div>
                      <svg 
                        className={`w-5 h-5 text-gray-400 transform transition-transform duration-200 ${
                          collapsedUnits.includes(unit.id.toString()) ? 'rotate-180' : ''
                        }`} 
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </div>
                  
                  <div className={`space-y-1 mt-1 ${
                    collapsedUnits.includes(unit.id.toString()) ? 'hidden' : 'block'
                  }`}>
                    {unit.lessons.map((lesson, lessonIndex) => (
                      <div 
                        key={lesson.id}
                        className={`mx-4 px-4 py-3 cursor-pointer rounded-lg transition-all duration-200
                          ${activeUnit === unitIndex && activeLesson === lessonIndex 
                            ? 'bg-primary/10 text-primary' 
                            : 'hover:bg-gray-50/80'
                          }`}
                        onClick={() => handleLessonClick(unitIndex, lessonIndex)}
                      >
                        <div className="flex items-center gap-3 pr-11">
                          <div className="flex-shrink-0 w-6 h-6 rounded-lg bg-gradient-to-br from-primary/10 to-primary/20 flex items-center justify-center">
                            {completedLessons.includes(lesson.id.toString()) ? (
                              <svg className="w-4 h-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                              </svg>
                            ) : (
                              <span className="text-primary text-xs font-medium">{lessonIndex + 1}</span>
                            )}
                          </div>
                          <div>
                            <h4 className="font-medium line-clamp-1">{lesson.lessonName}</h4>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className={`flex-1 transition-all duration-300 ${isMenuOpen ? 'mr-80' : 'mr-0'}`}>
          <div className="max-w-7xl mx-auto px-4 py-8">
            {loading ? (
              <div className="flex items-center justify-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
              </div>
            ) : error ? (
              <div className="text-center text-red-600 p-4">{error}</div>
            ) : selectedLesson && lessonDetails ? (
              <>
                {selectedLesson.type === 'Video' && isVideoLessonResponse(lessonDetails) && (
                  <div className="space-y-4">
                    <div className="video-container relative">
                      <div className="aspect-video bg-black rounded-xl overflow-hidden">
                        {isBunnyVideo(lessonDetails.videoUrl) ? (
                          <BunnyVideoPlayer
                            url={lessonDetails.videoUrl}
                            playing={playing}
                            onProgress={handleProgress}
                            onDuration={handleDuration}
                          />
                        ) : (
                          <>
                            <ReactPlayer
                              ref={playerRef}
                              url={lessonDetails.videoUrl}
                              width="100%"
                              height="100%"
                              playing={playing}
                              controls={false}
                              onProgress={handleProgress}
                              onDuration={handleDuration}
                              config={{
                                youtube: {
                                  playerVars: {
                                    showinfo: 0,
                                    modestbranding: 1,
                                    rel: 0,
                                    controls: 0,
                                    disablekb: 1,
                                    fs: 0,
                                    iv_load_policy: 3
                                  }
                                }
                              }}
                            />
                            
                            {/* Custom Controls Overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent">
                              {/* Click handler for play/pause */}
                              <div 
                                className="absolute inset-0 z-10 cursor-pointer"
                                onClick={handlePlayPause}
                              />
                              
                              {/* Controls Bar */}
                              <div className="absolute bottom-0 left-0 right-0 p-4 z-20">
                                {/* Progress Bar */}
                                <div 
                                  className="w-full h-1 bg-gray-600/60 rounded-full mb-4 cursor-pointer relative group"
                                  onClick={handleSeek}
                                >
                                  <div 
                                    className="absolute h-full bg-primary rounded-full"
                                    style={{ width: `${progress}%` }}
                                  />
                                  <div 
                                    className="absolute h-3 w-3 bg-primary rounded-full -top-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                                    style={{ left: `${progress}%`, transform: 'translateX(-50%)' }}
                                  />
                                </div>
                                
                                {/* Bottom Controls */}
                                <div className="flex items-center justify-between">
                                  <div className="flex items-center gap-4">
                                    <button
                                      onClick={handlePlayPause}
                                      className="text-white hover:text-primary transition-colors"
                                    >
                                      {playing ? (
                                        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                      ) : (
                                        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                      )}
                                    </button>
                                    <div className="text-white text-sm font-medium">
                                      {formatTime(duration * progress / 100)} / {formatTime(duration)}
                                    </div>
                                  </div>
                                  
                                  {/* Complete Button */}
                                  {showCompleteButton && !completedLessons.includes(selectedLesson.id.toString()) && (
                                    <button
                                      onClick={handleLessonComplete}
                                      className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
                                    >
                                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                      </svg>
                                      {hasNextLesson ? 'إكمال ومتابعة' : 'إكمال الدرس'}
                                    </button>
                                  )}
                                </div>
                              </div>
                            </div>
                          </>
                        )}
                      </div>
                    </div>

                    {/* Attachment Section */}
                    {lessonDetails.attachmentUrl && lessonDetails.attachmentTitle && (
                      <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center">
                              <svg className="w-6 h-6 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                              </svg>
                            </div>
                            <div>
                              <h3 className="text-gray-900 font-medium">مرفقات الدرس</h3>
                              <p className="text-gray-600 text-sm">{lessonDetails.attachmentTitle}</p>
                            </div>
                          </div>
                          <a
                            href={lessonDetails.attachmentUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center px-4 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors duration-200"
                          >
                            <svg className="w-5 h-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                            </svg>
                            تحميل المرفق
                          </a>
                        </div>
                      </div>
                    )}

                    {/* Lesson completion button for Bunny videos */}
                    {isBunnyVideo(lessonDetails.videoUrl) && showCompleteButton && !completedLessons.includes(selectedLesson.id.toString()) && (
                      <div className="flex justify-end">
                        <button
                          onClick={handleLessonComplete}
                          className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          {hasNextLesson ? 'إكمال ومتابعة' : 'إكمال الدرس'}
                        </button>
                      </div>
                    )}
                  </div>
                )}
                
                {selectedLesson.type === 'Quiz' && Array.isArray(lessonDetails) && (
                  <QuizContent
                    questions={lessonDetails}
                    onComplete={handleLessonComplete}
                  />
                )}
              </>
            ) : null}
          </div>
        </main>
      </div>
    </div>
  );
};

export default CourseViewer; 