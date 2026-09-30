"use client";

import { useEffect } from "react";

const PLAYER_ID = "vid-6abd1bfe1a594cec43c9171c";
const PLAYER_SRC =
  "https://scripts.converteai.net/64213409-df9a-44fb-a16e-2c3d7b1c97be/players/6abd1bfe1a594cec43c9171c/v4/player.js";

// Embed de vturb. El botón de CTA vive dentro del reproductor (se configura en vturb).
export default function VslPlayer() {
  useEffect(() => {
    if (document.querySelector(`script[src="${PLAYER_SRC}"]`)) return;
    const s = document.createElement("script");
    s.src = PLAYER_SRC;
    s.async = true;
    document.head.appendChild(s);
  }, []);

  return (
    <div
      className="overflow-hidden rounded-[inherit]"
      dangerouslySetInnerHTML={{
        __html: `<vturb-smartplayer id="${PLAYER_ID}" style="display:block;margin:0 auto;width:100%;"><div class="vturb-player-placeholder" style="position:relative;width:100%;padding:56.25% 0 0;z-index:0;background-color:black;"></div></vturb-smartplayer>`,
      }}
    />
  );
}
