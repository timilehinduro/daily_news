'use client';

import { useState, useEffect } from 'react';
import Header from '@/components/ui/header';
import GenFooter from '@/components/ui/footer';
import IdModal from '@/components/ui/id-modal';
import { User, ArrowRight } from 'lucide-react';
import toast from 'react-hot-toast';
import Link from 'next/link';

export default function TextNewsPage() {
  const [showIdModal, setShowIdModal] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    const storedId = localStorage.getItem('myId');
    setUserId(storedId);
  }, []);

  const handleIdSubmit = (newId: string) => {
    setUserId(newId);
    setShowIdModal(false);
    toast.success('User ID set successfully');
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 container mx-auto px-4 py-12">
        <div className="max-w-2xl mx-auto text-center space-y-8">
          <h1 className="text-4xl font-bold mb-6">Welcome to Daily News</h1>

          <div className="prose prose-gray mx-auto">
            <p className="text-lg leading-relaxed">
              Daily News is an AI-driven online news website built to keep you informed about local, national, and global events and affairs around you. We employ an artificial intelligence (AI) system that is custom-designed and trained for algorithmic news curation and AI-generated content. 
              Our AI-powered platform manages how news is gathered, created, and disseminated. This AI system filters information, generates story ideas, conducts digital newsgathering, and crafts news content. 
              By integrating these measures, Daily News aims to redefine modern journalism through the use of cutting-edge artificial intelligence, thereby minimizing errors and promoting reliable news reporting.
            </p>
          </div>

          <div className="mt-12 space-y-6">
            {userId ? (
              <>
                <div className="flex items-center justify-center gap-2 text-primary">
                  <User className="h-5 w-5" />
                  <span>Current User ID: {userId}</span>
                  <button
                    onClick={() => setShowIdModal(true)}
                    className="ml-2 text-sm underline"
                  >
                    Change ID
                  </button>
                </div>
                <Link
                  href="web4/allnews"
                  className="inline-flex items-center justify-center gap-2 bg-primary text-white px-8 py-4 rounded-lg hover:bg-primary/90 text-lg font-medium"
                >
                  Browse All News <ArrowRight className="h-5 w-5" />
                </Link>
              </>
            ) : (
              <button
                onClick={() => setShowIdModal(true)}
                className="bg-primary text-white px-6 py-3 rounded-lg hover:bg-primary/90 flex items-center gap-2 mx-auto"
              >
                <User className="h-5 w-5" />
                Set Your User ID
              </button>
            )}
          </div>
        </div>
      </main>

      <GenFooter />

      <IdModal
        isOpen={showIdModal}
        onClose={() => setShowIdModal(false)}
        onSubmit={handleIdSubmit}
      />
    </div>
  );
}
