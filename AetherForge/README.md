# Aetherial Canvas 🎨

**AI-Powered Generative Mood Board Studio**

Aetherial Canvas is a cutting-edge, frontend-focused generative design tool that helps creators, designers, and marketers quickly generate beautiful, cohesive mood boards and color palettes. It removes creative blocks by using a unique combination of user-driven inputs and simulated AI algorithms to create stunning visual compositions.

## ✨ Features

### 🎛️ Interactive Mood Controls
- **Energy Slider**: Control the dynamic range from calm to energetic
- **Temperature Slider**: Adjust the color temperature from cool to warm
- **Theme Selector**: Choose from Nature, Tech, Vintage, or Futuristic themes
- **Keyword Input**: Add custom keywords to influence the generation

### 🎨 AI-Generated Color Palettes
- **Smart Color Generation**: Advanced algorithms create harmonious color schemes
- **Interactive Swatches**: Click any color to view detailed information
- **Accessibility Analysis**: Automatic contrast ratio calculations
- **CSS Export**: Copy generated colors as CSS variables

### 🖼️ Dynamic Mood Board
- **Real-time Image Generation**: Fetch relevant images based on mood parameters
- **Pin Functionality**: Save your favorite images across generations
- **Responsive Grid**: Beautiful, responsive image layout
- **Photographer Credits**: Proper attribution for all images

### 🎯 Advanced Features
- **Collapsible Sidebar**: Maximize workspace when needed
- **Smooth Animations**: Framer Motion powered transitions
- **Dark Mode Support**: Beautiful dark theme
- **Project Saving**: Save and load your creations
- **Toast Notifications**: Real-time feedback

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd AetherForge
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173`

## 🛠️ Tech Stack

- **Framework**: React 19
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Routing**: React Router DOM
- **Notifications**: React Toastify
- **Image API**: Unsplash (with fallbacks)

## 📁 Project Structure

```
src/
├── components/
│   ├── ui/              # Reusable UI components
│   ├── canvas/          # Canvas-specific components
│   ├── layout/          # Layout components
│   └── shared/          # Shared components
├── contexts/            # React Context providers
├── hooks/               # Custom React hooks
├── pages/               # Main application views
├── services/            # API and utility services
├── utils/               # Utility functions
└── assets/              # Static assets
```

## 🎨 How to Use

### 1. Adjust Your Mood
- Use the **Energy** slider to set the dynamic level
- Adjust the **Temperature** for warm or cool tones
- Select a **Theme** that matches your vision
- Add **Keywords** for specific inspiration

### 2. Generate Your Vibe
- Click the **"Generate Vibe"** button
- Watch as your color palette and mood board come to life
- The system analyzes your inputs and creates harmonious combinations

### 3. Explore Your Creation
- **Color Palette**: Click any color swatch to see detailed information
- **Mood Board**: Pin your favorite images for future reference
- **Export**: Copy CSS variables or download your mood board

### 4. Save Your Work
- Use the **Save** button to store your project
- Projects are saved locally in your browser
- Share your creations with others

## 🔧 Configuration

### Environment Variables
Create a `.env` file in the root directory:

```env
# Optional: Unsplash API Key for better image quality
REACT_APP_UNSPLASH_ACCESS_KEY=your_unsplash_key_here

# Optional: Pexels API Key as fallback
REACT_APP_PEXELS_API_KEY=your_pexels_key_here
```

### Customization
- Modify color themes in `src/services/generativeService.js`
- Adjust animation settings in `tailwind.config.js`
- Customize UI components in the `src/components/ui/` directory

## 🎯 Key Components

### Generative Engine
The heart of Aetherial Canvas uses sophisticated algorithms to:
- Analyze mood parameters and keywords
- Generate harmonious color palettes
- Create relevant image search queries
- Ensure accessibility compliance

### Color Theory
Our color generation is based on:
- **HSL Color Space**: For intuitive color manipulation
- **Theme-based Biases**: Different color ranges per theme
- **Energy Influence**: Saturation and contrast adjustments
- **Temperature Control**: Warm/cool color shifts

### Image Integration
- **Smart Query Generation**: Combines mood and keywords
- **Multiple API Support**: Unsplash with Pexels fallback
- **Placeholder System**: Graceful degradation when APIs fail
- **Responsive Loading**: Optimized image loading with placeholders

## 🎨 Design Philosophy

Aetherial Canvas is built on the principle that **creativity should be effortless**. We believe that:

- **Intuitive Controls** lead to better results
- **Real-time Feedback** keeps users engaged
- **Beautiful Animations** enhance the creative experience
- **Accessibility** should be built-in, not an afterthought

## 🚀 Future Enhancements

- [ ] **Advanced Color Tools**: Color harmony analysis
- [ ] **Export Options**: PDF, Figma, and Sketch integration
- [ ] **Collaboration**: Real-time sharing and collaboration
- [ ] **AI Enhancement**: Integration with actual AI services
- [ ] **Mobile App**: Native mobile experience
- [ ] **Templates**: Pre-built mood board templates

## 🤝 Contributing

We welcome contributions! Please see our contributing guidelines for details.

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- **Unsplash** for providing beautiful images
- **Lucide** for the amazing icon set
- **Framer Motion** for smooth animations
- **Tailwind CSS** for the utility-first styling

---

**Made with ❤️ for the creative community**

*Transform your ideas into stunning visual compositions with Aetherial Canvas.*
