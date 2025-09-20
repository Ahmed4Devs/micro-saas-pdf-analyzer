'use client';

import React, { useState, useCallback, useEffect, use } from 'react';
import { useUser } from '@clerk/nextjs';
import { useRouter, useSearchParams } from 'next/navigation';
import {
  CheckCircle,
  FileText,
  AlertCircle,
  Loader,
  Calendar,
  Info,
  Check
} from 'lucide-react';

export default function DashboardContent() {

  // const [user, IsLoading] = useUser();

  const router = useRouter();
  const searchParams = useSearchParams();

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [summary, setSummary] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [showPaymentSuccess, setShowPaymentSuccess] = useState(false);

  useEffect(() => {
    const isPaymentSuccess = searchParams?.get('payment') === 'success';

    if (isPaymentSuccess) {
      setShowPaymentSuccess(true);
      router.replace('/dashboard');

      const timer = setTimeout(() => {
        setShowPaymentSuccess(false);
      }, 5000);

      return () => clearTimeout(timer);
    }

  }, [searchParams, router]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setError('');

    if (!e.target.files?.[0]) return;

    setSelectedFile(e.target.files[0]);
  }

  //TODO: handleAnalyze function

  //TODO: formatSummaryContent function

  return (
    <div className='space-y-10 max-w-4xl mx-auto'>
      {showPaymentSuccess && (
        <div className='bg-green-500/10 max-w-xl mx-auto my-8 border border-green-500/20 rounded-xl p-4 text-green-400'>
          <div className='flex items-center justify-center'>
            <CheckCircle className='h-5 w-5 mr-2' />
            <p>Payment successfull! Your Subscription is Active!</p>
          </div>
        </div>
      )}

      {/* File upload and analysis section */}
      <div className='p-10 rounded-2xl border border-purple-300/10 bg-black/30 shadow-[0_4px_20px_-10px] shadow-purple-200/30'>

        {/* File input for PDF selection */}
        <div className='relative'>

        </div>
      </div>

    </div>
  );
}