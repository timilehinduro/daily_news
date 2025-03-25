'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Search, Menu, MoreHorizontal, User } from 'lucide-react';
import IdModal from './id-modal';
import toast from 'react-hot-toast';

export default function Header() {
  const [showIdModal, setShowIdModal] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    const storedId = localStorage.getItem('myId');
    setUserId(storedId);
  }, []);

  const handleIdSubmit = (newId: string) => {
    localStorage.setItem('myId', newId);
    setUserId(newId);
    setShowIdModal(false);
    toast.success('User ID updated successfully');
  };

  return (
    <header className="border-b sticky top-0 bg-white z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-8">
            <Link href="/" className="font-bold text-xl">
              <Image
                src="/placeholder.svg"
                alt="ABC News"
                width={100}
                height={40}
                className="h-8 w-auto"
              />
            </Link>
            <nav className="hidden md:flex items-center gap-6">
              <Link href="#" className="text-sm font-medium hover:text-primary">
                Latest
              </Link>
              <Link href="#" className="text-sm font-medium hover:text-primary">
                Local News
              </Link>
              <Link href="#" className="text-sm font-medium hover:text-primary">
                Election 2024
              </Link>
              <button
                onClick={() => setShowIdModal(true)}
                className="text-sm font-medium hover:text-primary flex items-center gap-2"
              >
                <User className="h-4 w-4" />
                {userId ? `ID: ${userId}` : 'Set User ID'}
              </button>
            </nav>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" className="md:hidden">
              <Menu className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon">
              <Search className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" className="md:hidden">
              <MoreHorizontal className="h-5 w-5" />
            </Button>
            <Button className="hidden md:inline-flex bg-[#012169] text-white hover:bg-[#012169]/90">
              Live TV
            </Button>
          </div>
        </div>
      </div>
      {/* Live Updates Bar */}
      <div className="border-t overflow-x-auto whitespace-nowrap">
        <div className="container mx-auto px-4">
          <div className="flex items-center h-10 gap-4">
            <Badge variant="destructive" className="rounded-sm">
              Live Updates
            </Badge>
            <Link href="#" className="text-sm hover:text-primary">
              U.S
            </Link>
            <span className="text-muted-foreground">|</span>
            <Badge variant="secondary" className="rounded-sm">
              World
            </Badge>
            <Link href="#" className="text-sm hover:text-primary">
              Politics
            </Link>
            <span className="text-muted-foreground">|</span>
            <Link href="#" className="text-sm hover:text-primary">
              Health
            </Link>
            <span className="text-muted-foreground">|</span>
            <Link href="#" className="text-sm hover:text-primary">
              Science & Tech
            </Link>
            <span className="text-muted-foreground">|</span>
            <Link href="#" className="text-sm hover:text-primary">
              Business
            </Link>
            <span className="text-muted-foreground">|</span>
            <Link href="#" className="text-sm hover:text-primary">
              Lifestyle
            </Link>
            <span className="text-muted-foreground">|</span>
            <Link href="#" className="text-sm hover:text-primary">
              Opinion
            </Link>
            <span className="text-muted-foreground">|</span>
            <Link href="#" className="text-sm hover:text-primary">
              Media
            </Link>
            <span className="text-muted-foreground">|</span>
            <Link href="#" className="text-sm hover:text-primary">
              Sports
            </Link>
            <span className="text-muted-foreground">|</span>
            <Link href="#" className="text-sm hover:text-primary">
              Weather
            </Link>
          </div>
        </div>
      </div>

      {showIdModal && (
        <IdModal
          isOpen={showIdModal}
          onClose={() => setShowIdModal(false)}
          onSubmit={handleIdSubmit}
        />
      )}
    </header>
  );
}
