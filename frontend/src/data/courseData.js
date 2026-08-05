// import images from "../Constrants/images";
import pythonprogramming from "../assets/pythonprogramming.png";
import pythonai from "../assets/pythonai.png";
import beginnerrobotics from "../assets/beginnerrobotics.png";
import advancedrobotics from "../assets/advancedrobotics.png";
import intermediaterobotics from "../assets/intermediaterobotics.png";
import microbitrobotics from "../assets/microbitrobotics.png";
import publicspeaking from "../assets/publicspeaking.png";




const courses = [
    {
        id: 1,
        header: "Python Programming",
        title: "Python Programming & AI Mastery Curriculum",
        subtitle: "Python Basics  AI & Machine Learning",
        status: "is_cource",
        reviews: "150 Reviews",
        rating: '4.5',
        // image: images.PythonImage,
        subcources: [
            {
                id: 1,
                title: "Python Programing (Level 1)",
                teacher: "",
                description: "Familiarity with Basic and Advance programming concepts of Python, to be used in GUI Applications",
                reviews: "",
                image: pythonprogramming,
                milestone:
                    "Understand the intricacies of Python and their applications to real-world problems.Learn to frame the logic of code.",
                whydo:
                    "Melwirt Emphasises on designing Advance and Practical Inventions, hence we deliver Experimental Education that connects with core industry requirements.We Ardently believe to confer purpose to every Robot you make, through discrete Competitions and Entrepreneurial events. We believe every individual can do Robotics with absolute Direction and Essentials, hence our Community & MakerSpace provides opportunities to explore robotics and to be Procient in it. ",
                about:
                    "Robotics is an Exploding Market as per the current status, and is likely to replace 46% of the worlds current jobs by 2030. Melwirt thereby offers a Strategic and Experiential Curriculum to students(Age: 10-20)and Professionals looking to advance their Carriers,Creatively address Complex Robots and builda better future.",

                modules: [
                    {
                        id: 1,
                        module_name: "Young Python",
                        duration: "20",
                        sessions: [
                            {
                                id: 1,
                                title: "Introduction to Python ",
                                topics: [
                                    "Fundament of Libraries, Conditional Statements, Loops",
                                    "Implementing Loops, Constructing Algorithms",
                                    "Implementing Functions",
                                    "Command, Syntax, Built-In Functions",
                                ],
                                miniproject:
                                    "",
                            },
                        ],
                    },
                    {
                        id: 2,
                        module_name: "Young Python",
                        duration: "20",
                        sessions: [
                            {
                                id: 1,
                                title: "Python Data Structures ",
                                topics: [
                                    "Lists, Sets, Tuples",
                                    "Strings and Algorithmic Problems",
                                    "Dictionary:",
                                    "Logical and Abstract Problems",
                                    "Classes & Objects",
                                    "Iterator tools",
                                    "File Handling",
                                ],
                                miniproject:
                                    "",
                            },
                        ],
                    },
                    {
                        id: 3,
                        module_name: "Python Application",
                        duration: "20",
                        sessions: [
                            {
                                id: 1,
                                title: "Python GUI: Tkinter",
                                topics: [
                                    "Introduction to Tkinter and Windows - What Tkinter, creating your first window (1 session)",
                                    "Labels and Buttons - Displaying text on a window, Adding clickable button (1 session)",
                                    "Entry Widgets - Taking input from users (1 session):",
                                    "Text Widget Basics - Multi-line input fields (1 session)",
                                    "Frames - Organizing the layout into sections (1 session)",
                                    "Checkbuttons, Radiobuttons - Creating MCQ's(1 session)",
                                    "Messagebox - Showing alerts, info, and errors (1 session)",
                                ],
                                miniproject:
                                    "",
                            },
                            {
                                id: 2,
                                title: "Layouts & Styling",
                                topics: [
                                    "Pack, Grid, Place- Organizing widgets (2 session)",
                                    "Widget Styling and Configuring Basics - Font, color, size , properties (1 session)",
                                    "Frames Inside Frames - Nested layouts (1 session)",
                                    "PanedWindow - Resizable split panels (1 session)",
                                    "Canvas Basics - Drawing lines, shapes, and text (2 sessions)",
                                ],
                                miniproject:
                                    "",
                            },
                            {
                                id: 3,
                                title: "Event Handling & Advanced Widgets",
                                topics: [
                                    "Event Binding - Binding functions to events like clicks/keys (1 session)",
                                    "Keyboard Events - Handling key presses (1 session)",
                                    "Mouse Events - Handling clicks, drags, and hover (1 session)",
                                    "Menu Bar, Dropdown Basics - Adding menus at the top of a window, option menu (1 session)",
                                    "Listbox & Scrollbar - Displaying a list of items with scrollbar (1 session)",
                                    "Spinbox - Selecting numeric values (1 session)",
                                    "Scale Widget - Slider for numerical input (1 session)",
                                ],
                                miniproject:
                                    "",
                            },
                            {
                                id: 4,
                                title: "Data & Interaction",
                                topics: [
                                    "Linking Widgets with Variables - Auto-update widgets with variables (1 session)",
                                    "Getting and Setting Values - Extracting user input (1 session)",
                                    "Updating Labels Dynamically - Changing text with button clicks (1 session)",
                                    "File Dialogs - Opening and saving files (1 session)",
                                    "Image Display - Adding images with PhotoImage (1 session)",
                                    "Resizing & Positioning Windows - Geometry methods (1 session)",
                                ],
                                miniproject:
                                    "",
                            },
                            {
                                id: 5,
                                title: "1 Mini Project ",
                                topics: [
                                    "UI calculator (1-2)",
                                    "To-Do List App - Add and remove tasks (1-3 sessions)",
                                    "Text Editor - Simple notepad with save/load (1-3 sessions)",
                                ],
                                miniproject:
                                    "",
                            },
                        ],
                    },
                    {
                        id: 4,
                        module_name: "Python Game: Pygame ",
                        duration: "20",
                        sessions: [
                            {
                                id: 1,
                                title: "Pygame Basics & Foundations ",
                                topics: [
                                    "Installing Pygame & setting up the main loop",
                                    "Creating screens, setting window title & FPS",
                                    "Drawing shapes (rect, circle, line)",
                                    "Adding colors + understanding RGB",
                                    "Loading and showing images (blit)",
                                    "Moving objects using x, y (manual movement)",
                                    "Event handling basics (QUIT, KEYDOWN)",
                                ],
                                miniproject:
                                    "",
                            },
                            {
                                id: 2,
                                title: " Images, Animations & Sprites",
                                topics: [
                                    "Loading images, resizing, converting",
                                    "Sprite class introduction (Sprite & Group)",
                                    "Adding player sprite with movement",
                                    "Simple animation using image sequences",
                                    "Frame-based animation timing",
                                    "Adding enemy sprites",
                                    "Collision detection (rect collision)",
                                ],
                                miniproject:
                                    "",
                            },
                            {
                                id: 3,
                                title: "Sound, Text & Game Systems",
                                topics: [
                                    "Loading & playing background music",
                                    "Adding sound effects (jump, hit, shoot)",
                                    "Adding text (score, title) using pygame.font",
                                    "Timers in pygame (pygame.time, custom events",
                                    "Making buttons & menus",
                                    "Basic physics (gravity, jump logic)",
                                    "Saving & loading data (high scores, JSON)",
                                ],
                                miniproject:
                                    "",
                            },
                            {
                                id: 4,
                                title: "GAME-1 - Simple Platformer",
                                topics: [
                                    "Creating player (run + jump)",
                                    "Platforms + gravity + landing",
                                    "Enemies + basic AI movement",
                                    "Scoring system + restarting",
                                    "Finishing the game + polishing",
                                ],
                                miniproject:
                                    "",
                            },
                            {
                                id: 5,
                                title: "GAME-2 - Student's Choice Game",
                                topics: [
                                    "Game setup + assets",
                                    "Player + controls",
                                    "Enemies / obstacles",
                                    "Complete + test the full game",
                                ],
                                miniproject:
                                    "",
                            },
                        ],
                    },
                ]
            },
            {
                id: 2,
                title: 'Python A.I, M.L & Computer Vision (Level 2)',
                description: "Program progressing from Python basics to advanced AI, computer vision, and machine learning.",
                image: pythonai,
                milestone:
                    "Machine Learning Mastery : classification, clustering, PCA etc.",
                about:
                    "Robotics is an Exploding Market as per the current status, and is likely to replace 46% of the worlds current jobs by 2030. Melwirt thereby offers a Strategic and Experiential Curriculum to students(Age: 10-20) and Professionals looking to advance their Carriers,Creatively address Complex Robots and build a better future.",
                modules: [
                    {
                        id: 1,
                        module_name: "A.I and Computer Vision",
                        duration: "40",
                        sessions: [
                            {
                                id: 1,
                                title: "Python & AI Foundations",
                                topics: [
                                    "Intro to Python for AI, tools",
                                    "Python basics recap",
                                    "NumPy for AI",
                                    "Matplotlib basics",
                                    "Images as arrays",
                                    "Python file handling + datasets",
                                    "OpenCV installation + reading images (includes color detection demo)",
                                    "Drawing shapes, text (includes edge detection demo)",
                                    "Image transformations (resize/rotate/flip)",
                                ],
                                miniproject:
                                    "Image Collage Builder Includes Color Detection + Edge Detection as sub-features",
                            },
                            {
                                id: 2,
                                title: "OpenCV Core Concepts",
                                topics: [
                                    "Image color spaces (RGB, BGR, HSV)",
                                    "Thresholding & masking",
                                    "Blurring & smoothing",
                                    "Edge detection",
                                    "Contours",
                                    "ROI, slicing & cropping (includes Face Cropper mini demo)",
                                    "Image arithmetic & bitwise operations",
                                    "Perspective transform",
                                    "Histogram equalization",
                                    "Color Object Tracker",
                                ],
                                miniproject: "",
                            },
                            {
                                id: 3,
                                title: "OpenCV Intermediate",
                                topics: [
                                    "Video capture & frame processing",
                                    "Drawing on live video",
                                    "Motion detection",
                                    "Haarcascade — face detect",
                                    "Eye detect",
                                    "Smile detect",
                                    "Hand detect basics",
                                    "Template matching",
                                    "Image stitching intro",
                                    "Face Blur & Privacy Filter",
                                ],
                                miniproject: "",
                            },
                        ],
                    },
                    {
                        id: 2,
                        module_name: "A.I and Machine Learning",
                        duration: "40",
                        sessions: [
                            {
                                id: 1,
                                title: "Python A.I: M.L",
                                topics: [
                                    "What is ML? Types",
                                    "Pandas for ML",
                                    "Train-test split",
                                    "Linear regression",
                                    "Build regression model on simple dataset",
                                    "Polynomial regression",
                                    "Logistic regression",
                                    "Metrics (accuracy, precision, recall) Major ML Project : Predict Student Marks",
                                    "Implement full regression ML pipeline",
                                    "Review + Quiz",
                                ],
                                miniproject:
                                    "",
                            },
                            {
                                id: 2,
                                title: " ML Intermediate",
                                topics: [
                                    "Decision Trees",
                                    "Random Forest",
                                    "KNN",
                                    "Naive Bayes",
                                    "SVM",
                                    "K-Means",
                                    "PCA",
                                    " Feature scaling & normalization",
                                    "Build movie recommender (similarity-based)",
                                    "Optimization & testing",
                                ],
                                miniproject: "",
                            },
                            {
                                id: 3,
                                title: "ML + OpenCV Combined",
                                topics: [
                                    "Image datasets, preprocessing",
                                    "Feature extraction basics",
                                    "HOG descriptors",
                                    "Training LBPH/SVM face recognizer",
                                    "Testing on live webcam",
                                    "Saving + deploying model",
                                    "Gesture recognition basics",
                                    "Train your own classifier",
                                    "Real-time webcam classification",
                                    "Model saving & loading Major ML Project #3 — Handwritten Digit Recognizer",
                                    "Build digit classifier (OpenCV + ML)",
                                ],
                                miniproject: "",
                            },
                            {
                                id: 4,
                                title: "Deep Learning Foundations",
                                topics: [
                                    "Basics — ANN, activation functions",
                                    "Loss functions, optimizers",
                                    "Build simple ANN",
                                    "CNN basics",
                                    "Convolution + pooling",
                                    "Build your first CNN",
                                    "CNN for face classification",
                                    "Data augmentation Capstone Project Mouse Controller",
                                    "Hand landmark detection + model integration",
                                    "Implement cursor/robot control(2 sessions) Capstone Project Real-Time Emotion Detector",
                                    "Training emotion CNN",
                                    "Deploying live emotion detection",
                                ],
                                miniproject: "",
                            },
                        ],
                    },
                ]
            },
        ]
    },
    {
        id: 2,
        title: "Complete Robotics, IoT & AI Vision Learning Program",
        header: 'Robotics Programming',
        subtitle: "Robotics • AI • Automation",
        status: "is_cource",
        reviews: "140 Reviews",
        rating: '4.2',
        // image: images.roboticImage,
        subcources: [
            {
                id: 1,
                title: "Micro:Bit Robotics (Level 1)",
                description: "This curriculum introduces students to physical computing using micro:bit, building logical thinking, sensor-based interactions, and realworld problem-solving through hands-on coding projects.",
                image: microbitrobotics,
                milestone:
                    "Machine Learning Mastery : classification, clustering, PCA etc.",
                about:
                    "Robotics and A.I. are transforming the world at a rapid pace and are expected to automate nearly 46% of global jobs by 2030. Melwirt,therefore, offers a Strategic and Experiential Learning Ecosystem that prepares learners (Age 10–20) and Professionals for this future.",

                modules: [
                    {
                        id: 1,
                        module_name: "MICRO:BIT",
                        duration: "10",
                        sessions: [
                            {
                                id: 1,
                                title: "Fundamentals of Micro:Bit",
                                topics: [
                                    " Introduction to Micro:Bit board components & pins",
                                    "Understanding inputs, outputs, and power basics"
                                ],
                                miniproject:
                                    "",
                            },
                            {
                                id: 2,
                                title: "Logic Building Exercises",
                                topics: [
                                    "Flowchart-based problem solving using Micro:Bit",
                                    "Simple logic games using buttons and LED matrix"
                                ]
                            },
                            {
                                id: 3,
                                title: "Intricacies of Micro:Bit",
                                topics: [
                                    "Sensors, accelerometer, and built-in features",
                                    "Exploring Micro:Bit communication and inputs",
                                ]
                            },
                            {
                                id: 4,
                                title: "Implementation of Algorithms",
                                topics: [
                                    "Step-by-step algorithm execution on Micro:Bit",
                                    "Converting logic into block-based code"
                                ]
                            },
                            {
                                id: 5,
                                title: "Major Project",
                                topics: [
                                    "Designing a simple Micro:Bit-based robot/project",
                                    "Testing, debugging, and demonstration"
                                ]
                            },
                        ],
                    },
                    {
                        id: 2,
                        module_name: "FUNDAMENT ROBOTICS",
                        duration: "20",
                        sessions: [
                            {
                                id: 1,
                                title: "Introduction to Programming with Robotics",
                                topics: [
                                    "Basics of block-based programming environment",
                                    "Relationship between code and robot actions"
                                ],
                                miniproject:
                                    "",
                            },
                            {
                                id: 2,
                                title: "Fundamentals of Libraries, Conditional Statements & Loops",
                                topics: [
                                    "Using libraries and predefined functions",
                                    "Applying if–else conditions and loop logic"

                                ],
                                miniproject: "",
                            },
                            {
                                id: 3,
                                title: "Introduction to Microcontrollers ",
                                topics: [
                                    "Difference between Micro:Bit and microcontrollers",
                                    "Understanding control, processing, and execution"
                                ],
                                miniproject: "",
                            },
                            {
                                id: 4,
                                title: "Introduction to LEDs, Resistors, Wave Program, Button Module",
                                topics: [
                                    "Circuit basics using LEDs and resistors",
                                    "Button inputs and wave pattern programming"

                                ],
                                miniproject: "",
                            },
                            {
                                id: 5,
                                title: "Introduction to Sensors (Ultrasonic etc.) ",
                                topics: [
                                    "Understanding distance measurement",
                                    "Sensor data reading and interpretation"

                                ],
                                miniproject: "",
                            },
                            {
                                id: 6,
                                title: "Motor Controller & Servo",
                                topics: [
                                    "Working of DC motors and motor drivers",
                                    "Controlling servo movement with code"

                                ],
                                miniproject: "",
                            },
                            {
                                id: 7,
                                title: "Burglar Alarm",
                                topics: [
                                    "Designing a sensor-based alarm system",
                                    "Testing alert logic and response"
                                ],
                                miniproject: "",
                            },
                            {
                                id: 8,
                                title: "Radar",
                                topics: [
                                    " Ultrasonic scanning concept",
                                    "Visual output and real-time detection"
                                ],
                                miniproject: "",
                            },
                        ],
                    },
                    {
                        id: 3,
                        module_name: " Intermidiate Robotics",
                        duration: "20",
                        sessions: [
                            {
                                id: 1,
                                title: "Intro to Motion Sensor - PIR",
                                topics: [
                                    "Interfacing sensors with microcontrollers",
                                    "Reading and responding to sensor data"
                                ],
                                miniproject:
                                    "",
                            },
                            {
                                id: 2,
                                title: "Introduction to Environment Sensor",
                                topics: [
                                    "Environmental sensing concepts",
                                    "Using Moisture Sensor"

                                ],
                                miniproject: "",
                            },
                            {
                                id: 3,
                                title: "Moisture Detection Alarm",
                                topics: [
                                    "Sensor-based alert systems",
                                    "Threshold setting and response logic",

                                ],
                                miniproject: "",
                            },
                            {
                                id: 4,
                                title: "DIY house ",
                                topics: [
                                    "Motion recognition logic and sensors",
                                    "Movement of door based on motion"

                                ],
                                miniproject: "",
                            },
                            {
                                id: 5,
                                title: "Introduction to wireless communication",
                                topics: [
                                    "Understanding wireless logic",
                                    "Interfacing with various devices"

                                ],
                                miniproject: "",
                            },
                            {
                                id: 6,
                                title: " M:Bit Car",
                                topics: [
                                    "Mechanical movement and joint control",
                                    "Coordinating multiple servos"

                                ],
                                miniproject: "",
                            },
                        ],
                    },
                ]
            },
            {
                id: 2,
                title: "Beginner Robotics Program (Level 2)",
                description: "Hands-on robotics program teaching block coding, sensors, automation using PictoBlox and Arduino.",
                image:beginnerrobotics,
                milestone:
                    "Machine Learning Mastery : classification, clustering, PCA etc.",
                about:
                    "Robotics and A.I. are transforming the world at a rapid pace and are expected to automate nearly 46% of global jobs by 2030. Melwirt, therefore, offers a Strategic and Experiential Learning Ecosystem that prepares learners (Age 10–20) and Professionals for this future",

                modules: [
                    {
                        id: 1,
                        module_name: "PictoBlox Intro",
                        duration: "15",
                        sessions: [
                            {
                                id: 1,
                                title: "Intro to PictoBlox Enviroment",
                                topics: [
                                    "What is PictoBlox",
                                    "Understanding the interface and block categories",
                                ],
                                miniproject:
                                    "",
                            },
                            {
                                id: 2,
                                title: "Basic Motion & Output Blocks",
                                topics: [
                                    "Using basic motion and output blocks",
                                    "Understanding execution flow",
                                    "Event-based programming",
                                    "Control blocks: wait, repeat, forever"
                                ]
                            },
                            {
                                id: 3,
                                title: "Loops in PictoBlox",
                                topics: [
                                    "Repeat and forever loops",
                                    "Reducing repetitive code",
                                ]
                            },
                            {
                                id: 4,
                                title: "Conditional Logic",
                                topics: [
                                    "If condition",
                                    "If–else condition",
                                ]
                            },
                            {
                                id: 4,
                                title: "Variables & Operators ",
                                topics: [
                                    "Creating and using variables",
                                    "Basic operators",
                                ]
                            },
                            {
                                id: 5,
                                title: "Debugging & Logical Thinking",
                                topics: [
                                    " Common errors in block coding",
                                    "Step-by-step logic building",
                                ]
                            },
                        ],
                    },
                    {
                        id: 2,
                        module_name: "Programming Sensors",
                        duration: "25",
                        sessions: [
                            {
                                id: 1,
                                title: "Introduction to Microcontrollers",
                                topics: [
                                    "What is a microcontroller",
                                    "Pins, power, and communication.",
                                ],
                                miniproject:
                                    "",
                            },
                            {
                                id: 2,
                                title: "Introduction to Programming with Robotics",
                                topics: [
                                    "Setting up Arduino with PictoBlox",
                                    "LED blink program",
                                    "LEDs and resistors",
                                    "Wave programs",

                                ],
                                miniproject: "",
                            },
                            {
                                id: 3,
                                title: "Introduction to Sensors",
                                topics: [
                                    "Basic sensor logic",
                                    "Touch sensor, Ultrasonic sensor, IR sensor",
                                    "Distance-based alert system",
                                    "Ultrasonic sensor application",

                                ],
                                miniproject: "",
                            },
                            {
                                id: 4,
                                title: "Motors & Actuators ",
                                topics: [
                                    "Motor controller",
                                    "Servo motor",

                                ],
                                miniproject: "",
                            },
                            {
                                id: 5,
                                title: "Mini Radar System",
                                topics: [
                                    "Object detection using rotating servo",
                                    "Distance scanning logic",
                                ],
                                miniproject: "",
                            },
                            {
                                id: 6,
                                title: "Introduction to Environmental Sensors",
                                topics: [
                                    "Rain sensor working",
                                ],
                                miniproject: "",
                            },
                            {
                                id: 7,
                                title: " Rain Alarm",
                                topics: [
                                    "Rain detection alarm",
                                    "Sensor-triggered output"
                                ],
                                miniproject: "",
                            },
                        ],
                    },
                    {
                        id: 3,
                        module_name: "Intermediate Sensor Applications",
                        duration: "30",
                        sessions: [
                            {
                                id: 1,
                                title: "Introduction to LCD",
                                topics: [
                                    " Working of LCD module",
                                    "Connecting LCD with projects"
                                ],
                                miniproject:
                                    "",
                            },
                            {
                                id: 2,
                                title: "Water Level Detection",
                                topics: [
                                    "Water level monitoring using LCD",
                                    "Real-time display",
                                ],
                                miniproject: "",
                            },
                            {
                                id: 3,
                                title: "Introduction to Motion & RFID Sensors",
                                topics: [
                                    "PIR motion sensor",
                                    "RFID sensor",

                                ],
                                miniproject: "",
                            },
                            {
                                id: 4,
                                title: " DIY Home Automation ",
                                topics: [
                                    " DIY house model",
                                    "RFID, PIR, and servo integration"

                                ],
                                miniproject: "",
                            },
                            {
                                id: 5,
                                title: "Cloth Protection System",
                                topics: [
                                    "Adding actuators",
                                    "Rain sensor integration"
                                ],
                                miniproject: "",
                            },
                            {
                                id: 6,
                                title: "Introduction to Wireless Sensors",
                                topics: [
                                    "Bluetooth-based control",
                                ],
                                miniproject: "",
                            },
                            {
                                id: 7,
                                title: "Robo Arm",
                                topics: [
                                    "Assembling the robo arm",
                                    "Bluetooth control"
                                ],
                                miniproject: "",
                            },
                            {
                                id: 8,
                                title: "Introduction to Light Sensors",
                                topics: [
                                    "Relay module",
                                    "LDR sensor"
                                ],
                                miniproject: "",
                            },
                            {
                                id: 9,
                                title: "Introduction to Light Sensors",
                                topics: [
                                    "AC bulb connection basics",
                                    "DIY automated night lamp"
                                ],
                                miniproject: "",
                            },
                        ],
                    },
                ]
            },
            {
                id: 3,
                title: "Intermidiate Robotic Program (Level 3)",
                description: "Understanding & Applying the core principles of Robotics with C/Cpp using various Sensors, Drivers and Dynamics",
                image:intermediaterobotics,
                milestone:
                    "Machine Learning Mastery : classification, clustering, PCA etc.",
                about:
                    "Robotics and A.I. are transforming the world at a rapid pace and are expected to automate nearly 46% of global jobs by 2030. Melwirt,therefore, offers a Strategic and Experiential Learning Ecosystem that prepares learners (Age 10-20) and Professionals for this future.Through our integrated programs in Robotics, Artificial Intelligence,Mathematics, and Public Speaking, we empower students to think creatively, solve complex problems, communicate confidently, and build real-world solutions that shape a better tomorrow.",

                modules: [
                    {
                        id: 1,
                        module_name: "Fundament Robotics",
                        duration: "20",
                        sessions: [
                            {
                                id: 1,
                                title: "Simulations and Circuits",
                                topics: [
                                    "Intro to circuits and Microcontrollers using simulation",
                                    "Intro to Breadboard and coding",
                                    "Installing and using basic programming tools",
                                    "Basics of how electricity flows in a circuit.",
                                    "Identifying resistors, capacitors, LEDs and their roles.",


                                ],
                                miniproject:
                                    "",
                            },
                            {
                                id: 2,
                                title: "Using Switch with LED",
                                topics: [
                                    "Writing simple logic to control LEDs.",
                                    "Understanding digital input/output.",
                                    "Introduction to common sensors and how they collect data.",
                                    "Reading sensor values through code",
                                    "Basics of servo motors and angles",
                                    "Building a smart bin using sensors.",
                                    "Triggering actions based on detected objects.",

                                ]
                            },
                            {
                                id: 3,
                                title: "Radar with Laser",
                                topics: [
                                    "Using servos + sensors for scanning.",
                                    "Displaying detection output as radar-like movement.",
                                    "Introduction to common sensors and how they collect data.",
                                    "Reading sensor values through code.",

                                ]
                            }
                        ],
                    },
                    {
                        id: 2,
                        module_name: "Intermediate Robotics",
                        duration: "25",
                        sessions: [
                            {
                                id: 1,
                                title: "Touch Sensor and OLED GAME",
                                topics: [
                                    "Understanding touch-based input",
                                    "Using it with various output devices.",
                                    "Basics of wireless modules.",
                                    "Using PWM and millis instead of delay.",
                                ],
                                miniproject:
                                    "Review + Quiz",
                            },
                            {
                                id: 2,
                                title: "Introduction to Micro-controller Shields",
                                topics: [
                                    "Understanding plug-and-play shields",
                                    "Extending micro-controller capabilities with add-ons.",
                                    "Identifying how to connect servo, DC motors with shield",
                                    "Using PWM",

                                ],
                                miniproject: "Optimization & testing",
                            },
                            {
                                id: 3,
                                title: "Joystick with shield",
                                topics: [
                                    "Interfacing shield joystick with shield",
                                    "IRunning motors with joystick.",
                                    "Connecting wireless sensor with shield",
                                    "Controlling DC Motors wirelessly",
                                    "Evaluating the progress",
                                ],
                                miniproject: "",
                            },
                            {
                                id: 4,
                                title: "Robo Arm - with Joystick",
                                topics: [
                                    "Designing a multi-axis robotic arm",
                                    "Using servos and programming to control joints.",
                                    "Using Bluetooth sensor with shield",
                                    "Using External Supply",
                                    "Understanding Water level code",
                                    "Interfacing Oled with Ultrasonic sensor",
                                    "Evaluating the progress.",

                                ],
                                miniproject: "",
                            },
                        ],
                    },
                    {
                        id: 3,
                        module_name: "Advance Robotics",
                        duration: "25",
                        sessions: [
                            {
                                id: 1,
                                title: "RC Car",
                                topics: [
                                    "Constructing a remote-controlled vehicle",
                                    "Integrating motors, sensors and control logic.",
                                    "Identifying and fixing wiring or code issues",
                                    "Testing sensors, motors and circuits step-by-step.",
                                ],
                                miniproject:
                                    "Review + Quiz",
                            },
                            {
                                id: 2,
                                title: "Autonomous Vehicle",
                                topics: [
                                    "Building a self-driving robot car using multiple sensors",
                                    "Obstacle detection and path following.",
                                    "Building a self-driving robot car using voice modulation.",
                                    "Sending voice commands using phone",
                                    "Evaluating the progress",
                                    "Understanding color sensor",
                                    "Interfacing Color Sensor with OLED",
                                    "Understanding intricacies of sound module.",
                                    "Interfacing module with various sensors",

                                ],
                                miniproject: "Optimization & testing",
                            },
                            {
                                id: 3,
                                title: "Color Sorter",
                                topics: [
                                    "Building a self-driving robot car using voice modulation.",
                                    "Sending voice commands using phone",
                                    "Evaluating the progress",

                                ],
                                miniproject: "",
                            },
                        ],
                    },
                ]
            },
            {
                id: 4,
                title: "Advanced IOT -VISION Robotics (Level 4)",
                description: "Advanced IoT curriculum with ESP32, sensors, cloud integration, real-time monitoring, automation, and industry-ready smart device projects.",
                image:advancedrobotics,
                milestone:
                    "Machine Learning Mastery : classification, clustering, PCA etc.",
                about:
                    "Robotics and A.I. are transforming the world at a rapid pace and are expected to automate nearly 46% of global jobs by 2030. Melwirt,therefore, offers a Strategic and Experiential Learning Ecosystem that prepares learners (Age 10–20) and Professionals for this future.",

                modules: [
                    {
                        id: 1,
                        module_name: "Intro to Vision Robotics",
                        duration: "25",
                        sessions: [
                            {
                                id: 1,
                                title: "Introduction to Vision IoT Robotics",
                                topics: [
                                    "Vision-based IoT & real-world applications",
                                    "ESP32-CAM board overview and testing"
                                ],
                                miniproject:
                                    "",
                            },
                            {
                                id: 2,
                                title: " Surveillance Camera System ",
                                topics: [
                                    "ESP32-CAM Wi-Fi configuration",
                                    "Live video streaming using IP address",
                                    "Viewing camera feed on laptop/browser"
                                ]
                            },
                            {
                                id: 3,
                                title: "Vision Processing Fundaments",
                                topics: [
                                    "Basics of computer vision concepts",
                                    "ESP32-CAM stream with Python",
                                    "Introduction to vision libraries"
                                ]
                            },
                            {
                                id: 4,
                                title: "Object Detection System",
                                topics: [
                                    "Object detection using Python libraries",
                                    "ESP32-CAM live feed integration",
                                    "Detection accuracy and confidence"
                                ]
                            },
                            {
                                id: 5,
                                title: "Smart Zones & Automation Logic",
                                topics: [
                                    "Concept of restricted zones",
                                    "Area-based detection logic",
                                    "Event-triggered alerts"
                                ]
                            },
                            {
                                id: 6,
                                title: "Restricted Zone Detection System",
                                topics: [
                                    "Human detection using vision models",
                                    "Restricted area mapping",
                                    "Buzzer alert integration"
                                ]
                            },
                            {
                                id: 7,
                                title: "Surveillance Mobile Robot",
                                topics: [
                                    "ESP32-CAM based camera car design",
                                    "Motor control and power integration",
                                    "Live surveillance on mobile robot"
                                ]
                            },
                        ],
                    },
                    {
                        id: 2,
                        module_name: "SMART SENSING & HOME AUTOMATION SYSTEMS",
                        duration: "25",
                        sessions: [
                            {
                                id: 1,
                                title: "Introduction to Temperature & Proximity Sensors",
                                topics: [
                                    "Temperature sensor basics and use cases",
                                    "Ultrasonic sensor for distance measurement"
                                ],
                                miniproject:
                                    "",
                            },
                            {
                                id: 2,
                                title: "Quarantine Temperature Monitoring System",
                                topics: [
                                    "Human face detection using camera",
                                    "Distance and temperature measurement logic",
                                    "Real-time data logging to Excel"

                                ],
                                miniproject: "",
                            },
                            {
                                id: 3,
                                title: "Introduction to Relay & AC Appliance Control | 2 Sessions",
                                topics: [
                                    "Relay module working principle",
                                    "AC bulb safety and wiring concepts"
                                ],
                                miniproject: "",
                            },
                            {
                                id: 4,
                                title: "Smart Home Appliance Control",
                                topics: [
                                    "Controlling AC bulb using ESP32 Wi-Fi",
                                    "Integration with Google Home Automation"

                                ],
                                miniproject: "",
                            },
                            {
                                id: 5,
                                title: "Voice-Controlled Home Automation",
                                topics: [
                                    "Google Assistant integration with ESP32",
                                    "Voice command based appliance control",
                                    "Syncing Google Assistant with Google Home",

                                ],
                                miniproject: "",
                            },
                        ],
                    },

                ]
            }
        ]
    },
    {
        id: 3,
        title: "The Art of Public Speaking",
        header: "Speaking",
        teacher: "",
        subtitle: "Confidence • Communication • Leadership",
        status: "",
        reviews: "150 Reviews",
        rating: '4',
        // image: images.Speaking,
        subcources: [
            // {
            //     id: 1,
            //     title: "Next-Gen Public Speaking",
            //     teacher: "",
            //     description: "This Public Speaking Program helpslearners gain confidence, improve clarity,and master stage presence through practical exercises, voice control, and reallife speaking scenarios.",
            //     image: images.speakin2,
            //     milestone:
            //         "",
            //     about:
            //         "This Public Speaking Program helpslearners gain confidence, improve clarity,and master stage presence through practical exercises, voice control, and reallife speaking scenarios. Perfect for beginners and aspiring confident ommunicators.",

            //     modules: [
            //         {
            //             id: 1,
            //             module_name: "Introduction to Public Speaking",
            //             duration: "20",
            //             sessions: [
            //                 {
            //                     id: 1,
            //                     title: "What is Public Speaking?",
            //                     topics: [
            //                         "Overview: Introduction to the course and the significance of public speaking. Students will explore the definition of public speaking and its relevance in various contexts.",
            //                         " Activities: Icebreaker Introductions: Students introduce themselves and share their expectations for the course.Discussion on Public Speaking: Facilitate a discussion on the importance of public speaking in personal, academic, and professional settings.",
            //                     ],
            //                     miniproject:
            //                         "",
            //                 },
            //                 {
            //                     id: 2,
            //                     title: "Overcoming Rejection",
            //                     topics: [
            //                         "Overview: Understanding and managing fear and rejection in public speaking. Students will identify common fears associated with public speaking and develop strategies to overcome them.",
            //                         " Activities: Fear Hierarchy Exercise: Students create a fear hierarchy listing public speaking situations from least to most intimidating. Personal Fear Reflection: Students reflect on their own speaking anxieties and develop personalized strategies for overcoming them.",
            //                     ],
            //                     miniproject:
            //                         "",
            //                 },
            //                 {
            //                     id: 3,
            //                     title: "How Powerful Can Effective Public Speaking Be?",
            //                     topics: [
            //                         " Overview: Exploring the impact of effective public speaking through case studies and real-life examples. Students will analyze famous speeches and discuss their influence on society.",
            //                         "Activities: Speech Impact Analysis: Analyze iconic speeches and discuss their rhetorical techniques and societal impact.Mock Speech Preparation: Students prepare and deliver short speeches on topics of personal interest to demonstrate the power of effective communication.",
            //                     ],
            //                     miniproject:
            //                         "",
            //                 },
            //                 {
            //                     id: 4,
            //                     title: "How Can You Overcome Feeling Uncomfortable?",
            //                     topics: [
            //                         "Overview: Strategies for managing discomfort and anxiety while speaking. Students will learn relaxation techniques and mindset shifts to build confidence.",
            //                         "Activities: Visualization and Relaxation Workshop: Guided visualization and relaxation exercises to manage anxiety.Improvisation Games: Engage in improvisational activities to practice spontaneous speaking and build confidence.",
            //                     ],
            //                     miniproject:
            //                         "",
            //                 },
            //                 {
            //                     id: 5,
            //                     title: "Learning Check",
            //                     topics: [
            //                         "Overview: Assessment of understanding through quizzes and reflection activities. Students will demonstrate theircomprehension of key concepts in public speaking",
            //                         "Activities: Public Speaking Quiz: Administer a quiz covering fundamental concepts introduced in previous sessions.Reflection Essay: Write a reflection essay on personal growth and insights gained from the course.",

            //                     ],
            //                     miniproject:
            //                         "",
            //                 },
            //             ],
            //         },
            //         {
            //             id: 2,
            //             module_name: "Background and Foundation",
            //             duration: "20-30",
            //             sessions: [
            //                 {
            //                     id: 1,
            //                     title: "Three Parts of Communication",
            //                     topics: [
            //                         "Overview: Understanding the components of communication: verbal,nonverbal, and paraverbal. Students will explore how each element contributes to effective communication.",
            //                         "Activities: Verbal Communication Analysis: Analyze speeches and presentations to identify key verbal elements such as tone and language.Nonverbal Communication Observation: Study video cl",

            //                     ],
            //                     miniproject:
            //                         "",
            //                 },
            //                 {
            //                     id: 2,
            //                     title: "Nonverbal",
            //                     topics: [
            //                         "Overview: Exploring the role of nonverbal communication in public speaking. Students will learn to enhance their body language and gestures for effective communication.",
            //                         "Activities: Body Language Self-Assessment: Assess personal body language and identify areas for improvement.",
            //                     ],
            //                     miniproject:
            //                         "",
            //                 },
            //                 {
            //                     id: 3,
            //                     title: "Delivering Impactful Messages",
            //                     topics: [
            //                         "Overview: Techniques for delivering messages with clarity and impact. Students will practice vocal variety and delivery styles to engage their audience.",
            //                         "Activities: Vocal Variety Practice: Engage in vocal exercises to vary tone, pitch, and volume. Delivery Style Analysis:Analyze different delivery styles and their effectiveness in conveying messages.",


            //                     ],
            //                     miniproject:
            //                         "",
            //                 },
            //                 {
            //                     id: 4,
            //                     title: "How Do Non-Verbals Affect Your Audience?",
            //                     topics: [
            //                         "Overview: Understanding the psychological impact of nonverbal cues on the audience. Students will explore how nonverbal communication influences audience perception and engagement.",
            //                         "Activities: Nonverbal Cue Interpretation: Analyze nonverbal cues in video clips to understand their impact on audience perception. Audience Perception Analysis: Study audience reactions to speeches and presentations to identify the influence of nonverbal cues",
            //                     ],
            //                     miniproject:
            //                         "",
            //                 },
            //                 {
            //                     id: 5,
            //                     title: "Learning Check",
            //                     topics: [
            //                         "Overview: Assessment of understanding of communication principles. Students will demonstrate their knowledge of verbal and nonverbal communication through independent assessment activities.",
            //                         "Activities: Paraverbal Communication Quiz: Assess understanding of paraverbal communication elements such as tone and vocal quality. Self-Assessment Reflection: Reflect on communication strengths and weaknesses based on course material.",
            //                     ],
            //                     miniproject:
            //                         "",
            //                 },

            //             ],
            //         },
            //         {
            //             id: 3,
            //             module_name: "Nonverbal",
            //             duration: "20-30",
            //             sessions: [
            //                 {
            //                     id: 1,
            //                     title: "Better Body Language",
            //                     topics: [
            //                         "Overview: Strategies for improving body language and posture.Students will learn techniques to convey confidence and credibility through nonverbal cues.",
            //                         "Activities: Body Language Analysis: Analyze video clips to identify positive and negative body language cues. Posture Correction Exercise:Practice exercises to improve posture and body awareness."

            //                     ],
            //                     miniproject:
            //                         "",
            //                 },
            //                 {
            //                     id: 2,
            //                     title: "Influencing Others",
            //                     topics: [
            //                         "Overview: Using nonverbal cues to influence and persuade others.Students will explore how gestures and vocal tone can enhance persuasive communication.",
            //                         "Activities: Persuasive Gesture Practice: Incorporate deliberate gestures into persuasive speeches to enhance message impact. Vocal Tone Analysis: Analyze speeches to understand how vocal tone contributes to persuasive communication."
            //                     ],
            //                     miniproject:
            //                         "",
            //                 },
            //                 {
            //                     id: 3,
            //                     title: "Delivering Impactful Messages",
            //                     topics: [
            //                         "Overview: Techniques for delivering messages with clarity and impact. Students will practice vocal variety and delivery styles to engage their audience.",
            //                         "Activities: Vocal Variety Practice: Engage in vocal exercises to vary tone, pitch, and volume. Delivery Style Analysis:Analyze different delivery styles and their effectiveness in conveying messages.",


            //                     ],
            //                     miniproject:
            //                         "",
            //                 },
            //                 {
            //                     id: 4,
            //                     title: "Sounding Authentic",
            //                     topics: [
            //                         " Overview: Aligning verbal and nonverbal cues to project authenticity. Students will explore how personal values and experiences shape their communication style.",
            //                         "Activities: Authenticity Reflection Exercise: Reflect on personal values and experiences that contribute to authentic communication. Storytelling Workshop: Develop and deliver personal narratives to connect authentically with an audience"
            //                     ],
            //                     miniproject:
            //                         "",
            //                 },
            //                 {
            //                     id: 5,
            //                     title: "Why Is Listening an Important Part of Communication?",
            //                     topics: [
            //                         "Overview: Understanding the role of active listening in effective communication. Students will practice listening comprehension skills and develop empathy.",
            //                         "Activities: Active Listening Exercises: Practice paraphrasing and summarizing key points from speeches and presentations.Listening Comprehension Quiz: Assess understanding of main ideas and speaker intent through listening comprehension activities."
            //                     ],
            //                     miniproject:
            //                         "",
            //                 },
            //                 {
            //                     id: 6,
            //                     title: " How Will Your Values, Passions, and Goals Present Your Authentic Self to Others?",
            //                     topics: [

            //                         " Overview: Assessment of understanding of communication principles. Students will demonstrate their knowledge of verbal and nonverbal communication through independent assessment activities.",
            //                         "Activities: Paraverbal Communication Quiz: Assess understanding of paraverbal communication elements such as tone and vocal quality. Self-Assessment Reflection: Reflect on communication strengths and weaknesses based on course material."
            //                     ],
            //                     miniproject:
            //                         "",
            //                 },

            //             ],
            //         },
            //         {
            //             id: 4,
            //             module_name: "Written Speech Content",
            //             duration: "20-30",
            //             sessions: [
            //                 {
            //                     id: 1,
            //                     title: "How to Write a Speech Introduction",
            //                     topics: [
            //                         " Overview: Strategies for improving body language and posture. Students will learn techniques to convey confidence and credibility through nonverbal cues.",
            //                         "Activities: Body Language Analysis: Analyze video clips to identify positive and negative body language cues. Posture Correction Exercise: Practice exercises to improve posture and body awareness."

            //                     ],
            //                     miniproject:
            //                         "",
            //                 },
            //                 {
            //                     id: 2,
            //                     title: "Making Speeches Sound Powerful",
            //                     topics: [
            //                         "Overview: In this session, students will learn how to use language and rhetoric to enhance the impact of their speeches. They will explore techniques such as storytelling, vivid language, and rhetorical devices to create memorable speeches.",
            //                         "Activities: Rhetorical Device Identification: Students study various rhetorical devices, such as parallelism, repetition, and analogy, and analyze how they are used in speeches to persuade and captivate audiences. Power Word Exercise: Students select powerful and persuasive words from a list provided and incorporate them into their speeches to evoke emotion and strengthen their message."
            //                     ],
            //                     miniproject:
            //                         "",
            //                 },
            //                 {
            //                     id: 3,
            //                     title: "Speech for Communication",
            //                     topics: [
            //                         "Overview: This session focuses on adapting speech content to different audiences and contexts for effective communication. Students will learn strategies for tailoring their message to resonate with diverse audiences.",
            //                         "Activities: Audience Analysis: Students analyze the demographics, interests, and preferences of specific audience groups and tailor a speech to meet their needs."

            //                     ],
            //                     miniproject:
            //                         "",
            //                 },
            //                 {
            //                     id: 4,
            //                     title: "How Can You Use the Three Modes of Persuasion in Speech Writing?",
            //                     topics: [
            //                         "Overview: This session explores the three modes of persuasion (ethos, pathos, and logos) and how they can be used effectively in speech writing. Students will learn how to appeal to logic, emotion, and credibility to persuade their audience.",
            //                         "Activities: Persuasion Technique Analysis: Students analyze speeches or written texts to identify instances of ethos (credibility), pathos (emotion), and logos (logic) and evaluate their effectiveness in persuading the audience. Persuasive Speech Preparation: Students apply the principles of ethos, pathos, and logos to craft persuasive speeches on topics of their choice, focusing on building credibility, evoking emotion, and presenting logical arguments."
            //                     ],
            //                     miniproject:
            //                         "",
            //                 },
            //                 {
            //                     id: 5,
            //                     title: "Learning Check",
            //                     topics: [
            //                         "Overview: This session provides an opportunity for students to assess their speech writing and persuasion skills through independent assessment activities. Students will demonstrate their ability to apply key concepts and techniques learned in the module.",
            //                         "Activities: Speech Writing Quiz: Students complete a quiz covering key concepts and techniques related to speech writing, including effective introductions, persuasive language, and audience adaptation."

            //                     ],
            //                     miniproject:
            //                         "",
            //                 },
            //             ],
            //         },
            //         {
            //             id: 5,
            //             module_name: "Verbal Skills",
            //             duration: "20-30",
            //             sessions: [
            //                 {
            //                     id: 1,
            //                     title: "How to Make an Impactful Speech",
            //                     topics: [
            //                         "Overview: This session focuses on refining verbal delivery skills to make speeches impactful and memorable. Students will learn techniques such as vocal variety, pacing, and storytelling to engage the audience.",
            //                         "Activities: Vocal Variety Practice: Students practice modulating their voice to convey emotion, emphasize key points, and maintain audience interest. Storytelling Workshop: Students learn the art of storytelling and apply narrative techniques to their speeches to create compelling and memorable narratives."

            //                     ],
            //                     miniproject:
            //                         "",
            //                 },
            //                 {
            //                     id: 2,
            //                     title: "Manage Anxiety and Speak Confidently",
            //                     topics: [
            //                         "Overview: Strategies for managing speech anxiety and building confidence in public speaking. Students will learn relaxation techniques, positive self-talk, and visualization exercises to overcome nervousness and deliver confident speeches.",
            //                         "Activities: Anxiety Management Techniques: Students practice relaxation exercises, deep breathing, and progressive muscle relaxation to reduce speech anxiety and increase confidence. Positive Affirmations: Students create and recite positive affirmations to cultivate a confident mindset and overcome negative self-talk."
            //                     ],
            //                     miniproject:
            //                         "",
            //                 },
            //                 {
            //                     id: 3,
            //                     title: "How to Convey the Main Body of a Speech",
            //                     topics: [
            //                         "Overview: This session focuses on structuring and delivering the main body of a speech effectively. Students will learn strategies for organizing ideas, providing supporting evidence, and maintaining coherence and clarity.",
            //                         "Activities: Speech Structure Analysis: Students analyze the structure of effective speeches, including the introduction, body, and conclusion, and identify strategies for organizing main points and supporting evidence."
            //                     ],
            //                     miniproject:
            //                         "",
            //                 },
            //             ],
            //         },
            //         {
            //             id: 6,
            //             module_name: "Testing Knowledge",
            //             duration: "20-30",
            //             sessions: [
            //                 {
            //                     id: 1,
            //                     title: " How to Make a Conclusion",
            //                     topics: [
            //                         "Overview: This session focuses on crafting impactful conclusions that leave a lasting impression on the audience. Students wil learn techniques for summarizing key points, reinforcing the central message, and inspiring action or reflection.",
            //                         "Activities: Conclusion Analysis: Students analyze examples of effective speech conclusions and identify strategies for summarizing main points, leaving a memorable impression, and motivating the audience to action.Conclusion Writing Exercise: Students practice writing and delivering conclusions for their speeches, applying techniques learned to create impactful closing statements."
            //                     ],
            //                     miniproject:
            //                         "",
            //                 },
            //                 {
            //                     id: 2,
            //                     title: "Recording Final Speech 1",
            //                     topics: [
            //                         "Overview: This session provides students with an opportunity to apply their public speaking skills and knowledge by recording their final speeches. Students will deliver a prepared speech on a topic of their choice, focusing on effective delivery and engagement.",
            //                         "Activities: Speech Preparation: Students prepare and rehearse their final speeches, incorporating feedback and applying techniques learned throughout the course to enhance their delivery.Speech Recording: Students record their final speeches using video or audio recording equipment, focusing on vocal delivery, body language, and overall presentation skills."

            //                     ],
            //                     miniproject:
            //                         "",
            //                 },
            //                 {
            //                     id: 3,
            //                     title: "Recording Final Speech 2",
            //                     topics: [
            //                         " Overview: A continuation of Session 25, students will record their second final speech, applying feedback from the first recording and striving for further improvement in their public speaking skills.",
            //                         "Activities: Speech Refinement: Students review their first speech recordings and identify areas for improvement in vocal delivery,nonverbal communication, and overall presentation style. Second Speech Recording: Students deliver their second final speeches,incorporating feedback and aiming to demonstrate growth and refinement in their public speaking skills.",
            //                     ],
            //                     miniproject:
            //                         "",
            //                 },
            //             ],
            //         },
            //         {
            //             id: 6,
            //             module_name: "Advanced Techniques and Application",
            //             duration: "20-30",
            //             sessions: [
            //                 {
            //                     id: 1,
            //                     title: "Incorporating Visual Aids",
            //                     topics: [
            //                         "Overview: This session focuses on the effective use of visual aids to enhance speech delivery and audience engagement. Students will learn how to select, design, and integrate visual elements such as slides, props, and multimedia to support their message.",
            //                         "Activities: Visual Aid Analysis: Students analyze examples of speeches with visual aids and identify the impact of different visual elements on audience comprehension and retention."

            //                     ],
            //                     miniproject:
            //                         "",
            //                 },
            //                 {
            //                     id: 2,
            //                     title: "Handling Q&A Sessions",
            //                     topics: [
            //                         "Overview: Strategies for effectively managing question and answer sessions following a speech. Students will learn techniques for responding to questions confidently, succinctly, and diplomatically while maintaining credibility and engagement.",
            //                         "Activities: Q&ARole-Play: Students engage in role-play scenarios where they take turns asking and answering questions related to their speeches. Q&APreparation: Students prepare responses to anticipated questions, considering potential challenges and practicing concise and articulate answers.",
            //                     ],
            //                     miniproject:
            //                         "",
            //                 },

            //             ],
            //         },
            //         {
            //             id: 7,
            //             module_name: "Real-World Application",
            //             duration: "20-30",
            //             sessions: [
            //                 {
            //                     id: 1,
            //                     title: "Presenting in Different Settings",
            //                     topics: [
            //                         "Overview: This session explores the nuances of presenting in various settings, including formal presentations, meetings, conferences, and informal gatherings. Students will learn to adapt their communication style and delivery techniques to different\ environments and audience expectations.",
            //                         "Activities: Setting Analysis: Students analyze different presentation settings and identify factors that influence communication,such as audience size, formality, and purpose"
            //                     ],
            //                     miniproject:
            //                         "",
            //                 },
            //                 {
            //                     id: 2,
            //                     title: " Reflecting and Setting Goals",
            //                     topics: [
            //                         "Overview: A culmination of the course, this session provides students with an opportunity to reflect on their public speaking journey, celebrate achievements, and set future goals. Students will assess their progress, identify areas for improvement, and develop a plan for continued growth.",
            //                         "Activities: Self-Assessment: Students reflect on their public speaking experiences, identifying strengths, weaknesses, and areas for growth. Goal Setting: Students set SMART (Specific, Measurable, Achievable, Relevant, Time-bound) goals for their ongoing public speaking development, considering personal aspirations and career objectives."

            //                     ],
            //                     miniproject:
            //                         "",
            //                 },

            //             ],
            //         },

            //     ]
            // },
            {
                id: 1,
                title: 'The Art of Public Speakingy',
                description: "Robotics and A.I. are transforming the world at a rapid pace and are expected to automate nearly 46% of global jobs by 2030.",
                image:publicspeaking,
                milestone:
                    "Understand the intricacies of Python and their applications to real-world problems.Learn to frame the logic of code.",
                about:
                    "Robotics and A.I. are transforming the world at a rapid pace and are expected to automate nearly 46% of global jobs by 2030. Melwirt, therefore, offers a Strategic and Experiential Learning Ecosystem that prepares learners (Age 10–20) and Professionals for this future. Through our integrated programs in Robotics, Artificial Intelligence, Mathematics, and Public Speaking, we empower students to think creatively, solve complex problems, communicate confidently, and build real-world solutions that shape a better tomorrow.",

                modules: [
                    {
                        id: 1,
                        module_name: "Fundaments of Public Speaking",
                        duration: "20",
                        sessions: [
                            {
                                id: 1,
                                title: "INTRODUCTION TO PUBLIC SPEAKING",
                                topics: [
                                    "Introduction & Importance of Public Speaking",
                                    "Overcoming shyness, stage fear & rejections",
                                    "Foundations of effective speaking",
                                    "Comfort-building exercises & body confidence",
                                    "Learning Check (Activities)",
                                ],
                                miniproject:
                                    "",
                            },
                            {
                                id: 2,
                                title: "INTRODUCTION TO PUBLIC SPEAKING",
                                topics: [
                                    "Body language basics & posture",
                                    "Eye contact, gestures & stage movement",
                                    "Facial expressions & emotional communication",
                                    "Using physical presence effectively",
                                    "Practice Activities + Quick Assessment",
                                ],
                                miniproject:
                                    "",
                            },
                            {
                                id: 3,
                                title: "WRITTEN SPEECH CONTENT",
                                topics: [
                                    "Speech structure: Opening, Body, Closing",
                                    "Creating hooks, storytelling & strong messages",
                                    "Writing persuasive & informative speeches",
                                    "Script drafting, flow & clarity",
                                    "Written Assessment (short speech)",
                                ],
                                miniproject:
                                    "",
                            },
                            {
                                id: 4,
                                title: "VERBAL DELIVERY SKILLS",
                                topics: [
                                    "Voice modulation & vocal tone control",
                                    "Pitch, pace, pause & emphasis",
                                    "Eliminating filler words & speaking clutter",
                                    "Clarity, articulation & pronunciation",
                                    "Practice Speech Round",
                                ],
                                miniproject:
                                    "",
                            },
                            {
                                id: 5,
                                title: "TESTING KNOWLEDGE",
                                topics: [
                                    "Recalling skills learned so far",
                                    "Identification-based tests on nonverbal/verbal skills",
                                    "Reviewing written & spoken assignments",
                                    "Group presentations with feedback",
                                    "Skill Checkpoint",
                                ],
                                miniproject:
                                    "",
                            },
                        ],
                    },
                    {
                        id: 2,
                        module_name: "Advance Public Speaking",
                        duration: "20-30",
                        sessions: [
                            {
                                id: 1,
                                title: "ADVANCE PUBLIC SPEAKING TECHNIQUES",
                                topics: [
                                    "Emotional delivery & audience connection",
                                    "Storytelling frameworks for impact",
                                    "Handling questions & thinking on the spot",
                                    "Differentiating tone for debate, hosting, academic speaking",
                                    "Mid-program Performance Evaluation",
                                ],
                                miniproject:
                                    "",
                            },
                            {
                                id: 2,
                                title: "APPLIED SPEECH",
                                topics: [
                                    "Applying speaking skills in real-life scenarios",
                                    "Everyday confidence communication",
                                    "Social speaking: friends, school, events",
                                    "Speaking with clarity in fast-paced situations",
                                    "Activity-based application",
                                ],
                                miniproject:
                                    "",
                            },
                            {
                                id: 3,
                                title: "DEBATE & ARGUMENTATION SKILLS",
                                topics: [
                                    "What makes a strong argument",
                                    "Structure of debate points",
                                    "Rebuttal, counter-argument & logic",
                                    "Group debates & pair debates",
                                    "Assessment through mini-debate rounds,"
                                ],
                                miniproject:
                                    "",
                            },
                            {
                                id: 4,
                                title: "ANCHORING & HOSTING SKILLS",
                                topics: [
                                    "Understanding stage anchoring",
                                    "Event introduction & transitions",
                                    "Duo anchoring & cue - taking",
                                    "Script creation for hosting",
                                    "Anchoring Practice Round",
                                ],
                                miniproject:
                                    "",
                            },
                            {
                                id: 5,
                                title: "IMPROVISATIONAL SPEAKING",
                                topics: [
                                    "Speaking without preparation",
                                    "One-minute topics & instant structuring",
                                    "Improvised storytelling",
                                    "Impromptu debate tasks",
                                    "Spontaneous Speech Assessment",
                                ],
                                miniproject:
                                    "",
                            },
                            {
                                id: 6,
                                title: "PRESENTATION SKILLS & VISUAL COMM.",
                                topics: [
                                    "Creating effective slide presentations",
                                    "Talking through visuals confidently",
                                    "Structuring presentations for impact",
                                    "Presenting with clarity and flow",
                                    "Final Presentation Task",
                                ],
                                miniproject:
                                    "",
                            },
                            {
                                id: 7,
                                title: "INTERVIEW & REAL-WORLD PRACTICE",
                                topics: [
                                    "Creating effective slide presentations",
                                    "Talking through visuals confidently",
                                    "Structuring presentations for impact",
                                    "Presenting with clarity and flow",
                                    "Final Presentation Task",
                                ],
                                miniproject:
                                    "",
                            },
                        ],
                    },

                ]
            }
        ]
    },

];

// export default courses;
export default courses;

