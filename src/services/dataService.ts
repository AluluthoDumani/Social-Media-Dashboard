import { db } from './firebase';
import { collection, addDoc, getDocs, doc, updateDoc } from 'firebase/firestore';

// Types for our data
export interface SocialStats {
  id?: string;
  followers: number;
  posts: number;
  engagementRate: number;
  totalLikes: number;
  lastUpdated: Date;
}

export interface ChartData {
  id?: string;
  type: 'follower' | 'engagement';
  labels: string[];
  data: number[];
  lastUpdated: Date;
}

// Get social media stats
export const getSocialStats = async (): Promise<SocialStats | null> => {
  try {
    const querySnapshot = await getDocs(collection(db, 'socialStats'));
    if (!querySnapshot.empty) {
      const doc = querySnapshot.docs[0];
      return { id: doc.id, ...doc.data() } as SocialStats;
    }
    return null;
  } catch (error) {
    console.error('Error getting social stats:', error);
    return null;
  }
};

// Update social media stats
export const updateSocialStats = async (stats: Omit<SocialStats, 'id'>): Promise<void> => {
  try {
    await addDoc(collection(db, 'socialStats'), {
      ...stats,
      lastUpdated: new Date()
    });
    console.log('Social stats updated successfully!');
  } catch (error) {
    console.error('Error updating social stats:', error);
  }
};

// Get chart data
export const getChartData = async (type: 'follower' | 'engagement'): Promise<ChartData | null> => {
  try {
    const querySnapshot = await getDocs(collection(db, 'chartData'));
    const chartDoc = querySnapshot.docs.find(doc => doc.data().type === type);
    
    if (chartDoc) {
      return { id: chartDoc.id, ...chartDoc.data() } as ChartData;
    }
    return null;
  } catch (error) {
    console.error('Error getting chart data:', error);
    return null;
  }
};

// Add sample data to Firebase (we'll call this once to populate our database)
export const addSampleData = async (): Promise<void> => {
  try {
    // Add sample social stats
    await addDoc(collection(db, 'socialStats'), {
      followers: 1234,
      posts: 567,
      engagementRate: 3.2,
      totalLikes: 8901,
      lastUpdated: new Date()
    });

    // Add sample follower chart data
    await addDoc(collection(db, 'chartData'), {
      type: 'follower',
      labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      data: [1150, 1180, 1200, 1220, 1205, 1234, 1250],
      lastUpdated: new Date()
    });

    // Add sample engagement chart data
    await addDoc(collection(db, 'chartData'), {
      type: 'engagement',
      labels: ['Likes', 'Comments', 'Shares', 'Saves', 'Messages'],
      data: [850, 120, 45, 89, 34],
      lastUpdated: new Date()
    });

    console.log('Sample data added successfully!');
  } catch (error) {
    console.error('Error adding sample data:', error);
  }
};

// src/services/dataService.ts
// Add these helper functions
export const transformFollowerData = (data: ChartData) => ({
  labels: data.labels,
  datasets: [{
    label: 'Followers',
    data: data.data,
    borderColor: 'rgb(102, 126, 234)',
    backgroundColor: 'rgba(102, 126, 234, 0.1)',
    tension: 0.4,
    fill: true
  }]
});

export const transformEngagementData = (data: ChartData) => ({
  labels: data.labels,
  datasets: [{
    label: 'This Week',
    data: data.data,
    backgroundColor: [
      'rgba(59, 130, 246, 0.8)',
      'rgba(16, 185, 129, 0.8)', 
      'rgba(245, 158, 11, 0.8)',
      'rgba(239, 68, 68, 0.8)',
      'rgba(139, 92, 246, 0.8)',
    ],
    borderColor: [
      'rgb(59, 130, 246)',
      'rgb(16, 185, 129)',
      'rgb(245, 158, 11)',
      'rgb(239, 68, 68)',
      'rgb(139, 92, 246)',
    ],
    borderWidth: 2
  }]
});