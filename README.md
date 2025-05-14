# RAG ChatBot Frontend

A frontend application for interacting with a Retrieval-Augmented Generation (RAG) chatbot. This project provides a user-friendly interface to communicate with an AI-powered backend.

## Features

- Chat interface for real-time conversations
- Integration with RAG backend API
- Responsive and modern UI
- Easy customization and extension

## Getting Started

### Prerequisites

- Node.js (v16+ recommended)
- npm or yarn

### Installation

```bash
git clone https://github.com/yourusername/rag_chatBot_frontend.git
cd rag_chatBot_frontend
npm install
```

### Environment Variables
Create a `.env` file in the root directory and add the following variables:

```
VITE_BASE_URL= this is you backend API URL (only base url without /)
```

### Running the App

```bash
npm start
```

The app will be available at `http://localhost:5173`.

## Configuration

Update the API endpoint and other settings in the `.env` file as needed.

## Project Structure

```
/src
    /components
    /constants
    App.js
    index.js
```

## Contributing

Contributions are welcome! Please open issues or submit pull requests.

## License

This project is licensed under the MIT License.