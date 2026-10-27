# Videos Directory

This directory contains self-hosted video files for the TENTWO website.

## Current Videos

- `tentwo.mp4` (3.7 MB) - Main promotional video shown on the About page

## Video Optimization

The video file should have the "faststart" flag enabled for optimal web streaming. This allows the video to start playing before it's fully downloaded.

### To optimize a video:

```bash
# Run the optimization script from the project root
./optimize-video.sh
```

Or manually with ffmpeg:

```bash
ffmpeg -i videos/tentwo.mp4 -c copy -movflags +faststart videos/tentwo-optimized.mp4
mv videos/tentwo-optimized.mp4 videos/tentwo.mp4
```

## Video Specifications

- **Format**: MP4 (H.264)
- **Recommended aspect ratio**: 9:16 (vertical) or 16:9 (horizontal)
- **Maximum size**: Keep under 5MB for fast loading
- **faststart flag**: Required for streaming playback

## Accessibility Features

The video player on the About page includes:

- Autoplay when visible (respects prefers-reduced-motion)
- IntersectionObserver to pause when scrolled out of view
- Play/pause and mute/unmute controls
- Poster image fallback
- YouTube link for alternative viewing
