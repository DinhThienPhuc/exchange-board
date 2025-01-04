# Exchange Board

A real-time stock exchange dashboard built with React and Socket.IO that displays live market data including stock prices, trading volumes, and price changes.

## Features

- Real-time data updates via WebSocket connection
- Display of top gainers and losers
- Material UI components for a modern interface
- Responsive design for various screen sizes
- Auto-refresh functionality every 5 seconds

## Tech Stack

- React 17
- Material UI 4
- Socket.IO 4
- Express 4
- Node.js

## Prerequisites

- Node.js 18 or higher
- npm or pnpm package manager

## Installation

1. Clone the repository:

```bash
git clone https://github.com/DinhThienPhuc/exchange-board.git
```

2. Navigate to project directory:

```bash
cd exchange-board
```

3. Install dependencies:

```bash
npm i
```

## Development

The app requires running both the backend server and frontend client:

1. Start the WebSocket server:

```bash
node server.js
```

2. In a new terminal, start the React development server:

```bash
npm run start
```

The app will open automatically at http://localhost:3000

## Project Structure

```bash
exchange-board/
├── public/
├── src/
│   ├── helpers/
│   │   ├── functions.js
│   │   └── originalData.js
│   ├── App.js
│   ├── index.js
│   └── index.css
├── server.js
├── package.json
└── README.md
```

## Available Scripts

- `pnpm dev` - Runs both server and client in development mode
- `npm run start` - Starts only the React client
- `npm run build` - Builds the app for production

## Environment Variables

- `PORT` - Server port (default: 4869)
- `REACT_APP_WS_URL` - WebSocket server URL

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Author

@DinhThienPhuc
