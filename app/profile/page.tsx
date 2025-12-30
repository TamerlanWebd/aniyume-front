"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";


import { ProfileCard } from "@/components/profile/ProfileCard";
import { StatsOverview } from "@/components/profile/StatsOverview";
import { WatchDynamics } from "@/components/profile/WatchDynamics";
import { RecentActivity } from "@/components/profile/RecentActivity";
import { ProfileSkeleton } from "@/components/skeletons/ProfileSkeleton";

export default function ProfilePage() {
  const router = useRouter();
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("userToken");
        if (!token) { router.push("/login"); return; }

        const res = await fetch("/api/external/profile/me", {
          headers: { Authorization: `Bearer ${token}` }
        });

        if (!res.ok) throw new Error("Unauthorized");
        const jsonData = await res.json();
        setData(jsonData);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem("userToken");
    router.push("/");
  };

    if (loading) {
    return <ProfileSkeleton />;
  }

  if (!data) return null;

  return (
    <div className="min-h-screen bg-[#F8FAFC] pb-16">
      <main className="max-w-7xl mx-auto px-6 pt-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          <div className="lg:col-span-3">
            <ProfileCard user={data.user} counts={data.counts} onLogout={handleLogout} />
          </div>

          <div className="lg:col-span-9 space-y-6">
            <StatsOverview 
              stats={data.stats} 
              watchTime={data.watch_time} 
              historyCount={data.counts.watch_history} 
            />
            
            <WatchDynamics dynamics={data.watch_dynamics} />
            
            <RecentActivity activity={data.recently_watched} />
          </div>
          
        </div>
      </main>
    </div>
  );
}