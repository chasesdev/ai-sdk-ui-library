# ui
Demo - https://ui-component-library-ai-sdk.vercel.app/



component library for ai-sdk

want cross platform gluestack instead? 
Try these:
repo - https://github.com/chasesdev/ai-sdk-gluestack 

demo - https://ai-sdk-gluestack.vercel.app/

Explore the library in action:

- 🌐 **[Live Demo](https://ui-component-library-ai-sdk.vercel.app)** - Main application showcase
- 📚 **[Storybook Documentation](https://ui-component-library-ai-sdk.vercel.app/storybook)** - Interactive component documentation
- 📱 **[Mobile Showcase](https://ui-component-library-ai-sdk.vercel.app/showcase/mobile)** - Optimized mobile experience
- 💻 **[Tablet Showcase](https://ui-component-library-ai-sdk.vercel.app/showcase/tablet)** - Responsive tablet layout
- 🖥️ **[Desktop Showcase](https://ui-component-library-ai-sdk.vercel.app/showcase/desktop)** - Full-featured desktop layout
- 🔗 **[GitHub Repository](https://github.com/chasesdev/ui)** - Source code and contributions

## ✨ Technology Stack

This library is built with:

### 🎯 Core Framework
- **⚡ Next.js 15** - The React framework for production with App Router
- **📘 TypeScript 5** - Type-safe JavaScript for better developer experience
- **🎨 Tailwind CSS 4** - Utility-first CSS framework for rapid UI development

### 🧩 UI Components & Styling
- **🧩 shadcn/ui** - High-quality, accessible components built on Radix UI
- **🎯 Lucide React** - Beautiful & consistent icon library
- **🌈 Framer Motion** - Production-ready motion library for React
- **🎨 Next Themes** - Perfect dark mode in 2 lines of code

### 📋 Forms & Validation
- **🎣 React Hook Form** - Performant forms with easy validation
- **✅ Zod** - TypeScript-first schema validation

### 🔄 State Management & Data Fetching
- **🐻 Zustand** - Simple, scalable state management
- **🔄 TanStack Query** - Powerful data synchronization for React
- **🌐 Axios** - Promise-based HTTP client

### 🎨 Advanced UI Features
- **📊 TanStack Table** - Headless UI for building tables and datagrids
- **🖱️ DND Kit** - Modern drag and drop toolkit for React
- **📊 Recharts** - Redefined chart library built with React and D3
- **🖼️ Sharp** - High performance image processing

### 🌍 Internationalization & Utilities
- **🌍 Next Intl** - Internationalization library for Next.js
- **📅 Date-fns** - Modern JavaScript date utility library
- **🪝 ReactUse** - Collection of essential React hooks for modern development

## 🎯 Why This Library?

- **🤖 AI-Optimized** - Components specifically designed for AI/ML application interfaces
- **🎨 Beautiful UI** - Built on shadcn/ui with advanced interactions and animations
- **🔒 Type Safety** - Fully typed with TypeScript and Zod validation
- **📱 Responsive** - Mobile-first design principles with smooth animations
- **📊 Data-Rich** - Specialized components for charts, tables, and data visualization
- **🎭 Well Documented** - Comprehensive Storybook documentation with live examples
- **🌍 i18n Ready** - Multi-language support built-in
- **⚡ Performance** - Optimized for production with tree-shaking and code splitting
- **🎨 Themeable** - Dark mode and customizable theming out of the box
- **♿ Accessible** - WCAG compliant components built on Radix UI

## 🚀 Quick Start

### Development

```bash
# Install dependencies
yarn install

# Start Next.js development server
yarn dev

# Start Storybook component explorer
yarn storybook
```

- **Next.js App**: [http://localhost:3000](http://localhost:3000) - Demo application
- **Storybook**: [http://localhost:6006](http://localhost:6006) - Component documentation

### Building

```bash
# Build Next.js app
yarn build:next

# Build Storybook
yarn build:storybook

# Build both
yarn build
```

## 🚢 Deployment to Vercel

The library documentation and demo are configured for single-project deployment to Vercel with path-based routing:

- **Demo App**: Deployed at your root domain (e.g., `ui-library.vercel.app`)
- **Component Docs (Storybook)**: Automatically available at `/storybook` path (e.g., `ui-library.vercel.app/storybook`)

### Deploy Steps:

1. **Push to GitHub** - Commit and push your changes
   ```bash
   git add .
   git commit -m "Ready for deployment"
   git push
   ```

2. **Connect to Vercel**
   - Visit [vercel.com](https://vercel.com) and import your repository
   - Vercel will auto-detect the Next.js framework

3. **Configure Environment Variables** (if needed)
   - Add any required environment variables in Vercel dashboard
   - Include database connection strings, API keys, etc.

4. **Deploy**
   - Click "Deploy" - Vercel will run `yarn build` which builds both Next.js and Storybook
   - Your app will be live at `your-project.vercel.app`
   - Storybook will be accessible at `your-project.vercel.app/storybook`

### Using Vercel CLI:

```bash
# Install Vercel CLI globally
npm i -g vercel

# Deploy to preview
vercel

# Deploy to production
vercel --prod
```

### Build Configuration:

The build process automatically:
1. Builds the Next.js demo application to `.next/`
2. Builds Storybook documentation to `public/storybook/`
3. Next.js serves Storybook static files from the public directory

Both the demo app and component documentation are deployed in a single Vercel project, simplifying deployment and management.

## 📁 Project Structure

```
src/
├── app/                    # Next.js App Router demo pages
├── components/
│   ├── ai-sdk/            # UI Component Library - for AI SDK components
│   │   ├── Connection.tsx         # Connection status component
│   │   ├── Connection.stories.tsx # Storybook stories
│   │   └── ...                    # More components
│   └── ui/                # Base shadcn/ui components
├── hooks/                 # Custom React hooks
└── lib/                   # Utility functions and configurations
```

## 🎨 Component Categories

### AI SDK Components

Specialized components for AI/ML applications:

- **Connection** - Real-time connection status indicators
- **Graph & Visualization** - Data visualization components
- **Forms & Inputs** - AI-optimized form components
- **Data Display** - Components for displaying AI outputs

### Base UI Components (shadcn/ui)

Complete set of accessible, customizable components:

- **Layout**: Card, Separator, Aspect Ratio, Resizable Panels
- **Forms**: Input, Textarea, Select, Checkbox, Radio Group, Switch
- **Feedback**: Alert, Toast (Sonner), Progress, Skeleton
- **Navigation**: Breadcrumb, Menubar, Navigation Menu, Pagination
- **Overlay**: Dialog, Sheet, Popover, Tooltip, Hover Card
- **Data Display**: Badge, Avatar, Calendar, Table

### Advanced Features

- **Tables**: Powerful data tables with sorting, filtering, pagination (TanStack Table)
- **Charts**: Beautiful visualizations with Recharts
- **Drag & Drop**: Modern DnD functionality with DND Kit
- **Animations**: Smooth micro-interactions with Framer Motion
- **Theme Switching**: Built-in dark/light mode support

## 📖 Documentation

All components are fully documented in Storybook with:

- **Interactive Examples** - Try components with live controls
- **Props Documentation** - Complete API reference
- **Usage Examples** - Code snippets and best practices
- **Accessibility Notes** - WCAG compliance information
- **Theming Guide** - Customization options

Start Storybook locally with `yarn storybook` or view the deployed docs at your `/storybook` path.

## 🤝 Contributing

This is an open component library. Contributions are welcome!

1. Fork the repository
2. Create a feature branch
3. Add your component with Storybook stories
4. Submit a pull request

## 📄 License

MIT License - feel free to use in your projects.

---

Built for the AI/ML developer community 🚀
