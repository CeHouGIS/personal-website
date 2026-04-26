"use client";

import { Pause, Play, Volume2, VolumeX } from "lucide-react";
import { useTranslations } from "next-intl";
import { useEffect, useRef, useState } from "react";

const TRACK_URL = "/audio/travel.mp3";
const TRACK_TITLE = "Travel";

export function MusicPlayer() {
  const t = useTranslations("travel.musicPlayer");
  const audioRef = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [muted, setMuted] = useState(false);
  const [available, setAvailable] = useState(true);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const onTime = () => setProgress(audio.currentTime);
    const onMeta = () => {
      setDuration(audio.duration || 0);
      setAvailable(true);
    };
    const onError = () => setAvailable(false);
    const onEnd = () => setPlaying(false);

    audio.addEventListener("timeupdate", onTime);
    audio.addEventListener("loadedmetadata", onMeta);
    audio.addEventListener("error", onError);
    audio.addEventListener("ended", onEnd);

    return () => {
      audio.removeEventListener("timeupdate", onTime);
      audio.removeEventListener("loadedmetadata", onMeta);
      audio.removeEventListener("error", onError);
      audio.removeEventListener("ended", onEnd);
    };
  }, []);

  const toggle = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (playing) {
      audio.pause();
      setPlaying(false);
    } else {
      audio
        .play()
        .then(() => setPlaying(true))
        .catch(() => setAvailable(false));
    }
  };

  const seek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const audio = audioRef.current;
    if (!audio) return;
    const time = Number(e.target.value);
    audio.currentTime = time;
    setProgress(time);
  };

  const toggleMute = () => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.muted = !audio.muted;
    setMuted(audio.muted);
  };

  return (
    <div className="rounded-xl border bg-card">
      <audio ref={audioRef} src={TRACK_URL} preload="metadata" />
      {available ? (
        <div className="flex items-center gap-3 px-3 py-2.5">
          <button
            type="button"
            onClick={toggle}
            className="bg-foreground text-background grid size-9 place-items-center rounded-full transition-opacity hover:opacity-90"
            aria-label={playing ? t("pause") : t("play")}
          >
            {playing ? (
              <Pause className="size-4" />
            ) : (
              <Play className="size-4 translate-x-px" />
            )}
          </button>
          <div className="hidden min-w-0 flex-shrink-0 sm:block">
            <p className="truncate text-xs font-medium">{TRACK_TITLE}</p>
          </div>
          <span className="text-muted-foreground w-10 text-center text-xs tabular-nums">
            {fmtTime(progress)}
          </span>
          <input
            type="range"
            min={0}
            max={duration || 0}
            step={0.1}
            value={progress}
            onChange={seek}
            className="accent-foreground flex-1"
            aria-label="Seek"
          />
          <span className="text-muted-foreground w-10 text-center text-xs tabular-nums">
            {fmtTime(duration)}
          </span>
          <button
            type="button"
            onClick={toggleMute}
            aria-label={t("mute")}
            className="text-muted-foreground hover:text-foreground"
          >
            {muted ? (
              <VolumeX className="size-4" />
            ) : (
              <Volume2 className="size-4" />
            )}
          </button>
        </div>
      ) : (
        <div className="text-muted-foreground p-3 text-xs">{t("noTrack")}</div>
      )}
    </div>
  );
}

function fmtTime(s: number) {
  if (!Number.isFinite(s)) return "0:00";
  const m = Math.floor(s / 60);
  const sec = Math.floor(s % 60)
    .toString()
    .padStart(2, "0");
  return `${m}:${sec}`;
}
