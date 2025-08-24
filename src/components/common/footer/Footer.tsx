import {
  Dumbbell,
  Facebook,
  Instagram,
  TwitterIcon,
  Youtube,
} from "lucide-react";

const Footer = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid md:grid-cols-4 gap-8 mb-8">
        <div>
          <div className="flex items-center space-x-2 mb-4">
            <Dumbbell className="h-8 w-8 text-orange-500" />
            <span className="text-2xl font-bold">GymBow </span>
          </div>
          <p className="text-gray-400 mb-4">
            Transform your fitness journey with our premium gym facilities and
            expert guidance.
          </p>
          <div className="flex space-x-4">
            <a
              href="#"
              className="text-gray-400 hover:text-orange-500 transition-colors"
            >
              <Facebook className="h-6 w-6" />
            </a>
            <a
              href="#"
              className="text-gray-400 hover:text-orange-500 transition-colors"
            >
              <Instagram className="h-6 w-6" />
            </a>
            <a
              href="#"
              className="text-gray-400 hover:text-orange-500 transition-colors"
            >
              <TwitterIcon className="h-6 w-6" />
            </a>
            <a
              href="#"
              className="text-gray-400 hover:text-orange-500 transition-colors"
            >
              <Youtube className="h-6 w-6" />
            </a>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
          <ul className="space-y-2">
            <li>
              <a
                href="#home"
                className="text-gray-400 hover:text-white transition-colors"
              >
                Home
              </a>
            </li>
            <li>
              <a
                href="#packages"
                className="text-gray-400 hover:text-white transition-colors"
              >
                Packages
              </a>
            </li>
            <li>
              <a
                href="#booking"
                className="text-gray-400 hover:text-white transition-colors"
              >
                Book Now
              </a>
            </li>
            <li>
              <a
                href="#"
                className="text-gray-400 hover:text-white transition-colors"
              >
                About Us
              </a>
            </li>
            <li>
              <a
                href="#"
                className="text-gray-400 hover:text-white transition-colors"
              >
                Contact
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-4">Services</h3>
          <ul className="space-y-2">
            <li>
              <a
                href="#"
                className="text-gray-400 hover:text-white transition-colors"
              >
                Personal Training
              </a>
            </li>
            <li>
              <a
                href="#"
                className="text-gray-400 hover:text-white transition-colors"
              >
                Group Classes
              </a>
            </li>
            <li>
              <a
                href="#"
                className="text-gray-400 hover:text-white transition-colors"
              >
                Nutrition Coaching
              </a>
            </li>
            <li>
              <a
                href="#"
                className="text-gray-400 hover:text-white transition-colors"
              >
                Spa & Recovery
              </a>
            </li>
            <li>
              <a
                href="#"
                className="text-gray-400 hover:text-white transition-colors"
              >
                24/7 Access
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-4">Contact Info</h3>
          <div className="space-y-2 text-gray-400">
            <p>123 Fitness Street</p>
            <p>Healthy City, HC 12345</p>
            <p>Phone: (555) 123-4567</p>
            <p>Email: info@fitzonegym.com</p>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-300 pt-8">
        <div className="flex flex-col md:flex-row justify-between items-center border-gray-300">
          <p className="text-gray-400 text-sm">
            © 2025 GymBow. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a
              href="#"
              className="text-gray-400 hover:text-white text-sm transition-colors"
            >
              Privacy Policy
            </a>
            <a
              href="#"
              className="text-gray-400 hover:text-white text-sm transition-colors"
            >
              Terms of Service
            </a>
            <a
              href="#"
              className="text-gray-400 hover:text-white text-sm transition-colors"
            >
              Cookie Policy
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
