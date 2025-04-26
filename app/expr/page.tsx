"use client";
import { Button } from "@/components/ui/button";
import api from "@/lib/api";
import React from "react";

const initialAudioValue = {
  url: "",
  blob: new Blob(),
};
const ExprPage = () => {
  const mediaRecorder = React.useRef<MediaRecorder>(null);
  const audioDataRef = React.useRef<Array<Blob>>([]);
  const [isStartRecorded, setIsStartRecorded] = React.useState(false);
  const [responseMessage, setResponseMessage] = React.useState("");

  const [audioValue, setAudioValue] = React.useState({
    url: "",
    blob: new Blob(),
  });

  React.useEffect(() => {
    (async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          audio: true,
        });

        mediaRecorder.current = new MediaRecorder(stream); // construct media recorder

        mediaRecorder.current.ondataavailable = (e) => {
          // when the recording start and the data is available
          audioDataRef.current.push(e.data);
        };
        mediaRecorder.current.onstop = () => {
          // event after we click stop button
          setIsStartRecorded(false);

          const blob = new Blob(audioDataRef.current, {
            type: "audio/mp3",
          });

          const audioUrl = window.URL.createObjectURL(blob);

          setAudioValue({
            url: audioUrl,
            blob,
          });

          api
            .generateTextFromAudio({
              file: blob,
            })
            .then((res) => res.json())
            .then((res) => setResponseMessage(res.message))
            .catch((err) => console.log("error upload audio", err));
        };
      } catch (err) {
        console.error("error", err);
      }
    })();
  }, []);

  const startRecording = () => {
    setAudioValue(initialAudioValue);
    audioDataRef.current = [];
    mediaRecorder.current?.start();
    setIsStartRecorded(true);
  };

  return (
    <section className="flex flex-col gap-3 items-center">
      {isStartRecorded && (
        <span className="relative flex size-5">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-slate-400 opacity-75"></span>
          <span className="relative inline-flex size-5 rounded-full bg-slate-500"></span>
        </span>
      )}
      {!!audioValue.url && (
        <audio controls>
          <source src={audioValue.url} type="audio/ogg" />
        </audio>
      )}
      {responseMessage && <p>{responseMessage}</p>}
      <div className="flex gap-3">
        {isStartRecorded ? (
          <Button
            onClick={() => {
              mediaRecorder.current?.stop();
            }}
          >
            Stop
          </Button>
        ) : (
          <Button onClick={startRecording}>Start</Button>
        )}
      </div>
    </section>
  );
};

export default ExprPage;
