# ALaram | الأرام - Marketing Website

A complete marketing website for **ALaram | الأرام**, a provider of specialized accounting software solutions for various industries in Saudi Arabia and the GCC region.

## 🚀 Features

- **Multi-language Support**: Arabic (RTL) as default, with English (LTR) toggle using `next-intl`
- **Dark/Light Mode**: Theme switching with system preference support
- **Industry-Specific Solutions**: Dedicated pages for Supermarkets, Maintenance, Auto Workshops, Perfume Shops, and Beauty Salons
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Modern UI**: Built with shadcn/ui components
- **Smooth Animations**: Framer Motion for engaging user interactions
- **SEO Optimized**: Metadata, Open Graph, sitemap, and robots.txt
- **Type-Safe**: Full TypeScript implementation
- **Form Validation**: React Hook Form with Zod schemas
- **Multi-Market Ready**: Configurable for different markets (KSA, UAE, Kuwait, etc.)

## 📋 Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui + Radix UI
- **Icons**: Lucide React
- **Animations**: Framer Motion
- **Internationalization**: next-intl
- **Theme**: next-themes
- **Form Handling**: react-hook-form
- **Validation**: Zod
- **Fonts**: Cairo (Arabic), Inter (English)

## 🛠️ Getting Started

### Prerequisites

- Node.js 18+ 
- pnpm (recommended) or npm

### Installation

1. **Clone the repository**:
   ```bash
   git clone <repository-url>
   cd alaram
   ```

2. **Install dependencies**:
   ```bash
   pnpm install
   ```

3. **Set up environment variables**:
   ```bash
   cp .env.local.example .env.local
   ```

   Edit `.env.local` with your configuration:
   ```env
   NEXT_PUBLIC_SITE_NAME="ALaram | الأرام"
   NEXT_PUBLIC_DEFAULT_MARKET="KSA"
   NEXT_PUBLIC_ANALYTICS_ENABLED="false"
   CONTACT_INBOX="sales@alaram.example"
   ```

4. **Run the development server**:
   ```bash
   pnpm dev
   ```

5. **Open your browser**:
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
alaram/
├── app/                          # Next.js App Router
│   ├── [locale]/                 # Internationalized routes
│   │   ├── about/                # About page
│   │   ├── blog/                 # Blog listing
│   │   ├── contact/              # Contact page
│   │   ├── demo/                 # Demo booking
│   │   ├── legal/                # Terms & Privacy
│   │   ├── pricing/              # Pricing page
│   │   ├── solutions/            # Solutions
│   │   │   └── [industry]/       # Dynamic industry pages
│   │   ├── layout.tsx            # Locale layout
│   │   └── page.tsx              # Homepage
│   ├── api/                      # API routes
│   │   ├── contact/              # Contact form handler
│   │   └── demo/                 # Demo booking handler
│   ├── globals.css               # Global styles
│   ├── layout.tsx                # Root layout
│   ├── robots.ts                 # Robots.txt
│   └── sitemap.ts                # Sitemap
├── components/                   # React components
│   ├── forms/                    # Form components
│   ├── layout/                   # Layout components (Navbar, Footer)
│   ├── providers/                # Context providers
│   ├── sections/                 # Page sections
│   └── ui/                       # shadcn/ui components
├── config/                       # Configuration files
│   └── markets.ts                # Market-specific config
├── data/                         # Seed data
│   └── industries.ts             # Industry definitions
├── lib/                          # Utility functions
│   └── utils.ts                  # Helper functions
├── messages/                     # i18n translations
│   ├── ar.json                   # Arabic translations
│   └── en.json                   # English translations
├── i18n.ts                       # i18n configuration
├── middleware.ts                 # Next.js middleware
├── next.config.js                # Next.js configuration
├── tailwind.config.ts            # Tailwind configuration
└── tsconfig.json                 # TypeScript configuration
```

## 🌍 Internationalization

The site supports Arabic (RTL) and English (LTR):

- **Default Language**: Arabic
- **Language Toggle**: Available in the navbar
- **Translation Files**: `messages/ar.json` and `messages/en.json`

### Adding Translations

Edit the JSON files in the `messages/` directory:

```json
// messages/ar.json
{
  "nav": {
    "home": "الرئيسية",
    "solutions": "الحلول"
  }
}

