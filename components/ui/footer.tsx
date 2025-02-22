import Link from 'next/link';
import { Facebook, Twitter, Instagram, Linkedin, Youtube } from 'lucide-react';

export default function GenFooter() {
  return (
    <footer className="bg-gray-100 mt-12">
      <div className="container mx-auto px-4 py-8">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <h3 className="font-bold mb-4">Sections</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="#" className="hover:text-primary">
                  Politics
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-primary">
                  International
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-primary">
                  Business
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-primary">
                  Health
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold mb-4">Shows</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="#" className="hover:text-primary">
                  Good Morning America
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-primary">
                  World News Tonight
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-primary">
                  Nightline
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-primary">
                  20/20
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold mb-4">Connect</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="#" className="hover:text-primary">
                  Email Newsletters
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-primary">
                  Social Media
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-primary">
                  Apps
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold mb-4">About</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/about" className="hover:text-primary">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-primary">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-primary">
                  Terms of Use
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-primary">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t mt-8 pt-8">
          <div className="flex justify-center space-x-6 mb-4">
            <Link
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-primary"
            >
              <Facebook size={24} />
              <span className="sr-only">Facebook</span>
            </Link>
            <Link
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-primary"
            >
              <Twitter size={24} />
              <span className="sr-only">Twitter</span>
            </Link>
            <Link
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-primary"
            >
              <Instagram size={24} />
              <span className="sr-only">Instagram</span>
            </Link>
            <Link
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-primary"
            >
              <Linkedin size={24} />
              <span className="sr-only">LinkedIn</span>
            </Link>
            <Link
              href="https://youtube.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-primary"
            >
              <Youtube size={24} />
              <span className="sr-only">YouTube</span>
            </Link>
          </div>
          <div className="text-center text-sm text-muted-foreground">
            <p>Daily News</p>
            <p>
              Copyright &copy; {new Date().getFullYear()} Daily News. All rights
              reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
