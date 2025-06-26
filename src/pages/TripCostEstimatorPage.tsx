import React from 'react';

// Import custom layout and feature components
import MainHeader from '@/components/layout/MainHeader';
import MainFooter from '@/components/layout/MainFooter';
import TripCostEstimatorTool from '@/components/TripCostEstimatorTool';

/**
 * TripCostEstimatorPage
 * 
 * A dedicated page to host the interactive Trip Cost Estimator tool.
 * It provides a focused environment for users to plan and budget their trip
 * by combining different travel services and seeing the cost update in real-time.
 */
const TripCostEstimatorPage: React.FC = () => {
  console.log('TripCostEstimatorPage loaded');

  return (
    <div className="flex flex-col min-h-screen bg-gray-50/50">
      <MainHeader />
      
      <main className="flex-grow w-full">
        <section className="container mx-auto px-4 py-10 md:py-16">
          {/* 
            The TripCostEstimatorTool is the core feature of this page.
            It is a self-contained component that handles all the logic for
            calculating trip costs based on user selections.
          */}
          <TripCostEstimatorTool />
        </section>
      </main>

      <MainFooter />
    </div>
  );
};

export default TripCostEstimatorPage;