// messages/en.json
{
  "nav": {
    "home": "Home",
    "solutions": "Solutions"
  }
}
```

## 🏭 Adding a New Industry

1. **Edit `data/industries.ts`**:
   ```typescript
   {
     id: "restaurants",
     nameAR: "المطاعم",
     nameEN: "Restaurants",
     summaryAR: "حل متكامل لإدارة المطاعم",
     summaryEN: "Complete restaurant management solution",
     // ... add more fields
   }
   ```

2. **The dynamic route `/solutions/[industry]` will automatically handle the new industry**

## 🌐 Adding a New Market

1. **Edit `config/markets.ts`**:
   ```typescript
   export const markets: Record<string, Market> = {
     // ... existing markets
     BHR: {
       marketId: "BHR",
       name: "Bahrain",
       nameAR: "البحرين",
       nameEN: "Bahrain",
       defaultCurrency: "BHD",
       currencySymbol: "د.ب",
       vatRate: 10,
       // ... other settings
     }
   };
   ```

2. **Update `.env.local` if needed**:
   ```env
   NEXT_PUBLIC_DEFAULT_MARKET="BHR"
   ```

## 🎨 Customization

### Branding

1. **Logo**: Update `components/logo.tsx` with your SVG or image
2. **Colors**: Edit `tailwind.config.ts` and `app/globals.css` for theme colors
3. **Fonts**: Modify `app/layout.tsx` to change fonts

### Theme Colors

Edit `app/globals.css`:

```css
:root {
  --primary: 213 94% 45%;        /* Main brand color */
  --secondary: 210 40% 96.1%;    /* Secondary color */
  /* ... other colors */
}
```

## 📱 Responsive Design

The site is fully responsive with breakpoints:
- **Mobile**: < 768px
- **Tablet**: 768px - 1024px
- **Desktop**: > 1024px

## 🔒 KSA Compliance Features

- **ZATCA E-Invoicing**: Placeholder integration (requires actual setup)
- **VAT Calculation**: 15% VAT display and handling
- **Payment Methods**: Mada, Apple Pay, STC Pay support
- **Arabic Invoicing**: RTL invoice formatting ready

## 🧪 Testing

```bash
# Run linter
pnpm lint

# Format code
pnpm format

# Build for production
pnpm build

# Start production server
pnpm start
```

## 🚀 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import project in Vercel
3. Add environment variables
4. Deploy

### Other Platforms

Build the project:
```bash
pnpm build
```

The output will be in the `.next` directory.

## 📝 Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `NEXT_PUBLIC_SITE_NAME` | Site name | "ALaram \| الأرام" |
| `NEXT_PUBLIC_DEFAULT_MARKET` | Default market | "KSA" |
| `NEXT_PUBLIC_ANALYTICS_ENABLED` | Enable analytics | "false" |
| `CONTACT_INBOX` | Contact form email | "sales@alaram.example" |
| `NEXT_PUBLIC_SITE_URL` | Production URL | "http://localhost:3000" |

## 📚 Key Pages

- **Home** (`/`): Main landing page with hero, features, industries, stats, testimonials, FAQ
- **Solutions** (`/solutions`): Industry solutions overview
- **Industry Pages** (`/solutions/[industry]`): Detailed industry-specific pages
- **Pricing** (`/pricing`): Three-tier pricing table with KSA market pricing
- **About** (`/about`): Company information, mission, vision, values
- **Contact** (`/contact`): Contact form and information
- **Demo** (`/demo`): Demo booking form
- **Blog** (`/blog`): Blog listing (placeholder)
- **Legal** (`/legal/terms`, `/legal/privacy`): Terms and privacy policy

## 🔧 API Routes

### Contact Form

**Endpoint**: `POST /api/contact`

**Body**:
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "+966xxxxxxxxx",
  "company": "ACME Corp",
  "industry": "supermarket",
  "message": "Interested in your solution"
}
```

### Demo Booking

**Endpoint**: `POST /api/demo`

**Body**:
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "+966xxxxxxxxx",
  "company": "ACME Corp",
  "industry": "supermarket",
  "employeeCount": "6-20",
  "preferredDate": "2024-02-01",
  "preferredTime": "morning",
  "currentSolution": "Excel",
  "message": "Looking to upgrade our system"
}
```

**Note**: These are placeholder endpoints that log to console. In production, integrate with your CRM or email service.

## 🎯 SEO Features

- **Metadata**: Comprehensive metadata for all pages
- **Open Graph**: Social media sharing optimization
- **Twitter Cards**: Twitter-specific metadata
- **Sitemap**: Auto-generated sitemap at `/sitemap.xml`
- **Robots.txt**: Search engine crawling instructions at `/robots.txt`
- **Structured Data**: JSON-LD ready (implement as needed)

## 📈 Performance

- **Image Optimization**: Using Next.js Image component
- **Code Splitting**: Automatic with Next.js App Router
- **Font Optimization**: `next/font` for optimal loading
- **Server Components**: Default for better performance
- **Lazy Loading**: Components load on-demand

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📄 License

[Your License Here]

## 🙏 Acknowledgments

- Built with [Next.js](https://nextjs.org/)
- UI components from [shadcn/ui](https://ui.shadcn.com/)
- Icons from [Lucide](https://lucide.dev/)
- Animations with [Framer Motion](https://www.framer.com/motion/)

## 📞 Support

For support, email support@alaram.example or visit our [contact page](http://localhost:3000/contact).

---

Made with ❤️ in Saudi Arabia 🇸🇦

