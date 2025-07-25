#!/bin/bash

# To run this script, navigate to the root directory of the project and run the following command:
# chmod +x start.sh
# ./start.sh

# Navigate to backend directory and start FastAPI server
echo "Starting FastAPI server..."
cd backend
uvicorn server:app &  

# Navigate to frontend directory and start React app
echo "Starting React frontend..."
cd frontend
npm run start &  

wait # Wait for both processes to finish
