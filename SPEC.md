# متجر المنتجات الرقمية - SPEC.md

## 1. Project Overview
- **Project Name**: DigitalHub - متجر المنتجات الرقمية
- **Type**: E-commerce Website (Vanilla HTML/CSS/JS)
- **Core Functionality**: متجر لبيع المنتجات الرقمية (كتب, دورات, أصوات, برمجيات)
- **Target Users**: عملاء يبحثون عن منتجات رقمية مميزة

## 2. UI/UX Specification

### Layout Structure
- **Header**: Logo,Search,Cart Icon, Navigation
- **Hero Section**: Animated headline with CTA
- **Products Grid**: 4 columns desktop, 2 tablet, 1 mobile
- **Features Section**: 3 icons with descriptions
- **Footer**: Links, Social, Copyright

### Responsive Breakpoints
- Mobile: < 768px
- Tablet: 768px - 1024px
- Desktop: > 1024px

### Visual Design

#### Color Palette
```css
--primary: #8b1a1a;        /* أحمر داكن */
--primary-light: #a52a2a;  /* أحمر فاتح */
--primary-dark: #5c1010;   /* أحمر داكن جداً */
--bg-dark: #0a0a0a;        /* خلفية داكنة */
--bg-card: #141414;        /* خلفية البطاقات */
--bg-elevated: #1a1a1a;   /* عناصر مرتفعة */
--text-primary: #ffffff;  /* نص أبيض */
--text-secondary: #a0a0a0; /* نص رمادي */
--accent: #ff4444;        /* أحمر لامع */
--accent-glow: rgba(255, 68, 68, 0.3);
```

#### Typography
- **Primary Font**: 'Cairo', sans-serif (Arabic)
- **Headings**: Cairo Bold, sizes: 64px/48px/36px/24px
- **Body**: Cairo Regular, 16px
- **Small**: Cairo, 14px

#### Spacing System
- Section padding: 100px vertical
- Card padding: 24px
- Grid gap: 24px
- Border radius: 16px

### Components

#### Product Card
- Image container with hover scale effect
- Category badge
- Product title
- Price with discount
- Rating stars
- Add to cart button with animation
- Hover: glow effect, slight lift

#### Buttons
- Primary: Red background, white text
- Secondary: Transparent with border
- Hover: Glow effect, scale 1.05

#### Cart Modal
- Slide from right
- Dark overlay backdrop
- Product list with remove option
- Total calculation
- Checkout button

#### Animations
- Page load: Staggered fade-in
- Cards: Scale on hover
- Buttons: Pulse glow
- Cart: Slide transition
- Numbers: CountUp animation

## 3. Functionality Specification

### Core Features
1. Display products grid
2. Filter by category
3. Search functionality
4. Add to cart
5. View cart modal
6. Remove from cart
7. Calculate total
8. Checkout notification

### Products Data
- 8 sample products
- Categories:كتب, دورات, أصوات, برمجيات
- Prices with optional discounts
- Ratings

### Cart Logic
- LocalStorage persistence
- Add/remove items
- Update quantities
- Calculate totals

## 4. Acceptance Criteria
- [ ] Site loads without errors
- [ ] Products display correctly
- [ ] Cart operations work
- [ ] Responsive on all devices
- [ ] Animations smooth
- [ ] Arabic text displays properly