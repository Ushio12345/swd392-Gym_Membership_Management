import { useState, useEffect } from "react";
import BannerImage from "../../../assets/images/banner.jpg";
import {Link} from "react-router-dom";
const texts = ["giá rẻ", "tiện lợi", "đa dạng", "hấp dẫn"];

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
    <div className="relative w-full max-h-[700px] overflow-hidden">
      <img
        src={BannerImage}
        alt="Banner"
        loading="lazy"
        className="object-cover object-center w-full h-full"
      />

      <div className="absolute w-full h-full flex items-center justify-center bg-black/55 top-1/2 -translate-y-1/2">
        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between h-full px-8 md:px-8 gap-10">
          {/* Left Text */}
          <div className="text-center md:text-left max-w-xl">
            <h1 className="flex flex-col gap-2 text-4xl md:text-5xl font-extrabold text-white leading-tight">
              <span className="text-accent-success">GymBow</span>
              Nâng Tầm Sức Khỏe <br />& Các gói tập {displayText}
            </h1>

            <p className="mt-4 text-gray-200 text-lg">
              Trải nghiệm dịch vụ tập luyện hiện đại, PT chuyên nghiệp, cùng
              những trận bowling sôi động để xả stress mỗi ngày.
            </p>

            <div className="mt-6 flex flex-col sm:flex-row gap-4">
              <Link
              to="/gym-package"
              className="px-6 py-3 bg-red-500 text-white rounded-lg font-semibold hover:bg-red-600 transition">
                Đặt Gói Gym
              </Link>
              <Link
              to="/bowling-package"
              className="px-6 py-3 bg-blue-500 text-white rounded-lg font-semibold hover:bg-blue-600 transition">
                Đặt Gói Bowling
              </Link>
            </div>
          </div>

          {/* Right Box / Callout */}
          <div className="hidden md:flex bg-white/90 p-6 rounded-xl shadow-lg max-w-sm text-black">
            <div>
              <h2 className="text-xl font-bold mb-2">Ưu Đãi Hấp Dẫn 🎉</h2>
              <p className="text-sm text-gray-700 mb-3">
                Khám phá các gói tập của chúng tôi ngay hôm nay để nhận những ưu
                đãi hấp dẫn
              </p>
              <Link
                to="/package-plan"
                className="inline-block mt-2 px-5 py-2 bg-green-600 text-white font-semibold rounded-md hover:bg-green-700 transition"
              >
                Khám phá gói tập
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
