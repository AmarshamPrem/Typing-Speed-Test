# Clickie - Speed Test Application

A modern, web-based speed testing application that lets you measure your clicking speed (CPS) and typing speed (WPM) in a clean, minimal interface.

⚠️ **Note**: This project is a work in progress and has some known bugs. If you find issues or want to contribute to fixing them, please contact me at: [add your email here]

## Overview
This application started as a simple CPS counter and evolved into a dual-mode speed testing tool. While it's functional, there are areas that need improvement, particularly in the WPM calculation accuracy and the typing test flow.

## Known Issues
- WPM calculation may not be entirely accurate
- Text generation system needs improvement
- Some UI elements might not update correctly
- Mode switching might require multiple attempts
- Accuracy calculation needs refinement

## Features

### CPS Mode
- Measures clicks per second and clicks per minute
- Visual click feedback with ripple animation
- Configurable time periods (5s, 10s, 30s, 1m, 5m)
- Real-time metrics display

### WPM Mode
- Measures typing speed in words per minute
- Shows words per second
- Calculates typing accuracy
- Rolling three-line text system
- Error highlighting
- Auto-starts on typing

## How to Use

1. Choose your mode (CPS or WPM) using the navigation bar
2. Select your preferred time period (5s to 5m)
3. For CPS mode:
   - Click "Start" and click anywhere in the click area
   - See your CPS and CPM update in real-time
4. For WPM mode:
   - Just start typing to begin the test
   - Press Enter after completing each line
   - New lines will appear as you complete them
   - See your WPM, WPS, and accuracy in real-time

## Project Structure

### HTML (counter.html)
- Main layout and structure
- Navigation bar
- Test area containers
- Metrics display grid

### CSS (counter.css)
- Modern, dark theme styling
- Responsive layout
- Click animations
- Error highlighting for typing
- Smooth transitions and hover effects

### JavaScript (script.js)
- Mode switching logic
- Timer management
- Click counting and ripple effects
- Text generation and validation
- Real-time metrics calculation
- Event handling for keyboard and mouse

## Code Structure

The JavaScript code is organized into several main components:

1. **DOM Elements**: All UI element references
2. **State Management**: Test mode, timer, and metrics tracking
3. **Core Functions**:
   - `updateMode()`: Handles mode switching
   - `startTest()`: Initiates the test
   - `resetTest()`: Resets all metrics and UI
   - `calculateMetrics()`: Updates speed measurements
4. **Event Handlers**:
   - Click counting
   - Keyboard input processing
   - Mode switching
   - Timer management

## Project Status & Contributing

This project is currently in development, and there are several known issues that need to be addressed. If you're interested in contributing or want to report bugs, please:

1. Contact me at: [add your email here]
2. Describe the issue you've found or the feature you want to add
3. If you're a developer, feel free to fork the project and submit pull requests

## Current Development Priorities
1. Fix WPM calculation accuracy
2. Improve text generation system
3. Fix UI update issues
4. Improve mode switching reliability
5. Enhance accuracy calculation

## Setup

1. Clone or download the repository
2. Open counter.html in a modern web browser
3. No additional dependencies or setup required

## Browser Support

Works in all modern browsers that support:
- CSS Grid
- CSS Animations
- ES6 JavaScript
- DOM Manipulation APIs

## Contact & Bug Reports

Found a bug? Want to contribute? Contact me at:
- Email: njv1901@njv.edu.pk
- Subject Line: "Clickie Speed Test - Bug Report/Contribution"

Please include:
- Browser version
- Operating system
- Steps to reproduce the issue
- Expected vs actual behavior

## License
This project is open source and available under the MIT License.
