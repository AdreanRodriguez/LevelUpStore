import Link from "next/link";
import { FaXTwitter } from "react-icons/fa6";
import { FaFacebook, FaInstagram } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white p-8 mt-10">
      <div className="max-w-mainSize mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 ">
        <div>
          <h3 className="text-xl font-semibold mb-4">Contact Us</h3>
          <p>
            Email: <span className="hover:underline cursor-pointer">support@levelupstore.com</span>
          </p>
          <p>Phone: 010-123 45 67</p>
          <p>Address: LevelUp HQ, Stockholm, Sverige</p>
        </div>

        <div>
          <h3 className="text-xl font-semibold mb-4">Customer Service</h3>
          <ul className="space-y-2">
            <li>
              <Link href="/faq" className="hover:underline">
                FAQ
              </Link>
            </li>
            <li>
              <Link href="/" className="hover:underline">
                Shipping & Returns
              </Link>
            </li>
            <li>
              <Link href="/" className="hover:underline">
                Terms & Conditions
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-xl font-semibold mb-4">Quick Links</h3>
          <ul className="space-y-2">
            <li>
              <Link href="/about" className="hover:underline">
                About Us
              </Link>
            </li>
            <li>
              <Link href="/" className="hover:underline">
                Campaigns
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-xl font-semibold mb-4">Follow Us</h3>
          <div className="flex space-x-4 mb-4">
            <a href="https://facebook.com" target="_blank" className="text-xl hover:text-blue-400" aria-label="Go to Facebook">
              <FaFacebook />
            </a>
            <a href="https://instagram.com" target="_blank" className="text-xl hover:text-pink-400" aria-label="Go to Instagram">
              <FaInstagram />
            </a>
            <a href="https://twitter.com" target="_blank" className="text-xl hover:text-gray-700" aria-label="Go to X">
              <FaXTwitter />
            </a>
          </div>
        </div>
      </div>

      <div className="mt-8 text-center text-gray-400 text-sm">© {new Date().getFullYear()} LevelUpStore. All rights reserved.</div>
    </footer>
  );
}
