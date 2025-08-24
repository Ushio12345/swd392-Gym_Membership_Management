import { useState, useEffect } from "react";
import BannerImage from "../../../assets/images/banner.jpg";

const texts = ["affordable", "convenient", "diverse", "exciting"];

const Banner = () => {
  const [textIndex, setTextIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentText = texts[textIndex];

    let typingSpeed = isDeleting ? 60 : 120;

    const handleTyping = setTimeout(() => {
      if (!isDeleting && charIndex < currentText.length) {
        setDisplayText((prev) => prev + currentText.charAt(charIndex));
        setCharIndex(charIndex + 1);
      } else if (isDeleting && charIndex > 0) {
        setDisplayText((prev) => prev.slice(0, -1));
        setCharIndex(charIndex - 1);
      } else if (!isDeleting && charIndex === currentText.length) {
        setTimeout(() => setIsDeleting(true), 1000);
      } else if (isDeleting && charIndex === 0) {
        setIsDeleting(false);
        setTextIndex((prev) => (prev + 1) % texts.length);
      }
    }, typingSpeed);

    return () => clearTimeout(handleTyping);
  }, [charIndex, isDeleting, textIndex]);

  return (
    <div className="relative w-full h-[700px] overflow-hidden">
      <img
        src={BannerImage}
        alt="Banner"
        loading="lazy"
        className="object-cover object-center w-full h-full"
      />

      <div className="absolute w-full h-full flex items-center justify-center bg-black/55 top-1/2 -translate-y-1/2 p-10">
        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between h-full px-8 md:px-8 gap-10">
          {/* Left Text */}
          <div className="text-center md:text-left max-w-xl">
            <h1 className="flex flex-col gap-2 text-4xl md:text-5xl font-extrabold text-white leading-tight">
              <span className="text-accent-success">GymBow</span>
              Elevate Your Health <br />& Training Packages {displayText}
            </h1>

            <p className="mt-4 text-gray-200 text-lg">
              Experience modern workout services, professional personal
              trainers, and thrilling bowling matches to release stress every
              day.
            </p>

            <div className="mt-6 flex flex-col sm:flex-row gap-4">
              <button className="px-6 py-3 bg-red-500 text-white rounded-lg font-semibold hover:bg-red-600 transition">
                Book Gym Package
              </button>
              <button className="px-6 py-3 bg-blue-500 text-white rounded-lg font-semibold hover:bg-blue-600 transition">
                Book Bowling Package
              </button>
            </div>
          </div>

          {/* Right Box / Callout */}
          <div className="hidden md:flex bg-white/90 p-6 rounded-xl shadow-lg max-w-sm text-black">
            <div>
              <h2 className="text-xl font-bold mb-2">Special Offers 🎉</h2>
              <p className="text-sm text-gray-700 mb-3">
                Discover our training packages today and enjoy exclusive offers.
              </p>
              <a
                href="#packages"
                className="inline-block mt-2 px-5 py-2 bg-green-600 text-white font-semibold rounded-md hover:bg-green-700 transition"
              >
                Explore Packages
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
