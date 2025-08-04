# Berkley's DLZP Angular Shopping App

Hi, my name is Berkley Olmstead, an applicant for the Full Stack
Developer role at DLZP. I don't have experience with Angular and I
learned it is the frontend framework DLZP uses.

So, I decided to learn the basics of Angular and build this site using the
framework. It is a fake shopping website with an AI chatbot that
utilizes the Anthropic API.

Please feel free to email me if you have any questions: olms2074&#64;gmail.com. Thank you!

## Features

- **Product Catalog**: Browse products with filtering by subcategories (Sports, Hobbies, & Misc)
- **Auction System**: Products with starting bid functionality
- **Shopping Cart**: Add and manage items in your cart
- **Live Chat**: Integrated chat component for customer support
- **Responsive Design**: Built with Tailwind CSS for modern, responsive UI
- **Modern Angular**: Utilizes Angular 19 with signal-based reactive state management

## Tech Stack

- **Frontend**: Angular 19
- **Styling**: Tailwind CSS
- **State Management**: Angular Signals
- **HTTP Client**: Angular HttpClient with RxJS
- **Routing**: Angular Router

## Getting Started

### Prerequisites

- Node.js (version 18 or higher)
- npm or yarn
- Angular CLI 19.2.15+

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

### Development

To start the development server:

```bash
npm start
# or
ng serve
```

The application will be available at `http://localhost:4200/`. The app will automatically reload when you make changes to the source files.

### Building

To build the project for production:

```bash
npm run build
# or
ng build
```

The build artifacts will be stored in the `dist/` directory, optimized for production deployment.

## Project Structure

```
src/
├── app/
│   ├── components/          # Reusable UI components
│   │   ├── header/         # Application header
│   │   └── primary-button/ # Button component
│   ├── pages/              # Page components
│   │   ├── cart/           # Shopping cart page
│   │   └── products-list/  # Product listing page
│   ├── services/           # Business logic services
│   │   ├── api.service.ts  # API communication
│   │   ├── cart.service.ts # Cart management
│   │   └── products.service.ts # Product data management
│   └── chat/               # Chat functionality
├── models/                 # TypeScript interfaces
└── styles.css             # Global styles
```

## Available Scripts

- `npm start` - Start development server
- `npm run build` - Build for production
- `npm run watch` - Build in watch mode
- `npm test` - Run unit tests

## Development Tools

This project uses:

- **Angular CLI** for scaffolding and build tools
- **TypeScript** for type safety
- **RxJS** for reactive programming
- **Karma & Jasmine** for testing

### Generating Components

To generate a new component:

```bash
ng generate component component-name
```

For other schematics (services, pipes, etc.):

```bash
ng generate --help
```

## Testing

Run unit tests:

```bash
npm test
# or
ng test
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test your changes
5. Submit a pull request

## License

This project is private and proprietary.
