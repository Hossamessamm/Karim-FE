import { Course, Unit, Lesson, Resource, Teacher, User } from '../types';

// Export the types from types/index.ts instead of redefining them
export type { Course, Unit, Lesson, Resource, Teacher, User };

export const teachers: Teacher[] = [
  {
    id: '1',
    name: 'Sarah Johnson',
    photoUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330',
    bio: 'Experienced English teacher with over 10 years of teaching experience',
    specialization: 'English Language and Literature'
  },
  {
    id: '2',
    name: 'Michael Chen',
    photoUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e',
    bio: 'Certified English instructor specializing in IELTS preparation',
    specialization: 'IELTS and Academic English'
  }
];

export const courses: Course[] = [
  {
    id: '1',
    title: 'English Grammar Fundamentals',
    description: 'Master the basics of English grammar with our comprehensive course',
    price: 49.99,
    imageUrl: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b',
    grade: '1',
    teacher: teachers[0],
    units: [
      {
        id: 'u1',
        title: 'Parts of Speech',
        description: 'Learn about nouns, verbs, adjectives, and more',
        lessons: [
          {
            id: 'l1',
            title: 'Introduction to Nouns',
            duration: '15:00',
            videoUrl: 'https://www.youtube.com/embed/UB1O30fR-EE?autoplay=0&controls=1&disablekb=1&playsinline=1&cc_load_policy=0&widget_referrer=https%3A%2F%2Faladwaa.com&rel=0&showinfo=0&iv_load_policy=3&modestbranding=1&customControls=true&noCookie=false&enablejsapi=1&origin=https%3A%2F%2Faladwaa.com&widgetid=1&forigin=https%3A%2F%2Faladwaa.com&aoriginsup=1&gporigin=https%3A%2F%2Faladwaa.com&vf=2',
            description: 'Learn what nouns are and how to identify them',
            type: 'video',
            resources: [
              {
                id: 'r1',
                title: 'Nouns Worksheet',
                type: 'pdf',
                url: 'https://example.com/worksheet1.pdf'
              }
            ]
          },
          {
            id: 'l2',
            title: 'Nouns Quiz',
            duration: '10:00',
            description: 'Test your knowledge about nouns',
            type: 'quiz',
            quiz: {
              id: 'q1',
              title: 'Understanding Nouns',
              description: 'Test your knowledge about different types of nouns',
              questions: [
                {
                  id: 'q1-1',
                  question: 'Which of the following is a proper noun?',
                  options: [
                    'book',
                    'London',
                    'happiness',
                    'running'
                  ],
                  correctAnswer: 1,
                  explanation: 'London is a proper noun because it is the name of a specific place.'
                },
                {
                  id: 'q1-2',
                  question: 'What type of noun is "happiness"?',
                  options: [
                    'Proper noun',
                    'Common noun',
                    'Abstract noun',
                    'Collective noun'
                  ],
                  correctAnswer: 2,
                  explanation: 'Happiness is an abstract noun because it represents an idea or emotion that cannot be physically touched.'
                },
                {
                  id: 'q1-3',
                  question: 'Which of these is a collective noun?',
                  options: [
                    'computer',
                    'team',
                    'tree',
                    'city'
                  ],
                  correctAnswer: 1,
                  explanation: 'Team is a collective noun because it refers to a group of people.'
                }
              ],
              timeLimit: 10,
              passingScore: 70
            }
          }
        ]
      }
    ],
    enrolledUsers: []
  },
  {
    id: '2',
    title: 'Reading Comprehension',
    description: 'Improve your reading skills with engaging texts and exercises',
    price: 59.99,
    imageUrl: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8',
    grade: '2',
    teacher: teachers[1],
    units: [
      {
        id: 'u2',
        title: 'Understanding Main Ideas',
        description: 'Learn to identify the main ideas in texts',
        lessons: [
          {
            id: 'l2',
            title: 'Finding the Main Idea',
            duration: '20:00',
            videoUrl: 'https://www.youtube.com/embed/1PnVor36_40?autoplay=0&controls=1&disablekb=1&playsinline=1&cc_load_policy=0&widget_referrer=https%3A%2F%2Faladwaa.com&rel=0&showinfo=0&iv_load_policy=3&modestbranding=1&customControls=true&noCookie=false&enablejsapi=1&origin=https%3A%2F%2Faladwaa.com&widgetid=1&forigin=https%3A%2F%2Faladwaa.com&aoriginsup=1&gporigin=https%3A%2F%2Faladwaa.com&vf=2',
            description: 'Learn strategies for identifying main ideas',
            type: 'video',
            resources: [
              {
                id: 'r2',
                title: 'Practice Text',
                type: 'pdf',
                url: 'https://example.com/text1.pdf'
              },
              {
                id: 'r3',
                title: 'Additional Resources',
                type: 'link',
                url: 'https://example.com/resources'
              }
            ]
          },
          {
            id: 'l3',
            title: 'Main Ideas Quiz',
            duration: '15:00',
            description: 'Test your understanding of main ideas',
            type: 'quiz',
            quiz: {
              id: 'q2',
              title: 'Main Ideas Assessment',
              description: 'Test your ability to identify main ideas in different texts',
              questions: [
                {
                  id: 'q2-1',
                  question: 'What is the main idea of this passage?\n\n"The rainforest is home to countless species of plants and animals. Many of these species cannot be found anywhere else on Earth. However, rainforests are being destroyed at an alarming rate, putting these unique species at risk of extinction."',
                  options: [
                    'Rainforests have many plants',
                    'Animals live in rainforests',
                    'Rainforest destruction threatens unique species',
                    'Earth has many different habitats'
                  ],
                  correctAnswer: 2,
                  explanation: 'The passage primarily focuses on how deforestation threatens unique species that can only be found in rainforests.'
                },
                {
                  id: 'q2-2',
                  question: 'Which sentence best represents the main idea of a paragraph?',
                  options: [
                    'A specific detail or example',
                    'The topic sentence that presents the central concept',
                    'The last sentence of the paragraph',
                    'Any sentence with a fact'
                  ],
                  correctAnswer: 1,
                  explanation: 'The topic sentence typically presents the main idea or central concept of a paragraph.'
                },
                {
                  id: 'q2-3',
                  question: 'How can you identify the main idea of a text?',
                  options: [
                    'Read only the first sentence',
                    'Look for the longest sentence',
                    'Find the most specific detail',
                    'Look for the central theme that other details support'
                  ],
                  correctAnswer: 3,
                  explanation: 'The main idea is the central theme or concept that other details in the text support and develop.'
                }
              ],
              timeLimit: 15,
              passingScore: 70
            }
          }
        ]
      }
    ],
    enrolledUsers: []
  },
  {
    id: '3',
    title: 'Creative Writing Workshop',
    description: 'Express yourself through creative writing, learn storytelling techniques, and develop your unique voice.',
    price: 89.99,
    imageUrl: 'https://images.unsplash.com/photo-1455390582262-044cdead277a',
    grade: '2',
    teacher: teachers[0],
    units: [
      {
        id: 'u3',
        title: 'Story Elements',
        description: 'Learn the fundamental elements of storytelling',
        lessons: [
          {
            id: 'l3',
            title: 'Plot Development',
            duration: '45:00',
            videoUrl: 'https://www.youtube.com/embed/W6NZfCO5SIk?autoplay=0&controls=1&disablekb=1&playsinline=1&cc_load_policy=0&widget_referrer=https%3A%2F%2Faladwaa.com&rel=0&showinfo=0&iv_load_policy=3&modestbranding=1&customControls=true&noCookie=false&enablejsapi=1&origin=https%3A%2F%2Faladwaa.com&widgetid=1&forigin=https%3A%2F%2Faladwaa.com&aoriginsup=1&gporigin=https%3A%2F%2Faladwaa.com&vf=2',
            description: 'Understanding the five elements of plot',
            type: 'video',
            resources: [
              {
                id: 'r4',
                title: 'Plot Structure Template',
                type: 'pdf',
                url: '/resources/plot-template.pdf'
              }
            ]
          },
          {
            id: 'l3-quiz',
            title: 'Story Elements Quiz',
            duration: '15:00',
            description: 'Test your knowledge of story elements',
            type: 'quiz',
            quiz: {
              id: 'q3',
              title: 'Story Elements Assessment',
              description: 'Test your understanding of basic story elements',
              questions: [
                {
                  id: 'q3-1',
                  question: 'Which of the following is NOT one of the five basic elements of plot?',
                  options: [
                    'Exposition',
                    'Rising Action',
                    'Foreshadowing',
                    'Resolution'
                  ],
                  correctAnswer: 2,
                  explanation: 'Foreshadowing is a literary device, not one of the five basic elements of plot (Exposition, Rising Action, Climax, Falling Action, Resolution).'
                },
                {
                  id: 'q3-2',
                  question: 'What is the purpose of exposition in a story?',
                  options: [
                    'To create suspense',
                    'To introduce characters and setting',
                    'To resolve the conflict',
                    'To provide the moral lesson'
                  ],
                  correctAnswer: 1,
                  explanation: 'Exposition introduces the characters, setting, and background information necessary for understanding the story.'
                },
                {
                  id: 'q3-3',
                  question: 'Which part of the plot structure typically contains the highest point of tension?',
                  options: [
                    'Exposition',
                    'Rising Action',
                    'Climax',
                    'Falling Action'
                  ],
                  correctAnswer: 2,
                  explanation: 'The climax is the turning point of the story where the tension reaches its peak.'
                }
              ],
              timeLimit: 15,
              passingScore: 70
            }
          }
        ]
      }
    ],
    enrolledUsers: []
  },
  {
    id: '4',
    title: 'Advanced Vocabulary Building',
    description: 'Expand your vocabulary through contextual learning, word roots, and practical usage.',
    price: 74.99,
    imageUrl: 'https://images.unsplash.com/photo-1457369804613-52c61a468e7d',
    grade: '2',
    teacher: teachers[1],
    units: [
      {
        id: 'u4',
        title: 'Word Origins',
        description: 'Explore the etymology of English words',
        lessons: [
          {
            id: 'l4',
            title: 'Greek and Latin Roots',
            duration: '35:00',
            videoUrl: 'https://www.youtube.com/embed/TNhaISOUy6Q?autoplay=0&controls=1&disablekb=1&playsinline=1&cc_load_policy=0&widget_referrer=https%3A%2F%2Faladwaa.com&rel=0&showinfo=0&iv_load_policy=3&modestbranding=1&customControls=true&noCookie=false&enablejsapi=1&origin=https%3A%2F%2Faladwaa.com&widgetid=1&forigin=https%3A%2F%2Faladwaa.com&aoriginsup=1&gporigin=https%3A%2F%2Faladwaa.com&vf=2',
            description: 'Understanding common word roots',
            type: 'video',
            resources: [
              {
                id: 'r5',
                title: 'Root Words Guide',
                type: 'pdf',
                url: '/resources/root-words.pdf'
              }
            ]
          },
          {
            id: 'l4-quiz',
            title: 'Word Origins Quiz',
            duration: '20:00',
            description: 'Test your knowledge of word roots and origins',
            type: 'quiz',
            quiz: {
              id: 'q4',
              title: 'Etymology Assessment',
              description: 'Test your understanding of Greek and Latin roots',
              questions: [
                {
                  id: 'q4-1',
                  question: 'What does the Greek root "bio" mean?',
                  options: [
                    'Water',
                    'Life',
                    'Earth',
                    'Movement'
                  ],
                  correctAnswer: 1,
                  explanation: 'The Greek root "bio" means "life" as in biology (study of life) or biography (writing about someone\'s life).'
                },
                {
                  id: 'q4-2',
                  question: 'Which word contains a Latin root meaning "to write"?',
                  options: [
                    'Telephone',
                    'Microscope',
                    'Manuscript',
                    'Automobile'
                  ],
                  correctAnswer: 2,
                  explanation: 'Manuscript contains the Latin root "script" meaning "to write".'
                },
                {
                  id: 'q4-3',
                  question: 'What does the prefix "poly" mean?',
                  options: [
                    'One',
                    'Many',
                    'Few',
                    'None'
                  ],
                  correctAnswer: 1,
                  explanation: 'The Greek prefix "poly" means "many" as in polygon (many sides) or polyglot (many languages).'
                }
              ],
              timeLimit: 20,
              passingScore: 70
            }
          }
        ]
      }
    ],
    enrolledUsers: []
  },
  {
    id: 'eng-5',
    title: 'Public Speaking Mastery',
    description: 'Build confidence in public speaking, learn presentation techniques, and master verbal communication.',
    price: 94.99,
    imageUrl: 'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=800&auto=format&fit=crop&q=60',
    grade: '3rd',
    teacher: teachers[0],
    units: [
      {
        id: 'eng-5-u1',
        title: 'Speech Fundamentals',
        description: 'Master the basics of public speaking',
        lessons: [
          {
            id: 'eng-5-u1-l1',
            title: 'Speech Structure',
            duration: '45:00',
            videoUrl: 'https://www.youtube.com/embed/Ke90Tje7VS0?autoplay=0&controls=1&disablekb=1&playsinline=1&cc_load_policy=0&widget_referrer=https%3A%2F%2Faladwaa.com&rel=0&showinfo=0&iv_load_policy=3&modestbranding=1&customControls=true&noCookie=false&enablejsapi=1&origin=https%3A%2F%2Faladwaa.com&widgetid=1&forigin=https%3A%2F%2Faladwaa.com&aoriginsup=1&gporigin=https%3A%2F%2Faladwaa.com&vf=2',
            description: 'Learn to organize your speeches effectively',
            type: 'video',
            resources: [
              {
                id: 'eng-5-u1-l1-r1',
                title: 'Speech Template',
                type: 'doc',
                url: '/resources/speech-template.doc'
              }
            ]
          },
          {
            id: 'eng-5-u1-l2',
            title: 'Voice and Body Language',
            duration: '40:00',
            videoUrl: 'https://www.youtube.com/embed/Y2hgEGPzTZY?autoplay=0&controls=1&disablekb=1&playsinline=1&cc_load_policy=0&widget_referrer=https%3A%2F%2Faladwaa.com&rel=0&showinfo=0&iv_load_policy=3&modestbranding=1&customControls=true&noCookie=false&enablejsapi=1&origin=https%3A%2F%2Faladwaa.com&widgetid=1&forigin=https%3A%2F%2Faladwaa.com&aoriginsup=1&gporigin=https%3A%2F%2Faladwaa.com&vf=2',
            description: 'Using your voice and body effectively',
            type: 'video'
          },
          {
            id: 'eng-5-u1-l3',
            title: 'Public Speaking Quiz',
            duration: '15:00',
            description: 'Test your knowledge of public speaking fundamentals',
            type: 'quiz',
            quiz: {
              id: 'q5',
              title: 'Public Speaking Assessment',
              description: 'Test your understanding of speech structure and delivery',
              questions: [
                {
                  id: 'q5-1',
                  question: 'What is the recommended structure for a persuasive speech?',
                  options: [
                    'Introduction, Body, Conclusion',
                    'Hook, Story, Call to Action',
                    'Problem, Solution, Benefits',
                    'Opening, Examples, Summary'
                  ],
                  correctAnswer: 0,
                  explanation: 'A persuasive speech, like most speeches, should follow the basic structure of Introduction, Body, and Conclusion.'
                },
                {
                  id: 'q5-2',
                  question: 'Which of these is NOT an effective way to use body language?',
                  options: [
                    'Making eye contact with the audience',
                    'Using hand gestures to emphasize points',
                    'Standing still in one spot throughout',
                    'Moving purposefully across the stage'
                  ],
                  correctAnswer: 2,
                  explanation: 'Standing still in one spot throughout a speech appears rigid and reduces engagement. Natural movement helps connect with the audience.'
                },
                {
                  id: 'q5-3',
                  question: 'What is the purpose of vocal variety in public speaking?',
                  options: [
                    'To show off your speaking skills',
                    'To keep the audience engaged',
                    'To fill more time',
                    'To sound more professional'
                  ],
                  correctAnswer: 1,
                  explanation: 'Vocal variety (changes in pitch, pace, and volume) helps maintain audience attention and emphasize key points.'
                }
              ],
              timeLimit: 15,
              passingScore: 70
            }
          }
        ]
      },
      {
        id: 'eng-5-u2',
        title: 'Advanced Presentation',
        description: 'Take your presentation skills to the next level',
        lessons: [
          {
            id: 'eng-5-u2-l1',
            title: 'Visual Aids',
            duration: '35:00',
            videoUrl: 'https://www.youtube.com/embed/5fb2aPlgoys?autoplay=0&controls=1&disablekb=1&playsinline=1&cc_load_policy=0&widget_referrer=https%3A%2F%2Faladwaa.com&rel=0&showinfo=0&iv_load_policy=3&modestbranding=1&customControls=true&noCookie=false&enablejsapi=1&origin=https%3A%2F%2Faladwaa.com&widgetid=1&forigin=https%3A%2F%2Faladwaa.com&aoriginsup=1&gporigin=https%3A%2F%2Faladwaa.com&vf=2',
            description: 'Using visual aids effectively',
            type: 'video'
          },
          {
            id: 'eng-5-u2-l2',
            title: 'Audience Engagement',
            duration: '40:00',
            videoUrl: 'https://www.youtube.com/embed/5fb2aPlgoys?autoplay=0&controls=1&disablekb=1&playsinline=1&cc_load_policy=0&widget_referrer=https%3A%2F%2Faladwaa.com&rel=0&showinfo=0&iv_load_policy=3&modestbranding=1&customControls=true&noCookie=false&enablejsapi=1&origin=https%3A%2F%2Faladwaa.com&widgetid=1&forigin=https%3A%2F%2Faladwaa.com&aoriginsup=1&gporigin=https%3A%2F%2Faladwaa.com&vf=2',
            description: 'Techniques for engaging your audience',
            type: 'video'
          }
        ]
      }
    ],
    enrolledUsers: []
  },
  {
    id: 'eng-6',
    title: 'Essay Writing Mastery',
    description: 'Learn to write compelling essays with proper structure, argumentation, and evidence.',
    price: 84.99,
    imageUrl: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?w=800&auto=format&fit=crop&q=60',
    grade: '3rd',
    teacher: teachers[0],
    units: [
      {
        id: 'eng-6-u1',
        title: 'Essay Basics',
        description: 'Master the fundamentals of essay writing',
        lessons: [
          {
            id: 'eng-6-u1-l1',
            title: 'Essay Structure',
            duration: '45:00',
            videoUrl: 'https://www.youtube.com/embed/ShtnEXpYtOo?autoplay=0&controls=1&disablekb=1&playsinline=1&cc_load_policy=0&widget_referrer=https%3A%2F%2Faladwaa.com&rel=0&showinfo=0&iv_load_policy=3&modestbranding=1&customControls=true&noCookie=false&enablejsapi=1&origin=https%3A%2F%2Faladwaa.com&widgetid=1&forigin=https%3A%2F%2Faladwaa.com&aoriginsup=1&gporigin=https%3A%2F%2Faladwaa.com&vf=2',
            description: 'Understanding the parts of an essay',
            type: 'video',
            resources: [
              {
                id: 'eng-6-u1-l1-r1',
                title: 'Essay Outline Template',
                type: 'doc',
                url: '/resources/essay-template.doc'
              }
            ]
          },
          {
            id: 'eng-6-u1-l2',
            title: 'Thesis Development',
            duration: '40:00',
            videoUrl: 'https://www.youtube.com/embed/TNhaISOUy6Q?autoplay=0&controls=1&disablekb=1&playsinline=1&cc_load_policy=0&widget_referrer=https%3A%2F%2Faladwaa.com&rel=0&showinfo=0&iv_load_policy=3&modestbranding=1&customControls=true&noCookie=false&enablejsapi=1&origin=https%3A%2F%2Faladwaa.com&widgetid=1&forigin=https%3A%2F%2Faladwaa.com&aoriginsup=1&gporigin=https%3A%2F%2Faladwaa.com&vf=2',
            description: 'Creating strong thesis statements',
            type: 'video'
          },
          {
            id: 'eng-6-u1-l3',
            title: 'Essay Writing Quiz',
            duration: '20:00',
            description: 'Test your understanding of essay writing fundamentals',
            type: 'quiz',
            quiz: {
              id: 'q6',
              title: 'Essay Writing Assessment',
              description: 'Test your knowledge of essay structure and thesis development',
              questions: [
                {
                  id: 'q6-1',
                  question: 'What is the primary purpose of a thesis statement?',
                  options: [
                    'To summarize the entire essay',
                    'To state the main argument or point',
                    'To introduce the topic generally',
                    'To list all supporting evidence'
                  ],
                  correctAnswer: 1,
                  explanation: 'A thesis statement presents the main argument or central point that your essay will develop and support.'
                },
                {
                  id: 'q6-2',
                  question: 'Which of these is NOT typically part of an essay\'s introduction?',
                  options: [
                    'Hook',
                    'Background information',
                    'Detailed evidence',
                    'Thesis statement'
                  ],
                  correctAnswer: 2,
                  explanation: 'Detailed evidence belongs in the body paragraphs, not the introduction. The introduction should provide context and present your main argument.'
                },
                {
                  id: 'q6-3',
                  question: 'What makes a strong conclusion paragraph?',
                  options: [
                    'Introducing new arguments',
                    'Simply restating the thesis',
                    'Synthesizing main points and implications',
                    'Adding more evidence'
                  ],
                  correctAnswer: 2,
                  explanation: 'A strong conclusion synthesizes the main points and discusses broader implications, rather than just restating or adding new information.'
                }
              ],
              timeLimit: 20,
              passingScore: 70
            }
          }
        ]
      },
      {
        id: 'eng-6-u2',
        title: 'Advanced Arguments',
        description: 'Develop sophisticated argumentation',
        lessons: [
          {
            id: 'eng-6-u2-l1',
            title: 'Evidence and Support',
            duration: '45:00',
            videoUrl: 'https://www.youtube.com/embed/TNhaISOUy6Q?autoplay=0&controls=1&disablekb=1&playsinline=1&cc_load_policy=0&widget_referrer=https%3A%2F%2Faladwaa.com&rel=0&showinfo=0&iv_load_policy=3&modestbranding=1&customControls=true&noCookie=false&enablejsapi=1&origin=https%3A%2F%2Faladwaa.com&widgetid=1&forigin=https%3A%2F%2Faladwaa.com&aoriginsup=1&gporigin=https%3A%2F%2Faladwaa.com&vf=2',
            description: 'Using evidence to support arguments',
            type: 'video'
          },
          {
            id: 'eng-6-u2-l2',
            title: 'Counter Arguments',
            duration: '40:00',
            videoUrl: 'https://www.youtube.com/embed/TNhaISOUy6Q?autoplay=0&controls=1&disablekb=1&playsinline=1&cc_load_policy=0&widget_referrer=https%3A%2F%2Faladwaa.com&rel=0&showinfo=0&iv_load_policy=3&modestbranding=1&customControls=true&noCookie=false&enablejsapi=1&origin=https%3A%2F%2Faladwaa.com&widgetid=1&forigin=https%3A%2F%2Faladwaa.com&aoriginsup=1&gporigin=https%3A%2F%2Faladwaa.com&vf=2',
            description: 'Addressing opposing viewpoints',
            type: 'video'
          }
        ]
      }
    ],
    enrolledUsers: []
  },
  {
    id: 'eng-7',
    title: 'Literature Analysis',
    description: 'Explore classic and modern literature while developing analytical and critical thinking skills.',
    price: 99.99,
    imageUrl: 'https://images.unsplash.com/photo-1491841550275-ad7854e35ca6?w=800&auto=format&fit=crop&q=60',
    grade: '3rd',
    teacher: teachers[0],
    units: [
      {
        id: 'eng-7-u1',
        title: 'Literary Elements',
        description: 'Understanding the building blocks of literature',
        lessons: [
          {
            id: 'eng-7-u1-l1',
            title: 'Character Analysis',
            duration: '45:00',
            videoUrl: 'https://www.youtube.com/embed/TNhaISOUy6Q?autoplay=0&controls=1&disablekb=1&playsinline=1&cc_load_policy=0&widget_referrer=https%3A%2F%2Faladwaa.com&rel=0&showinfo=0&iv_load_policy=3&modestbranding=1&customControls=true&noCookie=false&enablejsapi=1&origin=https%3A%2F%2Faladwaa.com&widgetid=1&forigin=https%3A%2F%2Faladwaa.com&aoriginsup=1&gporigin=https%3A%2F%2Faladwaa.com&vf=2',
            description: 'Understanding character development and motivation',
            type: 'video',
            resources: [
              {
                id: 'eng-7-u1-l1-r1',
                title: 'Character Analysis Worksheet',
                type: 'pdf',
                url: '/resources/character-analysis.pdf'
              }
            ]
          },
          {
            id: 'eng-7-u1-l2',
            title: 'Theme and Symbolism',
            duration: '40:00',
            videoUrl: 'https://www.youtube.com/embed/TNhaISOUy6Q?autoplay=0&controls=1&disablekb=1&playsinline=1&cc_load_policy=0&widget_referrer=https%3A%2F%2Faladwaa.com&rel=0&showinfo=0&iv_load_policy=3&modestbranding=1&customControls=true&noCookie=false&enablejsapi=1&origin=https%3A%2F%2Faladwaa.com&widgetid=1&forigin=https%3A%2F%2Faladwaa.com&aoriginsup=1&gporigin=https%3A%2F%2Faladwaa.com&vf=2',
            description: 'Identifying themes and symbols in literature',
            type: 'video'
          }
        ]
      },
      {
        id: 'eng-7-u2',
        title: 'Literary Analysis',
        description: 'Advanced techniques for analyzing literature',
        lessons: [
          {
            id: 'eng-7-u2-l1',
            title: 'Critical Reading',
            duration: '45:00',
            videoUrl: 'https://www.youtube.com/embed/TNhaISOUy6Q?autoplay=0&controls=1&disablekb=1&playsinline=1&cc_load_policy=0&widget_referrer=https%3A%2F%2Faladwaa.com&rel=0&showinfo=0&iv_load_policy=3&modestbranding=1&customControls=true&noCookie=false&enablejsapi=1&origin=https%3A%2F%2Faladwaa.com&widgetid=1&forigin=https%3A%2F%2Faladwaa.com&aoriginsup=1&gporigin=https%3A%2F%2Faladwaa.com&vf=2',
            description: 'Developing critical reading skills',
            type: 'video'
          },
          {
            id: 'eng-7-u2-l2',
            title: 'Literary Criticism',
            duration: '40:00',
            videoUrl: 'https://www.youtube.com/embed/TNhaISOUy6Q?autoplay=0&controls=1&disablekb=1&playsinline=1&cc_load_policy=0&widget_referrer=https%3A%2F%2Faladwaa.com&rel=0&showinfo=0&iv_load_policy=3&modestbranding=1&customControls=true&noCookie=false&enablejsapi=1&origin=https%3A%2F%2Faladwaa.com&widgetid=1&forigin=https%3A%2F%2Faladwaa.com&aoriginsup=1&gporigin=https%3A%2F%2Faladwaa.com&vf=2',
            description: 'Introduction to literary criticism approaches',
            type: 'video'
          }
        ]
      }
    ],
    enrolledUsers: []
  },
  {
    id: 'eng-8',
    title: 'Business English',
    description: 'Master professional English communication skills for the workplace and business environment.',
    price: 89.99,
    imageUrl: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=800&auto=format&fit=crop&q=60',
    grade: '3rd',
    teacher: teachers[0],
    units: [
      {
        id: 'eng-8-u1',
        title: 'Business Communication',
        description: 'Essential business communication skills',
        lessons: [
          {
            id: 'eng-8-u1-l1',
            title: 'Business Writing',
            duration: '45:00',
            videoUrl: 'https://www.youtube.com/embed/TNhaISOUy6Q?autoplay=0&controls=1&disablekb=1&playsinline=1&cc_load_policy=0&widget_referrer=https%3A%2F%2Faladwaa.com&rel=0&showinfo=0&iv_load_policy=3&modestbranding=1&customControls=true&noCookie=false&enablejsapi=1&origin=https%3A%2F%2Faladwaa.com&widgetid=1&forigin=https%3A%2F%2Faladwaa.com&aoriginsup=1&gporigin=https%3A%2F%2Faladwaa.com&vf=2',
            description: 'Writing effective business documents',
            type: 'video',
            resources: [
              {
                id: 'eng-8-u1-l1-r1',
                title: 'Business Writing Templates',
                type: 'doc',
                url: '/resources/business-templates.doc'
              }
            ]
          },
          {
            id: 'eng-8-u1-l2',
            title: 'Email Etiquette',
            duration: '40:00',
            videoUrl: 'https://www.youtube.com/embed/TNhaISOUy6Q?autoplay=0&controls=1&disablekb=1&playsinline=1&cc_load_policy=0&widget_referrer=https%3A%2F%2Faladwaa.com&rel=0&showinfo=0&iv_load_policy=3&modestbranding=1&customControls=true&noCookie=false&enablejsapi=1&origin=https%3A%2F%2Faladwaa.com&widgetid=1&forigin=https%3A%2F%2Faladwaa.com&aoriginsup=1&gporigin=https%3A%2F%2Faladwaa.com&vf=2',
            description: 'Professional email communication',
            type: 'video'
          }
        ]
      },
      {
        id: 'eng-8-u2',
        title: 'Professional Skills',
        description: 'Advanced business communication',
        lessons: [
          {
            id: 'eng-8-u2-l1',
            title: 'Meeting Management',
            duration: '45:00',
            videoUrl: 'https://www.youtube.com/embed/TNhaISOUy6Q?autoplay=0&controls=1&disablekb=1&playsinline=1&cc_load_policy=0&widget_referrer=https%3A%2F%2Faladwaa.com&rel=0&showinfo=0&iv_load_policy=3&modestbranding=1&customControls=true&noCookie=false&enablejsapi=1&origin=https%3A%2F%2Faladwaa.com&widgetid=1&forigin=https%3A%2F%2Faladwaa.com&aoriginsup=1&gporigin=https%3A%2F%2Faladwaa.com&vf=2',
            description: 'Running effective business meetings',
            type: 'video'
          },
          {
            id: 'eng-8-u2-l2',
            title: 'Negotiation Skills',
            duration: '40:00',
            videoUrl: 'https://www.youtube.com/embed/TNhaISOUy6Q?autoplay=0&controls=1&disablekb=1&playsinline=1&cc_load_policy=0&widget_referrer=https%3A%2F%2Faladwaa.com&rel=0&showinfo=0&iv_load_policy=3&modestbranding=1&customControls=true&noCookie=false&enablejsapi=1&origin=https%3A%2F%2Faladwaa.com&widgetid=1&forigin=https%3A%2F%2Faladwaa.com&aoriginsup=1&gporigin=https%3A%2F%2Faladwaa.com&vf=2',
            description: 'Business negotiation techniques',
            type: 'video'
          }
        ]
      }
    ],
    enrolledUsers: []
  },
  {
    id: 'eng-9',
    title: 'IELTS Preparation',
    description: 'Comprehensive preparation for the IELTS exam with practice tests and proven strategies.',
    price: 94.99,
    imageUrl: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&auto=format&fit=crop&q=60',
    grade: '3rd',
    teacher: teachers[0],
    units: [],
    enrolledUsers: []
  },
  {
    id: 'eng-10',
    title: 'English Pronunciation & Accent',
    description: 'Master English pronunciation, reduce accent, and speak with clarity and confidence.',
    price: 79.99,
    imageUrl: 'https://images.unsplash.com/photo-1543269865-cbf427effbad?w=800&auto=format&fit=crop&q=60',
    grade: '1st',
    teacher: teachers[0],
    units: [],
    enrolledUsers: []
  },
  {
    id: 'eng-11',
    title: 'English for Academic Success',
    description: 'Develop essential academic English skills for research, presentations, and scholarly writing.',
    price: 89.99,
    imageUrl: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800&auto=format&fit=crop&q=60',
    grade: '2nd',
    teacher: teachers[0],
    units: [
      {
        id: 'eng-11-u1',
        title: 'Academic Writing',
        description: 'Master academic writing skills',
        lessons: [
          {
            id: 'eng-11-u1-l1',
            title: 'Research Papers',
            duration: '45:00',
            videoUrl: 'https://www.youtube.com/embed/TNhaISOUy6Q?autoplay=0&controls=1&disablekb=1&playsinline=1&cc_load_policy=0&widget_referrer=https%3A%2F%2Faladwaa.com&rel=0&showinfo=0&iv_load_policy=3&modestbranding=1&customControls=true&noCookie=false&enablejsapi=1&origin=https%3A%2F%2Faladwaa.com&widgetid=1&forigin=https%3A%2F%2Faladwaa.com&aoriginsup=1&gporigin=https%3A%2F%2Faladwaa.com&vf=2',
            description: 'Writing effective research papers',
            type: 'video',
            resources: [
              {
                id: 'eng-11-u1-l1-r1',
                title: 'Research Paper Template',
                type: 'doc',
                url: '/resources/research-template.doc'
              }
            ]
          },
          {
            id: 'eng-11-u1-l2',
            title: 'Citations',
            duration: '40:00',
            videoUrl: 'https://www.youtube.com/embed/TNhaISOUy6Q?autoplay=0&controls=1&disablekb=1&playsinline=1&cc_load_policy=0&widget_referrer=https%3A%2F%2Faladwaa.com&rel=0&showinfo=0&iv_load_policy=3&modestbranding=1&customControls=true&noCookie=false&enablejsapi=1&origin=https%3A%2F%2Faladwaa.com&widgetid=1&forigin=https%3A%2F%2Faladwaa.com&aoriginsup=1&gporigin=https%3A%2F%2Faladwaa.com&vf=2',
            description: 'Proper citation methods',
            type: 'video'
          }
        ]
      },
      {
        id: 'eng-11-u2',
        title: 'Academic Speaking',
        description: 'Develop academic presentation skills',
        lessons: [
          {
            id: 'eng-11-u2-l1',
            title: 'Presentations',
            duration: '45:00',
            videoUrl: 'https://www.youtube.com/embed/TNhaISOUy6Q?autoplay=0&controls=1&disablekb=1&playsinline=1&cc_load_policy=0&widget_referrer=https%3A%2F%2Faladwaa.com&rel=0&showinfo=0&iv_load_policy=3&modestbranding=1&customControls=true&noCookie=false&enablejsapi=1&origin=https%3A%2F%2Faladwaa.com&widgetid=1&forigin=https%3A%2F%2Faladwaa.com&aoriginsup=1&gporigin=https%3A%2F%2Faladwaa.com&vf=2',
            description: 'Academic presentation techniques',
            type: 'video'
          },
          {
            id: 'eng-11-u2-l2',
            title: 'Q&A Sessions',
            duration: '40:00',
            videoUrl: 'https://www.youtube.com/embed/TNhaISOUy6Q?autoplay=0&controls=1&disablekb=1&playsinline=1&cc_load_policy=0&widget_referrer=https%3A%2F%2Faladwaa.com&rel=0&showinfo=0&iv_load_policy=3&modestbranding=1&customControls=true&noCookie=false&enablejsapi=1&origin=https%3A%2F%2Faladwaa.com&widgetid=1&forigin=https%3A%2F%2Faladwaa.com&aoriginsup=1&gporigin=https%3A%2F%2Faladwaa.com&vf=2',
            description: 'Handling academic discussions',
            type: 'video'
          }
        ]
      }
    ],
    enrolledUsers: []
  },
  {
    id: 'eng-12',
    title: 'English Literature Classics',
    description: 'Explore timeless works of English literature from Shakespeare to modern classics.',
    price: 94.99,
    imageUrl: 'https://images.unsplash.com/photo-1474932430478-367dbb6832c1?w=800&auto=format&fit=crop&q=60',
    grade: '3rd',
    teacher: teachers[0],
    units: [
      {
        id: 'eng-12-u1',
        title: 'Shakespeare',
        description: 'Study Shakespearean works',
        lessons: [
          {
            id: 'eng-12-u1-l1',
            title: 'Romeo and Juliet',
            duration: '45:00',
            videoUrl: 'https://www.youtube.com/embed/TNhaISOUy6Q?autoplay=0&controls=1&disablekb=1&playsinline=1&cc_load_policy=0&widget_referrer=https%3A%2F%2Faladwaa.com&rel=0&showinfo=0&iv_load_policy=3&modestbranding=1&customControls=true&noCookie=false&enablejsapi=1&origin=https%3A%2F%2Faladwaa.com&widgetid=1&forigin=https%3A%2F%2Faladwaa.com&aoriginsup=1&gporigin=https%3A%2F%2Faladwaa.com&vf=2',
            description: 'Analysis of Romeo and Juliet',
            type: 'video',
            resources: [
              {
                id: 'eng-12-u1-l1-r1',
                title: 'Play Analysis Guide',
                type: 'pdf',
                url: '/resources/shakespeare-guide.pdf'
              }
            ]
          },
          {
            id: 'eng-12-u1-l2',
            title: 'Macbeth',
            duration: '40:00',
            videoUrl: 'https://www.youtube.com/embed/TNhaISOUy6Q?autoplay=0&controls=1&disablekb=1&playsinline=1&cc_load_policy=0&widget_referrer=https%3A%2F%2Faladwaa.com&rel=0&showinfo=0&iv_load_policy=3&modestbranding=1&customControls=true&noCookie=false&enablejsapi=1&origin=https%3A%2F%2Faladwaa.com&widgetid=1&forigin=https%3A%2F%2Faladwaa.com&aoriginsup=1&gporigin=https%3A%2F%2Faladwaa.com&vf=2',
            description: 'Analysis of Macbeth',
            type: 'video'
          }
        ]
      },
      {
        id: 'eng-12-u2',
        title: 'Modern Classics',
        description: 'Explore modern literary masterpieces',
        lessons: [
          {
            id: 'eng-12-u2-l1',
            title: '20th Century Literature',
            duration: '45:00',
            videoUrl: 'https://www.youtube.com/embed/TNhaISOUy6Q?autoplay=0&controls=1&disablekb=1&playsinline=1&cc_load_policy=0&widget_referrer=https%3A%2F%2Faladwaa.com&rel=0&showinfo=0&iv_load_policy=3&modestbranding=1&customControls=true&noCookie=false&enablejsapi=1&origin=https%3A%2F%2Faladwaa.com&widgetid=1&forigin=https%3A%2F%2Faladwaa.com&aoriginsup=1&gporigin=https%3A%2F%2Faladwaa.com&vf=2',
            description: 'Key works of the 20th century',
            type: 'video'
          },
          {
            id: 'eng-12-u2-l2',
            title: 'Contemporary Literature',
            duration: '40:00',
            videoUrl: 'https://www.youtube.com/embed/TNhaISOUy6Q?autoplay=0&controls=1&disablekb=1&playsinline=1&cc_load_policy=0&widget_referrer=https%3A%2F%2Faladwaa.com&rel=0&showinfo=0&iv_load_policy=3&modestbranding=1&customControls=true&noCookie=false&enablejsapi=1&origin=https%3A%2F%2Faladwaa.com&widgetid=1&forigin=https%3A%2F%2Faladwaa.com&aoriginsup=1&gporigin=https%3A%2F%2Faladwaa.com&vf=2',
            description: 'Analysis of contemporary works',
            type: 'video'
          }
        ]
      }
    ],
    enrolledUsers: []
  },
  {
    id: 'eng-13',
    title: 'English Debate Skills',
    description: 'Learn effective argumentation, critical thinking, and persuasive speaking in English.',
    price: 84.99,
    imageUrl: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=800&auto=format&fit=crop&q=60',
    grade: '2nd',
    teacher: teachers[0],
    units: [
      {
        id: 'eng-13-u1',
        title: 'Debate Fundamentals',
        description: 'Learn the basics of formal debate',
        lessons: [
          {
            id: 'eng-13-u1-l1',
            title: 'Debate Structure',
            duration: '45:00',
            videoUrl: 'https://www.youtube.com/embed/TNhaISOUy6Q?autoplay=0&controls=1&disablekb=1&playsinline=1&cc_load_policy=0&widget_referrer=https%3A%2F%2Faladwaa.com&rel=0&showinfo=0&iv_load_policy=3&modestbranding=1&customControls=true&noCookie=false&enablejsapi=1&origin=https%3A%2F%2Faladwaa.com&widgetid=1&forigin=https%3A%2F%2Faladwaa.com&aoriginsup=1&gporigin=https%3A%2F%2Faladwaa.com&vf=2',
            description: 'Understanding debate formats',
            type: 'video',
            resources: [
              {
                id: 'eng-13-u1-l1-r1',
                title: 'Debate Format Guide',
                type: 'pdf',
                url: '/resources/debate-guide.pdf'
              }
            ]
          },
          {
            id: 'eng-13-u1-l2',
            title: 'Argument Building',
            duration: '40:00',
            videoUrl: 'https://www.youtube.com/embed/TNhaISOUy6Q?autoplay=0&controls=1&disablekb=1&playsinline=1&cc_load_policy=0&widget_referrer=https%3A%2F%2Faladwaa.com&rel=0&showinfo=0&iv_load_policy=3&modestbranding=1&customControls=true&noCookie=false&enablejsapi=1&origin=https%3A%2F%2Faladwaa.com&widgetid=1&forigin=https%3A%2F%2Faladwaa.com&aoriginsup=1&gporigin=https%3A%2F%2Faladwaa.com&vf=2',
            description: 'Constructing strong arguments',
            type: 'video'
          }
        ]
      },
      {
        id: 'eng-13-u2',
        title: 'Advanced Debate',
        description: 'Master advanced debate techniques',
        lessons: [
          {
            id: 'eng-13-u2-l1',
            title: 'Rebuttal Strategies',
            duration: '45:00',
            videoUrl: 'https://www.youtube.com/embed/TNhaISOUy6Q?autoplay=0&controls=1&disablekb=1&playsinline=1&cc_load_policy=0&widget_referrer=https%3A%2F%2Faladwaa.com&rel=0&showinfo=0&iv_load_policy=3&modestbranding=1&customControls=true&noCookie=false&enablejsapi=1&origin=https%3A%2F%2Faladwaa.com&widgetid=1&forigin=https%3A%2F%2Faladwaa.com&aoriginsup=1&gporigin=https%3A%2F%2Faladwaa.com&vf=2',
            description: 'Effective counter-arguments',
            type: 'video'
          },
          {
            id: 'eng-13-u2-l2',
            title: 'Cross-examination',
            duration: '40:00',
            videoUrl: 'https://www.youtube.com/embed/TNhaISOUy6Q?autoplay=0&controls=1&disablekb=1&playsinline=1&cc_load_policy=0&widget_referrer=https%3A%2F%2Faladwaa.com&rel=0&showinfo=0&iv_load_policy=3&modestbranding=1&customControls=true&noCookie=false&enablejsapi=1&origin=https%3A%2F%2Faladwaa.com&widgetid=1&forigin=https%3A%2F%2Faladwaa.com&aoriginsup=1&gporigin=https%3A%2F%2Faladwaa.com&vf=2',
            description: 'Mastering cross-examination',
            type: 'video'
          }
        ]
      }
    ],
    enrolledUsers: []
  },
  {
    id: 'eng-14',
    title: 'English Poetry Workshop',
    description: 'Discover the beauty of English poetry through reading, analysis, and creative writing.',
    price: 79.99,
    imageUrl: 'https://images.unsplash.com/photo-1506880018603-83d5b814b5a6?w=800&auto=format&fit=crop&q=60',
    grade: '3rd',
    teacher: teachers[0],
    units: [
      {
        id: 'eng-14-u1',
        title: 'Poetry Basics',
        description: 'Introduction to poetry elements',
        lessons: [
          {
            id: 'eng-14-u1-l1',
            title: 'Poetic Forms',
            duration: '45:00',
            videoUrl: 'https://www.youtube.com/embed/TNhaISOUy6Q?autoplay=0&controls=1&disablekb=1&playsinline=1&cc_load_policy=0&widget_referrer=https%3A%2F%2Faladwaa.com&rel=0&showinfo=0&iv_load_policy=3&modestbranding=1&customControls=true&noCookie=false&enablejsapi=1&origin=https%3A%2F%2Faladwaa.com&widgetid=1&forigin=https%3A%2F%2Faladwaa.com&aoriginsup=1&gporigin=https%3A%2F%2Faladwaa.com&vf=2',
            description: 'Understanding different poetry forms',
            type: 'video',
            resources: [
              {
                id: 'eng-14-u1-l1-r1',
                title: 'Poetry Forms Guide',
                type: 'pdf',
                url: '/resources/poetry-guide.pdf'
              }
            ]
          },
          {
            id: 'eng-14-u1-l2',
            title: 'Poetic Devices',
            duration: '40:00',
            videoUrl: 'https://www.youtube.com/embed/TNhaISOUy6Q?autoplay=0&controls=1&disablekb=1&playsinline=1&cc_load_policy=0&widget_referrer=https%3A%2F%2Faladwaa.com&rel=0&showinfo=0&iv_load_policy=3&modestbranding=1&customControls=true&noCookie=false&enablejsapi=1&origin=https%3A%2F%2Faladwaa.com&widgetid=1&forigin=https%3A%2F%2Faladwaa.com&aoriginsup=1&gporigin=https%3A%2F%2Faladwaa.com&vf=2',
            description: 'Learning literary devices in poetry',
            type: 'video'
          }
        ]
      },
      {
        id: 'eng-14-u2',
        title: 'Creative Writing',
        description: 'Write your own poetry',
        lessons: [
          {
            id: 'eng-14-u2-l1',
            title: 'Finding Inspiration',
            duration: '45:00',
            videoUrl: 'https://www.youtube.com/embed/TNhaISOUy6Q?autoplay=0&controls=1&disablekb=1&playsinline=1&cc_load_policy=0&widget_referrer=https%3A%2F%2Faladwaa.com&rel=0&showinfo=0&iv_load_policy=3&modestbranding=1&customControls=true&noCookie=false&enablejsapi=1&origin=https%3A%2F%2Faladwaa.com&widgetid=1&forigin=https%3A%2F%2Faladwaa.com&aoriginsup=1&gporigin=https%3A%2F%2Faladwaa.com&vf=2',
            description: 'Sources of poetic inspiration',
            type: 'video'
          },
          {
            id: 'eng-14-u2-l2',
            title: 'Poetry Workshop',
            duration: '40:00',
            videoUrl: 'https://www.youtube.com/embed/TNhaISOUy6Q?autoplay=0&controls=1&disablekb=1&playsinline=1&cc_load_policy=0&widget_referrer=https%3A%2F%2Faladwaa.com&rel=0&showinfo=0&iv_load_policy=3&modestbranding=1&customControls=true&noCookie=false&enablejsapi=1&origin=https%3A%2F%2Faladwaa.com&widgetid=1&forigin=https%3A%2F%2Faladwaa.com&aoriginsup=1&gporigin=https%3A%2F%2Faladwaa.com&vf=2',
            description: 'Writing and reviewing poetry',
            type: 'video'
          }
        ]
      }
    ],
    enrolledUsers: []
  },
  {
    id: 'eng-15',
    title: 'English for Social Media',
    description: 'Master modern English usage in social media, digital content, and online communication.',
    price: 69.99,
    imageUrl: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=800&auto=format&fit=crop&q=60',
    grade: '1st',
    teacher: teachers[0],
    units: [
      {
        id: 'eng-15-u1',
        title: 'Digital Writing',
        description: 'Writing for online platforms',
        lessons: [
          {
            id: 'eng-15-u1-l1',
            title: 'Social Media Posts',
            duration: '45:00',
            videoUrl: 'https://www.youtube.com/embed/TNhaISOUy6Q?autoplay=0&controls=1&disablekb=1&playsinline=1&cc_load_policy=0&widget_referrer=https%3A%2F%2Faladwaa.com&rel=0&showinfo=0&iv_load_policy=3&modestbranding=1&customControls=true&noCookie=false&enablejsapi=1&origin=https%3A%2F%2Faladwaa.com&widgetid=1&forigin=https%3A%2F%2Faladwaa.com&aoriginsup=1&gporigin=https%3A%2F%2Faladwaa.com&vf=2',
            description: 'Creating engaging social media content',
            type: 'video',
            resources: [
              {
                id: 'eng-15-u1-l1-r1',
                title: 'Social Media Guide',
                type: 'pdf',
                url: '/resources/social-media-guide.pdf'
              }
            ]
          },
          {
            id: 'eng-15-u1-l2',
            title: 'Blog Writing',
            duration: '40:00',
            videoUrl: 'https://www.youtube.com/embed/TNhaISOUy6Q?autoplay=0&controls=1&disablekb=1&playsinline=1&cc_load_policy=0&widget_referrer=https%3A%2F%2Faladwaa.com&rel=0&showinfo=0&iv_load_policy=3&modestbranding=1&customControls=true&noCookie=false&enablejsapi=1&origin=https%3A%2F%2Faladwaa.com&widgetid=1&forigin=https%3A%2F%2Faladwaa.com&aoriginsup=1&gporigin=https%3A%2F%2Faladwaa.com&vf=2',
            description: 'Writing effective blog posts',
            type: 'video'
          }
        ]
      },
      {
        id: 'eng-15-u2',
        title: 'Online Communication',
        description: 'Professional online interaction',
        lessons: [
          {
            id: 'eng-15-u2-l1',
            title: 'Digital Etiquette',
            duration: '45:00',
            videoUrl: 'https://www.youtube.com/embed/TNhaISOUy6Q?autoplay=0&controls=1&disablekb=1&playsinline=1&cc_load_policy=0&widget_referrer=https%3A%2F%2Faladwaa.com&rel=0&showinfo=0&iv_load_policy=3&modestbranding=1&customControls=true&noCookie=false&enablejsapi=1&origin=https%3A%2F%2Faladwaa.com&widgetid=1&forigin=https%3A%2F%2Faladwaa.com&aoriginsup=1&gporigin=https%3A%2F%2Faladwaa.com&vf=2',
            description: 'Professional online behavior',
            type: 'video'
          },
          {
            id: 'eng-15-u2-l2',
            title: 'Personal Branding',
            duration: '40:00',
            videoUrl: 'https://www.youtube.com/embed/TNhaISOUy6Q?autoplay=0&controls=1&disablekb=1&playsinline=1&cc_load_policy=0&widget_referrer=https%3A%2F%2Faladwaa.com&rel=0&showinfo=0&iv_load_policy=3&modestbranding=1&customControls=true&noCookie=false&enablejsapi=1&origin=https%3A%2F%2Faladwaa.com&widgetid=1&forigin=https%3A%2F%2Faladwaa.com&aoriginsup=1&gporigin=https%3A%2F%2Faladwaa.com&vf=2',
            description: 'Building your online presence',
            type: 'video'
          }
        ]
      }
    ],
    enrolledUsers: []
  },
  {
    id: 'eng-16',
    title: 'English Interview Skills',
    description: 'Prepare for academic and professional interviews with confidence in English.',
    price: 89.99,
    imageUrl: 'https://images.unsplash.com/photo-1565688534245-05d6b5be184a?w=800&auto=format&fit=crop&q=60',
    grade: '3rd',
    teacher: teachers[0],
    units: [
      {
        id: 'eng-16-u1',
        title: 'Interview Preparation',
        description: 'Essential interview skills',
        lessons: [
          {
            id: 'eng-16-u1-l1',
            title: 'Common Questions',
            duration: '45:00',
            videoUrl: 'https://www.youtube.com/embed/TNhaISOUy6Q?autoplay=0&controls=1&disablekb=1&playsinline=1&cc_load_policy=0&widget_referrer=https%3A%2F%2Faladwaa.com&rel=0&showinfo=0&iv_load_policy=3&modestbranding=1&customControls=true&noCookie=false&enablejsapi=1&origin=https%3A%2F%2Faladwaa.com&widgetid=1&forigin=https%3A%2F%2Faladwaa.com&aoriginsup=1&gporigin=https%3A%2F%2Faladwaa.com&vf=2',
            description: 'Answering common interview questions',
            type: 'video',
            resources: [
              {
                id: 'eng-16-u1-l1-r1',
                title: 'Interview Questions Guide',
                type: 'pdf',
                url: '/resources/interview-guide.pdf'
              }
            ]
          },
          {
            id: 'eng-16-u1-l2',
            title: 'Body Language',
            duration: '40:00',
            videoUrl: 'https://www.youtube.com/embed/TNhaISOUy6Q?autoplay=0&controls=1&disablekb=1&playsinline=1&cc_load_policy=0&widget_referrer=https%3A%2F%2Faladwaa.com&rel=0&showinfo=0&iv_load_policy=3&modestbranding=1&customControls=true&noCookie=false&enablejsapi=1&origin=https%3A%2F%2Faladwaa.com&widgetid=1&forigin=https%3A%2F%2Faladwaa.com&aoriginsup=1&gporigin=https%3A%2F%2Faladwaa.com&vf=2',
            description: 'Professional body language',
            type: 'video'
          }
        ]
      },
      {
        id: 'eng-16-u2',
        title: 'Advanced Interviewing',
        description: 'Master complex interview scenarios',
        lessons: [
          {
            id: 'eng-16-u2-l1',
            title: 'Behavioral Questions',
            duration: '45:00',
            videoUrl: 'https://www.youtube.com/embed/TNhaISOUy6Q?autoplay=0&controls=1&disablekb=1&playsinline=1&cc_load_policy=0&widget_referrer=https%3A%2F%2Faladwaa.com&rel=0&showinfo=0&iv_load_policy=3&modestbranding=1&customControls=true&noCookie=false&enablejsapi=1&origin=https%3A%2F%2Faladwaa.com&widgetid=1&forigin=https%3A%2F%2Faladwaa.com&aoriginsup=1&gporigin=https%3A%2F%2Faladwaa.com&vf=2',
            description: 'Handling behavioral questions',
            type: 'video'
          },
          {
            id: 'eng-16-u2-l2',
            title: 'Group Interviews',
            duration: '40:00',
            videoUrl: 'https://www.youtube.com/embed/TNhaISOUy6Q?autoplay=0&controls=1&disablekb=1&playsinline=1&cc_load_policy=0&widget_referrer=https%3A%2F%2Faladwaa.com&rel=0&showinfo=0&iv_load_policy=3&modestbranding=1&customControls=true&noCookie=false&enablejsapi=1&origin=https%3A%2F%2Faladwaa.com&widgetid=1&forigin=https%3A%2F%2Faladwaa.com&aoriginsup=1&gporigin=https%3A%2F%2Faladwaa.com&vf=2',
            description: 'Succeeding in group interviews',
            type: 'video'
          }
        ]
      }
    ],
    enrolledUsers: []
  },
  {
    id: 'eng-17',
    title: 'English Writing Style',
    description: 'Develop your unique writing voice and master different writing styles in English.',
    price: 84.99,
    imageUrl: 'https://images.unsplash.com/photo-1512486130939-2c4f79935e4f?w=800&auto=format&fit=crop&q=60',
    grade: '2nd',
    teacher: teachers[0],
    units: [
      {
        id: 'eng-17-u1',
        title: 'Writing Voice',
        description: 'Develop your unique writing style',
        lessons: [
          {
            id: 'eng-17-u1-l1',
            title: 'Finding Your Voice',
            duration: '45:00',
            videoUrl: 'https://www.youtube.com/embed/TNhaISOUy6Q?autoplay=0&controls=1&disablekb=1&playsinline=1&cc_load_policy=0&widget_referrer=https%3A%2F%2Faladwaa.com&rel=0&showinfo=0&iv_load_policy=3&modestbranding=1&customControls=true&noCookie=false&enablejsapi=1&origin=https%3A%2F%2Faladwaa.com&widgetid=1&forigin=https%3A%2F%2Faladwaa.com&aoriginsup=1&gporigin=https%3A%2F%2Faladwaa.com&vf=2',
            description: 'Developing a personal writing style',
            type: 'video',
            resources: [
              {
                id: 'eng-17-u1-l1-r1',
                title: 'Writing Style Guide',
                type: 'pdf',
                url: '/resources/style-guide.pdf'
              }
            ]
          },
          {
            id: 'eng-17-u1-l2',
            title: 'Style Elements',
            duration: '40:00',
            videoUrl: 'https://www.youtube.com/embed/TNhaISOUy6Q?autoplay=0&controls=1&disablekb=1&playsinline=1&cc_load_policy=0&widget_referrer=https%3A%2F%2Faladwaa.com&rel=0&showinfo=0&iv_load_policy=3&modestbranding=1&customControls=true&noCookie=false&enablejsapi=1&origin=https%3A%2F%2Faladwaa.com&widgetid=1&forigin=https%3A%2F%2Faladwaa.com&aoriginsup=1&gporigin=https%3A%2F%2Faladwaa.com&vf=2',
            description: 'Key elements of writing style',
            type: 'video'
          }
        ]
      },
      {
        id: 'eng-17-u2',
        title: 'Writing Genres',
        description: 'Master different writing genres',
        lessons: [
          {
            id: 'eng-17-u2-l1',
            title: 'Creative Writing',
            duration: '45:00',
            videoUrl: 'https://www.youtube.com/embed/TNhaISOUy6Q?autoplay=0&controls=1&disablekb=1&playsinline=1&cc_load_policy=0&widget_referrer=https%3A%2F%2Faladwaa.com&rel=0&showinfo=0&iv_load_policy=3&modestbranding=1&customControls=true&noCookie=false&enablejsapi=1&origin=https%3A%2F%2Faladwaa.com&widgetid=1&forigin=https%3A%2F%2Faladwaa.com&aoriginsup=1&gporigin=https%3A%2F%2Faladwaa.com&vf=2',
            description: 'Creative writing techniques',
            type: 'video'
          },
          {
            id: 'eng-17-u2-l2',
            title: 'Professional Writing',
            duration: '40:00',
            videoUrl: 'https://www.youtube.com/embed/TNhaISOUy6Q?autoplay=0&controls=1&disablekb=1&playsinline=1&cc_load_policy=0&widget_referrer=https%3A%2F%2Faladwaa.com&rel=0&showinfo=0&iv_load_policy=3&modestbranding=1&customControls=true&noCookie=false&enablejsapi=1&origin=https%3A%2F%2Faladwaa.com&widgetid=1&forigin=https%3A%2F%2Faladwaa.com&aoriginsup=1&gporigin=https%3A%2F%2Faladwaa.com&vf=2',
            description: 'Business and technical writing',
            type: 'video'
          }
        ]
      }
    ],
    enrolledUsers: []
  },
  {
    id: 'eng-18',
    title: 'English News & Media',
    description: 'Learn to understand and analyze English news, media content, and current events.',
    price: 74.99,
    imageUrl: 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=800&auto=format&fit=crop&q=60',
    grade: '3rd',
    teacher: teachers[0],
    units: [
      {
        id: 'eng-18-u1',
        title: 'News Analysis',
        description: 'Understanding news media',
        lessons: [
          {
            id: 'eng-18-u1-l1',
            title: 'News Structure',
            duration: '45:00',
            videoUrl: 'https://www.youtube.com/embed/TNhaISOUy6Q?autoplay=0&controls=1&disablekb=1&playsinline=1&cc_load_policy=0&widget_referrer=https%3A%2F%2Faladwaa.com&rel=0&showinfo=0&iv_load_policy=3&modestbranding=1&customControls=true&noCookie=false&enablejsapi=1&origin=https%3A%2F%2Faladwaa.com&widgetid=1&forigin=https%3A%2F%2Faladwaa.com&aoriginsup=1&gporigin=https%3A%2F%2Faladwaa.com&vf=2',
            description: 'Understanding news article structure',
            type: 'video',
            resources: [
              {
                id: 'eng-18-u1-l1-r1',
                title: 'News Analysis Guide',
                type: 'pdf',
                url: '/resources/news-guide.pdf'
              }
            ]
          },
          {
            id: 'eng-18-u1-l2',
            title: 'Media Bias',
            duration: '40:00',
            videoUrl: 'https://www.youtube.com/embed/TNhaISOUy6Q?autoplay=0&controls=1&disablekb=1&playsinline=1&cc_load_policy=0&widget_referrer=https%3A%2F%2Faladwaa.com&rel=0&showinfo=0&iv_load_policy=3&modestbranding=1&customControls=true&noCookie=false&enablejsapi=1&origin=https%3A%2F%2Faladwaa.com&widgetid=1&forigin=https%3A%2F%2Faladwaa.com&aoriginsup=1&gporigin=https%3A%2F%2Faladwaa.com&vf=2',
            description: 'Identifying and understanding media bias',
            type: 'video'
          }
        ]
      },
      {
        id: 'eng-18-u2',
        title: 'Current Events',
        description: 'Engaging with current events',
        lessons: [
          {
            id: 'eng-18-u2-l1',
            title: 'Global News',
            duration: '45:00',
            videoUrl: 'https://www.youtube.com/embed/TNhaISOUy6Q?autoplay=0&controls=1&disablekb=1&playsinline=1&cc_load_policy=0&widget_referrer=https%3A%2F%2Faladwaa.com&rel=0&showinfo=0&iv_load_policy=3&modestbranding=1&customControls=true&noCookie=false&enablejsapi=1&origin=https%3A%2F%2Faladwaa.com&widgetid=1&forigin=https%3A%2F%2Faladwaa.com&aoriginsup=1&gporigin=https%3A%2F%2Faladwaa.com&vf=2',
            description: 'Understanding international news',
            type: 'video'
          },
          {
            id: 'eng-18-u2-l2',
            title: 'Digital Media',
            duration: '40:00',
            videoUrl: 'https://www.youtube.com/embed/TNhaISOUy6Q?autoplay=0&controls=1&disablekb=1&playsinline=1&cc_load_policy=0&widget_referrer=https%3A%2F%2Faladwaa.com&rel=0&showinfo=0&iv_load_policy=3&modestbranding=1&customControls=true&noCookie=false&enablejsapi=1&origin=https%3A%2F%2Faladwaa.com&widgetid=1&forigin=https%3A%2F%2Faladwaa.com&aoriginsup=1&gporigin=https%3A%2F%2Faladwaa.com&vf=2',
            description: 'Navigating online news sources',
            type: 'video'
          }
        ]
      }
    ],
    enrolledUsers: []
  }
];

export const users: User[] = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john@example.com',
    password: 'password123',
    enrolledCourses: ['1'],
    grade: '1st'
  },
  {
    id: '2',
    name: 'Jane Smith',
    email: 'jane@example.com',
    password: 'password456',
    enrolledCourses: ['1', '2'],
    grade: '2nd'
  }
];

export const grades = ["1st", "2nd", "3rd"]; 