"use client";

import { Button } from "@/components/ui/button";
import axios from "axios";
import { useEffect, useState } from "react";
import "./globals.css"

interface Meme {
  title: string;
  url: string;
  [key: string]: any;
}

export default function Home() {
  const [meme, setMeme] = useState<Meme | null>(null);
  const [loading, setLoading] = useState(true);

  async function getMeme() {
    try {
      setLoading(true);
      const { data } = await axios.get("https://meme-api.com/gimme");
      console.log(data);
      setMeme(data);
    } catch (error) {
      console.error("Error fetching meme:", error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getMeme();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Button onClick={() => getMeme()} variant={"ghost"}>
        Get Another meme
      </Button>
      {meme ? (
        <div>
          <h1 className="text-2xl">{meme.title}</h1>
          <img className="image" src={meme.url} alt={meme.title} />
        </div>
      ) : (
        <p>No meme available</p>
      )}
    </div>
  );
}
