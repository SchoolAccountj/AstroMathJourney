import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Volume2, VolumeX } from "lucide-react";
import { Slider } from "@/components/ui/slider";

const ASMR_VIDEOS = [
  {
    id: "1",
    title: "Space Ambient ASMR",
    embedId: "q6ekt7yNcyc",
  },
  {
    id: "2",
    title: "Study with Space View ASMR",
    embedId: "nR9z6M3Slcs",
  },
];

export default function ASMR() {
  const [volume, setVolume] = useState(50);
  const [muted, setMuted] = useState(false);

  return (
    <div className="max-w-4xl mx-auto py-8">
      <Card className="p-6 mb-8 backdrop-blur-lg bg-opacity-30">
        <h1 className="text-3xl font-bold mb-6">ASMR Study Room</h1>
        
        <div className="aspect-video mb-4">
          <iframe
            className="w-full h-full rounded-lg"
            src={`https://www.youtube.com/embed/${ASMR_VIDEOS[0].embedId}?autoplay=0&mute=${muted ? 1 : 0}`}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>

        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setMuted(!muted)}
          >
            {muted ? <VolumeX /> : <Volume2 />}
          </Button>
          
          <div className="w-48">
            <Slider
              value={[volume]}
              min={0}
              max={100}
              step={1}
              onValueChange={(value) => setVolume(value[0])}
            />
          </div>
        </div>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {ASMR_VIDEOS.map((video) => (
          <Card key={video.id} className="p-4">
            <h3 className="font-semibold mb-2">{video.title}</h3>
            <Button variant="secondary" className="w-full">
              Play
            </Button>
          </Card>
        ))}
      </div>
    </div>
  );
}
