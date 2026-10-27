#!/bin/bash
# Optimize video for web playback with faststart flag
# This ensures the video can start playing before fully downloading

if [ ! -f "videos/tentwo.mp4" ]; then
  echo "Error: videos/tentwo.mp4 not found"
  echo "Please place the video file in the videos/ directory first"
  exit 1
fi

echo "Checking if video has faststart flag..."

# Check if ffmpeg is available
if ! command -v ffmpeg &> /dev/null; then
  echo "Error: ffmpeg not found. Please install ffmpeg to optimize the video."
  echo "On Windows: Download from https://ffmpeg.org/download.html"
  echo "On macOS: brew install ffmpeg"
  echo "On Linux: sudo apt-get install ffmpeg"
  exit 1
fi

# Create optimized version with faststart flag
echo "Creating optimized version with faststart flag..."
ffmpeg -i videos/tentwo.mp4 -c copy -movflags +faststart videos/tentwo-optimized.mp4

if [ $? -eq 0 ]; then
  echo "Optimization successful!"
  echo "Replacing original with optimized version..."
  mv videos/tentwo-optimized.mp4 videos/tentwo.mp4
  echo "Done! Video is now optimized for web streaming."
else
  echo "Optimization failed. Please check the error messages above."
  exit 1
fi
