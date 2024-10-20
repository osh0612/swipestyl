"use client"
import Image from "next/image";
import SignUpForm from "../components/SignUpForm";
import { useState } from "react";

export default function Home() {
  const [showAuth, setShowAuth] = useState(false);

  return (
    <div className="flex flex-col min-h-screen bg-black text-white">
      <header className="flex justify-between items-center p-4">
        <Image
          src="/fitdrop-logo.png"
          alt="Fitdrop logo"
          width={100}
          height={30}
        />
        <div className="flex gap-4">
          <a href="https://instagram.com/fitdrop" target="_blank" rel="noopener noreferrer">
            <Image src="/instagram-icon.png" alt="Instagram" width={24} height={24} />
          </a>
          <a href="https://tiktok.com/@fitdrop" target="_blank" rel="noopener noreferrer">
            <Image src="/tiktok-icon.png" alt="TikTok" width={24} height={24} />
          </a>
          <a href="https://discord.gg/fitdrop" target="_blank" rel="noopener noreferrer">
            <Image src="/discord-icon.png" alt="Discord" width={24} height={24} />
          </a>
        </div>
      </header>

      {showAuth ? (
        <SignUpForm />
      ) : (
        <main className="flex flex-1 flex-col md:flex-row items-center justify-center p-8 gap-12">
          <div className="text-center md:text-left max-w-lg">
            <h1 className="text-4xl md:text-6xl font-bold mb-4">
              Share your fit.<br />
              Find inspiration.<br />
              Repeat.
            </h1>
            <p className="text-lg mb-8">
              A new app to share your outfits with friends, and get new fashion inspiration.
            </p>
            <div className="flex gap-4 justify-center md:justify-start">
              <button
                className="bg-yellow-400 text-black px-6 py-3 rounded-full font-bold hover:bg-yellow-300 transition-colors"
                onClick={() => setShowAuth(true)}
              >
                Sign up
              </button>
              <a
                className="bg-gray-800 text-white px-6 py-3 rounded-full font-bold hover:bg-gray-700 transition-colors"
                href="#support"
              >
                Support Fitdrop
              </a>
            </div>
          </div>
          <div className="w-full max-w-sm">
            <Image
              src="/app-screenshot.png"
              alt="Fitdrop app screenshot"
              width={300}
              height={600}
              className="rounded-3xl shadow-lg"
            />
          </div>
        </main>
      )}

      <footer className="text-center p-4 text-sm text-gray-500">
        <div className="flex justify-center gap-4 mb-2">
          <a href="#support">Support</a>
          <a href="#terms">Terms of Service</a>
          <a href="#contact">Contact</a>
          <a href="#privacy">Privacy Policy</a>
          <a href="#guidelines">Community Guidelines</a>
          <a href="#patch-notes">Patch Notes</a>
          <a href="#store">Store</a>
        </div>
        <div className="flex justify-center gap-4 mb-2">
          <a href="https://instagram.com/fitdrop" target="_blank" rel="noopener noreferrer">
            <Image src="/instagram-icon.png" alt="Instagram" width={20} height={20} />
          </a>
          <a href="https://tiktok.com/@fitdrop" target="_blank" rel="noopener noreferrer">
            <Image src="/tiktok-icon.png" alt="TikTok" width={20} height={20} />
          </a>
          <a href="https://discord.gg/fitdrop" target="_blank" rel="noopener noreferrer">
            <Image src="/discord-icon.png" alt="Discord" width={20} height={20} />
          </a>
          <a href="https://twitter.com/fitdrop" target="_blank" rel="noopener noreferrer">
            <Image src="/twitter-icon.png" alt="Twitter" width={20} height={20} />
          </a>
          <a href="https://linkedin.com/company/fitdrop" target="_blank" rel="noopener noreferrer">
            <Image src="/linkedin-icon.png" alt="LinkedIn" width={20} height={20} />
          </a>
        </div>
        <p>©2024 by fitdrop</p>
      </footer>
    </div>
  );
}
